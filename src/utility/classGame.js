export default class PuzzleMaker {
	constructor(words) {
		this.words = words;
		this.moveTypes = [-1, 0, 1];
		this.puzzle = [];
		this.puzzleLength = 0;
		this.letterCount = 0;
		this.currentCoords = {};
		this.wordPath = {};
		this.getParameters();
	}

	getParameters() {
		this.letterCount = 0;
		for (let word of this.words) {
			this.letterCount += word.length;
		}

		this.puzzleLength = Math.sqrt(this.letterCount);
	}

	generateEmptyPuzzle() {
		this.puzzle = [];
		const sampleRow = [];

		for (let i = 0; i < this.puzzleLength; i++) {
			sampleRow.push(0);
		}

		for (let i = 0; i < this.puzzleLength; i++) {
			this.puzzle.push(JSON.parse(JSON.stringify(sampleRow)));
		}
	}

	generateRandomNumber() {
		return Math.floor(Math.random() * (this.puzzleLength));
	}

	generateRandomCoordinates() {
		this.currentCoords = {
			x: this.generateRandomNumber(),
			y: this.generateRandomNumber()
		};

		if (this.puzzle[this.currentCoords.x][this.currentCoords.y]) {
			this.generateRandomCoordinates();
		}
	}

	checkCoords() {
		let trapped = true;
		for (var i = 0; i < this.moveTypes.length; i++) {
			for (var j = 0; j < this.moveTypes.length; j++) {
				const x = this.currentCoords.x + this.moveTypes[i];
				const y = this.currentCoords.y + this.moveTypes[j];

				if (x !== -1 && y !== -1 && x !== this.puzzleLength && y !== this.puzzleLength) {
					if (!this.puzzle[x][y]) {
						trapped = false;
					}
				}
			}
		}

		return trapped;
	}

	nextMove() {
		if (this.checkCoords()) {
			return
		}

		let x = this.currentCoords.x + this.moveTypes[Math.floor(Math.random() * this.moveTypes.length)];
		let y = this.currentCoords.y + this.moveTypes[Math.floor(Math.random() * this.moveTypes.length)];

		if (x === -1
			|| y === -1
			|| x === this.puzzleLength
			|| y === this.puzzleLength
			|| this.puzzle[x][y]
		) {
			this.nextMove();
		} else {
			this.currentCoords = { x: x, y: y };
		}
	}

	generatePuzzle() {
		this.generateEmptyPuzzle();

		try {

			for (let word of this.words) {
				this.generateRandomCoordinates();
				this.wordPath[word] = [];

				for (let letter of word) {
					this.nextMove();
					this.puzzle[this.currentCoords.x][this.currentCoords.y] = letter;
					this.wordPath[word].push(this.currentCoords);

				}

			}
		} catch (err) {
			if (!err) return this.generatePuzzle();

			throw err;
		}
	}

	getPuzzle() {
		return this.puzzle;
	}
	getPuzzelPath() {
		return this.wordPath
	}
}

// const threeWords = new PuzzleMaker(["which", "irony", "hamper"]);

// const print = function (puzzle){
// 	if(puzzle.length === 5){
// 		console.log(`${puzzle[0][0]}-${puzzle[0][1]}-${puzzle[0][2]}-${puzzle[0][3]}-${puzzle[0][4]}`);
// 		console.log('-----------');
// 		console.log(`${puzzle[1][0]}-${puzzle[1][1]}-${puzzle[1][2]}-${puzzle[1][3]}-${puzzle[1][4]}`);
// 		console.log('-----------');
// 		console.log(`${puzzle[2][0]}-${puzzle[2][1]}-${puzzle[2][2]}-${puzzle[2][3]}-${puzzle[2][4]}`);
// 		console.log('-----------');
// 		console.log(`${puzzle[3][0]}-${puzzle[3][1]}-${puzzle[3][2]}-${puzzle[3][3]}-${puzzle[3][4]}`);
// 		console.log('-----------');
// 		console.log(`${puzzle[4][0]}-${puzzle[4][1]}-${puzzle[4][2]}-${puzzle[4][3]}-${puzzle[4][4]}`);
// 	} else if(puzzle.length === 4){
// 		console.log(`${puzzle[0][0]}-${puzzle[0][1]}-${puzzle[0][2]}-${puzzle[0][3]}`);
// 		console.log('-----------');
// 		console.log(`${puzzle[1][0]}-${puzzle[1][1]}-${puzzle[1][2]}-${puzzle[1][3]}`);
// 		console.log('-----------');
// 		console.log(`${puzzle[2][0]}-${puzzle[2][1]}-${puzzle[2][2]}-${puzzle[2][3]}`);
// 		console.log('-----------');
// 		console.log(`${puzzle[3][0]}-${puzzle[3][1]}-${puzzle[3][2]}-${puzzle[3][3]}`);
// 	} else {
// 		console.log(`${puzzle[0][0]}-${puzzle[0][1]}-${puzzle[0][2]}`);
// 		console.log('-----------');
// 		console.log(`${puzzle[1][0]}-${puzzle[1][1]}-${puzzle[1][2]}`);
// 		console.log('-----------');
// 		console.log(`${puzzle[2][0]}-${puzzle[2][1]}-${puzzle[2][2]}`);
// 	}
// }
// threeWords.generatePuzzle();

// print(threeWords.getPuzzle())
// console.log(threeWords.getPuzzelPath());
// console.log(threeWords.count);


// const alpha = ['abcd', 'efgh', 'ijkl', 'mnopq', 'rstu','vwxy'];
// const five = new PuzzleMaker(alpha);
// five.generatePuzzle();
// print(five.getPuzzle())
// console.log(five.getPuzzelPath());
// console.log(five.count);

