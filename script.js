$(document).ready(function() {
    var seconds = 20; //total quiz length in seconds
    var winOrLose = true; //tracks whether game ended with win or loss. true == win, false == loss.

    
    buildTimer();

    
    /* 
    * when an answer choice is clicked
    */
    $(".choices").on("click", function(){
      
    });


    /*
    * run code to show next question on screen
    */
    function nextQuestion(){

    }

    /*
    * determines validity of answer
    */
    function isValid(){

    }

    /*
    * runs initial code to build the quiz, when "start quiz" button is clicked
    */
    function initilizeQuiz(){

    }

    /*
    * runs when game ends. 
    * @arg gameOver == true if victorious, false if not
    */
    function gameEnd(gameOver){
        if(gameOver == false){
            //lost game
            alert("You Lost!");
        } else if (gameOver == true){
            //won game
            alert("You Won!");
        }
    }

    /*
    *changes timer value.  
    * @arg time == int in seconds, positive for positive change, negative for negative change
    */
    function changeTime(time){
        seconds = seconds + time;
        $(".timer").html("Time: " + seconds);
        console.log("changed time. seconds = " + seconds);
    }

    /*
    * builds the initial state of the timber object
    */
    function buildTimer(){
        console.log("building timer");
        console.log("seconds  = " + seconds);
        
        window.setInterval(start, 1000);
        
        /*
        * start timer. 
        * might be wondering why I decided to have a function which just calls another function.
        * Time is subtracted for wrong answers, therefore, I created a changeTime() function.
        */
        function start() {
            if(seconds > 0){ //if time is not yet 0
                changeTime(-1);
            } else {
                //game over, time has hit 0
                winOrLose = false;
                gameEnd(winOrLose);
                return;
            }
        }
    }
});