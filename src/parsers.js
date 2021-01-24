import yaml from 'js-yaml';

export default (data, dataType) => {
  switch (dataType) {
    case 'json':
      return JSON.parse(data);
    case 'yml':
    case 'yaml':
      return yaml.safeLoad(data);
    default:
      throw new Error('The calculator only works with JSON and yaml formats');
  }
};
