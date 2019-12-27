"use strict";

var commander = require("commander");
var pkg = require("../package.json");

commander
  .version(pkg.version)
  .arguments("<count>")
  .option("-u, --username <username>", "beygee")
  .action(function(count) {
    console.log("count:", count);
    console.log(count)
  })
  .parse(process.argv);
