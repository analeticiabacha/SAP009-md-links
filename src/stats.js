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

module.exports = stats;