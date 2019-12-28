'use strict'
//커맨더 실행 도구
const commander = require('./commander')

const pkg = require('../package.json')

const Pet = require('./modules/pet')
const PetFile = require('./modules/petfile')
const PetStatus = require('./modules/petstatus')

commander.version(pkg.version)

// 명령어 호출
require('./rename')
require('./feed')
require('./init')

//명령어 예외 처리
commander.command('*').action(function() {
  console.log('예약되지않은 명령어입니다.')
  // console.log(cst.PREFIX_MSG_ERR + chalk.bold("Command not found\n"));
  // displayUsage();
  // process.exit(cst.ERROR_EXIT);
})

commander.parse(process.argv)

//아무 인자도 입력하지 않았다면
if (process.argv.length === 2) {
  function start(count) {
    const petStatus = new PetStatus()
    let { level, exp, hunger } = petStatus.getData()
    const petFile = PetFile.build(`level${level}`)
    const pet = new Pet(petFile, petStatus)

    //저장된 시간에서 현재시각의 차를 구한다.
    const currentTime = new Date().getTime()
    const prevTime = petStatus.get('timestamp') || currentTime
    const diffSec = Math.round((currentTime - prevTime) / 1000)

    petStatus.set('timestamp', currentTime)

    // 시간이 지난 만큼 경험치 상승, 포만감 하락
    petStatus.set('exp', exp + diffSec)
    petStatus.set('hunger', Math.max(hunger - diffSec, 0))

    // pet.print("Merry Christmas!");
  }
  start()
}

commander.on('--help', function() {
  console.log('')
  console.log('Examples:')
  console.log('  $ custom-help --help')
  console.log('  $ custom-help -h')
})
