import _ from 'lodash';

const getValue = (value) => (value === null || typeof value === 'boolean' ? value : `'${value}'`);

const format = (data1, data2, path = '') => {
  const keys = _.union(_.keys(data1), _.keys(data2)).sort();

  return keys
    .reduce((acc, key) => {
      if (!_.has(data1, key)) {
        if (_.isObject(data2[key])) {
          return [...acc, `Property '${path}${key}' was added with value: [complex value]`];
        }
        return [...acc, `Property '${path}${key}' was added with value: ${getValue(data2[key])}`];
      }
      if (!_.has(data2, key)) {
        return [...acc, `Property '${path}${key}' was removed`];
      }
      if (_.isObject(data1[key]) && _.isObject(data2[key])) {
        return [...acc, format(data1[key], data2[key], `${path}${key}.`)];
      }
      if (data1[key] !== data2[key]) {
        if (_.isObject(data1[key]) && !_.isObject(data2[key])) {
          return [
            ...acc,
            `Property '${path}${key}' was updated. From [complex value] to ${getValue(data2[key])}`,
          ];
        }
        if (!_.isObject(data1[key]) && _.isObject(data2[key])) {
          return [
            ...acc,
            `Property '${path}${key}' was updated. From '${data1[key]}' to [complex value]`,
          ];
        }
        return [
          ...acc,
          `Property '${path}${key}' was updated. From ${getValue(data1[key])} to ${getValue(
            data2[key],
          )}`,
        ];
      }
      return acc;
    }, [])
    .join('\n');
};

export default format;
