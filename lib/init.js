const commander = require("./commander");
const shelljs = require("shelljs");
const Listr = require("listr");
const chalk = require("chalk");

const tasks = new Listr([
  {
    title: "Check Shell Type",
    task: ctx => {
      if (process.env.SHELL.includes("zsh")) {
        ctx.shell = "zsh";
        ctx.filepath = "~/.zshrc";
      } else if (process.env.SHELL.includes("bash")) {
        ctx.shell = "bash";
        ctx.filepath = "~/.bash_profile";
      } else {
        throw new Error("No supported shell. You can use only bash or zsh.");
      }
    }
  },
  {
    title: "Check minki already installed",
    task: ctx => {
      const profile = shelljs.cat([ctx.filepath]).stdout;
      ctx.installed = !!profile.match(/^minki/gm);
    }
  },
  {
    title: "Install minki",
    task: ctx => {
      shelljs.exec(`echo "minki" >> ${ctx.filepath}`);
    },
    skip: ctx => {
      return ctx.installed;
    }
  }
]);

commander.command("init").action(async () => {
  //먼저 쉘이 무엇인지 체크한다.

  //해당 쉘 설정파일 안에 minki 가 존재하는지 확인

  //만약 존재하지 않으면 적어주고 logging

  //존재하면 이미 존재하다고 알리기!

  try {
    await tasks.run();
    console.log(chalk.green("* Installed successfully!"));
  } catch (e) {}
});
