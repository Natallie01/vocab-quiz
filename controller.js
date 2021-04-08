$(document).ready(function () {

    var currentWord = [];
    var currentWordIndex = 0;
    var wordArray = "";
    var previousGuesses= [];
    // var currentClue;
    var wrongAnswerCount;

    function titleScreen(){
        $('#gameContent').append('<div id="gameTitle">Lets Learn Some Words!</div><div id="startButton" class="button">BEGIN</div>');       
        $('#startButton').on("click",function (){gameScreen()});
    }//display game

    titleScreen();

    var apiOneUrl = 'https://san-random-words.vercel.app';
    //api for words
    var fetchWords = function() {
        fetch(apiOneUrl).then(function(response){
            response.json().then(function(data){
                console.log(data);
                currentWord.push(data[0].word);
                console.log(data[0].word);
                console.log(data[0].definition);
                console.log(currentWord[currentWordIndex].length);
                console.log(currentWord);

                var numberOfTiles= currentWord[currentWordIndex].length;
                wrongAnswerCount=0;
                previousGuesses=[];
                
                $('#wordHolder').html("")
                $('#guesses').html("Previous guesses: ")
                $('#feedback').html("")
                $('#clueHolder').html("HINT: " + data[0].definition)
                for(i=0;i<numberOfTiles;i++){
                    $('#wordHolder').append('<div class="tile" id=t'+i+'></div>');
                }

            });
        })
    }

    function gameScreen(){

        fetchWords();

        $('#gameContent').empty();
        $('#gameContent').append('<div id="wordHolder"></div>');
        $('#gameContent').append('<div id="clueHolder"></div>');
        $('#gameContent').append('<div id="guesses">Previous guesses:</div>');
        $('#gameContent').append('<div id="feedback"></div>');
        $('#gameContent').append('<form><input type="text" id="dummy" ></form>');
        $('#clueHolder').append("HINT: ");


        $(document).on("keyup",handleKeyUp);
        $(document).on("click",function(){$('#dummy').focus();});
        $('#dummy').focus();
    }//gamescreen

    function handleKeyUp(event) {

        //this line deals with glitch in recent versions of android
        if(event.keyCode==229){event.keyCode=$('#dummy').val().slice($('#dummy').val().length-1,$('#dummy').val().length).toUpperCase().charCodeAt(0);}
    
        if(event.keyCode>64 && event.keyCode<91){
            var found=false;
            var previouslyEntered=false;
            var input=String.fromCharCode(event.keyCode).toLowerCase();
            var lowerWordArray = currentWord[currentWordIndex].toLowerCase();
            wordArray = lowerWordArray.split("");
            console.log(lowerWordArray);
           
            for(i=0;i<previousGuesses.length;i++){if(input==previousGuesses[i]){previouslyEntered=true;}}
            
                if(!previouslyEntered){
                    previousGuesses.push(input);
            
                    for(i=0;i<wordArray.length;i++){
                        if(input==wordArray[i]){found=true;$('#t'+i).append(input);}    
                    }//for
            
                    if(found){
                        checkAnswer();
                    } else {
                        wrongAnswer(input);
                    }
                }//if
        }//if
    }//handlekeyup


    function checkAnswer(){
        var currentAnswer= "";
        var lowerWordArray = currentWord[currentWordIndex].toLowerCase();
        for(i=0;i<wordArray.length;i++){
            currentAnswer+=($('#t'+i).text());
            console.log(currentAnswer);
        }       
        if(currentAnswer==lowerWordArray){
            victoryMessage();
        };
    }//checkanswer
    
    function wrongAnswer(a){
        wrongAnswerCount++;
        var pos=(wrongAnswerCount*-75) +"px"
        $('#guesses').append("  "+a);
        $('#hangman').css("left",pos);
        if(wrongAnswerCount==6){
        defeatMessage();}
    }//wronganswer
    
    function victoryMessage(){
        document.activeElement.blur();
        $(document).on("keyup", handleKeyUp);
        $('#feedback').append("<h2> Good job! You got it correct!<h2> <div id='replay' class='button'>CONTINUE</div>");
        $('#replay').on("click",function (){
            if(currentWordIndex<6){
                currentWordIndex++;
                fetchWords()}
            else{finalPage()}
        });
    }//victory
    
    function defeatMessage(){
        
        document.activeElement.blur();
        $(document).on("keyup", handleKeyUp);
        $('#feedback').append("<h2> WRONG! The correct answer was " + currentWord[currentWordIndex] + "<h2> <div id='replay' class='button'>CONTINUE</div>");
        $('#replay').on("click",function (){
            if(currentWordIndex<6){
                currentWordIndex++;
                fetchWords()}
            else{finalPage()}
        });
    }//defeat

    function finalPage(){
        $('#gameContent').empty();
        $('#gameContent').append('<div id="finalMessage">You have finished all the words in the game!</div>');
    }//finalpage

});//doc ready
