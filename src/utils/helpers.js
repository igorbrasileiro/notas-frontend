export const concatIdIfNotContain = (allIds, id) => {
  if (allIds.includes(id)) {
    return allIds;
  }
  return allIds.concat([id]);
};

export default {};
