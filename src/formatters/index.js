import formatStylish from './stylish.js';
import formatPlain from './plain.js';
import formatJson from './json.js';

const getFormat = (data, format) => {
  if (format === 'stylish') {
    return formatStylish(data);
  }
  if (format === 'plain') {
    return formatPlain(data);
  }
  if (format === 'json') {
    return formatJson(data);
  }
  throw new Error(`Unknown format: ${format}`);
};

export default getFormat;
