import { NotImplementedError } from "../extensions/index.js";

/**
 * Create transformed array based on the control sequences that original
 * array contains
 *
 * @param {Array} arr initial array
 * @returns {Array} transformed array
 *
 * @example
 *
 * transform([1, 2, 3, '--double-next', 4, 5]) => [1, 2, 3, 4, 4, 5]
 * transform([1, 2, 3, '--discard-prev', 4, 5]) => [1, 2, 4, 5]
 *
 */
export default function transform(arr) {
  let res;

  if (Array.isArray(arr)) {
    res = [...arr];
  } else throw new Error("'arr' parameter must be an instance of the Array!");

  if (
    (res.includes("--discard-next") && res.includes("--double-prev")) ||
    (res.includes("--discard-next") && res.includes("--discard-prev"))
  ) {
    let disNextInd = res.indexOf("--discard-next");
    let doubPrevInd = res.indexOf("--double-prev");
    let disPrevInd = res.indexOf("--discard-prev");

    if (disNextInd === doubPrevInd - 2 || disNextInd === disPrevInd - 2) {
      res.splice(disNextInd, 3);
    }
  }

  if (res.includes("--double-next")) {
    let i = res.indexOf("--double-next");
    i === res.length - 1 ? res.splice(i, 1) : (res[i] = res[i + 1]);
  }

  if (res.includes("--double-prev")) {
    let i = res.indexOf("--double-prev");
    i === 0 ? res.splice(0, 1) : (res[i] = res[i - 1]);
  }

  if (res.includes("--discard-next")) {
    let i = res.indexOf("--discard-next");
    if (res[i + 1]) res.splice(i, 2);
    else res.splice(i, 1);
  }

  if (res.includes("--discard-prev")) {
    let i = res.indexOf("--discard-prev");
    if (res[i - 1]) res.splice(i - 1, 2);
    else res.splice(i, 1);
  }

  return res;
}
