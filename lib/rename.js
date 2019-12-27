const commander = require("./commander");

commander.command("rename <name>").action(name => {
  console.log(name);
});
