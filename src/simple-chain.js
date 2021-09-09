import { NotImplementedError } from "../extensions/index.js";

/**
 * Implement chainMaker object according to task description
 *
 */
export default {
  chainValue: [],

  getLength() {
    return this.chainValue.length;
  },

  addLink(value) {
    value !== undefined
      ? this.chainValue.push(`( ${value} )`)
      : this.chainValue.push("( )");
    return this;
  },

  removeLink(position) {
    if (isNaN(position) || position < 1 || position > this.chainValue.length) {
      this.chainValue = [];
      throw new Error("You can't remove incorrect link!");
    }
    this.chainValue.splice(position - 1, 1);
    return this;
  },

  reverseChain() {
    this.chainValue.reverse();
    return this;
  },

  finishChain() {
    let res = this.chainValue.join("~~");
    this.chainValue = [];
    return res;
  },
};
