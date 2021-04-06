$(document).ready(function () {
    // const QUESTIONS = [
    //     {
    //         "word":"kangaroo",
    //         "clue":"It starts with K"
    //     },
    //     {
    //         "word":"starbucks",
    //         "clue":"A company"
    //     },
    //     {
    //         "word":"macaroni",
    //         "clue":"A kind of food"
    //     },
    //     {
    //         "word":"washington",
    //         "clue":"A state"
    //     },
    //     {
    //         "word":"turtle",
    //         "clue":"A creature"
    //     },
    //     {
    //         "word":"guillotine",
    //         "clue":"A machine"
    //     }
    // ]
    
    // var questionBank=new Array;
    // var wordArray=new Array;
    // var previousGuesses=new Array;
    // var currentWord;
    // var currentClue;
    // var wrongAnswerCount;
    // for(i=0;i<QUESTIONS.length;i++){ 
    //     questionBank[i]=new Array;
    //     questionBank[i][0]=QUESTIONS[i].word;
    //     questionBank[i][1]=QUESTIONS[i].clue;
    // }
    // titleScreen();

    var questionArray = [];
    var currentWordIndex = 0;
    var loadWord = questionArray[currentWordIndex];

    var apiOneUrl = 'https://puzzle.mead.io/puzzle';
    //api for words
    var fetchWords = function() {
        fetch(apiOneUrl).then(function(response){
            response.json().then(function(data){
                questionArray.push(data.puzzle);
                console.log(questionArray);
            })
        })
    }

function titleScreen(){
$('#gameContent').append('<div id="gameTitle">Lets Learn Some Words!</div><div id="startButton" class="button">BEGIN</div>');       
$('#startButton').on("click",function (){gameScreen()});
}//display game



function gameScreen(){
    $('#gameContent').empty();
    $('#gameContent').append('<div id="wordHolder"></div>');
    $('#gameContent').append('<div id="clueHolder"></div>');
    $('#gameContent').append('<div id="guesses">Previous guesses:</div>');
    $('#gameContent').append('<div id="feedback"></div>');
    $('#gameContent').append('<form><input type="text" id="dummy" ></form>');
        
    getWord();
    var numberOfTiles=loadWord.length;
    wrongAnswerCount=0;
    previousGuesses=[];
         
    for(i=0;i<numberOfTiles;i++){
        $('#wordHolder').append('<div class="tile" id=t'+i+'></div>');
    }
        
    $('#clueHolder').append("HINT: "+currentClue);


    $(document).on("keyup",handleKeyUp);
    $(document).on("click",function(){$('#dummy').focus();});
    $('#dummy').focus();
}//gamescreen
        
        
function getWord(){
    var rnd=Math.floor(Math.random()*questionBank.length);
    currentWord=questionBank[rnd][0];
    currentClue=questionBank[rnd][1];
    questionBank.splice(rnd,1); 
    wordArray=currentWord.split("");            
}//getword
        

        
        
function handleKeyUp(event) {

//this line deals with glitch in recent versions of android
if(event.keyCode==229){event.keyCode=$('#dummy').val().slice($('#dummy').val().length-1,$('#dummy').val().length).toUpperCase().charCodeAt(0);}
    
if(event.keyCode>64 && event.keyCode<91){
    var found=false;
    var previouslyEntered=false;
    var input=String.fromCharCode(event.keyCode).toLowerCase();
    

    for(i=0;i<previousGuesses.length;i++){if(input==previousGuesses[i]){previouslyEntered=true;}}
            
    if(!previouslyEntered){
        previousGuesses.push(input);
        for(i=0;i<wordArray.length;i++){
            if(input==wordArray[i]){found=true;$('#t'+i).append(input);}    
        }//for
            
        if(found){checkAnswer();}
        else{wrongAnswer(input);}
    }//if
}//if
}//handlekeyup


function checkAnswer(){
var currentAnswer="";   
for(i=0;i<currentWord.length;i++){
    currentAnswer+=($('#t'+i).text());
}       
if(currentAnswer==currentWord){
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
$(document).off("keyup", handleKeyUp);
$('#feedback').append("CORRECT!<br><br><div id='replay' class='button'>CONTINUE</div>");
$('#replay').on("click",function (){
    if(questionBank.length>0){
        gameScreen()}
    else{finalPage()}
});
}//victory
    
function defeatMessage(){
document.activeElement.blur();
$(document).off("keyup", handleKeyUp);
$('#feedback').append("WRONG!<br>(answer= "+ currentWord +")<div id='replay' class='button'>CONTINUE</div>");
$('#replay').on("click",function (){
    if(questionBank.length>0){
        gameScreen()}
    else{finalPage()}
});
}//defeat

function finalPage(){
$('#gameContent').empty();
$('#gameContent').append('<div id="finalMessage">You have finished all the words in the game!</div>');
}//finalpage

});//doc ready
