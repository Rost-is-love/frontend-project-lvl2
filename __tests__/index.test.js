/* eslint-disable no-underscore-dangle */
import fs from 'fs';
import { describe, test, expect } from '@jest/globals';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';
import genDiff from '../index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const getFixturePath = (filepath) => join(__dirname, '..', '__fixtures__', filepath);

const jsonPath1 = getFixturePath('json1.json');
const jsonPath2 = getFixturePath('json2.json');
const yamlPath1 = getFixturePath('yaml1.yml');
const yamlPath2 = getFixturePath('yaml2.yml');
const expectedStylish = fs.readFileSync(getFixturePath('expected-stylish.txt'), 'utf-8');
const expectedPlain = fs.readFileSync(getFixturePath('expected-plain.txt'), 'utf-8');
const expectedJson = fs.readFileSync(getFixturePath('expected-json.txt'), 'utf-8');

describe.each([
  [jsonPath1, jsonPath2, expectedStylish, 'stylish'],
  [yamlPath1, yamlPath2, expectedStylish, 'stylish'],
  [jsonPath1, jsonPath2, expectedPlain, 'plain'],
  [yamlPath1, yamlPath2, expectedPlain, 'plain'],
  [jsonPath1, jsonPath2, expectedJson, 'json'],
  [yamlPath1, yamlPath2, expectedJson, 'json'],
])('file1:\n%s\n file2:\n%s\n\n', (file1, file2, expected, format) => {
  test('compare files', () => {
    const result = genDiff(file1, file2, format);
    expect(result).toEqual(expected);
  });
});
