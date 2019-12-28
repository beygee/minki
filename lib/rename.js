const commander = require("./commander");
const PetStatus = require('./modules/petstatus')
const Pet = require('./modules/pet')

commander.command("rename <name>").action(name => {
  const petstatus = new PetStatus()
  petstatus._rename(name)
  const pet = new Pet()
  pet.print("Rename Success!")
});
