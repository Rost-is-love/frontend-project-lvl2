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

const getExt = (filepath) => extname(filepath);
const getData = (filepath) => fs.readFileSync(buildFilePath(filepath), 'utf-8');

const genDiff = (filepath1, filepath2, format) => {
  const obj1 = parseData(getData(filepath1), getExt(filepath1));
  const obj2 = parseData(getData(filepath2), getExt(filepath2));
  const diff = getDiff(obj1, obj2);

  const result = getFormat(diff, format);
  return result;
};

export default genDiff;
