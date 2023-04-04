document.addEventListener("DOMContentLoaded", function() {
    const gameContainer = document.getElementById("game");
    let card1 = null;
    let cardsFlipped = 0;
    let myScore = 0;
    let bestResult = localStorage.getItem('Best Result');
    let noClicking = false;

    showBestScore();

    const colors = [
        "red",
        "blue",
        "green",
        "orange",
        "purple",
        "red",
        "blue",
        "green",
        "orange",
        "purple"
    ];

    let startBtn = document.getElementById("start-button");
    startBtn.addEventListener("click", startGame);


    function startGame() {
        if (noClicking) {
            return;
        }

        card1 = null;
        cardsFlipped = 0;
        myScore = 0;

        document.getElementById("score").innerHTML = myScore;
        gameContainer.innerHTML = '';

        let shuffledColors = shuffle(colors);
        createDivs(shuffledColors);
        document.getElementById("start-button").textContent  = "Restart";
    }

    function shuffle(array) {
        for (let i = 0; i < array.length; i++) {
            let j = Math.floor(Math.random() * array.length);
            let temp = array[i];
            array[i] = array[j];
            array[j] = temp;
        }
        return array;
    }

    function createDivs(array) {
        for (let element of array) {
            let newDiv = document.createElement("div");
            newDiv.classList.add(element);
            newDiv.addEventListener("click", handleCardClick)
            gameContainer.append(newDiv);
        }
    }

    function addScore() {
        myScore++;
        document.getElementById("score").innerHTML = myScore;
    }

    function showBestScore() {
        document.getElementById("bestscore").innerHTML = bestResult;
    }

    function handleCardClick(event) {
        if (noClicking) {
            return;
        }
        if (event.target.classList.contains("flipped")) {
            return;
        }

        let currentCard = event.target;
        currentCard.style.backgroundColor = currentCard.classList[0];
        if (card1 === null) {
            card1 = currentCard;
            card1.classList.add("flipped");
            addScore();
        } else if (card1.classList[0] == currentCard.classList[0]) {
            cardsFlipped += 2;
            currentCard.classList.add("flipped");
            addScore();
            currentCard.removeEventListener("click", handleCardClick);
            card1.removeEventListener("click", handleCardClick);
            card1 = null;
        } else {
            noClicking = true;
            setTimeout(function() {
                card1.style.backgroundColor = '';
                currentCard.style.backgroundColor = '';
                card1.classList.remove("flipped");
                currentCard.classList.remove("flipped");
                card1 = null;
                currentCard = null;
                noClicking = false;
            }, 1000);
        }
        if (cardsFlipped === colors.length) {
            setTimeout(function() {
                alert("Game Over!");
            }, 500);
            storeBestResult();
        }
    }

    function storeBestResult() {
        if (myScore < bestResult || bestResult == null) {
            bestResult = myScore;
            localStorage.setItem('Best Result', myScore);
            showBestScore();
        }
    }
});
