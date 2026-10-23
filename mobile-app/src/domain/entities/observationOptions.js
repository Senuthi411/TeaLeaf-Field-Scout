// Domain vocabulary taken from the Member 2 class diagram and SRS (REQ-28 to REQ-30).
// Values are stable identifiers; labels are what field workers see.

export const SuspectedDisease = Object.freeze({
  BLISTER_BLIGHT: 'BLISTER_BLIGHT',
  GREY_BLIGHT: 'GREY_BLIGHT',
  ALGAL_LEAF_SPOT: 'ALGAL_LEAF_SPOT',
  BLACK_BLIGHT: 'BLACK_BLIGHT',
  SPIDER_MITE: 'SPIDER_MITE',
  UNKNOWN: 'UNKNOWN',
});

export const DISEASE_OPTIONS = [
  { value: SuspectedDisease.BLISTER_BLIGHT, label: 'Blister Blight' },
  { value: SuspectedDisease.GREY_BLIGHT, label: 'Grey Blight' },
  { value: SuspectedDisease.ALGAL_LEAF_SPOT, label: 'Algal Leaf Spot' },
  { value: SuspectedDisease.BLACK_BLIGHT, label: 'Black Blight' },
  { value: SuspectedDisease.SPIDER_MITE, label: 'Spider Mite' },
  { value: SuspectedDisease.UNKNOWN, label: 'Unknown / Other' },
];

export const SeverityLevel = Object.freeze({
  LOW: 'LOW',
  MODERATE: 'MODERATE',
  HIGH: 'HIGH',
});

export const SEVERITY_OPTIONS = [
  { value: SeverityLevel.LOW, label: 'Low', description: 'Few leaves affected' },
  { value: SeverityLevel.MODERATE, label: 'Moderate', description: 'Spreading across the plant' },
  { value: SeverityLevel.HIGH, label: 'High', description: 'Widespread, needs quick action' },
];

export const ViewAngle = Object.freeze({
  TOP_OF_LEAF: 'TOP_OF_LEAF',
  LEAF_UNDERSIDE: 'LEAF_UNDERSIDE',
  WIDER_VIEW: 'WIDER_VIEW',
  STEM_PETIOLE: 'STEM_PETIOLE', // optional extra angle (Figma "Add angle")
});

// The three photo categories every observation must include.
export const REQUIRED_PHOTO_ANGLES = [
  {
    angle: ViewAngle.TOP_OF_LEAF,
    label: 'Top of leaf',
    hint: 'Place the top two leaves and bud in the frame.',
  },
  {
    angle: ViewAngle.LEAF_UNDERSIDE,
    label: 'Underside of leaf',
    hint: 'Turn the leaf over and keep the underside flat.',
  },
  {
    angle: ViewAngle.WIDER_VIEW,
    label: 'Wider view',
    hint: 'Step back about 1.5 m to show the surrounding foliage.',
  },
];

// Optional extra photo shown in the capture gallery. Not required for submission.
export const OPTIONAL_PHOTO_ANGLES = [
  {
    angle: ViewAngle.STEM_PETIOLE,
    label: 'Stem / petiole',
    hint: 'Optional. Useful for red rust or wood rot.',
  },
];

export const ALL_PHOTO_ANGLES = [...REQUIRED_PHOTO_ANGLES, ...OPTIONAL_PHOTO_ANGLES];

// How a photo got through the basic quality step.
export const PhotoQualityStatus = Object.freeze({
  PASSED: 'PASSED', // basic checks passed and the worker confirmed the photo looks clear
  UNCERTAIN: 'UNCERTAIN', // the worker chose "Proceed anyway"; an expert should verify the image
});

export const LESION_COLOUR_OPTIONS = [
  { value: 'BROWN', label: 'Brown' },
  { value: 'GREY', label: 'Grey' },
  { value: 'BLACK', label: 'Black' },
  { value: 'YELLOW', label: 'Yellow' },
  { value: 'PALE_GREEN', label: 'Pale green' },
  { value: 'WHITE_POWDERY', label: 'White / powdery' },
];

export const LESION_SHAPE_OPTIONS = [
  { value: 'CIRCULAR_SPOTS', label: 'Circular spots' },
  { value: 'RAISED_BLISTERS', label: 'Raised blisters' },
  { value: 'IRREGULAR_PATCHES', label: 'Irregular patches' },
  { value: 'CONCENTRIC_RINGS', label: 'Concentric rings' },
  { value: 'MARGIN_SCORCH', label: 'Edge / margin scorch' },
];

export const FLUSH_PART_OPTIONS = [
  { value: 'BUD', label: 'Bud' },
  { value: 'FIRST_LEAF', label: '1st leaf' },
  { value: 'SECOND_LEAF', label: '2nd leaf' },
  { value: 'THIRD_LEAF', label: '3rd leaf' },
  { value: 'STEM', label: 'Stem' },
];

// A GPS fix worse than this is flagged as a weak signal (see GPSService in the class diagram).
export const GPS_WEAK_ACCURACY_METERS = 50;

export const MAX_NOTES_LENGTH = 500;

export function labelFor(options, value) {
  return options.find((option) => option.value === value)?.label ?? '';
}
