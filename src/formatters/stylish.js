import _ from 'lodash';

const defaultPrefix = '    ';

const prefixes = {
  unchanged: '    ',
  removed: '  - ',
  added: '  + ',
};

const objToString = (obj, prefix, depth) => {
  const keys = Object.keys(obj);
  const currentIndent = defaultPrefix.repeat(depth);
  const bracketIndent = defaultPrefix.repeat(depth);

  const result = keys.flatMap((key) => ((_.isPlainObject(obj[key]))
    ? [
      `${currentIndent}${key}: {`,
      objToString(obj[key], prefix, depth + 1).join('\n'),
      `${bracketIndent}}`,
    ].join('\n')
    : `${currentIndent}${key}: ${obj[key]}`));
  return result;
};

const buildRows = (node, prefix, depth, value = 'value') => {
  const currentIndent = `${defaultPrefix.repeat(depth - 1)}${prefix}`;
  const bracketIndent = defaultPrefix.repeat(depth);
  return _.isPlainObject(node[value])
    ? [
      `${currentIndent}${node.key}: {`,
      objToString(node[value], prefix, depth + 1).join('\n'),
      `${bracketIndent}}`,
    ].join('\n')
    : `${currentIndent}${node.key}: ${node[value]}`;
};

const map = {
  unchanged: (node, depth) => buildRows(node, prefixes.unchanged, depth),
  updated: (node, depth) => [
    buildRows(node, prefixes.removed, depth, 'oldValue'),
    buildRows(node, prefixes.added, depth, 'newValue'),
  ],
  removed: (node, depth) => buildRows(node, prefixes.removed, depth),
  added: (node, depth) => buildRows(node, prefixes.added, depth),
  nested: (node, depth) => [
    `${defaultPrefix.repeat(depth)}${node.key}: {`,
    node.children.flatMap((child) => map[child.status](child, depth + 1)).join('\n'),
    `${defaultPrefix.repeat(depth)}}`,
  ],
};

const format = (data) => ['{', ...data.flatMap((node) => map[node.status](node, 1)), '}'].join('\n');

export default format;
