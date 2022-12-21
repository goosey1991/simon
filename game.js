//declaring globabl variables
var buttonColours = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var level = 0;
var gamestarted = false;

//listening for keypress to start game
$(document).keydown(function(event) {
  if (!gamestarted) {
    $("h1").text("Level " + level);
    nextSequence();
    gamestarted = true;
  }
});

//event listener awaiting click (users answer)
$(".btn").click(function() {

  var userChosenColour = $(this).attr("id");
  userClickedPattern.push(userChosenColour);

  playSound(userChosenColour);
  animatePress(userChosenColour);

  checkAnswer(userClickedPattern.length - 1);
});


//generates next colour for user to press
function nextSequence() {

  userClickedPattern = [];

  var randomNumber;
  randomNumber = Math.random() * 4;
  randomNumber = Math.floor(randomNumber);
  console.log(randomNumber);

  var randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);

  $("#" + randomChosenColour).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);

  playSound(randomChosenColour);
  level = level + 1;
  $("h1").text("Level " + level);

}

//plays sound of colour user clicked and colour to click
function playSound(name) {

  var buttonAudio = new Audio('sounds/' + name + '.mp3');
  buttonAudio.play();

}

//animates the colour once it has been pressed
function animatePress(currentColour) {
  $("#" + currentColour).addClass("pressed");
  setTimeout(function() {
    $("#" + currentColour).removeClass("pressed")
  }, 100);
}

//checks whether i clicked the right colour based on previous shown and remembered correct previous colours
function checkAnswer(currentLevel) {

  if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {

    console.log("success");

    if (userClickedPattern.length === gamePattern.length) {
      setTimeout(function() {
        nextSequence();
      }, 1000);
    }
  } else {
    console.log("wrong");
    var buttonAudio = new Audio('sounds/wrong.mp3');
    buttonAudio.play();
    $("body").addClass("game-over");
    setTimeout(function() {
      $("body").removeClass("game-over")
    }, 200);
    $("h1").text("Game Over, Press Any Key to Restart");
    startOver();
  }
}

//resets game
function startOver() {
  level = 0;
  gamestarted = false;
  gamePattern = [];

}
