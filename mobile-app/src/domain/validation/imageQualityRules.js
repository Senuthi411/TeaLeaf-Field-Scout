// BASIC photo checks that can be computed honestly from file metadata only.
// Blur, glare and framing are NOT measured (no image analysis is performed); the worker confirms
// those by looking at the preview. Thresholds are TBD-1 in the SRS and must be tuned in field tests.

export const IMAGE_QUALITY_THRESHOLDS = {
  recommendedShortSidePx: 1024,
  minimumShortSidePx: 480,
  recommendedFileBytes: 100 * 1024,
  minimumFileBytes: 30 * 1024,
};

// Things only a person can judge from the preview.
export const SELF_CHECKS = [
  { key: 'focus', title: 'Focus & sharpness', question: 'Are the leaf details sharp?', tip: 'Hold still and tap the central vein to lock focus.' },
  { key: 'glare', title: 'Sun glare', question: 'Is the leaf free of strong glare or deep shadow?', tip: 'Tilt the phone or shade the leaf with your hand.' },
  { key: 'framing', title: 'Leaf framing', question: 'Is the whole subject inside the frame?', tip: 'Keep the leaf inside the dashed outline.' },
];

/** Metadata checks. status: 'passed' | 'warning' | 'failed'. `blocking` means retaking is mandatory. */
export function evaluateBasicQuality({ width, height, sizeBytes } = {}) {
  const t = IMAGE_QUALITY_THRESHOLDS;
  const checks = [];

  if (!Number.isFinite(width) || !Number.isFinite(height)) {
    checks.push({ key: 'resolution', title: 'Resolution', status: 'warning', blocking: false, message: 'The image size could not be read.' });
  } else {
    const shortSide = Math.min(width, height);
    if (shortSide >= t.recommendedShortSidePx) {
      checks.push({ key: 'resolution', title: 'Resolution', status: 'passed', blocking: false, message: `${width}×${height} px is detailed enough.` });
    } else if (shortSide >= t.minimumShortSidePx) {
      checks.push({ key: 'resolution', title: 'Resolution', status: 'warning', blocking: false, message: `${width}×${height} px is lower than recommended (${t.recommendedShortSidePx} px on the short side). Fine lesions may be hard to see.` });
    } else {
      checks.push({ key: 'resolution', title: 'Resolution', status: 'failed', blocking: true, message: `${width}×${height} px is too small to inspect for disease. Retake the photo.` });
    }
  }

  if (!Number.isFinite(sizeBytes)) {
    checks.push({ key: 'fileSize', title: 'File size', status: 'warning', blocking: false, message: 'The file size could not be read.' });
  } else if (sizeBytes >= t.recommendedFileBytes) {
    checks.push({ key: 'fileSize', title: 'File size', status: 'passed', blocking: false, message: `${Math.round(sizeBytes / 1024)} KB.` });
  } else if (sizeBytes >= t.minimumFileBytes) {
    checks.push({ key: 'fileSize', title: 'File size', status: 'warning', blocking: false, message: `${Math.round(sizeBytes / 1024)} KB is small. The photo may be heavily compressed.` });
  } else {
    checks.push({ key: 'fileSize', title: 'File size', status: 'failed', blocking: true, message: `${Math.round(sizeBytes / 1024)} KB is too small to contain a usable photo. Retake it.` });
  }

  return {
    checks,
    hasFailure: checks.some((c) => c.status === 'failed'),
    hasWarning: checks.some((c) => c.status === 'warning'),
    blocking: checks.some((c) => c.blocking),
  };
}

/**
 * Combines the metadata checks with the worker's own answers ({ focus: true|false|undefined, ... }).
 * outcome: 'INCOMPLETE' (answer all questions) | 'PASSED' | 'RETAKE_RECOMMENDED' | 'RETAKE_REQUIRED'
 */
export function decidePhotoQuality(basic, selfAnswers = {}) {
  if (basic.blocking) return { outcome: 'RETAKE_REQUIRED', issues: basic.checks.filter((c) => c.status === 'failed').map((c) => c.message) };

  const unanswered = SELF_CHECKS.some((c) => typeof selfAnswers[c.key] !== 'boolean');
  if (unanswered) return { outcome: 'INCOMPLETE', issues: [] };

  const issues = [
    ...basic.checks.filter((c) => c.status !== 'passed').map((c) => c.message),
    ...SELF_CHECKS.filter((c) => selfAnswers[c.key] === false).map((c) => `Worker reported a problem: ${c.title.toLowerCase()}.`),
  ];
  return { outcome: issues.length === 0 ? 'PASSED' : 'RETAKE_RECOMMENDED', issues };
}
