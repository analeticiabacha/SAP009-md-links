const { read }  = require("./readDir.js");
const { getLinks, validate } = require('./links.js')
;
function mdLinks(pathFile, options) {
  return new Promise((resolve, reject) => {
    read(pathFile).then((fileContent) => {
      
      if (!Array.isArray(fileContent)) {
        getLinks(fileContent).then((linksObj) => {
          if (!options.validate) {
            resolve(linksObj);
          } else {
            validate(linksObj)
            .then((linksArrayFetchResult) => {
              resolve(linksArrayFetchResult);
            });
          }
        }).catch(reject);
      } else {
        fileContent.forEach((objContent) => {
          getLinks(objContent).then((linksObj) => {
            resolve(linksObj);
          }).catch(reject);
        });
      }
    }).catch(reject);
  });
}
module.exports = mdLinks;
