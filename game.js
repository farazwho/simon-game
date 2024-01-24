//empty array to store sequence of user clicks
var userClickedPattern = [];
//empty array to store sequence of random colors
var gamePattern = [];
//array of button colors
const  buttonColors = ["red", "blue", "green", "yellow"];

$(".btn").on("click", function(event)
{
  var userChosenColor = this.id;
  userClickedPattern.push(userChosenColor);
  playSound(userChosenColor);
  animatePress(userChosenColor);
});

function animatePress(currentColor)
{
  $("#" + currentColor).toggleClass("pressed");
  setTimeout(function()
  {
    $("#" + currentColor).toggleClass("pressed");
  },100);
}

function playSound(name)
{
  $("#"+ name).fadeIn(100).fadeOut(100).fadeIn(100);

  var audio = new Audio("sounds/" + name +".mp3");
      audio.play();
}
  
//function to generate and return a random number
function nextSequence()
{
  var randomNumber=0;
  randomNumber= Math.floor(Math.random() * 4);
  //random color chosen
  var randomChosenColor = buttonColors[randomNumber];
  //random color appended to gamePattern array
  gamePattern.push(randomChosenColor);

  $("#"+ randomChosenColor).fadeIn(100).fadeOut(100).fadeIn(100);

  var audio = new Audio("sounds/" + randomChosenColor +".mp3");
      audio.play();
}