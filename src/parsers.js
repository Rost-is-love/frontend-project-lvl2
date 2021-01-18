import fs from 'fs';
import yaml from 'js-yaml';
import { dirname, resolve, extname } from 'path';
import { fileURLToPath } from 'url';

const buildFilePath = (filepath) => {
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = dirname(__filename);
  const getFixturePath = (path) => resolve(__dirname, path).toString();
  return getFixturePath(filepath);
};

const getData = (filepath) => {
  const format = extname(filepath);
  const data = fs.readFileSync(buildFilePath(filepath), 'utf-8');
  if (format === '' || format === '.json') {
    return JSON.parse(data);
  }
  if (format === '.yml') {
    return yaml.safeLoad(data);
  }

  throw new Error('Программа работает только с форматами JSON и yaml');
};

export default getData;
