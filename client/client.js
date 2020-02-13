const net = require("net");
const fs = require("fs");
const readline = require("readline");

const stdin = process.stdin;
const stdout = process.stdout;
stdin.setRawMode(true);
stdin.setEncoding("utf8");
stdin.resume();

const rl = readline.createInterface({
  input: stdin,
  output: stdout
});

const conn = net.createConnection({
  host: "localhost",
  port: 8130
});

conn.setEncoding("utf8");

conn.on("connect", () => {
  console.log("I'm connected to the server");
  console.log("Please enter the file name(and extension) and hit enter:");
});

// Way to get out
stdin.on("data", data => {
  if (data === "\u0003") {
    conn.end();
    process.exit();
  }
});

// Listen to a line
rl.on("line", answer => {
  conn.write(answer);
});

conn.on("data", data => {
  if (data === "saved") {
    console.log("File has been saved local");
  }
});
