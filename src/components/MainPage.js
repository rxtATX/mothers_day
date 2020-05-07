import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import LettersMatrix from './LettersMatrix';
import ConfigClues from './ConfigClues';
import GuessDisplay from './GuessDisplay';
import SelectedLetters from './SelectedLetters';
import { findWordGroups, dispatchGetWord } from '../utility/API';
import { useGameplayContext } from '../utility/GlobalState';
import Dialog from './UI/Dialog'

const useStyles = makeStyles((theme) => ({
    animate: {
        animationName: 'pop',
        animationIterationCount: 1,
        animationTimingFunction: 'ease',
        // animationDuration: '9s'
        animationDuration: '1990ms'
    }
}))

function MainPage() {
    const classes = useStyles();
    const [wordGroups, setWordGroups] = useState([]);
    const [state, dispatch] = useGameplayContext();
    // const [lineCoords, setLineCoords] = useState([]);
    const [animate, setAnimate] = useState(false);
    const [show, setShow] = useState(false);
    const [gameWinTimer, setGameWinTimer] = useState(null);

    useEffect(() => {
        const randWordgroups = findWordGroups();
        setWordGroups(randWordgroups);

        return () => {
            clearTimeout(gameWinTimer)
            setGameWinTimer(null)
        }
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
                    setAnimate(true);
                    setTimeout(() => {
                        dispatch({
                            type: 'FINALIZE_WORD',
                            payload: word
                        })
                        dispatch({
                            type: 'RESET_GUESSES'
                        })
                        setAnimate(false);
                    }, 2000)
                    // }, 10000)
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
                setGameWinTimer(
                    setTimeout(() => {
                        setShow(true)
                    }, 800)
                )
            }
        }
    }, [state.finalizedWords, state.puzzle])

    function dispatchGetHint() {
        for (let key in state.correctMap) {
            if (state.correctMap[key].filter(el => !el).length > 0) {
                let openIndex = state.correctMap[key].indexOf(false);
                let { x, y } = state.puzzle.wordPath[key][openIndex]
                return letterPress(x + 1, y)
            }
        }
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

    function outsideClose() {
        setShow(false)
    }

    if (state.puzzle) {
        return (
            <>
                <ConfigClues
                    dispatchGetWord={() => dispatchGetWord(dispatch)}
                    dispatchGetHint={dispatchGetHint}
                />
                <GuessDisplay classAttr={animate} classesApplied={classes.animate} />
                <LettersMatrix
                    letterPress={letterPress}
                    wordGroups={wordGroups}
                />
                <SelectedLetters />
                {show ? <Dialog
                    title="Congratulations!"
                    show={show}
                    outsideClose={outsideClose}
                    buttonElement={<></>}
                    textContent={"Game Win!!"}
                /> : null}
            </>);
    } else {
        return "Loading..."
    }

}

export default MainPage;
