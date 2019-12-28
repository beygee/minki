const commander = require("./commander");
const PetStatus = require('./modules/petstatus')

commander.command("rename <name>").action(name => {
  const petStatus = new PetStatus()
  petStatus.set("name", name)
});
