let days = ["Воскресенье", "Понедельник", "Вторник", "Среда", "Четверг", "Пятница", "Суббота"];
let months = [
  "января",
  "февраля",
  "марта",
  "апреля",
  "мая",
  "июня",
  "июля",
  "августа",
  "сентября",
  "октября",
  "ноября",
  "декабря",
];

function getWord(n, one, two, five) {
  let lastDigit = n % 10;
  let lastTwoDigits = n % 100;

  if (lastTwoDigits >= 11 && lastTwoDigits <= 14) {
    return five;
  } else if (lastDigit === 1) {
    return one;
  } else if (lastDigit >= 2 && lastDigit <= 4) {
    return two;
  }
  return five;
}

function addZero(n) {
  if (n < 10) {
    return "0" + n;
  } else {
    return n;
  }
}

function showTime() {
  let now = new Date();

  let day = now.getDay();
  let numMonth = now.getDate();
  let month = now.getMonth();
  let year = now.getFullYear();
  let hours = now.getHours();
  let minutes = now.getMinutes();
  let seconds = now.getSeconds();

  let nowDay = days[day];

  let nowMonth = months[month];

  let hourWord = getWord(hours, "час", "часа", "часов");
  let minuteWord = getWord(minutes, "минута", "минуты", "минут");
  let secondWord = getWord(seconds, "секунда", "секунды", "секунд");

  let strA = `Сегодня ${nowDay}, ${numMonth} ${nowMonth} ${year} года, ${hours} ${hourWord} ${minutes} ${minuteWord} ${seconds} ${secondWord}`;
  console.log(strA);

  let strB = `${addZero(numMonth)}.${addZero(month + 1)}.${year} - ${addZero(hours)}:${addZero(minutes)}:${addZero(seconds)}`;

  document.getElementById("time").innerHTML = strA + "<br><br>" + strB;
}

showTime();
setInterval(showTime, 1000);
