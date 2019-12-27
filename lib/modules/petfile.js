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
    this.originalHeight = lines.length; //Boxen으로 두르기 전에 실제 펫의 Height 값.
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

  static build(filename) {
    return new PetFile(PetFile._getStrFromFile(filename));
  }

  static _getStrFromFile(filename) {
    return fs.readFileSync(
      path.resolve(__dirname, "..", "..", "data", `${filename}.txt`),
      "utf-8"
    );
  }
}

module.exports = PetFile;
