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

    it('deve chamar a função que valida os links recebidos', () => {
      const mockRead = {};
      read.mockResolvedValueOnce(mockRead);
      const mockGetLinks = [];
      getLinks.mockResolvedValueOnce(mockGetLinks);
      const mockValidate = [{}, {}];
      validate.mockResolvedValueOnce(mockValidate);

      const pathFile = 'arquivoqualquer';
      return mdlinks(pathFile, {validate: true}).then(() => {
        expect(read).toHaveBeenCalledTimes(1);
        expect(read).toHaveBeenCalledWith(pathFile);
        expect(getLinks).toHaveBeenCalledTimes(1);
        expect(getLinks).toHaveBeenCalledWith(mockRead);
        expect(validate).toHaveBeenCalledTimes(1);
      });
    });

    it('deve resolver a promessa', () => {
      const mockRead = {};
      read.mockResolvedValueOnce(mockRead);
      const mockGetLinks = [];
      getLinks.mockResolvedValueOnce(mockGetLinks);
      const pathFile = 'arquivoqualquer';

      return mdlinks(pathFile, {validate: false}).then(() => {
        expect(read).toHaveBeenCalledTimes(1);
        expect(read).toHaveBeenCalledWith(pathFile);
        expect(getLinks).toHaveBeenCalledTimes(1);
        expect(getLinks).toHaveBeenCalledWith(mockRead);
        expect(validate).not.toHaveBeenCalled();
    });
  })
});
