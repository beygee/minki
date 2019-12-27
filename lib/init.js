const commander = require("./commander");
const shelljs = require("shelljs");

commander.command("init").action(() => {
  console.log("초기화");

  //먼저 쉘이 무엇인지 체크한다.

  //해당 쉘 설정파일 안에 minki 가 존재하는지 확인

  //만약 존재하지 않으면 적어주고 logging

  //존재하면 이미 존재하다고 알리기!

  shelljs.exec('echo "minki" >> ~/.zshrc');
});
