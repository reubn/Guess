require("../css");
require("../fonts");

const React = require("react");
const ReactDOM = require("react-dom");

const Board = require("Board");

function Game(config){
  this.config = config;

  this.randomDot = () => this.config.dots[Math.floor(Math.random() * this.config.dots.length)]

  this.createSequence = () => Array.apply(null, {length: this.config.length}).map(this.randomDot)

  this.guess = sequence => {
    this.score.guesses++;

    const result = [];

    const correct = this.sequence.slice()

    const guess = sequence.slice()

    for (let ci = 0; ci < correct.length; ci++) {
      if (correct[ci].key === guess[ci].key && correct[ci].key !== null) {
        result.push("F");
        correct[ci] = guess[ci] = {
          key: null
        }
      }
    }

    for (let ci = 0; ci < correct.length; ci++) {
      for (let gi = 0; gi < guess.length; gi++) {
        if (correct[ci].key === guess[gi].key && correct[ci].key !== null) {
          result.push("H");
          correct[ci] = guess[gi] = {
            key: null
          }
        }
      }
    }
    return shuffle(result)
  }

  this.score = {levelsCompleted: 0, guesses: 0};

  this.sequence = this.createSequence();
  this.board = <Board game={this}/>;
  this.root = ReactDOM.render(this.board, document.body);

  return this
}

module.exports = Game;

function shuffle(array){
  let currentIndex = array.length
  let temporaryValue
  let randomIndex
  // While there remain elements to shuffle...
  while (currentIndex !== 0) {
    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;
    // And swap it with the current element.
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}
