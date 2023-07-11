---
title: 날짜 코드
author: 동현
date: "2023-07-11"
---

Code Blocks

    4 space indention
    makes full-width
    standard code blocks

```js
var now = new Date();

var days = new Array(
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday"
);

var months = new Array(
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December"
);

var date = (now.getDate() < 10 ? "0" : "") + now.getDate();

function fourdigits(number) {
  return number < 1000 ? number + 1900 : number;
}
today =
  days[now.getDay()] +
  ", " +
  months[now.getMonth()] +
  " " +
  date +
  ", " +
  fourdigits(now.getYear());

document.write(today);
```

```css
#sc_drag_area {
  height: 100px;
  left: 150px;
  position: absolute;
  top: 100px;
  width: 250px;
  z-index: 9999;
}
```
