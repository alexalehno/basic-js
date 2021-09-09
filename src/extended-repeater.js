import { NotImplementedError } from "../extensions/index.js";

/**
 * Create a repeating string based on the given parameters
 *
 * @param {String} str string to repeat
 * @param {Object} options options object
 * @return {String} repeating string
 *
 *
 * @example
 *
 * repeater('STRING', { repeatTimes: 3, separator: '**',
 * addition: 'PLUS', additionRepeatTimes: 3, additionSeparator: '00' })
 * => 'STRINGPLUS00PLUS00PLUS**STRINGPLUS00PLUS00PLUS**STRINGPLUS00PLUS00PLUS'
 *
 */
export default function repeater(str, options) {
  let sep = options.separator;
  let rep = options.repeatTimes;
  let add = options.addition;
  let addRep = options.additionRepeatTimes;
  let addSep = options.additionSeparator;

  !sep ? (sep = "+") : sep;
  !addSep ? (addSep = "|") : addSep;
  !rep ? (rep = 1) : rep;
  !addRep ? (addRep = 1) : addRep;

  function createAdd() {
    if (String(add) && String(add) !== "undefined") {
      let res = (add + addSep).repeat(addRep).split("");
      return res.slice(0, res.length - addSep.length).join("");
    }
    return "";
  }

  function createRepStr() {
    str += createAdd();
    let res = (str + sep).repeat(rep).split("");
    return res.slice(0, res.length - sep.length).join("");
  }

  return createRepStr();
}
