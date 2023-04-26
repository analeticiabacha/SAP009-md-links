
const chalk = require('chalk');

const MSG_EMPTY_FILE = 'Não há links nesse arquivo!';
const ERROR_FILE_NOT_MD = new Error('O arquivo fornecido não é .md');

function handleError(err){
    if (err.code === 'ENOTFOUND') {
        const msgError = 'Link não encontrado!';
        return msgError;
    } else {
        const msgError = 'Erro no link!';
        return msgError;
    }
}

function fileEmpty(file){
    const msg = chalk.red('\u2717') + ' ' + chalk.grey(file) + ': ' + chalk.red(MSG_EMPTY_FILE);
    const erro = new Error(msg);
    return erro;
}

module.exports = { handleError, fileEmpty, ERROR_FILE_NOT_MD };