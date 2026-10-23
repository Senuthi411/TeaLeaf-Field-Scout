// Illustrative estate > division > block hierarchy (centre coordinates are approximate samples).
// In production this comes from "getAssignedDivisions(workerId)" (see the sequence diagram).
export const locationHierarchy = [
  {
    id: 'EST-NEH',
    name: 'Nuwara Eliya Highlands',
    divisions: [
      {
        id: 'DIV-04',
        name: 'Pedro Division',
        blocks: [
          { id: 'BLK-A1', name: 'Block A1 — Upper Ridge', latitude: 6.9731, longitude: 80.7702 },
          { id: 'BLK-A2', name: 'Block A2 — Lovers Leap', latitude: 6.9709, longitude: 80.7668 },
          { id: 'BLK-C1', name: 'Block C1 — Peak View', latitude: 6.9684, longitude: 80.7731 },
          { id: 'BLK-12B', name: 'Block 12B — Stream Side', latitude: 6.9662, longitude: 80.7645 },
        ],
      },
      {
        id: 'DIV-02',
        name: 'Labookellie Division',
        blocks: [
          { id: 'BLK-B2', name: 'Block B2 — Tea Terrace', latitude: 6.9803, longitude: 80.7551 },
          { id: 'BLK-D3', name: 'Block D3 — Mill Road', latitude: 6.9779, longitude: 80.7589 },
        ],
      },
    ],
  },
  {
    id: 'EST-KAN',
    name: 'Kandapola Estate',
    divisions: [
      {
        id: 'DIV-07',
        name: 'Kandapola North',
        blocks: [
          { id: 'BLK-K1', name: 'Block K1 — North Slope', latitude: 6.9511, longitude: 80.7314 },
          { id: 'BLK-K2', name: 'Block K2 — Valley Floor', latitude: 6.9487, longitude: 80.7342 },
        ],
      },
    ],
  },
];
