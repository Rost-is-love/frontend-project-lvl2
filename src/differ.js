import _ from 'lodash';

const getDiff = (data1, data2) => {
  const keys = _.union(_.keys(data1), _.keys(data2)).sort();

  return keys.map((key) => {
    if (_.isPlainObject(data1[key]) && _.isPlainObject(data2[key])) {
      return { key, status: 'nested', children: getDiff(data1[key], data2[key]) };
    }
    if (data1[key] === data2[key]) {
      return { key, status: 'outdated', value: data1[key] };
    }
    if (_.has(data1, key) && _.has(data2, key)) {
      return { key, status: 'updated', curValue: data2[key], oldValue: data1[key] };
    }

    return _.has(data1, key)
      ? { key, status: 'removed', value: data1[key] }
      : { key, status: 'added', value: data2[key] };
  });
};

export default getDiff;
