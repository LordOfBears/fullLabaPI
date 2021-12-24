const { readFileSync, stat, writeFileSync, writeFile } = require('fs');

module.exports = new function(){
    const fileName = "./data.json";
    let data = {};
    let increment=0;
    this.create = dt=>{
        dt.Id = increment++;
        data[dt.Id]=dt;
        writeFile(fileName,JSON.stringify(data), err=>{if (err) console.error(err);});
        return dt;
    }
    this.getAll = () => {
        return Object.values(data);
    }
    this.get = id =>data[id];
    this.update = dt => {
        data[dt.Id] = dt;
        writeFile(fileName,JSON.stringify(data), err=>{if (err) console.error(err);});
        return dt;
    }
    this.delete = id => {
        delete data[id]
        writeFile(fileName,JSON.stringify(data), err=>{if (err) console.error(err);});
        return {remove: "done"}
    }

    stat(fileName,(err)=>{
        if(err && err.code==="ENOENT"){
            writeFileSync(fileName,"{}");
        }
        data = JSON.parse(readFileSync(fileName,{encoding:"UTF-8"}));
        for(let el in data){
            if(data[el].Id > increment) increment = data[el].Id;
        }
        increment++;
    })
}