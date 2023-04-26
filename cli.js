#!/usr/bin/env node
const mdLinks = require('./src/index.js');
const chalk = require('chalk');
const stats  = require('./src/links.js');
const typedPath = process.argv[2];
const options = {
  validate: process.argv.includes('--validate'),
  stats: process.argv.includes('--stats'),
};

function showValidate(answer){
  answer.forEach((itemObj) => {
      let output = '';
      let icon = '';
      let link = '';

      if (itemObj.ok === true) {
        output = chalk.black.bold.underline('OK');
        icon = chalk.red('\u2764');
        link = chalk.magenta(itemObj.file);
      } else {
        output = chalk.red('FAIL');
        icon = chalk.red('\u2717');
        link = chalk.gray(itemObj.file);
      }
      console.log(
        icon + ' ' + link + ' ' + chalk.gray.bold(itemObj.href) + ' ' + output + ' ' +
          chalk.blackBright.bold(itemObj.status) + ' ' + chalk.magenta(itemObj.text)
      );
    });
}

function showStats(answer){
  stats(answer)
  .then((objStats) => { 
    console.log(chalk.red('\u2764') + ' ' + chalk.magenta(' Total: ') + objStats.total);
    console.log(chalk.red('\u2764') + ' ' + chalk.magenta(' Unique: ') + objStats.unique);
    if (process.argv[4] === '--validate'){
      console.log(chalk.red('\u2764') + ' ' + chalk.magenta(' Broken: ') + objStats.broken);
    }
  })
}

function showLinksFile(answer){
  answer.forEach((itemObj) => {
    console.log(
      chalk.red('\u2764') +' ' + chalk.magenta(itemObj.file) +' ' +chalk.gray(itemObj.href) 
      + ' ' + chalk.magenta(itemObj.text)
    );
  });
}

mdLinks(typedPath, options)
  .then((answer) => {
    if (options.stats) {
      showStats(answer);
      
    } else if (options.validate) {
      showValidate(answer);

    } else if (!options.validate) {
      showLinksFile(answer);
    }
  })
  .catch((erro) => {
    if (erro.code === 'ENOENT') {
    }
    console.log(erro.message);
  });