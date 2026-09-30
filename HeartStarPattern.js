let result = "";

const print = [
  { firstSpace: 2, star1: 4, midSpace: 7, star2: 4 },
  { firstSpace: 1, star1: 6, midSpace: 5, star2: 6 },
  { firstSpace: 0, star1: 9, midSpace: 1, star2: 9 },
];

for (let r = 0; r < print.length; r++) {
  let row = print[r];

  for (let fs = 0; fs < row.firstSpace; fs++) {
    result += " ";
  }

  for (let st1 = 0; st1 < row.star1; st1++) {
    result += "*";
  }

  for (let ms = 0; ms < row.midSpace; ms++) {
    result += " ";
  }

  for (let st2 = 0; st2 < row.star2; st2++) {
    result += "*";
  }

  result += "\n";
}

for (let i = 0; i < 10; i++) {
  for (let sp = 0; sp < i; sp++) {
    result += " ";
  }

  for (let st = 0; st < 19 - 2 * i; st++) {
    result += "*";
  }

  result += "\n";
}

console.log(result);
