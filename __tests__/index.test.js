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

test('json to stylish', () => {
  const diff = genDiff(jsonPath1, jsonPath2, 'stylish');
  expect(diff).toEqual(expectedStylish);
  expect(typeof diff).toEqual('string');
});

test('yaml to stylish', () => {
  const diff = genDiff(yamlPath1, yamlPath2, 'stylish');
  expect(diff).toEqual(expectedStylish);
  expect(typeof diff).toEqual('string');
});

test('json to plain', () => {
  const diff = genDiff(jsonPath1, jsonPath2, 'plain');
  expect(expectedPlain.slice(0, 10)).toEqual(diff.slice(0, 10));
  expect(expectedPlain.slice(-20)).toEqual(diff.slice(-20));
  expect(typeof diff).toEqual('string');
});

test('yaml to plain', () => {
  const diff = genDiff(yamlPath1, yamlPath2, 'plain');
  expect(expectedPlain.slice(0, 10)).toEqual(diff.slice(0, 10));
  expect(expectedPlain.slice(-20)).toEqual(diff.slice(-20));
  expect(typeof diff).toEqual('string');
});

test('json to json', () => {
  const diff = genDiff(jsonPath1, jsonPath2, 'json');
  expect(expectedJson).toEqual(diff);
});

test('yaml to json', () => {
  const diff = genDiff(yamlPath1, yamlPath2, 'json');
  expect(expectedJson).toEqual(diff);
});
