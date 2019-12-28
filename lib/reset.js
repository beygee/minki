const commander = require('./commander')
const PetStatus = require('./modules/petstatus')
const Pet = require('./modules/pet')

commander.command('reset').action(() => {
  const pet = new Pet()
  pet.reset()
  pet.print('Reset Success!')
})
