const commander = require('./commander')
const Pet = require('./modules/pet')

//---------------- scripts-------------------
const messages = [
  'Hello, Boy.',
  'You are my Everything.',
  'Go to the Blue.',
  'I can Shoot!!!!',
  'Stop 90 Thousand!',
  'kui Chan A',
  'MINKI ZZANG',
  'I like Apple.',
  'GRRRRRRRRRRRRR',
  'MUNG MUNG!!!!'
]
//-------------------------------------------

commander.command('feed [amount]').action(amount => {
  const pet = new Pet()
  
  pet.feed(parseInt(amount))

  // 출력
  const randIndex = parseInt(Math.random() * messages.length)
  pet.print(messages[randIndex], true)
})
