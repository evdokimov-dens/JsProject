"use strict";

// блок объявления переменных
let title;
let screens;
let screenPrice;
let adaptive;
let rollback = 33;
let allServicePrices;
let fullPrice;
let servicePercentPrice;
let service1;
let service2;

// блок описания функций
const isNumber = function (num) {
  return !isNaN(parseFloat(num)) && isFinite(num);
};

const asking = function () {
  title = prompt("Как называется проект?", "    интЕРнет-магазин");
  screens = prompt("Какие типы экранов нужно разработать?", "Простые, Сложные, Интерактивные");

  do {
    screenPrice = prompt("Сколько будет стоить данная работа?");
    if (screenPrice === null) screenPrice = "";
  } while (!isNumber(screenPrice) || screenPrice.trim() === "");

  screenPrice = +screenPrice;
  adaptive = confirm("Нужен ли адаптив на сайте?");
};
const getAllServicePrices = function () {
  let sum = 0;

  for (let i = 0; i < 2; i++) {
    if (i === 0) {
      service1 = prompt("Какой дополнительный тип услуги нужен?", "PixelPerfect");
    } else if (i === 1) {
      service2 = prompt("Какой дополнительный тип услуги нужен?", "Мобильная разработка");
    }

    let sumService;
    do {
      sumService = prompt("Сколько это будет стоить?", "230");
      if (sumService === null) sumService = "";
    } while (!isNumber(sumService) || sumService.trim() === "");

    sum += +sumService;
  }
  return sum;
};

const showTypeOff = function (variable) {
  console.log(variable, typeof variable);
};

function getFullPrice() {
  return screenPrice + allServicePrices;
}

const getServicePercentPrices = function () {
  return fullPrice - fullPrice * (rollback / 100);
};

const getTitle = function () {
  return title.trim()[0].toUpperCase() + title.trim().substr(1).toLowerCase();
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

// блок функционала
asking();
allServicePrices = getAllServicePrices();
fullPrice = getFullPrice();
servicePercentPrice = getServicePercentPrices();
title = getTitle();

showTypeOff(title);
showTypeOff(screenPrice);
showTypeOff(adaptive);

// мусорный блок
console.log("allServicePrices", allServicePrices);

console.log(getRollbackMessage(fullPrice));
console.log(typeof title);
console.log(typeof screenPrice);
console.log(typeof adaptive);

console.log(screens.length);
console.log(servicePercentPrice);

console.log("Стоимость вёрстки экранов " + screenPrice + " юаней и Стоимость разработки сайта " + fullPrice + " юаней");
