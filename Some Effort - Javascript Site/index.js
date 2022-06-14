let randNum1=(Math.floor(Math.random()*6)+1);
let randNum2=(Math.floor(Math.random()*6)+1);
document.querySelector(".img1").setAttribute("src", "images/dice"+randNum1+".png");
document.querySelector(".img2").setAttribute("src","images/dice"+randNum2+".png");

if(randNum1>randNum2){
  document.querySelector(".container h1").innerHTML="Player 1 Wins!";
} else if(randNum1<randNum2){
  document.querySelector(".container h1").innerHTML="Player 2 Wins!";
} else{
  document.querySelector(".container h1").innerHTML="You all lose!";
}