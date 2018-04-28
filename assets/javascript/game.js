var guessesRemaining = 5;
var lettersAlreadyGuessed = [];
var wins = 0;
var losses = 0;
var alphabetArray = "abcdefghijklmnopqrstuvwxyz"
var wordArray = ["china", "usa", "canada", "italy", "england", "japan",
    "thailand", "germany", "nicaragua", "mexico", "brazil", "greenland", "russia", "bosnia",
    "india", "korea", "egypt", "mongolia", "chile", "france"]
var wordLines = [];

var wordToGuess = randomizeWord(wordArray);

function randomizeWord(arr) {
    return arr[Math.floor(Math.random() * arr.length)];
}

function createWordLines() {
    wordLines = [];
    for (var i = 0; i < wordToGuess.length; i++) {
        wordLines.push(" _ ");
    }
}

function resetGame() {
    guessesRemaining = 5;
    lettersAlreadyGuessed = [];
    randomizeWord(wordArray);
    createWordLines();
    document.getElementById("hangManGuesses").innerHTML = wordLines.join(" ");
    var headerText =
        "<p>Wins: " + wins + "</p>" +
        "<p>Losses: " + losses + "</p>" +
        "Press Any Key to Begin";
    document.getElementById("hangMan").innerHTML = headerText
}


//create the initial word lines for hangman
createWordLines();

//adds the underscores into the hangManGuesses div, gets rid of the comma separator by specifying with .join
document.getElementById("hangManGuesses").innerHTML = wordLines.join(" ");

document.onkeyup = function (guess) {

    //an internal private counter variable to check if the key had any matches
    var charMatches = 0;

    //Determines what key is pressed
    var userGuess = guess.key.toLowerCase();

    //First, make sure user pressed a valid letter for input before running block, else do an alert; ignore shift
    if (alphabetArray.includes(userGuess)) {
        //make sure the guess is not something already guessed, if it is, function returns nothing
        if (lettersAlreadyGuessed.includes(userGuess)) {
            alert("You already guessed that character!");
            return;
        }
        //check if the userGuess matches one or more of the characters in the wordToGuess
        for (var i = 0; i < wordToGuess.length; i++) {
            if (wordToGuess[i] === userGuess) {
                wordLines[i] = userGuess;
                document.querySelector("#hangManGuesses").innerHTML = wordLines.join(" ");
                charMatches++;
            }
        }
        if (charMatches === 0) {
            guessesRemaining--;
        }
        lettersAlreadyGuessed.push(userGuess);

    } else if (guess.keyCode == "16") {
        //DO NOTHING
    } else {
        alert("Please enter a valid letter");
    }

    if (alphabetArray.includes(userGuess)) {
        var headerText =
            "<p>You chose the letter " + userGuess + ". </p>" +
            "<p>You have " + guessesRemaining + " remaining. </p>" +
            "<p>You have guessed the following letters: " + lettersAlreadyGuessed + "</p>" +
            "<p>Wins: " + wins + "</p>" +
            "<p>Losses: " + losses + "</p>"
    } else {
        var headerText =
            "<p>You have " + guessesRemaining + " remaining. </p>" +
            "<p>You have guessed the following letters: " + lettersAlreadyGuessed + "</p>" +
            "<p>Wins: " + wins + "</p>" +
            "<p>Losses: " + losses + "</p>"
    }

    //check if guessesRemaining is zero, if so, increase loss, alert player, and resetGame();
    if (guessesRemaining === 0) {
        losses++;
        alert("You lose, try again!");
        resetGame();
    }

    document.getElementById("hangMan").innerHTML = headerText;
    console.log(headerText);
}