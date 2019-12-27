const stat = require('../stat.json');
const stat2 = './stat.json';
const jsonfile = require('jsonfile');

class status {
    constructor(exp, level, hunger){
        this.exp = stat.exp;
        this.level = stat.level;
        this.hunger = stat.hunger;
    }
    
    show(what_stat){
        switch (what_stat){
            case "exp" :
                return this.exp;
            case "level" :
                return this.level;
            case "hunger" :
                return this.hunger;
            case "name" :
                return this.name;
        }
    }
    
    set(what_stat, value){
        switch (what_stat){
            case "exp" :
                this.exp = value;
                var obj = { exp: this.exp, level: this.level, hunger: this.hunger, name: this.name};
                break;
            case "level" :
                this.level = value;
                var obj = { exp: this.exp, level: this.level, hunger: this.hunger, name: this.name};
                break;
            case "hunger" :
                this.hunger = value;
                var obj = { exp: this.exp, level: this.level, hunger: this.hunger, name: this.name};
                break;
            case "name" :
                this.name = value;
                var obj = { exp: this.exp, level: this.level, hunger: this.hunger, name: this.name};
                break;
        }
        jsonfile.writeFile(stat2, obj, function (err) {
            if (err) console.error(err)
          });   
    }
};
module.exports = status;