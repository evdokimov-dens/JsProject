"use strict";

const title = document.getElementsByTagName("h1")[0];
const buttonPlus = document.querySelector(".screen-btn");
const otherItemPercent = document.querySelectorAll(".other-items.percent");
const otherItemNumber = document.querySelectorAll(".other-items.number");

const inputRange = document.querySelector(".rollback input");
const inputRangeValue = document.querySelector(".rollback .range-value");

const startBtn = document.getElementsByClassName("handler_btn")[0];
const resetBtn = document.getElementsByClassName("handler_btn")[1];

const total = document.getElementsByClassName("total-input")[0];
const totalCount = document.getElementsByClassName("total-input")[1];
const totalCountOther = document.getElementsByClassName("total-input")[2];
const fullTotalCount = document.getElementsByClassName("total-input")[3];
const totalCountRollback = document.getElementsByClassName("total-input")[4];

let screens = document.querySelectorAll(".screen");

const appData = {
  title: "",
  screens: [],
  screenPrice: 0,
  totalScreensCount: 0,
  adaptive: true,
  rollback: 10,
  servicePricesPercent: 0,
  servicePricesNumber: 0,
  fullPrice: 0,
  servicePercentPrice: 0,
  servicesPercent: {},
  servicesNumber: {},
  init: function () {
    appData.addTitle();
    startBtn.addEventListener("click", appData.start);
    buttonPlus.addEventListener("click", appData.addScreenBlock);
    inputRange.addEventListener("input", appData.updateRollback);
    appData.updateRollback();
  },
  addTitle: function () {
    document.title = title.textContent;
  },
  start: function () {
    if (!appData.validateScreens()) {
      return;
    }
    appData.addScreens();
    appData.addServices();
    appData.addPrices();
    // this.logger();
    appData.showResult();
  },
  updateRollback: function () {
    const value = inputRange.value;
    inputRangeValue.textContent = value + "%";
    appData.rollback = +value;

    // Пересчитываем сумму с учётом отката
    if (appData.fullPrice > 0) {
      appData.servicePercentPrice = appData.fullPrice - appData.fullPrice * (appData.rollback / 100);
      totalCountRollback.value = appData.servicePercentPrice;
    }
  },
  validateScreens: function () {
    const allScreens = document.querySelectorAll(".screen");
    let isValid = true;

    allScreens.forEach((screen, index) => {
      const select = screen.querySelector("select");
      const input = screen.querySelector("input");

      if (select.value === "") {
        alert(`В блоке экрана №${index + 1} не выбран тип экрана`);
        isValid = false;
      } else if (input.value === "" || +input.value <= 0) {
        alert(`В блоке экрана №${index + 1} не указано количество экранов`);
        isValid = false;
      }
    });
    return isValid;
  },
  showResult: function () {
    total.value = appData.screenPrice;
    totalCount.value = appData.totalScreensCount;
    totalCountOther.value = appData.servicePricesPercent + appData.servicePricesNumber;
    fullTotalCount.value = appData.fullPrice;
    totalCountRollback.value = appData.servicePercentPrice;
  },
  addScreens: function () {
    screens = document.querySelectorAll(".screen");
    screens.forEach(function (screen, index) {
      const select = screen.querySelector("select");
      const input = screen.querySelector("input");
      const selectName = select.options[select.selectedIndex].textContent;
      appData.screens.push({
        id: index,
        name: selectName,
        price: +select.value * +input.value,
        count: +input.value,
      });
    });
    console.log(appData.screens);
  },
  addServices: function () {
    otherItemPercent.forEach(function (item) {
      const check = item.querySelector("input[type=checkbox]");
      const label = item.querySelector("label");
      const input = item.querySelector("input[type=text]");

      if (check.checked) {
        appData.servicesPercent[label.textContent] = +input.value;
      }
    });

    otherItemNumber.forEach(function (item) {
      const check = item.querySelector("input[type=checkbox]");
      const label = item.querySelector("label");
      const input = item.querySelector("input[type=text]");

      if (check.checked) {
        appData.servicesNumber[label.textContent] = +input.value;
      }
    });
  },
  addScreenBlock: function () {
    const cloneScreen = screens[0].cloneNode(true);
    screens[screens.length - 1].after(cloneScreen);
    screens = document.querySelectorAll(".screen");
  },
  addPrices: function () {
    appData.totalScreensCount = appData.screens.reduce((acc, screen) => {
      return acc + screen.count;
    }, 0);

    for (let screen of appData.screens) {
      appData.screenPrice += +screen.price;
    }

    for (let key in appData.servicesNumber) {
      appData.servicePricesNumber += appData.servicesNumber[key];
    }

    for (let key in appData.servicesPercent) {
      appData.servicePricesPercent += appData.screenPrice * (appData.servicesPercent[key] / 100);
    }

    appData.fullPrice = +appData.screenPrice + appData.servicePricesNumber + appData.servicePricesPercent;
    appData.servicePercentPrice = appData.fullPrice - appData.fullPrice * (appData.rollback / 100);
  },
  isString: function (str) {
    return isNaN(str) && str !== parseFloat(str);
  },
  logger: function () {
    for (let key in appData) {
      console.log(key + ": " + appData[key]);
    }
    console.log(appData.screens);
  },
};

appData.init();
