
const chalk = require('chalk');

function handleError(err){
    if (err.code === 'ENOTFOUND') {
        const msgError = 'Link não encontrado!';
        return msgError;
    } else {
        const msgError = 'Erro no link!';
        return msgError;
    }
}

function fileEmpty(mensagem, file){
    console.log(chalk.red('\u2717') + ' ' + chalk.grey(file) + ': ' + chalk.red(mensagem));
}

module.exports = { handleError, fileEmpty };