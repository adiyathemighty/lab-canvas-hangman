// var hangman;

function Hangman() {
  this.words = ["moonkey"];
  this.secretWord = "";
  this.letters = [];
  this.guessedLetter = "";
  this.errorsLeft = 10;
}

Hangman.prototype.getWord = function() {
  let randomIndex = Math.floor(Math.random() * this.words.length);
  this.secretWord = this.words[randomIndex];
  return this.words[randomIndex];
};

Hangman.prototype.checkIfLetter = function(keyCode) {
  keyCode = String.fromCharCode(keyCode);
  if (keyCode.match(/[a-z]/i)) return true;
  else return false;
};

Hangman.prototype.checkClickedLetters = function(key) {
  //if was picked before should return true
  //so that can be pushed into letters
  return !this.letters.includes(key.split("")[0]);
};

Hangman.prototype.checkIfLetterCorrect = function(letter) {
  this.letters.push(letter);
  let correctLetters = [];
  this.secretWord.split("").forEach(function(char, index) {
    if (letter === char) correctLetters.push(index);
  });
  return correctLetters;
};

Hangman.prototype.addCorrectLetter = function(i) {
  this.guessedLetter += this.secretWord[i].toString().toUpperCase();
  this.checkWinner();
};

Hangman.prototype.addWrongLetter = function(letter) {
  this.errorsLeft--;
  this.checkGameOver();
};

Hangman.prototype.checkGameOver = function() {
  return this.errorsLeft <= 0;
};

Hangman.prototype.checkWinner = function() {
  let adiyasExperiment = this.secretWord.split('').filter(function(letter, index, word) {
    return word.includes(letter);
  });
  return adiyasExperiment.length === this.guessedLetter.length;
};

document.getElementById("start-game-button").onclick = function() {
  hangman = new Hangman();
};

document.onkeydown = function(e) {};
