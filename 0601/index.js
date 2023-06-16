const minimist = require("minimist");
const fs = require("fs");

const obj = minimist (process.argv.slice(2))
console.log(process.argv);
try{
    throw new ErrorEvent("Smth happened");
    
}
const file = fs.readFileSync("A.txt", "utf8");


