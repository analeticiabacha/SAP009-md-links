const { fileEmpty, handleError } = require('./erro.js');

function stats (answer){
    return new Promise((resolve) => {
        let linksList = [];
        let broken = 0;
        answer.forEach((itemObj) => {
        if (itemObj.ok === false) {
            broken++;
        }
        linksList.push(itemObj.href);
        });
        let mySet = new Set(linksList);
        const objStats = { 
            total: linksList.length,
            unique: mySet.size, 
            broken,
        }
        resolve(objStats);
    });
}

function validate (arrObjsLinks){
    console.log(arrObjsLinks);
    return Promise.all(arrObjsLinks.map((eachObj) => {
        return fetch(eachObj.href)
          .then((result) => {
            const newObjFetch = {...eachObj, status: result.status, ok: result.ok};
            return newObjFetch;
          })
          .catch((err) => ({...eachObj, status: handleError(err), ok: false }));
      })
    );
  }

  function getLinks(fileData) {
    return new Promise((resolve, reject) => {
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
        reject(fileEmpty(fileData.file));
      }
    });
  }

module.exports = { stats, getLinks, validate };
