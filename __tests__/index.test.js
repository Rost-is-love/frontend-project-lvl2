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
  ['json', 'yml'],
])('file1:\n%s\n  file2:\n%s', (format) => {
  test('compare files', () => {
    const resultStylish = genDiff(getFixturePath(`file1.${format}`), getFixturePath(`file2.${format}`), 'stylish');
    const resultPlain = genDiff(getFixturePath(`file1.${format}`), getFixturePath(`file2.${format}`), 'plain');
    const resultJson = genDiff(getFixturePath(`file1.${format}`), getFixturePath(`file2.${format}`), 'json');
    const resultDefault = genDiff(getFixturePath(`file1.${format}`), getFixturePath(`file2.${format}`));
    expect(resultStylish).toEqual(expectedStylish);
    expect(resultPlain).toEqual(expectedPlain);
    expect(resultJson).toEqual(expectedJson);
    expect(resultDefault).toEqual(expectedStylish);
  });
});
