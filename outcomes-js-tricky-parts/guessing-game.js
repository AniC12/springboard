/*Solve the following JavaScript problems using closure. Tests are provided.

**Guessing Game**

Write a function called ***guessingGame*** which returns a function that allows you to guess a random whole number between 0 and 99. 

Every time you create a new game, it should select a *new* random number, and keep it secret from the player.

Once the game has started, you can guess the number. The game should tell you whether your guess is too high, too low, or correct.

After a correct guess, the game ends. */

function guessingGame() {

    let random = Math.floor(Math.random() * 100);
    let isGameOver = false;
    let guessCounter = 0;

    return function guessRandom(num) {
        if (isGameOver) {
            return "The game is over, you already won!";
        }

        guessCounter++;

        if (num < random) {
            return `${num} is too low!`;
        } else if (num > random) {
            return `${num} is too high!`;
        } else {
            isGameOver = true;
            return `You win! You found ${num} in ${guessCounter} guesses.`;
        }

    }

}

module.exports = { guessingGame };
