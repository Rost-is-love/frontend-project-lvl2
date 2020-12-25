import program from 'commander';
import findDiff from './src/diff.js';

const genDiff = () => {
  program
    .version('0.0.1')
    .arguments('<filepath1> <filepath2>')
    .description('Compares two configuration files and shows a difference.')
    .option('-f, --format [type]', 'output format', 'stylish')
    .action((filepath1, filepath2) => {
      console.log(findDiff(filepath1, filepath2, program.format));
    });
  program.on('--help', () => {});
  program.parse(process.argv);
};

export default genDiff;
