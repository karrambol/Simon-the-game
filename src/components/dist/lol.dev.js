"use strict";

var arr = Array(500000);
arr.fill(0);
arr = arr.map(function (el) {
  return Math.floor(Math.random() * 4);
});
console.log(arr.reduce(function (acc, el) {
  acc[el] = acc[el] + 1;
  return acc;
}, [0, 0, 0, 0]));