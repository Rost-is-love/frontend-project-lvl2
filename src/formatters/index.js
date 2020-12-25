import formatStylish from './stylish.js';
import formatPlain from './plain.js';

const getFormat = (data1, data2, format) => {
  if (format === 'stylish') {
    return formatStylish(data1, data2);
  }
  return formatPlain(data1, data2);
};

export default getFormat;
