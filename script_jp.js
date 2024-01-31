const gameContainer = document.getElementById("game");
let firstCard = null;
let secondCard = null;
let counts = 0;
let noClicking = false;

const COLORS = [
  "red",
  "blue",
  "green",
  "orange",
  "purple",
  "red",
  "blue",
  "green",
  "orange",
  "purple"
];

// here is a helper function to shuffle an array
// it returns the same array with values shuffled
// it is based on an algorithm called Fisher Yates if you want ot research more
function shuffle(array) {
  let counter = array.length;

  // While there are elements in the array
  while (counter > 0) {
    // Pick a random index
    let index = Math.floor(Math.random() * counter);
    // Decrease counter by 1
    counter--;
    // And swap the last element with it
    let temp = array[counter];
    array[counter] = array[index];
    array[index] = temp;
  }
  return array;
}

let shuffledColors = shuffle(COLORS);
let clicks = 0;

// this function loops over the array of colors
// it creates a new div and gives it a class with the value of the color
// it also adds an event listener for a click for each card
function createDivsForColors(colorArray) {
  for (let color of colorArray) {
    // create a new div
    const newDiv = document.createElement("div");
    // give it a class attribute for the value we are looping over
    newDiv.classList.add(color);
    // call a function handleCardClick when a div is clicked on
    newDiv.addEventListener("click", handleCardClick);
    // append the div to the element with an id of game
    gameContainer.append(newDiv);
  }
}

function handleCardClick(event) {
  if (noClicking) return;
  if (event.target.classList.contains("flipped")) return;

  let checkCard = event.target;
  checkCard.style.backgroundColor = checkCard.classList[0];

  if (firstCard === null || secondCard === null) { // true from the start until 2 cards recovered
    checkCard.classList.add("flipped"); // the card clicked on is set to flipped
    if (firstCard === null) {
    firstCard = checkCard; // firstCard will be assigned check card if not uncovered yet
    }
    else {
      secondCard = checkCard; // check card is assigned to secondCard if first card alreday flipped
    }
  }

  if (firstCard !== null && secondCard !== null) { // both cards uncovered
    noClicking = true; // make sure to not allow further clicking

    let comp1 = firstCard.className;
    let comp2 = secondCard.className;

    if (comp1 === comp2) { // if statement for equal colors
      counts += 2; // counter set 2 up
      firstCard.removeEventListener("click", handleCardClick);
      secondCard.removeEventListener("click", handleCardClick); // event listener removed if cards match
      firstCard = null;
      secondCard = null;
      noClicking = false; // reset of values
    } 
    else {
      setTimeout(function() { // cards don't match and will be flipped again
        firstCard.classList.remove("flipped");
        secondCard.classList.remove("flipped"); // remive 'flipped' from class list
        firstCard.style.backgroundColor = "";
        secondCard.style.backgroundColor = ""; // reset colors to none
        firstCard = null;
        secondCard = null;
        noClicking = false; // reset of values
      }, 1000); // cards flipped after 1s
    }
  }

  if (counts === COLORS.length) { // game is ended when all colors matched
    alert("All equal cards flipped!");
  }
}

// when the DOM loads
createDivsForColors(shuffledColors);

  // you can use event.target to see which element was clicked
  // event.preventDefault(); // preventing default behaviour
  // let clickedCard = event.target; // the clicked div-color is asigned
  // clicks++
  // console.log(clicks)
  // setInterval(function() {
  //   console.log('hi')
  // }, 1000);
  // clearInterval(1);

  // if (clicks === 1) {
  //   firstColor = clickedCard.classList[0];
  //   firstCard = event.target;
  //   firstCard.style.backgroundColor = firstColor;
  // }
  // else {
  //   if (firstColor !== clickedCard.classList[0]) {
  //     secondColor = clickedCard.classList[0];
  //     secondCard = event.target;
  //     secondCard.style.backgroundColor = secondColor;
  //     setInterval(function() {
  //       firstCard.style.backgroundColor = 'white';
  //       secondCard.style.backgroundColor = 'white';
  //     }, 1000);
  //     console.log(firstCard.style.backgroundColor)
  //     console.log(secondCard.style.backgroundColor)
  //     clearInterval(1);
  //   }
  //   else {
  //     clickedCard.style.backgroundColor = clickedCard.classList[0];
  //     console.log(clickedCard.classList[0])
  //   }
  //   clicks = 0;
  // }
