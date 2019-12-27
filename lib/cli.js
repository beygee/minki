"use strict";
//
const status = require("./status.js");

//커맨더 실행 도구
const commander = require("./commander");

const pkg = require("../package.json");

const Pet = require("./modules/pet");
const PetFile = require("./modules/petfile");

commander.version(pkg.version);

// 명령어 호출
require("./rename");
require("./say");
require("./init");

//명령어 예외 처리
commander.command("*").action(function() {
  console.log("예약되지않은 명령어입니다.");
  // console.log(cst.PREFIX_MSG_ERR + chalk.bold("Command not found\n"));
  // displayUsage();
  // process.exit(cst.ERROR_EXIT);
});

commander.parse(process.argv);

//아무 인자도 입력하지 않았다면
if (process.argv.length === 2) {
  function start(count) {
    const petfile = PetFile.build("cat02");
    const pet = new Pet(petfile);
    pet.print("Merry Christmas!");
  }
  start();

  //Stat Test
  // const Status = require("./status");

  // const status = new Status();

  // // console.log(status.set("hunger", 15));
  // console.log(status.get("hunger"));
}

commander.on("--help", function() {
  console.log("");
  console.log("Examples:");
  console.log("  $ custom-help --help");
  console.log("  $ custom-help -h");
});
