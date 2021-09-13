import { NotImplementedError } from "../extensions/index.js";

/**
 * Given a string, return its encoding version.
 *
 * @param {String} str
 * @return {String}
 *
 * @example
 * For aabbbc should return 2a3bc
 *
 */
export default function encodeLine(str) {
  let result = "";

  if (str) {
    let pre = "";

    for (let i = 0; i < str.length; i++) {
      pre += str[i];
      
      if (str[i] !== str[i + 1]) {
        pre += " ";
      }
    }

    pre = pre.trim().split(" ");

    for (let i = 0; i < pre.length; i++) {
      if (pre[i].length > 1) {
        result += `${pre[i].length}${pre[i][0]}`;
      } else {
        result += `${pre[i][0]}`;
      }
    }
  }

  return result;
}
