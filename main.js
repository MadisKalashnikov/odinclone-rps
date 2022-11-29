const choices = ["rock", "paper", "scissors"];
const logStyles = {
	announcementStlye: [
		"font-size: 17px"
	].join(";"),
	roundStyle: [
		"font-size: 13px",
		"border-bottom: 1px solid black",
		"margin-top: 5px"
	].join(";"),
	choiceStyle: [
		"font-size: 13px"
	].join(";"),
	roundResult: [
		"font-size: 15px"
	].join(";"),
	finalResult: [
		"font-size: 16px",
		"border-bottom: 2px double black"
	].join(";")
};

let userScore = 0;
let computerScore = 0;

// choices
function getComputerChoice() {
	const chooseNumber = Math.floor(Math.random() * choices.length);
	const choice = choices[chooseNumber];
	return choice;
};
function getUserChoice() {
	let choice = prompt("rock, paper or scissors?", "rock").toLowerCase();
	while (!choices.includes(choice)) {
		choice = prompt(`choose rock, paper or scissors. "${choice}" is not a valid choice`).toLowerCase();
	}
	return choice;
};

// round logs
function logRoundChoices(userChoice, computerChoice, whoWon) {
	if (whoWon === "draw") {
		console.log(`%cA draw! both players chose ${userChoice}`, logStyles.choiceStyle);
	} else if (whoWon === "user") {
		console.log(`%cusers ${userChoice} beats computers ${computerChoice}`, logStyles.choiceStyle);
	} else if (whoWon === "computer") {
		console.log(`%ccomputers ${computerChoice} beats users ${userChoice}`, logStyles.choiceStyle);
	} else console.log("whoops, something went wrong");
};
function logResultOfRound(userScore, computerScore) {
	console.log(`%cScores after the round - User: ${userScore}, Computer: ${computerScore}`, logStyles.roundResult);
};
function logRounds(rounds) {
	console.log(`Playing ${rounds} ${rounds > 1 ? "rounds" : "round"}!`);
};
function logFinalResult(name) {
	name === "draw" 
	? console.log(`%cFinal result - It's a draw!`, logStyles.finalResult)
	: console.log(`%cFinal Result - ${name} won!`, logStyles.finalResult);
};

function resetScores() {
	userScore = 0;
	computerScore = 0;
};

function playARound(userChoice, computerChoice) {
	if (userChoice === computerChoice) {
		logRoundChoices(userChoice, computerChoice, "draw");
		logResultOfRound(userScore, computerScore); 
	} else if (userChoice === "paper" && computerChoice === "rock") {
		userScore += 1;
		logRoundChoices(userChoice, computerChoice, "user");
		logResultOfRound(userScore, computerScore);
	} else if (userChoice === "rock" && computerChoice === "scissors") {
		userScore += 1;
		logRoundChoices(userChoice, computerChoice, "user");
		logResultOfRound(userScore, computerScore);
	} else if (userChoice === "scissors" && computerChoice === "paper") {
		userScore += 1;
		logRoundChoices(userChoice, computerChoice, "user");
		logResultOfRound(userScore, computerScore);
	} else {
		computerScore += 1;
		logRoundChoices(userChoice, computerChoice, "computer");
		logResultOfRound(userScore, computerScore);
	};
};
function playAGame(bestOf = false, rounds = 5) {
	const bestOfComparison = Math.round(rounds / 2)

	logRounds(rounds);

	if (userScore !== 0 || computerScore !== 0) {
		resetScores();
	};

	for (let i = 0; i < (bestOf ? Infinity : rounds); i++) {
		if (rounds <= 0) {
			console.log("okay, you silly goose");
			break;
		};
		console.log(`%cRound ${i + 1}`, logStyles.roundStyle);
		playARound(getUserChoice(), getComputerChoice());
		if (bestOf === true) {
			if (userScore === bestOfComparison) {
				break;
			} else if (computerScore === bestOfComparison) {
				break;
			};
		};
	};
	if (userScore > computerScore) {
		logFinalResult("user");
	} else if (computerScore > userScore) {
		logFinalResult("computer");
	} else if (computerScore === userScore) {
		logFinalResult("draw");
	} else return console.log("whoops, something went wrong.");

	resetScores();
};