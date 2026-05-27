"use strict";

const title = document.getElementsByTagName("h1")[0];
const buttonPlus = document.querySelector("screen-btn");
const otherItemPercent = document.querySelectorAll(".other-items.percent");
const otherItemNumber = document.querySelectorAll(".other-items.number");

const inputRange = document.querySelector(".rollback input");
const inputRangeValue = document.querySelector(".rollback .range-value");

const startBtn = document.getElementsByClassName("handler_btn")[0];
const resetBtn = document.getElementsByClassName("handler_btn")[1];

const total = document.getElementsByClassName(".total-input")[0];
const totalCount = document.getElementsByClassName(".total-input")[1];
const totalCountOther = document.getElementsByClassName(".total-input")[2];
const fullTotalCount = document.getElementsByClassName(".total-input")[3];
const totalCountRollback = document.getElementsByClassName(".total-input")[4];

let screens = document.querySelectorAll(".screen");

const appData = {
  title: "",
  screens: [],
  screenPrice: 0,
  adaptive: true,
  rollback: 33,
  allServicePrices: 0,
  fullPrice: 0,
  servicePercentPrice: 0,
  services: {},
  asking: function () {
    do {
      this.title = prompt("Как называется проект?", "    интЕРнет-магазин");
    } while (!this.isString(this.title));

    let name;
    for (let i = 0; i < 2; i++) {
      do {
        name = prompt("Какие типы экранов нужно разработать?");
      } while (!this.isString(name));
      let price = 0;

      do {
        price = prompt("Сколько будет стоить данная работа?");
      } while (!this.isNumber(price));

      this.screens.push({ id: i, name: name, price: price });
    }

    for (let i = 0; i < 2; i++) {
      do {
        name = prompt("Какой дополнительный тип услуги нужен?");
      } while (!this.isString(name));
      let price = 0;

      do {
        price = prompt("Сколько это будет стоить?", "230");
      } while (!this.isNumber(price));

      this.services[name + "_" + i] = +price;
    }

    this.adaptive = confirm("Нужен ли адаптив на сайте?");
  },

  addPrices: function () {
    this.screenPrice = this.screens.reduce((acc, screen) => {
      return acc + +screen.price;
    }, 0);

    for (let key in this.services) {
      this.allServicePrices += this.services[key];
    }
  },
  isNumber: function (num) {
    return !isNaN(parseFloat(num)) && isFinite(num);
  },
  isString: function (str) {
    return isNaN(str) && str !== parseFloat(str);
  },
  getFullPrice: function () {
    this.fullPrice = +this.screenPrice + this.allServicePrices;
  },
  getServicePercentPrices: function () {
    this.servicePercentPrice = this.fullPrice - this.fullPrice * (this.rollback / 100);
  },
  getTitle: function () {
    this.title = this.title.trim()[0].toUpperCase() + this.title.trim().substr(1).toLowerCase();
  },
  getRollbackMessage: function (price) {
    if (price >= 30000) {
      return "Даем скидку в 10%";
    } else if (price >= 15000 && price < 30000) {
      return "Даем скидку в 5%";
    } else if (price < 15000 && price >= 0) {
      return "Скидка не предусмотрена";
    } else {
      return "Что-то пошло не так";
    }
  },
  start: function () {
    this.asking();
    this.addPrices();
    this.getFullPrice();
    this.getServicePercentPrices();
    this.getTitle();
    this.logger();
  },
  logger: function () {
    for (let key in this) {
      console.log(key + ": " + this[key]);
    }
    console.log(this.screens);
  },
};

// appData.start();
