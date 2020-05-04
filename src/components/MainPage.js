import React, { useState, useEffect } from 'react';
import LettersMatrix from './LettersMatrix';
import ConfigClues from './ConfigClues';
import GuessDisplay from './GuessDisplay';
import SelectedLetters from './SelectedLetters';
import { findWordGroups, dispatchGetWord } from '../utility/API';
import { useGameplayContext } from '../utility/GlobalState';
import Dialog from './UI/Dialog'

function MainPage() {

    const [wordGroups, setWordGroups] = useState([]);
    const [state, dispatch] = useGameplayContext();
    // const [lineCoords, setLineCoords] = useState([]);
    const [show, setShow] = useState(false);

    useEffect(() => {
        const randWordgroups = findWordGroups();
        setWordGroups(randWordgroups);
    }, []);

    useEffect(() => {
        if (wordGroups.length) {
            dispatchGetWord(dispatch);
        }
    }, [wordGroups, dispatch]);

    useEffect(() => {
        let correctMap = {}
        if (state.puzzle) {
            for (let word in state.puzzle.wordPath) {
                if (!correctMap[word]) {
                    correctMap[word] = []
                    for (let i = 0; i < word.length; i++) {
                        correctMap[word].push(false)
                    }
                }
                for (let i = 0; i < state.currentGuess.length; i++) {
                    if (JSON.stringify(state.currentGuess[i]) === JSON.stringify(state.puzzle.wordPath[word][i])) {
                        if (state.currentGuess.length > 1) {
                            if (correctMap[word][i - 1] === state.puzzle.wordPath[word][i - 1]) {
                                correctMap[word][i] = state.puzzle.wordPath[word][i]
                            }
                        } else {
                            correctMap[word][i] = state.puzzle.wordPath[word][i]
                        }
                    } else {
                        correctMap[word][i] = false
                    }
                }
            }

            let skippedArr = []
            for (let word in correctMap) {
                if (correctMap[word].filter(el => el).length === word.length) {
                    dispatch({
                        type: 'FINALIZE_WORD',
                        payload: word
                    })
                    dispatch({
                        type: 'RESET_GUESSES'
                    })
                }
                if (!correctMap[word][state.currentGuess.length - 1]) {
                    skippedArr.push(word)
                }
                if (state.finalizedWords[word]) {
                    correctMap[word] = state.puzzle.wordPath[word]
                }
            }
            if (skippedArr.length === state.puzzle.words.length && state.currentGuess.length) {
                dispatch({
                    type: 'RESET_GUESSES'
                })
            }

            dispatch({
                type: 'CORRECT_MAP',
                payload: correctMap
            })
        }
    }, [state.currentGuess, state.puzzle, dispatch, state.finalizedWords]);

    useEffect(() => {
        if (state.puzzle) {
            if (Object.keys(state.finalizedWords).length === state.puzzle.words.length) {
                setShow(true)
            }
        }
    }, [state.finalizedWords, state.puzzle])

    function dispatchGetHint() {
        let arr = []
        for (let key in state.correctMap) {
            arr.push(state.correctMap[key])
        }
        let rowI = Math.floor(Math.random() * arr.length)
        let row = arr[rowI];
        console.log(row)
        let iI = Math.floor(Math.random() * row.length)
        let i = row[iI];
        console.log(i)
        if (!i) {
            letterPress(null, null, row + 1, i)
        } else dispatchGetHint()
    }

    function letterPress(row, i) {
        // let { top, left, width, height } = e.target.getBoundingClientRect()
        // setLineCoords([...lineCoords, { x: top - (height / 2), y: left - (width / 2) }])

        let x = row - 1;
        let y = i;

        dispatch({
            type: 'LETTER_PRESS',
            payload: {
                x, y
            }
        })
    }

    if (state.puzzle) {
        return (
            <>
                <ConfigClues
                    dispatchGetWord={() => dispatchGetWord(dispatch)}
                    dispatchGetHint={dispatchGetHint}
                />
                <GuessDisplay />
                <LettersMatrix
                    letterPress={letterPress}
                    wordGroups={wordGroups}
                />
                <SelectedLetters />
                <Dialog
                    title="Congratulations!"
                    show={show}
                    buttonElement={<></>}
                    textContent={"Game Win!!"}
                />
            </>);
    } else {
        return "Loading..."
    }

}

export default MainPage;
