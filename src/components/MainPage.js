import React, { useState, useEffect } from 'react';
import LettersMatrix from './LettersMatrix';
import ConfigClues from './ConfigClues';
import SelectedLetters from './SelectedLetters';
import { findWordGroups, dispatchGetWord, compare } from '../utility/API';
import { useGameplayContext } from '../utility/GlobalState';

function MainPage() {
    const [wordGroups, setWordGroups] = useState([]);
    const [guessedLetters, setGuessedLetters] = useState([]);
    const [tempAnswers, setTempAnswers] = useState([]);
    const [state, dispatch] = useGameplayContext();

    useEffect(() => {
        const randWordgroups = findWordGroups();
        setWordGroups(randWordgroups);
    }, []);

    useEffect(() => {
        if (wordGroups.length) {
            dispatchGetWord(wordGroups, dispatch);
        }
    }, [wordGroups, dispatch]);

    function dispatchGetHint() {
        console.log("display a correct letter now")
    }

    function letterPress(letter, row, i) {
        let x = row - 1;
        let y = i;
        let newTemp = [...tempAnswers, { x, y }]
        setTempAnswers(newTemp)
        for (let key in state.puzzle.wordPath) {
            for (let j = 0; j < newTemp.length; j++) {
                if (JSON.stringify(newTemp[j]) === JSON.stringify(state.puzzle.wordPath[key][j])) {
                    if (compare(newTemp, state.puzzle.wordPath[key])) {
                        console.log("finished word", key)
                    }
                }
            }
        }
    }

    if (state.puzzle) {
        return (
            <>
                <ConfigClues
                    dispatchGetWord={() => dispatchGetWord(wordGroups, dispatch)}
                    dispatchGetHint={dispatchGetHint}
                />
                <LettersMatrix
                    letterPress={letterPress}
                    wordGroups={wordGroups}
                />
                <SelectedLetters
                    guessedLetters={guessedLetters}
                />
            </>);
    } else {
        return "Loading..."
    }

}

export default MainPage;
