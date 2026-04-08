let title = "myProject";
let screens = "Простые, Сложные, Интерактивные";
let screenPrice = 16;
let rollback = 33;
let fullPrice = 6480;
let adaptive = true;

console.log(typeof title);
console.log(typeof fullPrice);
console.log(typeof adaptive);
console.log(screens.length);
console.log(`Стоимость верстки экранов ${screenPrice} рублей`);
console.log(`Стоимость разработки сайта ${fullPrice} рублей`);
console.log(screens.toLowerCase().split(","));
console.log(fullPrice * (rollback / 100));
