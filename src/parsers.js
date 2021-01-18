import yaml from 'js-yaml';

export default (data, format) => {
  if (format === '' || format === '.json') {
    return JSON.parse(data);
  }
  if (format === '.yml') {
    return yaml.safeLoad(data);
  }

  throw new Error('The calculator only works with JSON and yaml formats');
};
