/** Textual markov chain generator */


class MarkovMachine {

  /** build markov machine; read in text.*/

  constructor(text) {
    let words = text.split(/[ \r\n]+/);
    this.words = words.filter(c => c !== "");
    this.makeChains();
  }

  /** set markov chains:
   *
   *  for text of "the cat in the hat", chains will be
   *  {"the": ["cat", "hat"], "cat": ["in"], "in": ["the"], "hat": [null]} */

  makeChains() {
    // TODO
    let chains = new Map();

    for(let i = 0; i < this.words.length; i++) {
      let word = this.words[i];
      let next = this.words[i+1] || null;

      if (chains.has(word)) {
        chains.get(word).push(next);
      } else {
        chains.set(word, [next]);
      }
      //try without this and see what happens
      this.chains = chains;

    }
  }


  /** return random text from chains */

  makeText(numWords = 100) {
    // TODO
    let keys = Array.from(this.chains.keys());
    let key = keys[Math.floor(Math.random() * keys.length)];
    let output = [];

    while(output.length < numWords && key != null) {
      output.push(key);
      keys = this.chains.get(key);
      key = keys[Math.floor(Math.random() * keys.length)];
    }

    return output.join(" ");
  }
}

module.exports = {
  MarkovMachine
};