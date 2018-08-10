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
    this.incorrectLettersStartingPointX + 36 * (10 - errorsLeft),
    this.incorrectLettersStartingPointY
  );
  this.ctx.restore();
  this.drawHangman(10-errorsLeft)
};

HangmanCanvas.prototype.drawHangman = function(guess) {
  switch (guess) {
    case 1:
      //draw bottom
      printHangmanPart("base")(20, 540);
      break;
    case 2:
      //long line
      printHangmanPart()(100, 490, 100, 100);
      break;
    case 3:
      //horizontal line
      printHangmanPart()(100, 100, 300, 100);
      break;
    case 4:
      //little stick
      printHangmanPart()(300, 100, 300, 150);
      break;
    case 5:
      //head
      printHangmanPart("head")(300, 180);
      break;
    case 6:
      //draw body
      printHangmanPart()(300, 210, 300, 300);
      break;
    case 7:
      //left arm
      printHangmanPart()(300, 230, 250, 250);
      break;
    case 8:
      //right arm
      printHangmanPart()(300, 230, 350, 250);
      break;
    case 9:
      //left leg
      printHangmanPart()(300, 300, 250, 340);
      break;
      case 10:
      //right leg
      printHangmanPart()(300, 300, 350, 340);
      break;
  }
  function printHangmanPart(part) {
    if (part === "head") {
      return function(x, y) {
        hangmancanvas.ctx.beginPath();
        hangmancanvas.ctx.arc(x, y, 30, Math.PI * 2, 0);
        hangmancanvas.ctx.closePath();
        hangmancanvas.ctx.stroke();
      };
    } else if (part === "base") {
      return function(x, y) {
        //x: 20 y: 540
        hangmancanvas.ctx.beginPath();
        hangmancanvas.ctx.moveTo(x, y);
        hangmancanvas.ctx.lineTo(x + 160, y);
        hangmancanvas.ctx.lineTo(x + 80, y - 50);
        hangmancanvas.ctx.lineTo(x, y);
        hangmancanvas.ctx.closePath();
        hangmancanvas.ctx.stroke();
      };
    } else {
      return function(x1, y1, x2, y2) {
        hangmancanvas.ctx.beginPath();
        hangmancanvas.ctx.moveTo(x1, y1);
        hangmancanvas.ctx.lineTo(x2, y2);
        hangmancanvas.ctx.closePath();
        hangmancanvas.ctx.stroke();
      };
    }
  }
};

HangmanCanvas.prototype.gameOver = function() {};

HangmanCanvas.prototype.winner = function() {};
