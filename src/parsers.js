import yaml from 'js-yaml';

export default (data, dataType) => ((dataType === 'json') ? JSON.parse(data) : yaml.safeLoad(data));
