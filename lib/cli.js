"use strict";

//커맨더 실행 도구
const commander = require("./commander");

//텍스트에 박스 치는 모듈
const boxen = require("boxen");

//터미널 CLI 편의성 도구
const term = require("terminal-kit").terminal;

const pkg = require("../package.json");

// commander.version(pkg.version);

// 명령어 호출
require("./rename");
require("./say");

commander
  .command("count <count>")
  .description("count all ")
  .action(function(count) {
    term.saveCursor();
    console.log(boxen("minki", { padding: 3, float: "right" }));
    term.restoreCursor();
    console.log(boxen("minki", { padding: 3, float: "left" }));

    term("My name is ")
      .red("Jack")(" and I'm ")
      .green("32\n");
  });

//명령어 예외 처리
commander.command("*").action(function() {
  console.log(cst.PREFIX_MSG_ERR + chalk.bold("Command not found\n"));
  displayUsage();
  // Check if it does not forget to close fds from RPC
  process.exit(cst.ERROR_EXIT);
});

commander.parse(process.argv);

commander.on("--help", function() {
  console.log("");
  console.log("Examples:");
  console.log("  $ custom-help --help");
  console.log("  $ custom-help -h");
});
