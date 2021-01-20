import _ from 'lodash';

const getValue = (value) => {
  if (_.isPlainObject(value)) {
    return '[complex value]';
  }
  if (_.isString(value)) {
    return `'${value}'`;
  }
  return value;
};

const map = {
  unchanged: () => '',
  updated: (path, obj) =>
    // eslint-disable-next-line implicit-arrow-linebreak
    `Property '${path}' was updated. From ${getValue(obj.oldValue)} to ${getValue(obj.newValue)}`,
  removed: (path) => `Property '${path}' was removed`,
  added: (path, obj) => `Property '${path}' was added with value: ${getValue(obj.value)}`,
  nested: (path, obj) => {
    const filterChildren = obj.children.filter((child) => child.status !== 'unchanged');
    return filterChildren.flatMap((child) => map[child.status](`${path}.${child.key}`, child));
  },
};

const format = (data) => {
  const filterChildren = data.filter((obj) => obj.status !== 'unchanged');
  return filterChildren.flatMap((obj) => map[obj.status](obj.key, obj)).join('\n');
};

export default format;
