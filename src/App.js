import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import LettersMatrix from './components/LettersMatrix';
import ConfigClues from './components/ConfigClues';
import SelectedLetters from './components/SelectedLetters';
import { getLetter, getRandom, getWord, buildLetterChoices } from './utility/API';
import './App.css';

const useStyles = makeStyles((theme) => ({
  root: {
    margin: '2em 3em'
  },
}));
const twoDArray = [
  [4, 4, 4, 4],
  [5, 5, 6],
  [5, 4]
]

function App() {
  const classes = useStyles();
  const [wordGroups, setWordGroups] = useState([])
  const [word, setWord] = useState([]);
  const [guessedLetters, setGuessedLetters] = useState([])
  const [letterOptions, setLetterOptions] = useState("")

  useEffect(() => {
    const randWordgroups = findWordGroups();
    setWordGroups(randWordgroups);
  }, []);

  useEffect(() => {
    if (wordGroups.length) {
      dispatchGetWord();
    }
  }, [wordGroups]);

  useEffect(() => {
    setLetterOptions(buildLetterChoices(word))
  }, [word])

  function findWordGroups() {
    return twoDArray[getRandom(twoDArray.length)]
  }

  function dispatchGetWord() {
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
            setWord(arr)
          })
      })
      .catch(err => console.log(err));
  }

  function dispatchGetHint() {
    console.log("display a correct letter now")
  }

  function letterPress(letter) {
    let flag = [];
    word.forEach(one => {
      if (one.startsWith(guessedLetters.join("") + letter)) {
        setGuessedLetters([...guessedLetters, letter])
        flag.push(true)
        if (word === guessedLetters.join("") + letter) {
          console.log("win")
        }
      }
    })

    if (!flag.filter(el => el).length) setGuessedLetters([])
  }

  return (
    <main className={classes.root}>
      {word ? <>
        <ConfigClues
          dispatchGetWord={dispatchGetWord}
          dispatchGetHint={dispatchGetHint}
        />
        <LettersMatrix
          word={word}
          letterOptions={letterOptions}
          letterPress={letterPress}
          wordGroups={wordGroups}
        />
        {word.map((each, i) => {
          return <SelectedLetters
            key={i}
            word={each}
            guessedLetters={guessedLetters} />
        })}
      </>
        :
        <p>Loading...</p>}
    </main>
  );
}

export default App;
