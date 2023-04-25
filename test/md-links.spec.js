const { read } = require('../src/readDir.js')

jest.mock(read);

beforeEach(() => {
    jest.clearAllMocks();
});

describe('Função mdLinks', () => {
    it('deve verificar se é um array' , () => {
        
        const path = './arquivoteste';
        const options = {
            validate: true,
        }
        expect(read).toHaveBeenCalledTimes(1);
    })
    it('deve chamar a função read' , () => {
        
        const path = './arquivoteste';
        const options = {
            validate: true,
        }
        expect(read).toHaveBeenCalledTimes(1);
    })
});

