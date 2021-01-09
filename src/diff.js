import getData from './modules/parsers.js';
import getFormat from './formatters/index.js';
import getDiff from './differ.js';

const genDiff = (filepath1, filepath2, format) => {
  const obj1 = getData(filepath1);
  const obj2 = getData(filepath2);
  const diff = getDiff(obj1, obj2);

  const result = getFormat(diff, format);
  return result;
};

export default genDiff;
