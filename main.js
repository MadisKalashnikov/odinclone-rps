const choices = ["rock", "paper", "scissors"];
const logStyles = {
	announcementStyle: [
		"font-size: 16px"
	].join("; "),
	roundStyle: [
		"font-size: 15px",
		"border-bottom: 1px solid black",
		"margin-top: 5px"
	].join("; "),
	sillyGoose: [
		"font-size: 15px"
	].join("; "),
	choiceStyle: [
		"font-size: 13px"
	].join("; "),
	roundResult: [
		"font-size: 13px"
	].join("; "),
	finalResult: [
		"font-size: 16px",
		"border-bottom: 3px solid black"
	].join("; ")
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
	let choice = prompt("rock, paper or scissors?", "rock")
	if (choice === null) {
		return "chicken";
	};
	while (!choices.includes(choice)) {
		if (choice === null) {
			return "chicken";
		};
		choice = prompt(`choose rock, paper or scissors. "${choice}" is not a valid option`);
	};
	return choice.toLowerCase();
};

// logs
function logRoundChoices(userChoice, computerChoice, whoWon) {
	if (whoWon === "draw") {
		console.log(
			`%cA draw! Both players chose ${userChoice}`,
			logStyles.choiceStyle
		);
	} else if (whoWon === "user") {
		console.log(
			`%cUsers ${userChoice} beats computers ${computerChoice}`,
			logStyles.choiceStyle
		);
	} else if (whoWon === "computer") {
		console.log(
			`%cComputers ${computerChoice} beats users ${userChoice}`,
			logStyles.choiceStyle
		);
	} else console.log("Whoops, something went wrong");
};
function logResultOfRound(userScore, computerScore) {
	console.log(
		`%cScores after the round - User: ${userScore}, Computer: ${computerScore}`,
		logStyles.roundResult
	);
};
function logRounds(bestOf, rounds) {
	console.log(
		`%cPlaying ${bestOf ? "a best of " : ""}${Math.round(rounds)} ${rounds >= 2 ? "rounds" : "round"}`,logStyles.announcementStyle
	);
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

function playARound(userChoice, computerChoice, bestOfChoice, winBestOf, rounds) {
	if (bestOfChoice === true && userChoice === "chicken") {
		computerScore = winBestOf;
		console.log(`%csilly goose chickened out`, logStyles.sillyGoose);
		return;
	} else if (bestOfChoice === false && userChoice === "chicken") {
		computerScore = rounds;
		console.log(`%csilly goose chickened out`, logStyles.sillyGoose);
		return;
	}
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
function playAGame(rounds = 5, bestOf = false) {
	// checks
	if (typeof parseInt(rounds) === "number") {
		if (isNaN(rounds)) {
			return `silly goose, i need a number`
		} else {
			rounds = parseInt(rounds)
		};
	};
	if (rounds <= 0) {
		computerScore = 69420;
		logResultOfRound(userScore, computerScore);
		return "silly goose, haha funny number";
	};
	if (typeof bestOf !== "boolean") {
		if (bestOf === "false") {
			bestOf = false;
		} else if (bestOf === "true") {
			bestOf = true;
		} else {
			return `silly goose "${bestOf}" is not a boolean`;
		};
	};
	if (bestOf === true && rounds % 2 === 0) {
		return `silly goose, why would you play a best of ${rounds}`;
	};
	if (userScore !== 0 || computerScore !== 0) {
		resetScores();
	};

	logRounds(bestOf, rounds);

	const bestOfComparison = Math.round(rounds / 2);
	for (let i = 0; i < (bestOf ? Infinity : rounds); i++) {
		console.log(`%cRound ${i + 1}`, logStyles.roundStyle);
		playARound(
			getUserChoice(),
			getComputerChoice(),
			bestOf,
			bestOfComparison,
			rounds
		);
		if (bestOf === true) {
			if (userScore === bestOfComparison || computerScore === bestOfComparison) {
				break;
			};
		} else if (bestOf === false) {
			if (userScore === rounds || computerScore === rounds) {
				break;
			};
		};
	};
	if (userScore > computerScore) {
		logFinalResult("user");
		return "winner winner, chicken dinner"
	} else if (computerScore > userScore) {
		logFinalResult("computer");
		return "you suck"
	} else if (computerScore === userScore) {
		logFinalResult("draw");
		return "you still suck"
	} else return "whoops, something went wrong.";
};