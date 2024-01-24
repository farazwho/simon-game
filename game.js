//empty array to store sequence of user clicks
var userClickedPattern = [];
//empty array to store sequence of random colors
var gamePattern = [];
//array of button colors
const  buttonColors = ["red", "blue", "green", "yellow"];
var level = 0;

///////// event listener to start game /////////

$(document).on("keypress", function()
{
  if(level == 0)
  {
    nextSequence();
  }
});

///////// sound and animation on button click /////////
///////// records user click pattern /////////

$(".btn").on("click", function(event)
{
  var userChosenColor = this.id;
  userClickedPattern.push(userChosenColor);
  checkAnswer(userClickedPattern.length-1);
  playSound(userChosenColor);
  animatePress(userChosenColor);
});

///////// css click animation /////////

function animatePress(currentColor)
{
  $("#" + currentColor).toggleClass("pressed");
  setTimeout(function()
  {
    $("#" + currentColor).toggleClass("pressed");
  },100);
}

///////// function to play sound /////////
function playSound(name)
{
  $("#"+ name).fadeIn(100).fadeOut(100).fadeIn(100);
  var audio = new Audio("sounds/" + name +".mp3");
      audio.play();
}
  
// function to generate and return a random number 
function nextSequence()
{
  userClickedPattern = [];
  level++;
  $("#level-title").text("Level " + level);
  var randomNumber=0;
  randomNumber= Math.floor(Math.random() * 4);
  //random color chosen
  var randomChosenColor = buttonColors[randomNumber];
  //random color appended to gamePattern array
  gamePattern.push(randomChosenColor);
  //blip animation
  $("#"+ randomChosenColor).fadeIn(100).fadeOut(100).fadeIn(100);
  //play sound of chosen color
  var audio = new Audio("sounds/" + randomChosenColor +".mp3");
      audio.play();
}

function checkAnswer(currentLevel)
{
  //if user clicks teh correct sequence, continues increasing level
  if(userClickedPattern[currentLevel] == gamePattern[currentLevel])
  {
    console.log(true);
    if(JSON.stringify(userClickedPattern) == JSON.stringify(gamePattern))
    {
      setTimeout(function()
      {
        nextSequence();
      }, 1000);
    }

  }
  //if user messes up, game over feedback
  //startOver function called
  else
  {
    console.log(false);
    var audio = new Audio("sounds/wrong.mp3");
      audio.play();
    $("body").toggleClass("game-over");
    setTimeout(function()
    {
      $("body").toggleClass("game-over");
    },200);
    $("#level-title").text("Game Over, Press Any Key to Restart");
    startOver();
  }
}


//resets variables to start over
function startOver()
{
  level = 0 ;
  gamePattern = [];
}