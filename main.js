var gameCards = document.querySelector("#gameCards");
gameCards.addEventListener("click", handleClick);

function handleClick(event){
  if (event.target.className.indexOf("card-back") === -1) {
    return;
  }
  console.log("event:", event)
  var theTarget = event.target;
  theTarget.classList.add("hidden");
}
