const alpha = "qwertyuiopasdfghjklzxcvbnm";

export function getRandom(len) {
    return Math.floor(Math.random() * len)
}
export function getLetter(rand) {
    return alpha[rand]
}
export function getWord(letter) {
    return fetch(`https://api.datamuse.com/words?sp=${letter}*`)
}
export function getWordExtras(word) {
    return fetch(`https://wordsapiv1.p.rapidapi.com/words/${word}`, {
        headers: {
            "X-Mashape-Key": process.env.REACT_APP_X_CODE
        }
    })
}
export function buildLetterChoices(word) {
    let letters = "";
    for (let i = 0; i < (16 - word.length); i++) {
        letters += getLetter(getRandom(26))
    }
    word = word + letters;
    word = word.split("");

    for(let i = word.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        const tmp = word[i];
        word[i] = word[j];
        word[j] = tmp;
    }
    return word.join("");
}