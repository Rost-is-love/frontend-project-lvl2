/* eslint-disable no-underscore-dangle */
import { test, expect } from '@jest/globals';
import fs from 'fs';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';
import { findDiff } from '../src/index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const getFixturePath = (filepath) => join(__dirname, '..', '__tests__', '__fixtures__', filepath);

test('flat json', () => {
  const path1 = getFixturePath('flatjson1.json');
  const path2 = getFixturePath('flatjson2.json');
  const expected = fs.readFileSync(getFixturePath('expectedflat.txt'), 'utf-8');
  expect(findDiff(path1, path2)).toEqual(expected);
  expect(findDiff(path1, path2)).not.toEqual('');
});

test('flat yaml', () => {
  const path1 = getFixturePath('flatyaml1.yml');
  const path2 = getFixturePath('flatyaml2.yml');
  const expected = fs.readFileSync(getFixturePath('expectedflat.txt'), 'utf-8');
  expect(findDiff(path1, path2)).toEqual(expected);
  expect(findDiff(path1, path2)).not.toEqual('');
});
