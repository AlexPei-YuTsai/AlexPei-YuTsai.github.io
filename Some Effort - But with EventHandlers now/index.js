function makeSound(element){
  switch (element) {
    case "w":
      new Audio("sounds/crash.mp3").play();
      break;
    case "a":
      new Audio("sounds/kick-bass.mp3").play();
      break;
    case "s":
      new Audio("sounds/snare.mp3").play();
      break;  
    case "d":
      new Audio("sounds/tom-1.mp3").play();
      break;
    case "j":
      new Audio("sounds/tom-2.mp3").play();
      break;
    case "k":
      new Audio("sounds/tom-3.mp3").play();
      break;
    case "l":
      new Audio("sounds/tom-4.mp3").play();
      break;
    default:
      break;
  }
};
function doStuff(element){
  document.querySelector("."+element).classList.add("pressed");
  setTimeout(function(){
    document.querySelector("."+element).classList.remove("pressed")
  }, 150);
}

//Higher Order Functions let's goooo
for (let i=0; i<document.querySelectorAll(".drum").length; i++){
  document.querySelectorAll(".drum")[i].addEventListener("click", function(){
    makeSound(this.innerHTML);
    doStuff(this.innerHTML);
})
};

document.addEventListener("keydown", function(event){
  makeSound(event.key);
  doStuff(event.key);
});
