"use strict";

var commander = require("commander");
var pkg = require("../package.json");
const ver = require('../lib/ver');

commander
  .command('clone [destination]')  
  .description('clone a repository into a newly created directory')
  .version(pkg.version)
  .arguments("<count>")
  .option('-v, --version', 'show version', ver, '')
  .option("-u, --username <username>", "beygee")
  .action(function(count) {
    console.log("count:", count);
    console.log(count);
    console.log("name is", commander.username)
  })
  .parse(process.argv);

commander.on('--help', function(){
  console.log('')
  console.log('Examples:');
  console.log('  $ custom-help --help');
  console.log('  $ custom-help -h');
});
  
