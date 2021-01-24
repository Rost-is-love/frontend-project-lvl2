/* eslint-disable implicit-arrow-linebreak */
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
    `Property '${path.join('.')}' was updated. From ${getValue(node.oldValue)} to ${getValue(node.newValue)}`,
  removed: (path) => `Property '${path.join('.')}' was removed`,
  added: (path, node) => `Property '${path.join('.')}' was added with value: ${getValue(node.value)}`,
  nested: (path, node) =>
    node.children.flatMap((child) => map[child.status]([...path, child.key], child)),
};

const format = (ast) => ast.flatMap((node) => map[node.status]([node.key], node)).join('\n');

export default format;
