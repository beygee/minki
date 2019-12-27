const os = require("os");

//텍스트에 박스 치는 모듈
const boxen = require("boxen");

//터미널 CLI 편의성 도구
const term = require("terminal-kit").terminal;

const chalk = require("chalk");

const { printTo, printLolcatTo } = require("../helper");

class Pet {
  constructor(petfile, petstatus) {
    this.petfile = petfile;
  }

  print(message) {
    const CONTENT_HEIGHT = Math.min(
      Math.max(this.petfile.originalHeight - 9, 0),
      7
    );

    //터미널 초기화
    term.reset();

    //유저 정보 가져오기
    const userInfo = os.userInfo();

    //Status 정보
    const statusLeftMargin = this.petfile.width + 5;
    const statusPrinter = new StatusPrinter(statusLeftMargin, CONTENT_HEIGHT);
    statusPrinter.print(
      boxen(
        chalk.white.bold(
          `${userInfo.username}'s ${chalk.yellow.bold("minki")}`
        ),
        { padding: 1 }
      ),
      6
    );

    statusPrinter.print(chalk.red(`${userInfo.username}@${os.hostname}`));

    statusPrinter.print(
      `Hello! ${chalk.yellow(`Today is ${new Date().toLocaleString()}`)}`,
      2
    );

    statusPrinter.print(
      boxen(chalk.green.bold("STATUS"), {
        padding: { left: 1, right: 1 },
        borderColor: "green"
      }),
      4
    );

    statusPrinter.print(this._getStatusStr("Level", "3"));
    statusPrinter.print(this._getStatusStr("Exp", "10/20"));
    statusPrinter.print(this._getStatusStr("Hunger", "3.2/10"), 2);

    statusPrinter.print(
      boxen(chalk.yellow.bold("USAGE"), {
        padding: { left: 1, right: 1 },
        borderColor: "yellow"
      }),
      4
    );

    statusPrinter.print(
      this._getStatusStr("UP TIME", this._getUpTime(), chalk.yellow)
    );
    statusPrinter.print(
      this._getStatusStr(
        "MEM USAGE",
        `${Math.round(
          (os.totalmem() - os.freemem()) / (1024 * 1024)
        )}MB/${Math.round(os.totalmem() / (1024 * 1024))}MB`,
        chalk.yellow
      )
    );

    //고양이 그림
    printLolcatTo(0, CONTENT_HEIGHT, this.petfile.src);

    term.saveCursor();

    //말풍선
    if (message) {
      printTo(
        Math.round(this.petfile.width / 2 - message.length / 2),
        CONTENT_HEIGHT + 2 + Math.floor((9 - this.petfile.originalHeight) / 2),
        boxen(message)
      );
    }

    term.restoreCursor();
  }

  _getStatusStr(key, value, chalkColor = chalk.green) {
    return chalkColor(`[${key}] `) + chalk.white(value);
  }

  _getUpTime() {
    const uptime = os.uptime();
    const days = Math.floor(uptime / (3600 * 24));
    const hours = Math.floor((uptime / 3600) % 24);
    const minutes = Math.floor((uptime / 60) % 60);
    const seconds = uptime % 60;

    if (uptime < 60) return `${seconds}S`;

    if (uptime < 3600) return `${minutes}M ${seconds}S`;

    if (uptime < 3600 * 24) return `${hours}H ${minutes}M ${seconds}S`;

    return `${days}D ${hours}H ${minutes}M ${seconds}S`;
  }
}

//펫 그림 우측 상태 프린트 헬퍼 클래스
class StatusPrinter {
  constructor(leftMargin, contentHeight) {
    this.leftMargin = leftMargin;
    this.contentHeight = contentHeight;
    this.printLine = 0;
  }

  print(str, line = 1) {
    printTo(this.leftMargin, this.contentHeight + this.printLine, str);
    this.printLine += line;
  }
}

module.exports = Pet;
