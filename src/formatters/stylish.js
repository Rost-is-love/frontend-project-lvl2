import _ from 'lodash';

const defaultPrefix = 4;

const buildIndent = (depth) => `${' '.repeat(depth * defaultPrefix - 2)}`;

const stringify = (curValue, depth, map) => {
  if (!_.isPlainObject(curValue)) {
    return curValue;
  }

  const keys = Object.entries(curValue)
    .map(([key, value]) => map.unchanged({ key, value }, depth + 1));

  return ['{', ...keys, `${buildIndent(depth)}  }`].join('\n');
};

const map = {
  unchanged: (node, depth) => `${buildIndent(depth)}  ${node.key}: ${stringify(node.value, depth, map)}`,
  updated: (node, depth) => [
    `${buildIndent(depth)}- ${node.key}: ${stringify(node.oldValue, depth, map)}`,
    `${buildIndent(depth)}+ ${node.key}: ${stringify(node.newValue, depth, map)}`,
  ],
  removed: (node, depth) => `${buildIndent(depth)}- ${node.key}: ${stringify(node.value, depth, map)}`,
  added: (node, depth) => `${buildIndent(depth)}+ ${node.key}: ${stringify(node.value, depth, map)}`,
  nested: (node, depth) => {
    const body = node.children.flatMap((child) => map[child.status](child, depth + 1)).join('\n');
    return `${buildIndent(depth)}  ${node.key}: {\n${body}\n${buildIndent(depth)}  }`;
  },
};

const format = (ast) => {
  const rows = ast.flatMap((node) => map[node.status](node, 1));
  return ['{', ...rows, '}'].join('\n');
};

export default format;
