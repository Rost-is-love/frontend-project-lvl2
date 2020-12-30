import _ from 'lodash';

const format = (data1, data2, depth = 4, sort = true) => {
  if (data1 === null) {
    return data1;
  }
  if (!_.isPlainObject(data1)) {
    return data1.toString();
  }

  let plusSign = ' ';
  let minusSign = ' ';
  const keys = _.union(_.keys(data1), _.keys(data2));
  if (sort === true) {
    keys.sort();
    plusSign = '+';
    minusSign = '-';
  }
  const replacer = ' ';
  const currentIndent = replacer.repeat(depth - 2);
  const bracketIndent = replacer.repeat(depth - 4);

  const diff = keys.reduce((acc, key) => {
    if (!_.has(data1, key)) {
      return [
        ...acc,
        `${currentIndent}${plusSign} ${key}: ${format(data2[key], {}, depth + 4, false)}`,
      ];
    }
    if (!_.has(data2, key)) {
      return [
        ...acc,
        `${currentIndent}${minusSign} ${key}: ${format(data1[key], {}, depth + 4, false)}`,
      ];
    }
    if (_.isObject(data1[key]) && _.isObject(data2[key])) {
      return [...acc, `${currentIndent}  ${key}: ${format(data1[key], data2[key], depth + 4)}`];
    }
    if (data1[key] === data2[key]) {
      return [...acc, `${currentIndent}  ${key}: ${format(data1[key])}`];
    }
    return [
      ...acc,
      `${currentIndent}${minusSign} ${key}: ${format(data1[key], {}, depth + 4, false)}`,
      `${currentIndent}${plusSign} ${key}: ${format(data2[key], {}, depth + 4, false)}`,
    ];
  }, []);

  return ['{', ...diff, `${bracketIndent}}`].join('\n');
};

export default format;
