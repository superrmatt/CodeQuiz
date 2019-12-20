$(document).ready(function() {
    var seconds = 10; //total quiz length in seconds; default is 100, test value is lower, so as not to wait 100 seconds :)
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
            console.log("You Lost!");
        } else if (gameOver == true){
            //won game
            console.log("You Won!");
        }
    }

    /*
    *changes timer value.  
    * @arg time == int in seconds, positive for positive change, negative for negative change
    */
    function changeTime(time){
        seconds = seconds + time;
        if(seconds <= 0){
            //game over, time has run out.
            winOrLose = false;
            gameEnd(winOrLose);
            return;
        }
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
                //game over, time has hit 0, this likely never runs due to handling in changeTime(), it is merely here just in case.
                winOrLose = false;
                gameEnd(winOrLose);
                return;
            }
        }
    }
});