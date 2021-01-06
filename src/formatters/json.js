import _ from 'lodash';

const getCurData = (data1, data2) => {
  /* if (_.isPlainObject(data1[key]) && _.isPlainObject(data2[key])) {
    return ['nested', 'nested', 'outdated', true];
  }

  if (!_.has(data1, key)) {
    if (_.isObject(data2[key])) {
      return ['nested', null, 'added', true];
    }
    return [data2[key], null, 'added', false];
  }
  if (!_.has(data2, key)) {
    if (_.isObject(data1[key])) {
      return ['nested', 'nested', 'removed', true];
    }
    return ['nested', null, 'removed', false];
  }
  if (data1[key] === data2[key]) {
    return [data1[key], null, 'outdated', false];
  }
  if (!_.isObject(data1[key]) && !_.isObject(data2[key])) {
    return [data2[key], data1[key], 'updated', false];
  }
  if (_.isObject(data1[key])) {
    return [data2[key], 'nested', 'updated', false];
  }
  return ['nested', data1[key], 'updated', true]; */
};

/* const format = (obj1, obj2) => {
  const iter = (data1, data2) => {
    const keys = _.union(_.keys(data1), _.keys(data2)).sort();

    const diff = keys.reduce((acc, key) => {
      const name = key;
      const [value, oldValue, status, curChildren] = getCurData(data1, data2, key);
      const newData1 = _.isObject(data1[key]) ? data1[key] : {};
      const newData2 = _.isObject(data2[key]) ? data2[key] : {};
      const children = curChildren === true ? iter(newData1, newData2) : curChildren;

      return [
        ...acc,
        {
          name,
          value,
          oldValue,
          status,
          children,
        },
      ];
    }, []);

    return diff;
  };
  const result = iter(obj1, obj2);
  // return JSON.stringify(result);
  return result;
}; */

export default getCurData;
