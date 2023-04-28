const {handleError, fileEmpty, MSG_LINK_ERROR, MSG_LINK_NOT_FOUND} = require('../src/erro.js');

it('handleError deve retornar uma mensagem para link não encontrado', () => {
    const mensagem = handleError({
        code: 'ENOTFOUND',
    });
    expect(mensagem).toEqual(MSG_LINK_NOT_FOUND);
})
it('handleError deve retornar uma mensagem generica de erro no link', () => {
    const mensagem = handleError({});
    expect(mensagem).toEqual(MSG_LINK_ERROR);
})
it('fileEmpty deve retornar um erro quando um arquivo está vazio', () => {
    const file = 'qualquernome'
    const erro = fileEmpty(file)
    expect(erro.message).toEqual(expect.stringContaining(file));

})