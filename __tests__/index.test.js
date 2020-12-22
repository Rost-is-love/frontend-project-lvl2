/* eslint-disable no-underscore-dangle */
import { test, expect } from '@jest/globals';
import fs from 'fs';
import { dirname, resolve } from 'path';
import { fileURLToPath } from 'url';
import { findDiff } from '../src/index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const getFixturePath = (filepath) => resolve(__dirname, filepath);

test('flat json', () => {
  const path1 = getFixturePath('../__tests__/__fixtures__/flatjson1.json');
  const path2 = getFixturePath('../__tests__/__fixtures__/flatjson2.json');
  const expected = fs.readFileSync(
    getFixturePath('../__tests__/__fixtures__/expectedjson.txt'),
    'utf-8',
  );
  expect(findDiff(path1, path2)).toEqual(expected);
  expect(findDiff(path1, path2)).not.toEqual('');
});
