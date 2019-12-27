const lolcat = require("lolcatjs");
const path = require("path");
const fs = require("fs");

lolcat.options.seed = Math.round(Math.random() * 1000);
lolcat.options.colors = true;

//콘솔 x, y 위치에 str 모형을 출력한다.
const printTo = (x, y, str) => {
  const parsedLines = str.split("\n").filter(l => l);

  for (let i = 0; i < parsedLines.length; i++) {
    process.stdout.cursorTo(x, y + i);
    console.log(parsedLines[i]);
  }
};

//콘솔 x, y 위치에 str 모형을 Rainbow색상으로 출력한다. lolcat Wrapper Class.
const printLolcatTo = (x, y, str) => {
  process.stdout.cursorTo(0, y);
  lolcat.fromString(
    str
      .split("\n")
      .filter(l => l)
      .map(l => repeat(" ", x) + l)
      .join("\n")
  );
};

//data file 에서 문자열을 가져온다.
const getStrFromFile = async filename => {
  console.log();
  return new Promise((res, rej) => {
    fs.readFile(
      path.resolve(__dirname, "..", "data", `${filename}.txt`),
      "utf-8",
      (err, data) => {
        if (err) rej(err);
        res(data);
      }
    );
  });
};

const repeat = (str, count) => {
  let retStr = "";

  for (let i = 0; i < count; i++) retStr += str;

  return retStr;
};

module.exports = {
  printTo,
  printLolcatTo,
  getStrFromFile
};
