import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import LettersMatrix from './components/LettersMatrix';
import ConfigClues from './components/ConfigClues';
import SelectedLetters from './components/SelectedLetters';
import { getLetter, getRandom, getWord, getWordExtras } from './utility/API';
import './App.css';

const useStyles = makeStyles((theme) => ({
  root: {
    margin: '2em 3em'
  },
}));

function App() {
  const classes = useStyles();
  const [word, setWord] = useState();
  const [category, setCategory] = useState();
  const [hint, setHint] = useState();
  const [guessedLetters, setGuessedLetters] = useState([])

  useEffect(() => {
    dispatchGetWord()
  }, []);

  useEffect(() => {
    if (word) {
      getWordExtras(word)
        .then(res => res.json())
        .then(res => {
          if (res.word) {
            const { definition, partOfSpeech } = res.results[0];
            setCategory(partOfSpeech);
            setHint(definition);
          } else dispatchGetWord()
        })
        .catch(err => console.log(err));
    }
  }, [word]);

  function dispatchGetWord() {
    getWord(getLetter(getRandom(26)))
      .then(res => res.json())
      .then(res => setWord(res[getRandom(res.length)].word))
      .catch(err => console.log(err));
  }

  function letterPress(letter) {
    if (word.startsWith(guessedLetters.join("") + letter)) {
      setGuessedLetters([...guessedLetters, letter])
      if (word === guessedLetters.join("") + letter) {
        console.log("win")
      }
     } else {
       setGuessedLetters([])
     }
  }

  return (
    <main className={classes.root}>
      {word ? <>
      <ConfigClues
        dispatchGetWord={dispatchGetWord} 
        hint={hint}
        category={category}
      />
      <LettersMatrix 
        word={word} 
        letterPress={letterPress}  
      />
      <SelectedLetters 
        word={word}
        guessedLetters={guessedLetters} />
      </>
      :
      <p>Loading...</p>}
    </main>
  );
}

export default App;
