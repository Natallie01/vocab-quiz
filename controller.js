$(document).ready(function () {
    const QUESTIONS = [
        {
            "word":"kangaroo",
            "clue":"It starts with K"
        },
        {
            "word":"starbucks",
            "clue":"a company"
        },
        {
            "word":"macaroni",
            "clue":"a kind of food"
        },
        {
            "word":"washington",
            "clue":"a state"
        },
        {
            "word":"turtle",
            "clue":"a creature"
        },
        {
            "word":"guillotine",
            "clue":"a machine"
        }
    ]
    
    var questionBank=new Array;
    var wordArray=new Array;
    var previousGuesses=new Array;
    var currentWord;
    var currentClue;
    var wrongAnswerCount;
