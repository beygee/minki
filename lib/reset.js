const commander = require("./commander");
const PetStatus = require('./modules/petstatus')
const Pet = require('./modules/pet')

commander.command("reset").action(() => {
    const petstatus = new PetStatus()
    petstatus._reset()
    const pet = new Pet()
    pet.print("Reset Success!")
  });