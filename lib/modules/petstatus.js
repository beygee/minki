const path = require("path");
const stat = require("../stat.json");
const jsonfile = require("jsonfile");

class status {
  constructor() {
    this.exp = stat.exp;
    this.level = stat.level;
    this.hunger = stat.hunger;
  }

  get(key) {
    switch (key) {
      case "exp":
        return this.exp;
      case "level":
        return this.level;
      case "hunger":
        return this.hunger;
      case "name":
        return this.name;
    }
  }

  set(key, value) {
    switch (key) {
      case "exp":
        this.exp = value;
        var obj = {
          exp: this.exp,
          level: this.level,
          hunger: this.hunger,
          name: this.name
        };
        break;
      case "level":
        this.level = value;
        var obj = {
          exp: this.exp,
          level: this.level,
          hunger: this.hunger,
          name: this.name
        };
        break;
      case "hunger":
        this.hunger = value;
        var obj = {
          exp: this.exp,
          level: this.level,
          hunger: this.hunger,
          name: this.name
        };
        break;
      case "name":
        this.name = value;
        var obj = {
          exp: this.exp,
          level: this.level,
          hunger: this.hunger,
          name: this.name
        };
        break;
    }

    jsonfile.writeFile(path.resolve(__dirname, "stat.json"), obj, function(
      err
    ) {
      if (err) console.error(err);
    });
  }
}
module.exports = status;
