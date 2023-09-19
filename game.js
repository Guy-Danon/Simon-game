var colorArray = ["red","blue","green","yellow"];
var gamePattern = [];
var userPattern = [];
var level = 0;
var gameStarted = false;

$(".btn").on("click", function(e){
    if(gameStarted){
        var userChosenColor = e.currentTarget.id;
        userPattern.push(userChosenColor);
        playColorSound(userChosenColor);
        animatePress(userChosenColor);
        checkAnswer(userPattern.length-1);
    }
});

$(document).keypress(function(e){

    if(!gameStarted){
        $("#level-title").text("Level "+level);
        console.log("Game Started");
        nextSequence();
        gameStarted = true;
    }
})

function nextSequence(){
    userPattern = [];
    level++;
    $("#level-title").text("Level "+level);
    var randomNumber = Math.floor(Math.random()*4);
    var randColor = colorArray[randomNumber];
    gamePattern.push(randColor);
    playColorSound(randColor);
    $("#"+randColor).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);
}

function playColorSound(color){
    var colorSound = new Audio("./sounds/"+color+".mp3")
    colorSound.play();  
}

function animatePress(color){
    $("#"+color).addClass("pressed");
setTimeout(function(){
    $("#"+color).removeClass("pressed");
}, 100);
}

function checkAnswer(ind){
    console.log(userPattern);
    console.log(gamePattern);
    if(userPattern[ind]===gamePattern[ind]){
        console.log("Success");
        if(userPattern.length === gamePattern.length){
            $("#level-title").text("Good Job!, next level in 1 second");
            setTimeout(nextSequence, 1000);
        }
    }
    else{
        console.log("Wrong");
        playColorSound("wrong");
        $("body").addClass("game-over");
        setTimeout(function(){
            $("body").removeClass("game-over");
        }, 200);
        $("#level-title").text("Game Over, Press Any key to play again");
        gamePattern = [];
        userPattern = [];
        level = 0;
        gameStarted = false;
    }       
}
