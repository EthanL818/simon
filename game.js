var buttonColors = ["red", "blue", "green", "yellow"]; // all possible button colors
var gamePattern = []; // array to store random sequence
var userClickedPattern = []; // array to store user inputted sequence
var level = 0; // initialized level
var pressed = false; // initialized button press

// creates the next sequence in game
function nextSequence() {
    var randomNumber = Math.floor(Math.random()*4);
    var randomChosenColor = buttonColors[randomNumber];
    userClickedPattern = [];
    playSound(randomChosenColor);
    gamePattern.push(randomChosenColor);
    $("#" + randomChosenColor).fadeOut(100).fadeIn(100);

    level++;
    $("#level-title").text("Level " + level);
}

// plays audio respective to color
function playSound(name) {
    var audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
}

// animates the press of buttons on click
function animatePress(currentColor) {
    $("#" + currentColor).addClass("pressed");

    setTimeout(function(){
        $("#" + currentColor).removeClass("pressed");
    }, 100)
}

// resets variables to restart game
function startOver() {
    level = 0;
    gamePattern = [];
    pressed = false;
}


// displays various things to indicate game over on incorrect input
function gameOver() {

    var gameOverSound = new Audio("sounds/wrong.mp3")
    gameOverSound.play();

    $("#level-title").text("Game Over, Press Any Key to Restart")

    $("body").addClass("game-over")

    setTimeout(function(){
        $("body").removeClass("game-over")
    }, 200)

    startOver();
}

// checks user's answer in comparison to stored pattern
function checkAnswer(currentLevel) {

    if (userClickedPattern[currentLevel] === gamePattern[currentLevel]) { // check if user's current input is correct

        var userCorrect = 0; // stores number of user's correct answers

        // if the user's answers were all correct, start the next sequence
        if (userClickedPattern.length === gamePattern.length) {
            setTimeout(function() { 
            nextSequence();
            }, 1000);
        }
    }

    // else, game over
    else {
        gameOver();
    }

    
}

// on click, stores button color, animates button press, plays respective sound, and checks if user answer is correct
$(".btn").click(function(){
    var userChosenColor =  this.id;
    userClickedPattern.push(userChosenColor);
    playSound(userChosenColor);
    animatePress(userChosenColor);

    checkAnswer(userClickedPattern.length-1);
})

// on first keypress, triggers next sequence
$(document).on("keydown", function(){
    if(!pressed) {
        nextSequence();
        pressed = true;
    }
})

