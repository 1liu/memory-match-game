var firstCardClicked;
var firstCardSibling;
var secondCardClicked;
var secondCardSibling
var firstCardClasses;
var secondCardClasses;
var maxMatches = 9;
var matches = 0;
var gamesPlayed = -1;
var attempts = 0;
var mode = 0;

// Media Queries
function displayRotate(x) {
  if (x.matches) { // If media query matches
    document.querySelector("#start").classList.add("hidden");
    document.querySelector("#rotateReminder").classList.remove("hidden");
    document.querySelector(".container").classList.add("blur");

  } else {
    document.querySelector("#rotateReminder").classList.add("hidden");
    document.querySelector("#start").classList.remove("hidden");
    // document.querySelector(".container").classList.remove("blur");

  }
}

var x = window.matchMedia("(max-width: 560px)");
displayRotate(x); // Call listener function at run time
x.addListener(displayRotate); // Attach listener function on state changes

//

shuffleCards();
//Mode Selection
var easy = document.querySelector("#button-easy");
easy.addEventListener("click", function () {
  mode = 1;
  easy.classList.add("red");
  normal.classList.remove("red");
  hard.classList.remove("red");
});
var normal = document.querySelector("#button-normal");
normal.addEventListener("click", function () {
  mode = 2;
  normal.classList.add("red");
  easy.classList.remove("red");
  hard.classList.remove("red");
});
var hard = document.querySelector("#button-hard");
hard.addEventListener("click", function () {
  mode = 3;
  hard.classList.add("red");
  easy.classList.remove("red");
  normal.classList.remove("red");
});

//Start Function
var startButton = document.querySelector("#button-start");
startButton.addEventListener("click", startGame);

var gameCards = document.querySelector(".gameCards");
gameCards.addEventListener("click", handleClick);
// console.log("event:",event);
//Reset Function
var reset = document.querySelector("#reset");
reset.addEventListener("click", resetGame);

//Hint Function
var hint = document.querySelector("#hint");
hint.addEventListener("click", hintFunction);

// Handle Function
function handleClick(event) {
  if (event.target.className.indexOf("card-back") === -1) {
    return;
  }
  // console.log("event:", event);

  if (!firstCardClicked) {
    firstCardClicked = event.target;
    firstCardClicked.classList.add("hidden");
    firstCardSibling = firstCardClicked.previousElementSibling;
    firstCardClasses = firstCardSibling.className;
    firstCardSibling.classList.remove("hidden");
    setTimeout(hideFirstCard, 500);
  }
  else {
    if (event.target !== firstCardClicked) {
      // clicked two different cards
      secondCardClicked = event.target;
      secondCardClicked.classList.add("hidden");
      secondCardSibling = event.target.previousElementSibling;
      secondCardClasses = secondCardSibling.className;
      secondCardSibling.classList.remove("hidden");
      gameCards.removeEventListener("click", handleClick);

      if (firstCardClasses === secondCardClasses) {
        matches++;
        showFirstCard();
        if (matches === maxMatches) {
          console.log("attempts:", attempts);
          document.querySelector("#win").classList.remove("hidden");

          // reset mode here
          mode = 0;
        }
        firstCardClicked = null;
        secondCardClicked = null;
        gameCards.addEventListener("click", handleClick);
      }
      else {
        // not match; flip back both
        console.log("attempts:", attempts);
        setTimeout(hideBoth, 2000 - mode * 600);
      }
      attempts++;
      displayStats();
    }
    else {
      // clicked two same cards
    }
  }
}
var win_button = document.querySelector("#win_button");
win_button.addEventListener("click", resetGame);

function hideBoth() {
  firstCardClicked.classList.remove("hidden");
  secondCardClicked.classList.remove("hidden");

  firstCardSibling.classList.add("hidden");
  secondCardSibling.classList.add("hidden");
  firstCardClicked = null;
  secondCardClicked = null;
  gameCards.addEventListener("click", handleClick);
}
function hideFirstCard() {
  firstCardClicked.classList.remove("hidden");
  firstCardSibling.classList.add("hidden");
}

function displayStats() {
  document.querySelector("#gamesPlayed").textContent = gamesPlayed;
  document.querySelector("#attempts").textContent = attempts;
  document.querySelector("#accuracy").textContent = calculateAccuracy(attempts, matches) + "%";
}

function calculateAccuracy(attempts, matches) {
  if (attempts === 0) {
    return 0;
  }
  return Math.trunc(matches / attempts * 100);

}

function resetGame() {
  resetCards();
  shuffleCards();
  matches = 0;
  gamesPlayed++;
  attempts = 0;
  accuracy = 0;
  // mode = 0;
  displayStats();
  document.querySelector("#win").classList.add("hidden");
  document.querySelector("#start").classList.add("hidden");
  // easy.classList.remove("red");
  // normal.classList.remove("red");
  // hard.classList.remove("red");
  flipAll();
  setTimeout(flipAll, 3000 - 500 * mode);
}

function resetCards() {
  var x = document.querySelectorAll(".card-back");
  for (let i = 0; i < x.length; i++) {
    x[i].classList.remove("hidden");
    x[i].previousElementSibling.classList.add("hidden");
  }

}

function shuffleCards() {
  var cards = document.querySelectorAll(".card-front");
  for (let i = 0; i < cards.length; i++) {
    var randomPosition = Math.floor(Math.random() * cards.length)
    var placeHolder = cards[i].className;
    cards[i].className = cards[randomPosition].className;
    cards[randomPosition].className = placeHolder;

  }

}

function startGame() {
  if (mode) {
    document.querySelector(".container").classList.remove("blur");
    resetGame();
    //
    flipAll();
    setTimeout(flipAll, 3000 - 500 * mode);
    //
    document.querySelector(".container").classList.remove("no-click");
  }
}

function hintFunction() {
  console.log("Hint Clicked");
  flipAll();
  setTimeout(flipAll, 250);
}

function flipAll() {
  var allCards = document.querySelectorAll(".card-front,.card-back");
  for (let i = 0; i < allCards.length; i++) {
    if (allCards[i].classList.contains("hidden")) {
      allCards[i].classList.remove("hidden");
    }
    else {
      allCards[i].classList.add("hidden");
    }
  }
}

function showFirstCard() {
  firstCardClicked.classList.add("hidden");
  firstCardSibling.classList.remove("hidden");
}

function showAllCards() {

}
