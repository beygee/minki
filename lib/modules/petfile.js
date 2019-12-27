const path = require("path");
const fs = require("fs");
const boxen = require("boxen");

class PetFile {
  constructor(async_param) {
    if (typeof async_param == "undefined") {
      throw new Error("Cannot be called directly!");
    }

    //파일을 읽어들인 문자열을 저장한다.
    let lines = async_param.split("\n").filter(l => l);
    lines =
      lines.length > 22
        ? lines
        : boxen(lines.join("\n"), {
            padding: {
              bottom: Math.floor((22 - lines.length) / 2),
              top: Math.floor((22 - lines.length) / 2),
              left: Math.max(Math.floor((22 - lines.length) / 2), 5),
              right: Math.max(Math.floor((22 - lines.length) / 2), 5)
            },
            borderStyle: {
              vertical: " ",
              topLeft: " ",
              horizontal: " ",
              bottomLeft: " ",
              bottomRight: " ",
              topRight: " "
            }
          }).split("\n");

    this.src = lines.join("\n");

    this.width = lines.reduce(
      (maxWidth, line) => Math.max(maxWidth, line.length),
      0
    );
    this.height = lines.length;

    // if (this.height < 23) {
    //   // 크기가 상당히 작아 boxen으로 공백을 늘려준다.
    //   this.src;
    //   throw new Error(
    //     "Pet Ascii File Lines must be greater than 22! Current : " + this.height
    //   );
    // }
  }

  static async build(filename) {
    return new PetFile(await PetFile._getStrFromFile(filename));
  }

  static async _getStrFromFile(filename) {
    return new Promise((res, rej) => {
      fs.readFile(
        path.resolve(__dirname, "..", "..", "data", `${filename}.txt`),
        "utf-8",
        (err, data) => {
          if (err) rej(err);
          res(data);
        }
      );
    });
  }
}

module.exports = PetFile;
