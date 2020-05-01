const alpha = "qwertyuiopasdfghjklzxcvbnm";

export function getRandom(len) {
    return Math.floor(Math.random() * len)
}
export function getLetter(rand) {
    return alpha[rand]
}
export function getWord(letter, num) {
    let q = ""
    console.log(num - 1)
    for (let i = 0; i < num - 1; i++) {
        q += "?"
    }
    console.log(letter + q)
    return fetch(`https://api.datamuse.com/words?sp=${letter}${q}`)
}
export function buildLetterChoices(word) {
    console.log("Dan's algorithm")
    console.log(word.join(""))
    return word.join("");
}