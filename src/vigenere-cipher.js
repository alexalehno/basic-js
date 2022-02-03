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

    message = message.toUpperCase();

    let vigTable = this.createVigTable();
    let keyWord = this.createKey(message, key);
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

    return this.choseDirection(result);
  }

  decrypt(message, key) {
    if (!message || !key || (!message && !key)) {
      throw new Error("Incorrect arguments!");
    }

    message = message.toUpperCase();

    let vigTable = this.createVigTable();
    let keyWord = this.createKey(message, key);
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

    return this.choseDirection(result);
  }

  createVigTable() {
    let table = [];
    let tableRow = [];

    for (let i = 0; i < 26; i++) {
      tableRow.push(String.fromCodePoint(i + 65));
    }

    for (let i = 0; i < 26; i++) {
      let row = [...tableRow];
      table.push(row.splice(i).concat(row));
    }

    return table;
  }

  createKey(message, key) {
    key = key.toUpperCase();
    let str = "";
    let keyWord = [];

    while (str.length < message.length) {
      str += key;
    }

    let arrKey = str.split("");

    message.split(" ").forEach((el) => {
      keyWord.push(arrKey.splice(0, el.length).join(""));
    });

    return keyWord.join(" ");
  }

  choseDirection(res) {
    if (this.isDirect === true || this.isDirect === undefined) {
      return res;
    } else {
      return res.split("").reverse().join("");
    }
  }
}
