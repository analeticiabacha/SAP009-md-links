const { read } = require('../src/readDir.js')

jest.mock(read);

beforeEach(() => {
    jest.clearAllMocks();
});

describe('Função mdLinks', () => {
    it('deve verificar se é um array' , () => {

      mockData = 'Conteúdo do arquivo' 

      mockResultRead = [{
        file: './arquivoTeste',
        data: mockData
      }]

      jest.mock(read, () => mockResultRead );

      read.mockResolvedValue(mockResultRead)

        const path = './folder';
        const options = {
            validate: true,
        }
        const resultado =  [
           {
          href: 'https://www.link.com',
          text: 'Texto qualquer',
          file: 'folder\\FILE.md'
        }
      ]

        return mdLinks(path, options).then(result=>{

          expect(result).toEqual(resultado);
          expect(read).toHaveBeenCalledTimes(1);
          expect(read).toHaveBeenCalledWith(path);
          

        })
        
    })

    it('deve chamar a função read' , () => {
        
        const path = './arquivoteste';
        const options = {
            validate: true,
        }
        expect(read).toHaveBeenCalledTimes(1);
    })
});
