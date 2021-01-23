import _ from 'lodash';

const getDiff = (data1, data2) => {
  const keys = _.sortBy(_.union(_.keys(data1), _.keys(data2)));

  return keys.map((key) => {
    if (!_.has(data1, key)) {
      return { key, status: 'added', value: data2[key] };
    }
    if (!_.has(data2, key)) {
      return { key, status: 'removed', value: data1[key] };
    }
    if (_.isEqual(data1[key], data2[key])) {
      return { key, status: 'unchanged', value: data1[key] };
    }
    if (_.isPlainObject(data1[key]) && _.isPlainObject(data2[key])) {
      return { key, status: 'nested', children: getDiff(data1[key], data2[key]) };
    }
    return {
      key, status: 'updated', newValue: data2[key], oldValue: data1[key],
    };
  });
};

export default getDiff;
