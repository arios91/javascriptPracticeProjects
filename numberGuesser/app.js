/*
Game Rules
- player must guess a number between a min and max
- play gets a certain amount of guesses
- notify player of guesses remaining
- notify player of correct answer if they lost
- let player choose to play again
*/

let min = 1,
    max = 10,
    winningNum = generateRandomNumber(),
    attemptsRemaining = 3;

const game = document.querySelector('#game'),
    minNum = document.querySelector('.minNum'),
    maxNum = document.querySelector('.maxNum'),
    message = document.querySelector('.message'),
    guessInput = document.querySelector('#guessInput'),
    guessButton = document.querySelector('#guessButton'),
    playAgainButton = document.querySelector('#playAgainButton');

//assign ui min,max
minNum.textContent = min;
maxNum.textContent = max;

//create eventListeners
loadEventListeners();

function loadEventListeners(){
    guessButton.addEventListener('click', checkInput);
    playAgainButton.addEventListener('click', resetGame);
}

function checkInput(e){
    let guess = parseInt(guessInput.value);
    guessInput.value = '';
    //validate guess
    if(isNaN(guess) || guess < min || guess > max){
        setMessage(`Invalid Input, please enter a number between ${min} and ${max}.`, 'red');
    }else{
        if(guess === winningNum){
            gameOver(true, `${guess} is correct!`);
        }else{
            attemptsRemaining--;
            if(attemptsRemaining > 0){
                setMessage(`${guess} is incorrect, you have ${attemptsRemaining} attempts remaining`, 'red');
            }else{
                gameOver(false, `${guess} is incorrect, You Lost! correct number was ${winningNum}`);
            }
        }
    }
}

function gameOver(won, msg){
    let color = won === true ? 'green' : 'red';
    guessInput.disabled = true;
    setMessage(msg, color);
    playAgainButton.style.display = 'inline-block';
    guessButton.style.display = 'none';
}

function resetGame(){
    attemptsRemaining = 3;
    guessInput.disabled = false;
    playAgainButton.style.display = 'none';
    guessButton.style.display = 'inline-block';

    setMessage('', '');
}

function setMessage(msg, color){
    guessInput.style.borderColor = color;
    message.style.color = color;
    message.textContent = msg;
}

function generateRandomNumber(){
    let randomNum = Math.floor(Math.random() * (max-min+1) + min);
    return randomNum;
}