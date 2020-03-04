var firstCardClicked;
var secondCardClicked;
var firstCardClasses;
var secondCardClasses;
var maxMatches = 9;
var matches=0;

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
        console.log("You have won");
        document.querySelector("#win").classList.remove("hidden");
      }
      firstCardClicked = null;
      secondCardClicked = null;
      gameCards.addEventListener("click", handleClick);
    }
    else {
      console.log("matches:",matches);
      setTimeout(hide,1500);
    }
  }
}

function hide() {
  firstCardClicked.classList.remove("hidden");
  secondCardClicked.classList.remove("hidden");
  firstCardClicked = null;
  secondCardClicked = null;
  gameCards.addEventListener("click", handleClick);
}
