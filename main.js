const choices = ["rock", "paper", "scissors"];
const logStyles = {
	roundStyle: [
		"font-size: 15px",
		"border-bottom: 1px solid black",
		"padding-top: 15px"
	].join(";"),
	choiceStyle: [
		"font-size: 15px",
	].join(";"),
	roundResult: [
		"font-size: 16px",
	].join(";"),
	finalResult: [
		"font-size: 17px",
		"border-bottom: 2px double black",
	].join(";"),
}

let userScore = 0;
let computerScore = 0;
function getComputerChoice() {
	const chooseNumber = Math.floor(Math.random() * choices.length);
	const choice = choices[chooseNumber];
	return choice;
};
function getUserChoice() {
	let choice = prompt("rock, paper or scissors?", "rock").toLowerCase();
	while (!choices.includes(choice)) {
		choice = prompt(`choose rock, paper or scissors. "${choice}" is not valid`).toLowerCase();
	}
	return choice;
};

function logChoices(userChoice, computerChoice, whoWon) {
	if (whoWon === "draw") {
		console.log(`%cA draw! both players chose ${userChoice}`, logStyles.choiceStyle)
	} else if (whoWon === "user") {
		console.log(`%cusers ${userChoice} beats computers ${computerChoice}`, logStyles.choiceStyle)
	} else if (whoWon === "computer") {
		console.log(`%ccomputers ${computerChoice} beats users ${userChoice}`, logStyles.choiceStyle)
	}
};
function logResultOfRound(userScore, computerScore) {
	console.log(`%cResult of the round - User: ${userScore}, Computer: ${computerScore}`, logStyles.roundResult);
};

function resetScores() {
	userScore = 0;
	computerScore = 0;
};

function playARound(userChoice, computerChoice) {
	if (userChoice === "paper" && computerChoice === "rock") {
		userScore += 1;
		logChoices(userChoice, computerChoice, "user")
		logResultOfRound(userScore, computerScore);
	} else if (userChoice === "rock" && computerChoice === "scissors") {
		userScore += 1;
		logChoices(userChoice, computerChoice, "user")
		logResultOfRound(userScore, computerScore);
	} else if (userChoice === "scissors" && computerChoice === "paper") {
		userScore += 1;
		logChoices(userChoice, computerChoice, "user")
		logResultOfRound(userScore, computerScore);
	} else if (userChoice === computerChoice) {
		logChoices(userChoice, computerChoice, "draw")
		logResultOfRound(userScore, computerScore);
	} else {
		computerScore += 1;
		logChoices(userChoice, computerChoice, "computer")
		logResultOfRound(userScore, computerScore);
	};
};
function playGame() {
	if (userScore !== 0 || computerScore !== 0) {
		resetScores()
	}
	for (let i = 0; i < 5; i++) {
		console.log(`%cRound ${i + 1}`, logStyles.roundStyle)
		playARound(getUserChoice(), getComputerChoice());
	}
	if (userScore > computerScore) {
		console.log("%cFinal result - User won!", logStyles.finalResult);
	} else if (computerScore > userScore) {
		console.log("%cFinal result - Computer won!", logStyles.finalResult);
	} else if (computerScore === userScore) {
		console.log("%cFinal result - It's a draw!", logStyles.finalResult);
	} else return console.log("whoops, something went wrong.");

	resetScores();
};