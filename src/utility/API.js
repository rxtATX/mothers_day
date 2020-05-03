import PuzzleMaker from './classGame';
const alpha = "qwertyuiopasdfghjklzxcvbnm";
const twoDArray = [
    [4, 4, 4, 4],
    [5, 6, 5],
    [5, 4]
]
export const colors = [
    { light: '#ef9a9a', base: '#e57373', dark: '#ef5350' },
    { light: '#ce93d8', base: '#ba68c8', dark: '#ab47bc' },
    { light: '#90caf9', base: '#64b5f6', dark: '#42a5f5' },
    { light: '#80deea', base: '#4dd0e1', dark: '#26c6da' },
    { light: '#80cbc4', base: '#4db6ac', dark: '#26a69a' },
    { light: '#fff59d', base: '#fff176', dark: '#ffee58' },
    { light: '#ffcc80', base: '#ffb74d', dark: '#ffa726' },
    { light: '#ec407a', base: '#e91e63', dark: '#d81b60' },
    { light: '#f48fb1', base: '#f06292', dark: '#ec407a' },
    { light: '#ef9a9a', base: '#e57373', dark: '#ef5350' },
    { light: '#ce93d8', base: '#ba68c8', dark: '#ab47bc' },
    { light: '#90caf9', base: '#64b5f6', dark: '#42a5f5' },
    { light: '#80deea', base: '#4dd0e1', dark: '#26c6da' },
    { light: '#80cbc4', base: '#4db6ac', dark: '#26a69a' },
    { light: '#fff59d', base: '#fff176', dark: '#ffee58' },
    { light: '#ffcc80', base: '#ffb74d', dark: '#ffa726' },
    { light: '#ec407a', base: '#e91e63', dark: '#d81b60' },
    { light: '#f48fb1', base: '#f06292', dark: '#ec407a' },
]
export function findWordGroups() {
    return twoDArray[getRandom(twoDArray.length)]
}

export function compare(arr1, arr2) {
    return arr1.toString() === arr2.toString()
}

export function getRandom(len) {
    return Math.floor(Math.random() * len)
}
export function getLetter(rand) {
    return alpha[rand]
}
export function getWord(letter, num) {
    let q = ""
    for (let i = 0; i < num - 1; i++) {
        q += "?"
    }
    return fetch(`https://api.datamuse.com/words?sp=${letter}${q}`)
}

export function dispatchGetWord(wordGroups, dispatch) {
    Promise.all(wordGroups.map(group => getWord(getLetter(getRandom(26)), group)))
        .then(res => res.map(el => el.json()))
        .then(res => {
            Promise.all(res)
                .then(data => {
                    let first = data[0][getRandom(data[0].length)].word;
                    let second = data[1][getRandom(data[0].length)].word;
                    let third, fourth;
                    if (data[2]) {
                        third = data[0][getRandom(data[0].length)].word;
                    }
                    if (data[3]) {
                        fourth = data[0][getRandom(data[0].length)].word;
                    }
                    let arr = [first, second, third, fourth].filter(el => el)
                    dispatch({
                        type: 'SET_PUZZLE_CONSTRUCTOR',
                        payload: new PuzzleMaker(arr)
                    })
                })
        })
        .catch(err => console.log(err));
}