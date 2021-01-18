import formatStylish from './stylish.js';
import formatPlain from './plain.js';

export default (data, format) => {
  if (format === 'stylish' || format === undefined) {
    return formatStylish(data);
  }
  if (format === 'plain') {
    return formatPlain(data);
  }
  if (format === 'json') {
    return JSON.stringify(data);
  }
  throw new Error(`Unknown format: ${format}`);
};
