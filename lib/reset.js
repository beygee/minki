const commander = require('./commander')
const PetStatus = require('./modules/petstatus')
const Pet = require('./modules/pet')

commander.command('reset').action(() => {
  const pet = new Pet()
  pet.reset()

  // shelljs 로 실행시 프린트 하지 않게
  if (process.stdout.cursorTo) pet.print('Reset Success!')
})
