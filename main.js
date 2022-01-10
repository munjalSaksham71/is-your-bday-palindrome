const bdayInput = document.querySelector("#bday-input");
const submit = document.querySelector("#submit");
const output = document.querySelector("#output");

const reverse = str => {
  return str.split("").reverse().join("");
}

const isPalindrome = str => {
  const reversedStr = reverse(str);
  if (reversedStr === str) {
    return true;
  }
  return false;
}

const getDateAsString = date => {
  let dateInString = { day: "", month: "", year: "" };

  if (date.day < 10) {
    dateInString.day = "0" + date.day;
  } else {
    dateInString.day = date.day.toString();
  }

  if (date.month < 10) {
    dateInString.month = "0" + date.month;
  } else {
    dateInString.month = date.month.toString();
  }

  dateInString.year = date.year.toString();
  return dateInString;
}

const dateInAllFormat = date => {
  let ddmmyyyy = date.day + date.month + date.year;
  let mmddyyyy = date.month + date.day + date.year;
  let yyyymmdd = date.year + date.month + date.day;
  let ddmmyy = date.day + date.month + date.year.slice(-2);
  let mmddyy = date.month + date.day + date.year.slice(-2);
  let yymmdd = date.year.slice(-2) + date.month + date.day;

  return [ddmmyyyy, mmddyyyy, yyyymmdd, ddmmyy, mmddyy, yymmdd];
}

const checkPalindromeForAllDateFormats = date => {
  let dateFormatList = dateInAllFormat(date);
  let palindromeList = [];

  for (let i = 0; i < dateFormatList.length; i++) {
    let result = isPalindrome(dateFormatList[i]);
    palindromeList.push(result);
  }
  return palindromeList;
}

function checkLeapYear(year) {
  if (year % 400 === 0) {
    return true;
  }
  if (year % 100 === 0) {
    return false;
  }
  if (year % 4 === 0) {
    return true;
  }
  return false;
}

const getNextDate = date => {
  let day = date.day + 1;
  let month = date.month;
  let year = date.year;

  let daysInMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

  if (month === 2) {
    if (checkLeapYear(year)) {
      if (day > 29) {
        day = 1;
        month = 3;
      }
    } else {
      if (day > 28) {
        day = 1;
        month = 3;
      }
    }
  } else {
    if (day > daysInMonth[month - 1]) {
      day = 1;
      month++;
    }
  }

  if (month > 12) {
    month = 1;
    year++;
  }

  return {day: day, month: month, year: year};
}

const getNextPalindromeDate = date => {
  let nextDate = getNextDate(date);
  let ctx = 0;

  while (1) {
    ctx++;
    let dateStr = getDateAsString(nextDate);
    let resultList = checkPalindromeForAllDateFormats(dateStr);

    for (let i = 0; i < resultList.length; i++) {
      if (resultList[i]) {
        return [ctx, nextDate];
      }
    }
    nextDate = getNextDate(nextDate);
  }
}

const submitHandler = () => {
  let bdayString = bdayInput.value;

  if (bdayString !== "") {
    let dates = bdayString.split("-");
    let yyyy = dates[0];
    let mm = dates[1];
    let dd = dates[2];

    let date = {
      day: Number(dd),
      month: Number(mm),
      year: Number(yyyy),
    };

    let dateStr = getDateAsString(date);
    let list = checkPalindromeForAllDateFormats(dateStr);
    let isPalindrom = false;

    for (let i = 0; i < list.length; i++) {
      if (list[i]) {
        isPalindrom;
        break;
      }
    }
    if (!isPalindrom) {
      const [ctx, nextDate] = getNextPalindromeDate(date);
      output.innerText = `The Next Palindrome Date is ${nextDate.day}-${nextDate.month}-${nextDate.year}, you missed by ${ctx} Days. `;
    } else {
      output.innerText = "YAyy!! Your Birthday is Palindrome.";
    }
  }
}

submit.addEventListener("click", submitHandler);
