export const arrayToKeys = (array, key) => array.map(item => item[key]);

export const arrayToByKey = (array, key) =>
  array.reduce((acc, cur) => {
    acc[cur[key]] = cur;
    return acc;
  }, {});
