var firstCardClicked;
var secondCardClicked;
var firstCardClasses;
var secondCardClasses;
var maxMatches = 9;
var matches=0;
var gamesPlayed = 0;
var attempts = 0;
var accuracy;

var gameCards = document.querySelector("#gameCards");
gameCards.addEventListener("click", handleClick);

function handleClick(event) {
  if (event.target.className.indexOf("card-back") === -1) {
    return;
  }
  var theTarget = event.target;
  theTarget.classList.add("hidden");

  if (!firstCardClicked) {
    firstCardClicked = event.target;
    firstCardClasses = event.target.previousElementSibling.className;
  }
  else {
    secondCardClicked = event.target;
    secondCardClasses = event.target.previousElementSibling.className;
    gameCards.removeEventListener("click", handleClick);

    if (firstCardClasses === secondCardClasses) {
      matches++;
      if (matches === maxMatches) {
        console.log("attempts:", attempts);
        document.querySelector("#win").classList.remove("hidden");
      }
      firstCardClicked = null;
      secondCardClicked = null;
      gameCards.addEventListener("click", handleClick);
    }
    else {
      console.log("attempts:", attempts);
      setTimeout(hide,1500);
    }
    attempts++;
    displayStats();
  }
}
var button = document.querySelector("#button");
button.addEventListener("click", resetGame);

function hide() {
  firstCardClicked.classList.remove("hidden");
  secondCardClicked.classList.remove("hidden");
  firstCardClicked = null;
  secondCardClicked = null;
  gameCards.addEventListener("click", handleClick);
}

function displayStats(){
  document.querySelector("#gamesPlayed").textContent = gamesPlayed;
  document.querySelector("#attempts").textContent = attempts;
  document.querySelector("#accuracy").textContent = calculateAccuracy(attempts,matches)+"%";
}

function calculateAccuracy(attempts, matches){
  if(attempts === 0){
    return 0;
  }
  return Math.trunc(matches/attempts*100);

}

function resetGame(){
  resetCards();
  matches = 0;
  gamesPlayed = 0;
  attempts = 0;
  accuracy = 0;
  displayStats();
  document.querySelector("#win").classList.add("hidden");
}

function resetCards(){
  var x = document.querySelectorAll(".card-back");
  for (let i = 0; i < x.length; i++) {
    x[i].classList.remove("hidden");
  }

}
