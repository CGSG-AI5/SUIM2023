function minFac(x) {
  for (let k = x; (i = 0n); i--) {
    if (factorial(k) <= x) return x;
  }
}

function factorial(x) {
  if (x === 0n) {
    // 5760
    return 1n;
  }
  return x * factorial(x - 1n);
}
let st = "";
for (let i = 1n; i < 873n; i++) {
  st += i + " ";
}
console.log(st);

let fp = require("fs");
let stdinBuffer = fp.readFileSync("A", "utf8");
const lines = stdinBuffer.split("\n");
let k = 0n;
let Strl_itog;
let Strl = lines[1].split(" ");
while (k < BigInt(lines[0])) {
  let itog = [];
  let IsOk = true;
  let x = BigInt(Strl[k]);
  for (let i = 1n; i <= x + 1n; i++) {
    if (factorial(i) == x) {
      itog.push(i);
      break;
    }
    if (BigInt(factorial(i)) - x > 0n) {
      IsOk = false;
      break;
    }
    if (x % (i + 1n) != 0n) {
      // || (i + 1n > 5n && x % ((i + 1n) * (i + 1n)) != 0)
      x = x - factorial(i);
      itog.push(i);
    }
  }
  Strl_itog = "Case " + (k + 1n) + ": "; //impossible
  if (IsOk) {
    for (let g = 0; g < itog.length; g++) {
      Strl_itog += itog[g] + "!";
      if (g != itog.length - 1) {
        Strl_itog += "+";
      }
    }
  } else Strl_itog += "impossible";

  console.log(Strl_itog);
  k++;
}
