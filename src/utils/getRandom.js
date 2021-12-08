export const getRandom = (items) => {
  //pick a random item from an array
  return items[(items.length * Math.random()) | 0];
};
