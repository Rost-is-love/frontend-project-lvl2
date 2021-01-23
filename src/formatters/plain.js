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
  unchanged: () => [],
  updated: (path, node) =>
    // eslint-disable-next-line implicit-arrow-linebreak
    `Property '${path}' was updated. From ${getValue(node.oldValue)} to ${getValue(node.newValue)}`,
  removed: (path) => `Property '${path}' was removed`,
  added: (path, node) => `Property '${path}' was added with value: ${getValue(node.value)}`,
  nested: (path, node) => node.children.flatMap((child) => map[child.status](`${path}.${child.key}`, child)),
};

const format = (data) => data.flatMap((node) => map[node.status](node.key, node)).join('\n');

export default format;
