var wordGuessGame = {
    wins: 0,
    losses: 0,
    lettersAlreadyGuessed: [],
    wordLines: [],
    guessesRemaining: 5,
    alphabetList: "abcdefghijklmnopqrstuvwxyz",
    wordArray: [
        "china", "usa", "canada", "italy", "england", "japan",
        "thailand", "germany", "nicaragua", "mexico", "brazil", "greenland", "russia", "bosnia",
        "india", "korea", "egypt", "mongolia", "chile", "france"
    ],
    randomizeWord: function (arr) {
        return arr[Math.floor(Math.random() * arr.length)];
    },
    wordToGuess: function () {
        return this.randomizeWord(this.wordArray);
    },
    createWordLines: function (word) {
        this.wordLines = [];
        for (var i = 0; i < word.length; i++) {
            this.wordLines.push(" _ ");
        }
    },
    resetGame: function (word) {
        this.guessesRemaining = 5;
        this.lettersAlreadyGuessed = [];
        this.wordToGuess();
        this.createWordLines(wordGuess);
        document.getElementById("hangManGuesses").innerHTML = this.wordLines.join(" ");
        var headerText =
            "<p>Wins: " + this.wins + "</p>" +
            "<p>Losses: " + this.losses + "</p>" +
            "Press Any Key to Begin";
        document.getElementById("hangMan").innerHTML = headerText;
    },
}

var wordGuess = wordGuessGame.wordToGuess();
//create the initial word lines for hangman
wordGuessGame.createWordLines(wordGuess);
//adds the underscores into the hangManGuesses div, gets rid of the comma separator by specifying with .join
document.getElementById("hangManGuesses").innerHTML = wordGuessGame.wordLines.join(" ");

document.onkeyup = function (guess) {

    //an internal private counter variable to check if the key had any matches
    var charMatches = 0;

    //Determines what key is pressed
    var userGuess = guess.key.toLowerCase();
    //First, make sure user pressed a valid letter for input before running block, else do an alert; ignore shift
    if (wordGuessGame.alphabetList.includes(userGuess)) {
        document.getElementById("showAlert").innerHTML = "";
        //make sure the guess is not something already guessed, if it is, show said warning to player, then do nothing else
        if (wordGuessGame.lettersAlreadyGuessed.includes(userGuess)) {
            document.getElementById("showAlert").innerHTML = "You already guessed that character!";
            return;
        }
        //check if the userGuess matches one or more of the characters in the wordToGuess
        for (var i = 0; i < wordGuess.length; i++) {
            if (wordGuess[i] === userGuess) {
                wordGuessGame.wordLines[i] = userGuess;
                document.querySelector("#hangManGuesses").innerHTML = wordGuessGame.wordLines.join(" ");
                charMatches++;
            }
        }
        //if there are no positive matches for character guessed, guessesRemaining drops by one
        if (charMatches === 0) {
            wordGuessGame.guessesRemaining--;
        }

        //add the userGuess to the letters already guessed list
        wordGuessGame.lettersAlreadyGuessed.push(userGuess);

        //if user decides to use shift key to guess a capital letter, do not prompt for valid letter
    } else if (guess.keyCode == "16") {
        //DO NOTHING
    } else {
        //prompt warning to player to enter valid letter
        document.getElementById("showAlert").innerHTML = "Please enter a valid letter";
    }

    //based on if valid entry or not, update headerText variable with proper information
    if (wordGuessGame.alphabetList.includes(userGuess)) {
        var headerText =
            "<p>You chose the letter " + userGuess + ". </p>" +
            "<p>You have " + wordGuessGame.guessesRemaining + " guesses remaining. </p>" +
            "<p>You have guessed the following letters: " + wordGuessGame.lettersAlreadyGuessed + "</p>" +
            "<p>Wins: " + wordGuessGame.wins + "</p>" +
            "<p>Losses: " + wordGuessGame.losses + "</p>"
    } else {
        var headerText =
            "<p>You have " + wordGuessGame.guessesRemaining + " guesses remaining. </p>" +
            "<p>You have guessed the following letters: " + wordGuessGame.lettersAlreadyGuessed + "</p>" +
            "<p>Wins: " + wordGuessGame.wins + "</p>" +
            "<p>Losses: " + wordGuessGame.losses + "</p>"
    }
    //update headerText html element
    document.getElementById("hangMan").innerHTML = headerText;

    //check if guessesRemaining is zero, if so, increase loss, alert player, and resetGame();
    if (wordGuessGame.guessesRemaining === 0) {
        wordGuessGame.losses++;
        alert("You lose, try again!");
        wordGuessGame.resetGame();
    }

    //if there are no more blank lines left, increase win counter, alert player, and resetGame();
    if (!wordGuessGame.wordLines.includes(" _ ")) {
        wordGuessGame.wins++;
        alert("Correct! The word is " + wordGuessGame.wordToGuess() + ". You win, play again!");
        wordGuessGame.resetGame();
    }



}