export const findEstate = (hierarchy, estateId) => hierarchy.find((estate) => estate.id === estateId);
export const findDivision = (hierarchy, estateId, divisionId) =>
  findEstate(hierarchy, estateId)?.divisions.find((division) => division.id === divisionId);
export const findBlock = (hierarchy, estateId, divisionId, blockId) =>
  findDivision(hierarchy, estateId, divisionId)?.blocks.find((block) => block.id === blockId);
