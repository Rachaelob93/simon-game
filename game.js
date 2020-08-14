// an array containing the button colours.
var buttonColors = ["red", "blue", "green", "yellow"];
// an array which will be added to with each random colour called by the game.
var gamePattern = [];
// an array which will be added to when the user clicks a button.
var userClickedPattern = [];
// the level the user is on
var level = 0;
// the variable which will change to true once the game has started.
var started = false;

//once a key is pressed, the game will begin.
$(document).keypress(function() {
  if (!started) {
    $("#level-title").text("Level " + level);
    nextSequence();
    started = true;
  }
});

//this section pushes the value of the button the user clicks onto the end of the userClickedPattern array.
$(".btn").click(function() {

  var userChosenColor = $(this).attr("id");
  userClickedPattern.push(userChosenColor);
// it then plays the colour specific sound and animates the button.
  playSound(userChosenColor);
  animatePress(userChosenColor);
  //it then checks the answer chosen by the user by calling the checkAnswer function.
  checkAnswer(userClickedPattern.length - 1);
});

//this function checks the gamePattern against the userClickedPattern.
function checkAnswer(currentLevel) {
  //if they match, it returns "success" and runs the function nextSequence after a 1000ms delay.
  if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {

    console.log("success");

    if (userClickedPattern.length === gamePattern.length) {
      setTimeout(function() {
        nextSequence();

      }, 1000);
    }
    //if they don't match, it returns "wrong" and the sequence ends.
    //it will then run the wrongSound function, playing the "wrong" sound effect.
    //it will then add the game-over class to the body, changing the css.
    //after 200ms it will remove the class.
  } else {

    console.log("wrong");
    wrongSound();
    $("body").addClass("game-over");
    //after a timeout period of 100ms, it removes the game-over class.
    setTimeout(function() {
      $("body").removeClass("game-over");
    }, 200);
    //it selects and changes the h1 text to "Game Over, Press Any Key to Restart."
    $("h1").text("Game Over, Press Any Key to Restart.");
    //this runs the function startOver, reverting the game back to it's initial state.
    startOver();
  }

}
//this is the function that runs the sequence.
function nextSequence() {
  //each time it runs it resets the userClickedPattern array.
  userClickedPattern = [];
  //it generates a random whole number between 0 and the length of the buttonColors array.
  var randomNumber = (Math.floor(Math.random() * buttonColors.length));
  //based on the random number, it selects the value at that position in the buttonColors array.
  var randomChosenColor = buttonColors[randomNumber];
  //this value is then pushed onto the end of the gamePattern array.
  gamePattern.push(randomChosenColor);
  //this selects the html object with the id which matches the randomChosenColor and makes it flash.
  //this will be the next colour in the sequence.
  $("#" + randomChosenColor).fadeIn(100).fadeOut(100).fadeIn(100);
  //this then plays the corresponding sound.
  playSound(randomChosenColor);

  //this changes the text of the h1 element to say the level that the user is on.
  $("h1").text("Level " + level);
  //this statement checks if the variable called level is less than the length of the gamePattern.
  //if it is, then this adds 1 to the level variable.
  if (level < gamePattern.length) {
    level++;
  }
};


//this function plays the sound of the buttons.
function playSound(name) {
  //this line creates a variable to play the right sound based on the input entered when the function is run.
  var audio = new Audio("sounds/" + name + ".mp3");
  //it then plays the sound.
  audio.play();
};

//this function created the visual animation of the button being clicked.
//it adds the class pressed from the css.
function animatePress(currentColor) {
  $("#" + currentColor).addClass("pressed");
  //after a timeout period of 100ms, it removes the pressed class.
  setTimeout(function() {
    $("#" + currentColor).removeClass("pressed");
  }, 100);

};
//this is the sound that will play if the user clicks the wrong colour.
function wrongSound() {
  var wrong = new Audio("sounds/wrong.mp3")
  wrong.play();
};
//this function reverts the level, gamePattern and started variables so the game resets.
function startOver(){
  gamePattern = [];
  level = 0;
  started = false;
  };
