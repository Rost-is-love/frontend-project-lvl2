import getData from './modules/parsers.js';
import getFormat from './formatters/index.js';

const genDiff = (filepath1, filepath2, format) => {
  const obj1 = getData(filepath1);
  const obj2 = getData(filepath2);

  const result = getFormat(obj1, obj2, format);
  return result;
};

export default genDiff;
