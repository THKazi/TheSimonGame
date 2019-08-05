$(".game-btn").hide();
$(".level").hide();
var start = false;
var level = 0;

//FADES TITLE OUT
setTimeout(function(){
   $("#title").fadeOut();
    levelFade();
},1500);

//FADES LEVEL IN, WAITS FOR INPUT, FADES OUT.
function levelFade() {
    setTimeout(function(){
        $(document).off();
        $(".game-btn").fadeOut();
        $(".level").fadeIn();

        $(document).on("keypress", function(){
            $(".level").fadeOut();
            $(".game-btn").fadeIn();
            sequenceGen();
            $(document).off();

            $(".game-btn").on("click", function(){
                pressed(this.innerHTML)
            });

            $(document).on("keypress", function(e){
                pressed(e.key)
            });
        });
    },200);
}




var button = ["w","a","s","d"]
var sequence = [];

function sequenceGen() {
    var index = Math.floor(Math.random()*4);
    let ans = button[index];
    sequence.push(ans);

    sound(ans);
}

var userSequence = [];

var count = 0;
function pressed(key) {
    key = key.toLowerCase();
    var btn;
    var colourFlash;
    var colour
    switch (key) {
        case "w":
            btn = "w";
            colourFlash = "lime";
            colour = "darkgreen";
            break;
        case "a":
            btn = "a";
            colourFlash = "red";
            colour = "darkred";
            break;
        case "d":
            btn = "d";
            colourFlash = "yellow";
            colour = "darkgoldenrod";
            break;
        case "s":
            btn = "s";
            colourFlash = "cyan";
            colour = "darkblue";
            break;
    }
    userSequence.push(btn);
    sound(btn,colourFlash,colour);
    test();
}

function test() {
    if (userSequence[count] == sequence[count]) {
        //SUCCESS
        if (count<level){
            count++;
        }
        else {
            count = 0;
            level++;
            userSequence = [];
            $("#levelNum").text("- - - Level "+level+" - - -")
            levelFade();
        }
    }
    else {
        //FAILURE
        $("body").css("background-color","red");
        setTimeout(function(){$("body").css("background-color","slategray")},100);
        sequence = [];
        userSequence = [];
        count = 0;
        level = 0;
        $("#levelNum").text("- - - Level "+level+" - - -")
        levelFade();
    }
}






function sound(btn,colourFlash,colour) {
    var audio = new Audio("sounds/"+btn+".mp3");
    audio.currentTime = 0.08;
    audio.play();

//Animations
    btn = "."+btn;
    $(btn).fadeOut(50).fadeIn(50).fadeOut(50).fadeIn(50);
    $(btn).css("background-color",colourFlash)
    setTimeout(function(){$(btn).css("background-color",colour)},100);
}