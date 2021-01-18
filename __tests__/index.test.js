import fs from 'fs';
import { describe, test, expect } from '@jest/globals';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';
import genDiff from '../index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const getFixturePath = (filepath) => join(__dirname, '..', '__fixtures__', filepath);

const expectedStylish = fs.readFileSync(getFixturePath('expected-stylish.txt'), 'utf-8');
const expectedPlain = fs.readFileSync(getFixturePath('expected-plain.txt'), 'utf-8');
const expectedJson = fs.readFileSync(getFixturePath('expected-json.txt'), 'utf-8');

describe.each([
  [getFixturePath('json1.json'), getFixturePath('json2.json'), expectedStylish, expectedPlain, expectedJson],
  [getFixturePath('yaml1.yml'), getFixturePath('yaml2.yml'), expectedStylish, expectedPlain, expectedJson],
])('file1:\n%s\n  file2:\n%s', (file1, file2, expected1, expected2, expected3) => {
  test('compare files', () => {
    const resultStylish = genDiff(file1, file2, 'stylish');
    const resultPlain = genDiff(file1, file2, 'plain');
    const resultJson = genDiff(file1, file2, 'json');
    const resultDefault = genDiff(file1, file2);
    expect(resultStylish).toEqual(expected1);
    expect(resultPlain).toEqual(expected2);
    expect(resultJson).toEqual(expected3);
    expect(resultDefault).toEqual(expected1);
  });
});
