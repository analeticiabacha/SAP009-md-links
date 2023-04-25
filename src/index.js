// const fs = require("fs");
const { fileEmpty, handleError } = require('./erro.js');
const { read }  = require("./readDir.js");

function getLinks(fileData) {
  return new Promise((resolve) => {
    const textFile = fileData.data;
    const defaultRegex = /\[([^[\]]*?)\]\((https?:\/\/[^\s?#.].[^\s]*)\)/gm;
    const searchLinks = textFile.match(defaultRegex);
    if (searchLinks !== null) {
      const linksArray = searchLinks.map((link) => {
        const removeItens = link.replace(/.$/, "").replace(/^./, "");
        const splitItens = removeItens.split("](");
        const newObject = {
          href: splitItens[1],
          text: splitItens[0],
          file: fileData.file,
        };
        return newObject;
      });
      resolve(linksArray);
    } else {
      fileEmpty('Não há links nesse arquivo!', fileData.file);
    }
  });
}

function validate (arrObjsLinks){
  return Promise.all(arrObjsLinks.map((eachObj) => {
      return fetch(eachObj.href)
        .then((result) => {
          // eslint-disable-next-line
          const newObjFetch = {...eachObj, status: result.status, ok: result.ok};
          return newObjFetch;
        })
        .catch((err) => ({...eachObj, status: handleError(err), ok: false }));
    })
  );
}

function mdLinks(pathFile, options) {
  return new Promise((resolve) => {
    read(pathFile).then((fileContent) => {
      console.log(fileContent)
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
        });
      } else {
        fileContent.forEach((objContent) => {
          getLinks(objContent).then((linksObj) => {
            resolve(linksObj);
          });
        });
      }
    });
  });
}
module.exports = mdLinks;
