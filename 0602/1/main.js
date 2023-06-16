const fs = require("fs");
const fsP = require("fs").promises;

function readFilePromise(file, encoding) {
  return new Promise((resolve, reject) => {
    fs.readFile(filename, encoding, (err, data) => {
      if (err) {
        reject(err);
      }
      resolve(data);
    });
  });
}

function f(a, b) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (a + b === 0) {
        reject("Error");
      }
      resolve(a + b);
    }, 1000);
  });
}
const prm = f(30, 30);

prm
  .then((res) => {
    console.log(res);
  })
  .catch((err) => {
    console.error(err);
  });

Promise.all([fsP.readFile("A", "utf8"), fsP.readFile("B", "utf8")])
  .then((res) => {
    res.forEach((data) => {
      console.log(data);
    });
  })
  .catch((err) => {
    console.log(err);
  });

NameFile = ["A", "B", "C"];

async function f() {
  try {
    const data = await Promise.all([
      fsP.readFile("A", "utf8"),
      fsP.readFile("B", "utf8"),
    ]);
    data.forEach((file, id) => {
      console.log(NameFile[id] + ":" + file);
    });
  } catch (err) {
    console.log(err);
  }
  //fsP.readFile("A", utf8).then((data) =>)
}

let fp = require("fs");
let stdinBuffer = fp.readFileSync("A", "utf8");
const lines = stdinBuffer.split("\n");
const casesCount = parseInt(lines[0]);
for (let i = 0; (i = casesCount); i++) {
  const caseStr = lines[i + 1];
  const singleLine = caseStr.split(" ");
  parseInt(singleLine[0]);
  parseInt(singleLine[1]);
  parseInt(singleLine[2]);
  parseInt(singleLine[3]);
}
