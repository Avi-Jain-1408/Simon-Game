var buttonColours = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickPattern = [];
var count = 0;
var level = 1;
var started = false;

function buttonPressAnimation(button) {
  $("#" + button).addClass("pressed")
  setTimeout(function() {
    $("#" + button).removeClass("pressed")
  }, 100);
};

function startOver() {
  $("h1").text("Game over, Your scrore was "+(level-1)+" Press here to start again");
  gamePattern = [];
  userClickPattern = [];
  count = 0;
  level = 1;
  started = false;
}


function playSound(randomChosenColour) {
  var audio = new Audio("sounds/" + randomChosenColour + ".mp3");
  audio.play();
}

function nextSequence() {
  count = 0
  $("h1").text("Level " + level)
  level = level + 1;
  userClickPattern = []
  randomNumber = Math.floor(Math.random() * 4);
  randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);
  $("#" + randomChosenColour).fadeOut(100).fadeIn(100);
  playSound(randomChosenColour);
}

function checking() {
  if (gamePattern[count] === userClickPattern[count]) {
    count++
    if (count === gamePattern.length) {
      setTimeout(function(){nextSequence();},500)

    }
  } else {
    $("body").addClass("game-over")
    setTimeout(function(){$("body").removeClass("game-over")},200)
    playSound("wrong");
    startOver();
  }

}

$(".btn").click(function() {
  buttonPressAnimation(this.id);
  userClickPattern.push("" + this.id);
  playSound(this.id)
  checking();
})


$("h1").click(function() {
  if (!started) {
    setTimeout(function(){nextSequence();},500)
    started = true
  }});
