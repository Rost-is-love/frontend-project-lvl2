import _ from 'lodash';

const defaultPrefix = '    ';

const prefixes = {
  outdated: '    ',
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

const buildRows = (obj, prefix, depth, value = 'value') => {
  const currentIndent = `${defaultPrefix.repeat(depth - 1)}${prefix}`;
  const bracketIndent = defaultPrefix.repeat(depth);
  return _.isPlainObject(obj[value])
    ? [
      `${currentIndent}${obj.key}: {`,
      objToString(obj[value], prefix, depth + 1).join('\n'),
      `${bracketIndent}}`,
    ].join('\n')
    : `${currentIndent}${obj.key}: ${obj[value]}`;
};

const getFunc = {
  outdated: (obj, depth) => buildRows(obj, prefixes.outdated, depth),
  updated: (obj, depth) => [
    buildRows(obj, prefixes.removed, depth, 'oldValue'),
    buildRows(obj, prefixes.added, depth, 'curValue'),
  ],
  removed: (obj, depth) => buildRows(obj, prefixes.removed, depth),
  added: (obj, depth) => buildRows(obj, prefixes.added, depth),
  nested: (obj, depth) => [
    `${defaultPrefix.repeat(depth)}${obj.key}: {`,
    obj.children.flatMap((child) => getFunc[child.status](child, depth + 1)).join('\n'),
    `${defaultPrefix.repeat(depth)}}`,
  ],
};

const format = (data) => ['{', ...data.flatMap((obj) => getFunc[obj.status](obj, 1)), '}'].join('\n');

export default format;
