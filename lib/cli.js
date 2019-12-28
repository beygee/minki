'use strict'
//커맨더 실행 도구
const commander = require('./commander')

const pkg = require('../package.json')

const Pet = require('./modules/pet')

commander.version(pkg.version)

// 명령어 호출
require('./rename')
require('./feed')
require('./init')

//명령어 예외 처리
commander.on('command:*', function() {
  console.log('예약되지않은 명령어입니다.')
})

commander.parse(process.argv)

//아무 인자도 입력하지 않았다면
if (process.argv.length === 2) {
  function start(count) {
    const pet = new Pet()
    pet.print('Hello')
  }
  start()
}
