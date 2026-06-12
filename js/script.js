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
    this.addTitle();
    startBtn.addEventListener("click", () => this.start());
    buttonPlus.addEventListener("click", () => this.addScreenBlock());
    inputRange.addEventListener("input", () => this.updateRollback());
    this.updateRollback();
    resetBtn.addEventListener("click", () => this.reset());

    const cmsCheckbox = document.getElementById("cms-open");
    const cmsVariants = document.querySelector(".hidden-cms-variants");

    if (cmsCheckbox && cmsVariants) {
      cmsCheckbox.addEventListener("change", function () {
        if (this.checked) {
          cmsVariants.style.display = "flex";
        } else {
          cmsVariants.style.display = "none";
        }
      });
    }

    const cmsSelect = document.querySelector("#cms-select");
    const cmsOtherInput = document.querySelector(".hidden-cms-variants .main-controls__input");

    if (cmsSelect && cmsOtherInput) {
      cmsSelect.addEventListener("change", function () {
        if (this.value === "other") {
          cmsOtherInput.style.display = "flex";
        } else {
          cmsOtherInput.style.display = "none";
        }
      });
    }
  },
  addTitle: function () {
    document.title = title.textContent;
  },
  start: function () {
    if (!this.validateScreens()) {
      return;
    }
    this.addScreens();
    this.addServices();
    this.addPrices();
    // this.logger();
    this.showResult();
    this.disableInputs();
    startBtn.style.display = "none";
    resetBtn.style.display = "block";
  },
  reset: function () {
    this.enableInputs();

    startBtn.style.display = "block";
    resetBtn.style.display = "none";

    total.value = 0;
    totalCount.value = 0;
    totalCountOther.value = 0;
    fullTotalCount.value = 0;
    totalCountRollback.value = 0;

    inputRange.value = 0;
    inputRangeValue.textContent = "0%";
    this.rollback = 0;

    const cmsCheckbox = document.getElementById("cms-open");
    if (cmsCheckbox) {
      cmsCheckbox.checked = false;
    }

    const cmsVariants = document.querySelector(".hidden-cms-variants");
    if (cmsVariants) {
      cmsVariants.style.display = "none";
    }

    const allCheckboxes = document.querySelectorAll("input[type='checkbox']");
    allCheckboxes.forEach((checkbox) => {
      checkbox.checked = false;
    });

    const firstScreen = screens[0];
    const select = firstScreen.querySelector("select");
    const input = firstScreen.querySelector("input[type='text']");
    select.value = "";
    input.value = "";

    const allScreens = document.querySelectorAll(".screen");
    if (allScreens.length > 1) {
      for (let i = 1; i < allScreens.length; i++) {
        allScreens[i].remove();
      }
    }
    screens = document.querySelectorAll(".screen");

    this.screens = [];
    this.screenPrice = 0;
    this.totalScreensCount = 0;
    this.servicePricesPercent = 0;
    this.servicePricesNumber = 0;
    this.fullPrice = 0;
    this.servicePercentPrice = 0;
    this.servicesPercent = {};
    this.servicesNumber = {};

    const cmsSelect = document.querySelector("#cms-select");
    const cmsOtherInput = document.querySelector(".hidden-cms-variants .main-controls__input input");
    const cmsOtherInputContainer = document.querySelector(".hidden-cms-variants .main-controls__input");

    if (cmsSelect) {
      cmsSelect.value = "";
    }
    if (cmsOtherInput) {
      cmsOtherInput.value = "";
    }
    if (cmsOtherInputContainer) {
      cmsOtherInputContainer.style.display = "none";
    }
  },
  disableInputs: function () {
    const allScreens = document.querySelectorAll(".screen");
    allScreens.forEach((screen) => {
      const select = screen.querySelector("select");
      const input = screen.querySelector("input[type='text']");
      select.disabled = true;
      input.disabled = true;
    });
  },
  enableInputs: function () {
    const allScreens = document.querySelectorAll(".screen");
    allScreens.forEach((screen) => {
      const select = screen.querySelector("select");
      const input = screen.querySelector("input[type='text']");
      select.disabled = false;
      input.disabled = false;
    });
  },
  updateRollback: function () {
    const value = inputRange.value;
    inputRangeValue.textContent = value + "%";
    this.rollback = +value;

    // Пересчитываем сумму с учётом отката
    if (this.fullPrice > 0) {
      this.servicePercentPrice = this.fullPrice - this.fullPrice * (this.rollback / 100);
      totalCountRollback.value = this.servicePercentPrice;
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
    total.value = this.screenPrice;
    totalCount.value = this.totalScreensCount;
    totalCountOther.value = this.servicePricesPercent + this.servicePricesNumber;
    fullTotalCount.value = this.fullPrice;
    totalCountRollback.value = this.servicePercentPrice;
  },
  addScreens: function () {
    screens = document.querySelectorAll(".screen");
    screens.forEach((screen, index) => {
      const select = screen.querySelector("select");
      const input = screen.querySelector("input");
      const selectName = select.options[select.selectedIndex].textContent;
      this.screens.push({
        id: index,
        name: selectName,
        price: +select.value * +input.value,
        count: +input.value,
      });
    });
    console.log(this.screens);
  },
  addServices: function () {
    otherItemPercent.forEach((item) => {
      const check = item.querySelector("input[type=checkbox]");
      const label = item.querySelector("label");
      const input = item.querySelector("input[type=text]");

      if (check.checked) {
        this.servicesPercent[label.textContent] = +input.value;
      }
    });

    otherItemNumber.forEach((item) => {
      const check = item.querySelector("input[type=checkbox]");
      const label = item.querySelector("label");
      const input = item.querySelector("input[type=text]");

      if (check.checked) {
        this.servicesNumber[label.textContent] = +input.value;
      }
    });

    const cmsCheckbox = document.getElementById("cms-open");
    if (cmsCheckbox && cmsCheckbox.checked) {
      const cmsSelect = document.querySelector("#cms-select");
      const cmsValue = cmsSelect.value;

      if (cmsValue === "50") {
        this.servicesPercent["CMS WordPress"] = 50;
      } else if (cmsValue === "other") {
        const cmsOtherInput = document.querySelector(".hidden-cms-variants .main-controls__input input");
        if (cmsOtherInput && cmsOtherInput.value) {
          const percent = +cmsOtherInput.value;
          if (!isNaN(percent) && percent > 0) {
            this.servicesPercent["CMS Other"] = percent;
          }
        }
      }
    }
  },
  addScreenBlock: function () {
    const cloneScreen = screens[0].cloneNode(true);
    screens[screens.length - 1].after(cloneScreen);
    screens = document.querySelectorAll(".screen");

    const newScreen = screens[screens.length - 1];
    const select = newScreen.querySelector("select");
    const input = newScreen.querySelector("input[type='text']");
    select.value = "";
    input.value = "";
  },
  addPrices: function () {
    this.totalScreensCount = this.screens.reduce((acc, screen) => {
      return acc + screen.count;
    }, 0);

    for (let screen of this.screens) {
      this.screenPrice += +screen.price;
    }

    for (let key in this.servicesNumber) {
      this.servicePricesNumber += this.servicesNumber[key];
    }

    for (let key in this.servicesPercent) {
      this.servicePricesPercent += this.screenPrice * (this.servicesPercent[key] / 100);
    }

    this.fullPrice = +this.screenPrice + this.servicePricesNumber + this.servicePricesPercent;
    this.servicePercentPrice = this.fullPrice - this.fullPrice * (this.rollback / 100);
  },
  isString: function (str) {
    return isNaN(str) && str !== parseFloat(str);
  },
  logger: function () {
    for (let key in this) {
      console.log(key + ": " + this[key]);
    }
    console.log(this.screens);
  },
};

appData.init();
