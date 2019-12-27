"use strict";

const cursor = require("ansi")(process.stdout);
const Reader = require("line-by-line");
const chalk = require("chalk");

let options = {
  animate: false,
  // Duration of the animation
  duration: 12,
  // Seed of the rainbow, use the same for the same pattern
  seed: 0,
  // Animation speed
  speed: 20,
  // Spread of the rainbow
  spread: 8.0,
  // Frequency of the rainbow colors
  freq: 0.3
};

let rainbow = function(freq, i) {
  let red = Math.round(Math.sin(freq * i + 0) * 127 + 128);
  let green = Math.round(Math.sin(freq * i + (2 * Math.PI) / 3) * 127 + 128);
  let blue = Math.round(Math.sin(freq * i + (4 * Math.PI) / 3) * 127 + 128);

  return {
    red: red,
    green: green,
    blue: blue
  };
};

let colorize = function(char, colors) {
  process.stdout.write(chalk.rgb(colors.red, colors.green, colors.blue)(char));
};

let printlnPlain = function(colorize, line) {
  for (let i = 0; i < line.length; i++) {
    colorize(line[i], rainbow(options.freq, options.seed + i / options.spread));
  }
};

let println = function(line) {
  cursor.show();

  if (options.animate) {
    cursor.hide();
    printlnAnimated(colorize, line);
  } else {
    printlnPlain(colorize, line);
  }

  process.stdout.write("\n");
};

let fromPipe = function() {
  process.stdin.resume();
  process.stdin.setEncoding("utf8");
  process.stdin.on("data", function(data) {
    let lines = data.split("\n");

    for (let line in lines) {
      options.seed += 1;
      println(lines[line]);
    }
  });
  return new Promise(resolve => process.stdin.on("end", resolve));
};

let fromFile = function(file) {
  let fileReader = new Reader(file);
  fileReader.on("line", function(line) {
    options.seed += 1;
    println(line);
    cursor.show();
  });
  return new Promise(resolve => fileReader.on("end", resolve));
};

let fromString = function(string) {
  string = string || "";
  let lines = string.split("\n");
  lines.forEach(function(line) {
    options.seed += 1;
    println(line);
    cursor.show();
  });
};

exports.options = options;
exports.println = println;
exports.rainbow = rainbow;
exports.fromPipe = fromPipe;
exports.fromFile = fromFile;
exports.fromString = fromString;
