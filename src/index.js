/* eslint-disable no-underscore-dangle */
import program from 'commander';
import fs from 'fs';
import _ from 'lodash';
import { dirname, resolve } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const getFixturePath = (filepath) => resolve(__dirname, filepath);

export const findDiff = (filepath1, filepath2) => {
  const readFile1 = fs.readFileSync(getFixturePath(filepath1), 'utf-8');
  const readFile2 = fs.readFileSync(getFixturePath(filepath2), 'utf-8');
  const obj1 = JSON.parse(readFile1);
  const obj2 = JSON.parse(readFile2);
  const keys = _.union(_.keys(obj1), _.keys(obj2));

  const diff = keys
    .reduce((acc, key) => {
      if (!_.has(obj1, key)) {
        return [...acc, `  + ${key}: ${obj2[key]}`];
      }
      if (!_.has(obj2, key)) {
        return [...acc, `  - ${key}: ${obj1[key]}`];
      }
      if (obj1[key] !== obj2[key]) {
        return [...acc, `  - ${key}: ${obj1[key]}`, `  + ${key}: ${obj2[key]}`];
      }
      return [...acc, `    ${key}: ${obj1[key]}`];
    }, [])
    .sort((a, b) => {
      if (a[4] > b[4]) {
        return 1;
      }
      if (a[4] < b[4]) {
        return -1;
      }
      return 0;
    });

  const result = `{\n${diff.join('\n')}\n}`;
  console.log(result);
  return result;
};

const genDiff = () => {
  program
    .version('0.0.1')
    .arguments('<filepath1> <filepath2>')
    .description('Compares two configuration files and shows a difference.')
    .option('-f, --format [type]', 'output format')
    .action((option1, option2) => {
      findDiff(option1, option2);
    });
  program.on('--help', () => {});
  program.parse(process.argv);
};

export default genDiff;
