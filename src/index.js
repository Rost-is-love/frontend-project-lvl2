import program from 'commander';

export default () => {
  program.version('0.0.1').description('Compares two configuration files and shows a difference.');
  program.on('--help', () => {});
  program.parse(process.argv);
};
