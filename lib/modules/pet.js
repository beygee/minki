const os = require('os')

const PetFile = require('./petfile')
const PetStatus = require('./petstatus')

//텍스트에 박스 치는 모듈
const boxen = require('boxen')

//터미널 CLI 편의성 도구
const term = require('terminal-kit').terminal

const chalk = require('chalk')

const { printTo, printLolcatTo } = require('../helper')

class Pet {
  constructor() {
    const petStatus = new PetStatus(this)
    this.petStatus = petStatus
    petStatus.updateTimestamp()

    const petFile = PetFile.build(petStatus.getLevel())
    this.petFile = petFile
  }

  print(message, bAnimateMessage = false) {
    const CONTENT_HEIGHT = Math.min(
      Math.max(this.petFile.originalHeight - 9, 0),
      5
    )

    //터미널 초기화
    term.reset()

    //유저 정보 가져오기
    const userInfo = os.userInfo()

    //상태 변수 가져오기
    const level = this.petStatus.getLevel()
    const exp = this.petStatus.getExp()
    const hunger = this.petStatus.getHunger()
    const name = this.petStatus.getName()

    //Status 정보
    const statusLeftMargin = this.petFile.width + 5
    const statusPrinter = new StatusPrinter(statusLeftMargin, CONTENT_HEIGHT)
    statusPrinter.print(
      boxen(
        chalk.white.bold(`${userInfo.username}'s ${chalk.yellow.bold(name)}`),
        { padding: 1 }
      ),
      6
    )

    statusPrinter.print(chalk.red(`${userInfo.username}@${os.hostname}`))

    statusPrinter.print(
      `Hello! ${chalk.yellow(`Today is ${new Date().toLocaleString()}`)}`,
      2
    )

    statusPrinter.print(
      boxen(chalk.green.bold('STATUS'), {
        padding: { left: 1, right: 1 },
        borderColor: 'green'
      }),
      4
    )

    statusPrinter.print(this._getStatusStr('Level', level))
    statusPrinter.print(
      this._getStatusStr('Exp', `${exp}/${this.petStatus.getMaxExp()}`)
    )
    statusPrinter.print(this._getStatusStr('Hunger', `${hunger}/10`), 2)

    statusPrinter.print(
      boxen(chalk.yellow.bold('USAGE'), {
        padding: { left: 1, right: 1 },
        borderColor: 'yellow'
      }),
      4
    )

    statusPrinter.print(
      this._getStatusStr('UP TIME', this._getUpTime(), chalk.yellow)
    )
    statusPrinter.print(
      this._getStatusStr(
        'MEM USAGE',
        `${Math.round(
          (os.totalmem() - os.freemem()) / (1024 * 1024)
        )}MB/${Math.round(os.totalmem() / (1024 * 1024))}MB`,
        chalk.yellow
      )
    )

    //고양이 그림
    printLolcatTo(0, CONTENT_HEIGHT, this.petFile.src)

    //말풍선
    if (message) {
      term.saveCursor()
      printTo(
        Math.round(this.petFile.width / 2 - message.length / 2),
        CONTENT_HEIGHT + 2 + Math.floor((9 - this.petFile.originalHeight) / 2),
        boxen(message, { padding: { left: 1, right: 1 } })
      )

      if (bAnimateMessage) {
        process.stdout.cursorTo(
          Math.round(this.petFile.width / 2 - message.length / 2) + 2,
          CONTENT_HEIGHT +
            2 +
            Math.floor((9 - this.petFile.originalHeight) / 2) +
            1
        )

        term.slowTyping(
          message,
          { flashStyle: term.brightWhite, delay: 35 },
          function() {
            term.restoreCursor()
          }
        )
      } else {
        term.restoreCursor()
      }
    }
  }

  levelUp() {
    this.petFile = PetFile.build(this.petStatus.getLevel())
  }

  _getStatusStr(key, value, chalkColor = chalk.green) {
    return chalkColor(`[${key}] `) + chalk.white(value)
  }

  _getUpTime() {
    const uptime = os.uptime()
    const days = Math.floor(uptime / (3600 * 24))
    const hours = Math.floor((uptime / 3600) % 24)
    const minutes = Math.floor((uptime / 60) % 60)
    const seconds = uptime % 60

    if (uptime < 60) return `${seconds}S`

    if (uptime < 3600) return `${minutes}M ${seconds}S`

    if (uptime < 3600 * 24) return `${hours}H ${minutes}M ${seconds}S`

    return `${days}D ${hours}H ${minutes}M ${seconds}S`
  }

  reset() {
    this.petStatus.reset()
  }

  rename(name) {
    this.petStatus.rename(name)
  }

  feed(amount) {
    return this.petStatus.feed(amount)
  }
}

//펫 그림 우측 상태 프린트 헬퍼 클래스
class StatusPrinter {
  constructor(leftMargin, contentHeight) {
    this.leftMargin = leftMargin
    this.contentHeight = contentHeight
    this.printLine = 0
  }

  print(str, line = 1) {
    printTo(this.leftMargin, this.contentHeight + this.printLine, str)
    this.printLine += line
  }
}

module.exports = Pet
