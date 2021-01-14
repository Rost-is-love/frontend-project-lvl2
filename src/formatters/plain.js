import _ from 'lodash';

const getValue = (value) => {
  if (_.isPlainObject(value)) {
    return '[complex value]';
  }
  if (value === null || typeof value === 'boolean') {
    return value;
  }
  return `'${value}'`;
};

const getFunc = {
  outdated: () => '',
  updated: (path, obj) =>
    `Property '${path}' was updated. From ${getValue(obj.oldValue)} to ${getValue(obj.curValue)}`,
  removed: (path) => `Property '${path}' was removed`,
  added: (path, obj) => `Property '${path}' was added with value: ${getValue(obj.value)}`,
  nested: (path, obj) => {
    const filterChildren = obj.children.filter((child) => child.status !== 'outdated');
    return filterChildren.flatMap((obj) => getFunc[obj.status](`${path}.${obj.key}`, obj));
  },
};

const format = (data) => {
  const filterChildren = data.filter((obj) => obj.status !== 'outdated');
  return filterChildren.flatMap((obj) => getFunc[obj.status](obj.key, obj)).join('\n');
};

export default format;
