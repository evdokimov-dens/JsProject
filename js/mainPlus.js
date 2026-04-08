let num = 266219;

let sumNum = num.toString().split("");

let value = 1;

for (let i = 0; i < sumNum.length; i++) {
  value = value * Number(sumNum[i]);
}

let sumValue = value ** 3;

console.log(Number(sumValue.toString().slice(0, 2)));
