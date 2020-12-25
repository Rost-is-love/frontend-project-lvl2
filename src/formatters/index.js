import formatStylish from './stylish.js';
import formatPlain from './plain.js';

const getFormat = (data1, data2, format) => {
  if (format === 'stylish') {
    return formatStylish(data1, data2);
  }
  if (format === 'plain') {
    return formatPlain(data1, data2);
  }
  throw new Error('Вы указали несуществующий формат');
};

export default getFormat;
