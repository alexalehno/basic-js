import { NotImplementedError } from "../extensions/index.js";

/**
 * Given some integer, find the maximal number you can obtain
 * by deleting exactly one digit of the given number.
 *
 * @param {Number} n
 * @return {Number}
 *
 * @example
 * For n = 152, the output should be 52
 *
 */
export default function deleteDigit(n) {
  let arr = String(n).split("");
  let firstEl = +arr[0];

  for (let i = 1; i < arr.length; i++) {
    if (firstEl > +arr[i]) {
      let ind = arr.indexOf(arr[i]);
      arr.splice(ind, 1);
      return +arr.join("");
    }

    if (firstEl < +arr[i]) {
      let ind = arr.indexOf(String(firstEl));
      arr.splice(ind, 1);
      return +arr.join("");
    }
  }
}
