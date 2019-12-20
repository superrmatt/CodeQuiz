$(document).ready(function() {
    var seconds = 75; //total quiz length in seconds

    
    buildTimer();

    
    //when an answer choice is clicked
    $(".choices").on("click", function(){
      
    });


    //run code to show next question on screen
    function nextQuestion(){

    }

    //determines validity of answer
    function isValid(){

    }

    //runs initial code to build the quiz, when "start quiz" button is clicked
    function initilizeQuiz(){

    }

    //changes timer value, accepts argument as int in seconds, positive for positive change, negative for negative change
    function changeTime(time){
        seconds = seconds + time;
        $("timer").html("Time: " + seconds);
        console.log("changed time. seconds = " + seconds);
    }

    //builds the initial state of the timber object
    function buildTimer(){
        console.log("building timer");
        console.log("seconds  = " + seconds);
        
        window.setInterval(start, 1000);
        
        //start timer
        function start() {
            console.log("starting timer....")
            changeTime(-1);
            console.log("interval changed");
        }

    }
});