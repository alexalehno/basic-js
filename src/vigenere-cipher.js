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

    function createKey(k) {
      k = k.toUpperCase();
      let str = "";
      let keyWord = [];

      while (str.length < message.length) {
        str += k;
      }

      let arrKey = str.split("");

      message.split(" ").forEach((el) => {
        keyWord.push(arrKey.splice(0, el.length).join(""));
      });

      return keyWord.join(" ");
    }

    let vigTable = createVigTable();

    message = message.toUpperCase();
    let keyWord = createKey(key);

    let result = "";

    for (let i = 0; i < message.length; i++) {
      let r = vigTable[0].indexOf(message[i]);
      let c = vigTable[0].indexOf(keyWord[i]);

      if (r !== -1 && c !== -1) {
        result += vigTable[r][c];
      } else {
        result += message[i];
      }
    }

    if (this.isDirect === true || this.isDirect === undefined) {
      return result;
    } else {
      return result.split("").reverse().join("");
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

    function createKey(k) {
      k = k.toUpperCase();
      let str = "";
      let keyWord = [];

      while (str.length < message.length) {
        str += k;
      }

      let arrKey = str.split("");

      message.split(" ").forEach((el) => {
        keyWord.push(arrKey.splice(0, el.length).join(""));
      });

      return keyWord.join(" ");
    }

    let vigTable = createVigTable();

    message = message.toUpperCase();
    let keyWord = createKey(key);

    let result = "";

    for (let i = 0; i < message.length; i++) {
      let r = vigTable[0].indexOf(keyWord[i]);
      let c = -1;

      if (r !== -1) {
        c = vigTable[r].indexOf(message[i]);
      }

      if (r !== -1 && c !== -1) {
        result += vigTable[0][c];
      } else {
        result += message[i];
      }
    }

    if (this.isDirect === true || this.isDirect === undefined) {
      return result;
    } else {
      return result.split("").reverse().join("");
    }
  }
}
