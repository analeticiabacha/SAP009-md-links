const { validate, getLinks, stats } = require('../src/links.js');
const { fileEmpty, handleError } = require('../src/erro.js');
const fetch = jest.spyOn(global, 'fetch').mockImplementation();


describe('Função validate', () => {

  it('deve validar os links recebidos', () => {
    const result = {
        status: 200,
        ok: true,
    }
    fetch.mockResolvedValueOnce(result);
    fetch.mockResolvedValueOnce(result);
    const arrayLinks = [
      {
        href: 'https://github.com',
        text: 'Link',
        file: './folder/FILE.md'
      },
      {
        href: 'https://google.com',
        text: 'Link',
        file: './folder/FILE.md',
      }
    ]

    const resultado = [
      {
        href: 'https://github.com',
        text: 'Link',
        file: './folder/FILE.md',
        status: 200,
        ok: true
      },
      {
        href: 'https://google.com',
        text: 'Link',
        file: './folder/FILE.md',
        status: 200,
        ok: true
      }
    ]
    
    return validate(arrayLinks).then(result => {
      expect(result).toEqual(resultado);
      expect(fetch).toHaveBeenCalledTimes(2);
      expect(fetch).toHaveBeenCalledWith(arrayLinks[0].href);
      expect(fetch).toHaveBeenCalledWith(arrayLinks[1].href);
    })

  });
  it('deve disparar um erro, caso não seja possivel acessar o link', () => {
    const error = {}
    fetch.mockRejectedValueOnce(error)
    const link = {
          href: 'https://google.com',
          text: 'Link',
          file: './folder/FILE.md',
        }
    const erro = {
        ...link, 
        status: handleError(error),
        ok: false,
    }
    return expect(validate([link])).resolves.toEqual([erro]);
  })

});

describe('Função getLinks', ()=>{
  it('deve receber o conteúdo do arquivo e retornar um array de objetos dos links ', ()=>{
    const mockContent = 'qualquer string com links md: [Link](https://google.com)';
    const objRecebido = {
      file: './folder/FILE.md',
      data: mockContent,
    }

    const resultado = [
      { 
        href: 'https://google.com', 
        text: 'Link', 
        file: './folder/FILE.md' 
      }
    ]
    return getLinks(objRecebido).then(result => {
      expect(result).toEqual(resultado)
    })
  })
  it('Deve disparar uma mensagem de erro, caso o arquivo esteja vazio', () => {
    const objRecebido = {
        file: './folder/FILE.md',
        data: '',
      }
      return expect(getLinks(objRecebido)).rejects.toEqual(fileEmpty(objRecebido.file));
  })
})


describe('Função stats', ()=>{

  it('deve devolver um objeto com as estatisticas dos links ', ()=>{
    const arrayLinks = [
      {
        href: 'https://github.com',
        text: 'Link',
        file: './folder/FILE.md'
      },
      {
         href: 'https://google.com',
        text: 'Link',
        file: './folder/FILE.md',
      }
    ]

    const resultado = 
      { 
        total: 2,
        unique: 2,
        broken: 0,
      }
    
    return stats(arrayLinks).then(result => {
      expect(result).toEqual(resultado)
    })
  })

  it('deve devolver um objeto com as estatisticas dos links + os links quebrados', ()=>{
    const arrayLinks = [
      {
        href: 'https://github.com/jsdom/jsdom',
        text: 'JSDOM',
        file: './readme.md',
        status: 200,
        ok: true
      },
      {
        href: 'https://github.com/cheeriojs/cheerio)',
        text: 'Cheerio',
        file: './readme.md',
        status: 404,
        ok: false
      }
    ]

    const resultado = 
      { 
        total: 2,
        unique: 2,
        broken: 1,
      }
    
    return stats(arrayLinks).then(result => {
      expect(result).toEqual(resultado)
    })
  })
})