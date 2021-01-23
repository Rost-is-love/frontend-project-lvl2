import fs from 'fs';
import { dirname, resolve, extname } from 'path';
import { fileURLToPath } from 'url';
import parseData from './parsers.js';
import getFormat from './formatters/index.js';
import getDiff from './differ.js';

const buildFilePath = (filepath) => {
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = dirname(__filename);
  const getFixturePath = (path) => resolve(__dirname, path).toString();
  return getFixturePath(filepath);
};

const getData = (filepath) => fs.readFileSync(buildFilePath(filepath), 'utf-8');
const getDataType = (filepath) => {
  const extension = extname(filepath).slice(1);
  switch (extension) {
    case 'json':
    case '':
      return 'json';
    case 'yml':
    case 'yaml':
      return 'yml';
    default:
      throw new Error('The calculator only works with JSON and yaml formats');
  }
};

const genDiff = (filepath1, filepath2, format = 'stylish') => {
  const data1 = parseData(getData(filepath1), getDataType(filepath1));
  const data2 = parseData(getData(filepath2), getDataType(filepath2));
  const diff = getDiff(data1, data2);

  const result = getFormat(diff, format);
  return result;
};

export default genDiff;
