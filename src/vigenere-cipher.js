import { NotImplementedError } from "../extensions/index.js";

/**
 * Implement class VigenereCipheringMachine that allows us to create
 * direct and reverse ciphering machines according to task description
 *
 * @example
 *
 * const directMachine = new VigenereCipheringMachine();
 *
 * const reverseMachine = new VigenereCipheringMachine(false);
 *
 * directMachine.encrypt('attack at dawn!', 'alphonse') => 'AEIHQX SX DLLU!'
 *
 * directMachine.decrypt('AEIHQX SX DLLU!', 'alphonse') => 'ATTACK AT DAWN!'
 *
 * reverseMachine.encrypt('attack at dawn!', 'alphonse') => '!ULLD XS XQHIEA'
 *
 * reverseMachine.decrypt('AEIHQX SX DLLU!', 'alphonse') => '!NWAD TA KCATTA'
 *
 */
export default class VigenereCipheringMachine {
  constructor(direct) {
    this.isDirect = direct;
  }

  encrypt(message, key) {
    if (!message || !key || (!message && !key)) {
      throw new Error("Incorrect arguments!");
    }

    function createVigTable() {
      let table = [];
      let arrSymb = [];

      for (let i = 0; i < 26; i++) {
        arrSymb.push(String.fromCodePoint(i + 65));
      }

      for (let i = 0; i < 26; i++) {
        let pre = [...arrSymb];
        table.push(pre.splice(i).concat(pre));
      }

      return table;
    }

    function createMessage() {
      let str = "";
      let other = "";
      for (let ch of message) {
        ch = ch.toUpperCase();
        if (vigTable[0].includes(ch)) {
          str += ch;
        } else other += ch.trim();
      }
      return [str, other];
    }

    function createKey() {
      let keyWord = "";
      while (keyWord.length < str.length) {
        keyWord += key.toUpperCase();
      }
      return keyWord.split("").splice(0, str.length).join("");
    }

    let vigTable = createVigTable();
    let [str, other] = createMessage();
    let keyW = createKey();

    let result = [];
    let preRes = "";

    for (let i = 0; i < str.length; i++) {
      let r = vigTable[0].indexOf(str[i]);
      let c = vigTable[0].indexOf(keyW[i]);
      preRes += vigTable[r][c];
    }

    preRes = (preRes + other).split("");

    if (this.isDirect || this.isDirect === undefined) {
      message.split(" ").forEach((el) => {
        result.push(preRes.splice(0, el.length).join(""));
      });
      return result.join(" ");
    } else {
      message.split(" ").forEach((el) => {
        result.push(preRes.splice(0, el.length).reverse().join(""));
      });
      return result.reverse().join(" ");
    }
  }

  decrypt(message, key) {
    if (!message || !key || (!message && !key)) {
      throw new Error("Incorrect arguments!");
    }
    function createVigTable() {
      let table = [];
      let arrSymb = [];

      for (let i = 0; i < 26; i++) {
        arrSymb.push(String.fromCodePoint(i + 65));
      }

      for (let i = 0; i < 26; i++) {
        let pre = [...arrSymb];
        table.push(pre.splice(i).concat(pre));
      }

      return table;
    }

    function createMessage() {
      let str = "";
      let other = "";
      for (let ch of message) {
        ch = ch.toUpperCase();
        if (vigTable[0].includes(ch)) {
          str += ch;
        } else other += ch.trim();
      }
      return [str, other];
    }

    function createKey() {
      let keyWord = "";
      while (keyWord.length < str.length) {
        keyWord += key.toUpperCase();
      }
      return keyWord.split("").splice(0, str.length).join("");
    }


    let vigTable = createVigTable();
    let [str, other] = createMessage();
    let keyW = createKey();
    let result = [];
    let preRes = "";

    for (let i = 0; i < str.length; i++) {
      let r = vigTable[0].indexOf(keyW[i]);
      let c = vigTable[r].indexOf(str[i]);
      preRes += vigTable[0][c];
    }

    preRes = (preRes + other).split("");

    if (this.isDirect || this.isDirect === undefined) {
      message.split(" ").forEach((el) => {
        result.push(preRes.splice(0, el.length).join(""));
      });
      return result.join(" ");
    } else {
      message.split(" ").forEach((el) => {
        result.push(preRes.splice(0, el.length).reverse().join(""));
      });
      return result.reverse().join(" ");
    }
  }
}
