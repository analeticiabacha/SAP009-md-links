const { read } = require('../src/readDir.js')
const { validate, getLinks } = require('../src/links.js');
const mdlinks = require('../src/mdlinks.js');

jest.mock('../src/readDir.js');
jest.mock('../src/links.js');

beforeEach(() => {
    jest.clearAllMocks();
});

describe('Função mdLinks', () => {
    it('deve validar os objetos de links' , () => {
      const mockRead = [{}, {}];
      read.mockResolvedValueOnce(mockRead);
      const mockGetLinks = [];
      getLinks.mockResolvedValueOnce(mockGetLinks);

      const pathFile = 'arquivoqualquer';
      return mdlinks(pathFile, {}).then(() => {
        expect(read).toHaveBeenCalledTimes(1);
        expect(read).toHaveBeenCalledWith(pathFile);
        expect(getLinks).toHaveBeenCalledTimes(2);
      });
    });
});
