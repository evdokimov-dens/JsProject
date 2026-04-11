// блок объявления переменных
let title = prompt("Как называется проект?", "    интЕРнет-магазин");
let screens = prompt("Какие типы экранов нужно разработать?", "Простые, Сложные, Интерактивные");
let screenPrice = +prompt("Сколько будет стоить данная работа?", "200");
let rollback = 33;
let adaptive = confirm("Нужен ли адаптив на сайте?");
let service1 = prompt("Какой дополнительный тип услуги нужен?", "PixelPerfect");
let servicePrice1 = +prompt("Сколько это будет стоить?", "230");
let service2 = prompt("Какой дополнительный тип услуги нужен?", "Мобильная разработка");
let servicePrice2 = +prompt("Сколько это будет стоить?", "400");
let fullPrice;
let servicePercentPrice;
let allServicePrices;

// блок описания функций
const showTypeOff = function (variable) {
  console.log(variable, typeof variable);
};

const getRollbackMessage = function (price) {
  if (price >= 30000) {
    return "Даем скидку в 10%";
  } else if (price >= 15000 && price < 30000) {
    return "Даем скидку в 5%";
  } else if (price < 15000 && price >= 0) {
    return "Скидка не предусмотрена";
  } else {
    return "Что-то пошло не так";
  }
};

const getAllServicePrices = function (...sumAll) {
  let value = 0;
  for (let i = 0; i < sumAll.length; i++) {
    value += sumAll[i];
  }
  return value;
};

const getTitle = function (title) {
  const cleaned = title.trim().toLowerCase();
  return cleaned[0].toUpperCase() + cleaned.slice(1);
};

function getFullPrice() {
  return screenPrice + allServicePrices;
}

const getServicePercentPrices = function () {
  return fullPrice - fullPrice * (rollback / 100);
};

// блок функционала
allServicePrices = getAllServicePrices(servicePrice1, servicePrice2);
fullPrice = getFullPrice();
servicePercentPrice = getServicePercentPrices();
title = getTitle(title);

showTypeOff(title);
showTypeOff(screenPrice);
showTypeOff(adaptive);

// мусорный блок
console.log(getRollbackMessage(fullPrice));

console.log(screens);
console.log(servicePercentPrice);
