#!/usr/bin/env node

import program from 'commander';

/* program
  .name('gendiff')
  .version('0.0.1')
  .description('Compares two configuration files and shows a difference.')
  .option("-h, --help", "output usage information")

program.on('--help', () => {
  console.log('sdcsdc');
  console.log('Example call:');
  console.log('  $ custom-help --help');
});

program.parse(process.argv); */

program
  .version('0.0.1')
  .description('Compares two configuration files and shows a difference.')

program.on('--help', () => {});

program.parse(process.argv);
