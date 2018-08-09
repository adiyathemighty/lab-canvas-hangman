let hangman = new Hangman();
let hangmancanvas = new HangmanCanvas(hangman.getWord());
console.log(hangmancanvas);
function HangmanCanvas(secretWord) {
  this.ctx = document.getElementById("hangman").getContext("2d");
  this.secretWord = secretWord;
  this.width = parseInt(
    document
      .getElementById("hangman")
      .getAttribute("width")
      .split("px")[0]
  );
  this.height = parseInt(
    document
      .getElementById("hangman")
      .getAttribute("height")
      .split("px")[0]
  );
  this.correctLettersStartingPointX = this.width - this.width * 0.8;
  this.correctLettersStartingPointY = this.height - this.height * 0.2;

  this.incorrectLettersStartingPointX = this.width - this.width * 0.4;
  this.incorrectLettersStartingPointY = this.height - this.height * 0.6;
}

HangmanCanvas.prototype.createBoard = function() {
  this.ctx.clearRect(0, 0, this.width, this.height);
};

HangmanCanvas.prototype.drawLines = function() {
  let numberOfLetter = this.secretWord.length;
  let x = this.correctLettersStartingPointX;
  let y = this.correctLettersStartingPointY;

  for (let i = 0; i < numberOfLetter; i++) {
    this.ctx.beginPath();
    this.ctx.moveTo(x, y);
    this.ctx.lineTo(x + 50, y);

    this.ctx.stroke();
    x += 80;
  }
};

hangmancanvas.drawLines();
window.onkeyup = function(e) {
  if (!hangman.checkIfLetter(e.keyCode)) return;
  console.log(hangman.letters);
  if (!hangman.checkClickedLetters(e.key)) return;

  let correctLetters = hangman.checkIfLetterCorrect(e.key);
  if (correctLetters.length > 0) {
    console.log("i am right");
    hangman.addCorrectLetter(correctLetters[0]);
    hangmancanvas.writeCorrectLetter(correctLetters);
  } else {
    console.log("i am wrong");
    hangman.addWrongLetter(e.key);
    hangmancanvas.writeWrongLetter(e.key, hangman.errorsLeft);
  }
};

HangmanCanvas.prototype.writeCorrectLetter = function(arr) {
  console.log(arr);
  for (let i = 0; i < arr.length; i++) {
    this.ctx.save();
    this.ctx.font = "70px monospace";
    this.ctx.fillText(
      this.secretWord[arr[i]],
      this.correctLettersStartingPointX + 5 + 80 * arr[i],
      this.correctLettersStartingPointY - 5
    );
    this.ctx.restore();
  }
};

HangmanCanvas.prototype.writeWrongLetter = function(letter, errorsLeft) {
  this.ctx.save();
  this.ctx.font = "50px monospace";
  this.ctx.fillText(
    letter,
    this.incorrectLettersStartingPointX + 36 * (8 - errorsLeft),
    this.incorrectLettersStartingPointY
  );
  this.ctx.restore();
};

HangmanCanvas.prototype.drawHangman = function(guess) {
  switch (guess) {
    case 1:
      //draw bottom
      this.ctx.beginPath();
      this.ctx.moveTo(20, 540);
      this.ctx.lineTo(180, 540);
      this.ctx.lineTo(100, 490);
      this.ctx.lineTo(20, 540);
      this.ctx.closePath();
      this.ctx.stroke();
      break;
    case 2:
      //long line
      this.ctx.beginPath();
      this.ctx.moveTo(100, 490);
      this.ctx.lineTo(100, 100);
      this.ctx.closePath();
      this.ctx.stroke();

      break;
    case 3:
      //horizontal line
      this.ctx.beginPath();
      this.ctx.moveTo(100, 100);
      this.ctx.lineTo(300, 100);
      this.ctx.closePath();
      this.ctx.stroke();
      break;
    case 4:
      //little stick
      this.ctx.beginPath();
      this.ctx.moveTo(300, 100);
      this.ctx.lineTo(300, 150);
      this.ctx.closePath();
      this.ctx.stroke();
      break;
    case 5:
      //head
      this.ctx.beginPath();
      this.ctx.arc(300, 180, 30, Math.PI * 2, 0);
      this.ctx.stroke();
      break;
    case 6:
      //draw body
      this.ctx.beginPath();
      this.ctx.moveTo(300, 210);
      this.ctx.lineTo(300, 300);
      this.ctx.closePath();
      this.ctx.stroke();
      break;
    case 7:
      //left arm
      this.ctx.beginPath();
      this.ctx.moveTo(300, 230);
      this.ctx.lineTo(250, 250);
      this.ctx.closePath();
      this.ctx.stroke();
      break;
    case 8:
      //right arm
      this.ctx.beginPath();
      this.ctx.moveTo(300, 230);
      this.ctx.lineTo(350, 250);
      this.ctx.closePath();
      this.ctx.stroke();
      break;
    case 9:
      //left leg
      this.ctx.beginPath();
      this.ctx.moveTo(300, 300);
      this.ctx.lineTo(250, 340);
      this.ctx.closePath();
      this.ctx.stroke();
      break;
    case 10:
      //right leg
      this.ctx.beginPath();
      this.ctx.moveTo(300, 300);
      this.ctx.lineTo(350, 340);
      this.ctx.closePath();
      this.ctx.stroke();
      break;
  }
};

HangmanCanvas.prototype.gameOver = function() {};

HangmanCanvas.prototype.winner = function() {};

hangmancanvas.drawHangman();
