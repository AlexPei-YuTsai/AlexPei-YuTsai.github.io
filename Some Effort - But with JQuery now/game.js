let buttonColors=["red","blue","green","yellow"];
let messageBox=["Wow!", "Good going!", "Nice!", "Let's go!", "Great job!", "Keep it up!", "You can do better than that!"];
let failBox=["Damn!", "Ain't that a shame!", "Wow...", "Oh no!", "Better luck next time!", "Haha! Oh."]
//Initializing stuff
let gamePattern=[];
let userPattern=[];
let stage=0;
let start=true;
//buttons start out disabled

function toggleSwitches(){
  $(".btn").toggleClass("disabled");
}

function reset(){
  gamePattern=[];
  userPattern=[];
  stage=0;
}

function noiser(color){
  new Audio("sounds/"+color+".mp3").play();
}

//Start Game here
$(document).keydown(function(){
  if (start){
    reset();
    start=false;
    stopText();
    $("h1").removeClass("swapper");
    nextSeq();
  };
  //Make sure people can't spam this function.
});

//Game Logic
function nextSeq(){
  stage++;
  $("#level-title").html("Level "+stage);
  if(!($(".btn").hasClass("disabled"))){
    toggleSwitches();
  }
  //Stage prep - Update level name and make sure people don't click on stuff they shouldn't click on.

  let randColor=buttonColors[Math.floor(Math.random()*4)];
  gamePattern.push(randColor);
  //Generates a new stage color

  loopSimon(gamePattern, Math.max(200, (500-(20*gamePattern.length))));
  //Game gets gradually faster
  return gamePattern;
}

$(".btn").click(function(event){
  let userColor=this.id;
  //"this" doesn't work in setTimeout, so yea...
  userPattern.push(userColor);
  noiser(userColor);
  $("."+userColor).toggleClass("pressed");
  setTimeout(function(){
    $("."+userColor).toggleClass("pressed");
  }, 200);
  checkingAnswers();
  //toggleSwitch should not be called here.
});

function checkingAnswers(){
  //Attached to Click Event so we don't have to while-loop this and destroy the fucking browser.
  let i=userPattern.length-1;
  if(userPattern[i]!=gamePattern[i]){
    //If the user fucks up even once, Game Over, restart.
    gameOver(failBox);
    return;
  }

  //Restart user tray once level is complete
  if (userPattern.length==gamePattern.length){
    userPattern=[];
    congrats(messageBox);
  }
}

//I don't really know await or arrow syntax, but I'll learn that later.
//Resolves promise after "time" delay
const wait = (time) => new Promise(resolve => setTimeout(resolve, time));
//Iterates through the array at "time" intervals
const loopSimon = async (array, time) => {
  for (let i=0; i<array.length; i++) {
    noiser(array[i]);
    $("."+array[i]).fadeToggle(100).fadeToggle(100);
    await wait(time);
  }
  toggleSwitches();
  //Gives players control after issuing commands.
};

const congrats = async(array) => {
  toggleSwitches();
  $("#level-title").html(array[Math.floor(Math.random()*array.length)]);
  await wait(1000);
  nextSeq();
}

let endInterval;
//setInterval returns an ID, so we gotta do that.
function endGame(){
  //Makes sure there's only one interval running at a time.
  if (!endInterval){
    endInterval=setInterval(swapText,2000);
  }
}
function swapText(){
  if($("h1").hasClass("swapper")){
    $("h1").toggleClass("swapper");
    $("#level-title").html("Press Any Key to Try Again!");
  }
  else{
    $("h1").toggleClass("swapper");
    $("#level-title").html("Your score: <em>"+(gamePattern.length-1)+"</em>");
  }
}
function stopText(){
  clearInterval(endInterval);
  endInterval=null;
}

const gameOver = async(array) => {
  toggleSwitches();
  $("#level-title").html(array[Math.floor(Math.random()*array.length)]);
  $("body").toggleClass("game-over");
  setTimeout(function(){
    $("body").toggleClass("game-over");
  }, 100);
  noiser("wrong");
  await wait(1000);
  start=true;
  endGame();
}