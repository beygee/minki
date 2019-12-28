const commander = require('./commander')
const PetStatus = require('./modules/petstatus')
const Pet = require('./modules/pet')

commander.command('rename <name>').action(name => {
  const pet = new Pet()
  pet.rename(name)
  pet.print('Rename Success!')
})
