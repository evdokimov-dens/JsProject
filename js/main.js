"use strict";

const appData = {
  title: "",
  screens: "",
  screenPrice: 0,
  adaptive: true,
  rollback: 33,
  allServicePrices: 0,
  fullPrice: 0,
  servicePercentPrice: 0,
  service1: "",
  service2: "",
  asking: function () {
    this.title = prompt("Как называется проект?", "    интЕРнет-магазин");
    this.screens = prompt("Какие типы экранов нужно разработать?", "Простые, Сложные, Интерактивные");

    do {
      this.screenPrice = prompt("Сколько будет стоить данная работа?");
      if (this.screenPrice === null) this.screenPrice = "";
    } while (!this.isNumber(this.screenPrice) || this.screenPrice.trim() === "");

    this.screenPrice = +this.screenPrice;
    this.adaptive = confirm("Нужен ли адаптив на сайте?");
  },
  isNumber: function (num) {
    return !isNaN(parseFloat(num)) && isFinite(num);
  },
  getAllServicePrices: function () {
    let sum = 0;

    for (let i = 0; i < 2; i++) {
      if (i === 0) {
        this.service1 = prompt("Какой дополнительный тип услуги нужен?", "PixelPerfect");
      } else if (i === 1) {
        this.service2 = prompt("Какой дополнительный тип услуги нужен?", "Мобильная разработка");
      }

      let sumService;
      do {
        sumService = prompt("Сколько это будет стоить?", "230");
        if (sumService === null) sumService = "";
      } while (!this.isNumber(sumService) || sumService.trim() === "");

      sum += +sumService;
    }
    return sum;
  },
  getFullPrice: function () {
    return this.screenPrice + this.allServicePrices;
  },
  getServicePercentPrices: function () {
    return this.fullPrice - this.fullPrice * (this.rollback / 100);
  },
  getTitle: function () {
    return this.title.trim()[0].toUpperCase() + this.title.trim().substr(1).toLowerCase();
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
    this.allServicePrices = this.getAllServicePrices();
    this.fullPrice = this.getFullPrice();
    this.servicePercentPrice = this.getServicePercentPrices();
    this.title = this.getTitle();
    this.logger();
  },
  logger: function () {
    for (let key in this) {
      console.log(key + ": " + this[key]);
    }
  },
};

// блок функционала
appData.start();
