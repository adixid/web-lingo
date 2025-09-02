let myRound = 1;
let myScore = 0;
let myWord = [];
let myAttempts = 0;

const myIds = [["js-11", "js-12", "js-13", "js-14"],
              ["js-21", "js-22", "js-23", "js-24"],
              ["js-31", "js-32", "js-33", "js-34"],
              ["js-41", "js-42", "js-43", "js-44"],
              ["js-51", "js-52", "js-53", "js-54"]];
      
let counter = 0;
const borderMarkerColour = "red";
const correctPosition = 'green';
const wrongPosition = 'orange';

function findWord() { // computer finds his secret word
  let randomNumber = Math.floor(Math.random() * 1874);
  computerWord = words[randomNumber];
}

function showFirstLetter() {
  document.getElementById(myIds[myAttempts][0]).innerHTML = computerWord[0];
  document.getElementById(myIds[myAttempts][0]).style.color = "darkgray";
  document.getElementById(myIds[myAttempts][0]).style.backgroundColor = correctPosition;
  document.getElementById(myIds[myAttempts][0]).style.borderColor = borderMarkerColour;
}

function myLetter(event) {  // type in letters and display them
  document.addEventListener("keydown", event => {
    if (counter < 4)  {
      let newLetter = document.getElementById(myIds[myAttempts][counter]); // where are we adding letter
      newLetter.textContent = event.key;  // letter pressed
      document.getElementById(myIds[myAttempts][counter]).style.color = "white"; // font colour
      document.getElementById(myIds[myAttempts][counter]).style.borderColor = "gray";
      if (counter < 3)
        document.getElementById(myIds[myAttempts][counter+1]).style.borderColor = borderMarkerColour;
      myWord.push(event.key);  // add letter to myword
      counter += 1;
      if (counter === 4) {
        roundEvaluate();
      }
    }
  });
}

function roundEvaluate() {
  // first check all matching letters and mark them
  for (let i=0; i<4; i++) {
    if (myWord[i] ===  computerWord[i]) {
      document.getElementById(myIds[myAttempts][i]).style.backgroundColor = correctPosition;
      if (myAttempts < 3) {
        document.getElementById(myIds[myAttempts+1][i]).style.backgroundColor = correctPosition;
        document.getElementById(myIds[myAttempts+1][i]).innerHTML = computerWord[i];
        document.getElementById(myIds[myAttempts+1][i]).style.color = "darkgray";
      }
    } else if (computerWord.includes(myWord[i])) {  // mark correct letter in wrong position
        document.getElementById(myIds[myAttempts][i]).style.backgroundColor = wrongPosition;
      }   
    }
    document.getElementById(myIds[myAttempts+1][0]).style.borderColor = borderMarkerColour;
  // reset counters for next attempt
  myWord.splice(0,4);
  myAttempts += 1;
  counter = 0;

  if (myAttempts === 1) {
    showFirstLetter();
  }
}
  
findWord();
console.log(computerWord);
showFirstLetter()
myLetter()