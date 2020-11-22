
// 1.A,
var buttonColours = ["red", "blue", "green", "yellow"];

//1.B,
var gamePattern = [];

//2.A,
var userClickedPattern = [];

//5.A,
var started = false;
var level = 0;

//Fifth----Key board detect and change the level by increment of each calling nextSequence fn..

$(document).keypress(function () {

  if(!started) {
    $("#level-title").text("Level" + level);
    nextSequence();
    started = true;
  }

});

// Second STEP- writing jQuery to detect which button is pressed and stored it.

$("btn").click(function () {

  var userChosenColour = $(this).attr("id");
  userClickedPattern.push(userChosenColour);
  //console.log(userClickedPattern);

  playSound(userChosenColour);
  animatePress(userChosenColour);
  checkAnswer(userClickedPattern.length-1);

});

// sixth step---Checking Answer.

function checkAnswer (currentLevel) {
  if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
    if (userClickedPattern.length === gamePattern.length){
      setTimeout(function () {
        nextSequence();
      }, 1000);
    }
  } else {
    playSound("wrong");
    $("body").addClass("game-over");
    $("#level-title").text("Game Over, Press Any Key to Restart");

    setTimeout(function () {
      $("body").removeClass("game-over");
    }, 200);

    startOver();
  }
}

// FIRST STEP:
function nextSequence() {

  // this is from fifth STEP
  userClickedPattern = [];
  level++;
  $("#level-title").text("Level " + level);

  //--from here 1st step.... GENERATE THE RANDOM NUMBER FROM 0 TO 3.
  var randomNumber = Math.floor(Math.random() * 4);

  // PASS THAT GENERATE NUMBER AS A INDEX FOR ARRAY.
  var randomChosenColour = buttonColours[randomNumber];

  //SELECTED COLOUR APPEND TO THE EMPTY ARRAY.
  gamePattern.push(randomChosenColour);

  $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);

  playSound(randomChosenColour);

}

// fourth add animation-------

function animatePress (currentColor) {

  $("#" + currentColor).addClass("pressed");
  setTimeout(function () {
    $("#" + currentColor).removeClass("pressed");
  }, 100);

}

//****THIRD STEP***** CREATING A FUNCTION TO PLAY SOUND CORROSPOND TO THE BUTTON PRESSED.

function playSound(name) {
  // call this function inside the nextSequencefunction. this name parameter got exact color from nextSequence fn.
  var audio = new Audio ("sounds/" + name + ".mp3");
  audio.play();
}

// seventh step---

function startOver() {

  level = 0;
  gamePattern = [];
  started = false;

}
