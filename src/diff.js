import _ from 'lodash';
import getData from './modules/parsers.js';

const findDiff = (filepath1, filepath2) => {
  const obj1 = getData(filepath1);
  const obj2 = getData(filepath2);

  const iter = (data1, data2, depth, sort = true) => {
    if (data1 === null) {
      return data1;
    }
    if (!_.isObject(data1)) {
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
        if (_.isObject(data2, key)) {
          return [
            ...acc,
            `${currentIndent}${plusSign} ${key}: ${iter(data2[key], {}, depth + 4, false)}`,
          ];
        }
        return [...acc, `${currentIndent}  ${key}: ${iter(data2[key])}`];
      }
      if (!_.has(data2, key)) {
        if (_.isObject(data1, key)) {
          return [
            ...acc,
            `${currentIndent}${minusSign} ${key}: ${iter(data1[key], {}, depth + 4, false)}`,
          ];
        }
        return [...acc, `${currentIndent}  ${key}: ${iter(data1[key])}`];
      }
      if (_.isObject(data1[key]) && _.isObject(data2[key])) {
        return [...acc, `${currentIndent}  ${key}: ${iter(data1[key], data2[key], depth + 4)}`];
      }
      if (data1[key] === data2[key]) {
        return [...acc, `${currentIndent}  ${key}: ${iter(data1[key])}`];
      }
      return [
        ...acc,
        `${currentIndent}${minusSign} ${key}: ${iter(data1[key], {}, depth + 4, false)}`,
        `${currentIndent}${plusSign} ${key}: ${iter(data2[key], {}, depth + 4, false)}`,
      ];
    }, []);

    return ['{', ...diff, `${bracketIndent}}`].join('\n');
  };

  const result = iter(obj1, obj2, 4);
  console.log(result);
  return result;
};

export default findDiff;
