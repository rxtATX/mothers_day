import React, { useState, useEffect } from 'react';
import { colors } from '../utility/API';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import LettersMatrix from './LettersMatrix';
import ConfigClues from './ConfigClues';
import GuessDisplay from './GuessDisplay';
import SelectedLetters from './SelectedLetters';
import { findWordGroups, dispatchGetWord } from '../utility/API';
import { useGameplayContext } from '../utility/GlobalState';
import Dialog from './UI/Dialog'
import LinearProgress from '@material-ui/core/LinearProgress';
import * as actions from '../utility/actions';

const useStyles = makeStyles((theme) => ({
    text: {
        textAlign: 'center',
        color: 'white',
        textShadow: `1px 1px 1px ${colors[1].base}`
    },
    color1: {
        backgroundColor: colors[1].light
    },
    color2: {
        backgroundColor: colors[3].light
    },
    color3: {
        backgroundColor: colors[1].dark
    },
    color4: {
        backgroundColor: colors[3].dark
    },
    linearRoot: {
        '& > * + *': {
            marginTop: theme.spacing(2),
        },
        margin: '48vh 10vw auto'
    },
    animate: {
        animation: 'pop ease 2s'
    },
    plopAnimate: {
        animation: 'plop 600ms ease reverse'
    }
}))

function MainPage() {
    const classes = useStyles();
    const [wordGroups, setWordGroups] = useState([]);
    const [state, dispatch] = useGameplayContext();
    const [animate, setAnimate] = useState(false);
    const [show, setShow] = useState(false);
    const [tryAgain, setTryAgain] = useState(false);
    const [gameWinTimer, setGameWinTimer] = useState(null);

    useEffect(() => {
        const randWordgroups = findWordGroups();
        setWordGroups(randWordgroups);
        setTimeout(() => setTryAgain(true), 1500)

        return () => {
            clearTimeout(gameWinTimer)
            // setGameWinTimer(null)
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
                            dispatch({
                                type: actions.CURRENT_WORD_PROGRESS,
                                payload: word
                            })
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
                            type: actions.FINALIZE_WORD,
                            payload: word
                        })
                        dispatch({
                            type: actions.RESET_GUESSES
                        })
                        setAnimate(false);
                        determineWin()
                    }, 1200)
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
                    type: actions.RESET_GUESSES
                })
                dispatch({
                    type: actions.CURRENT_WORD_PROGRESS,
                    payload: ""
                })
            }

            dispatch({
                type: actions.CORRECT_MAP,
                payload: correctMap
            })
            setTryAgain(false)
        }
    }, [state.currentGuess, state.puzzle, dispatch, state.finalizedWords]);

    function determineWin() {
        if (state.puzzle) {
            if (Object.keys(state.finalizedWords).length === state.puzzle.words.length) {
                setShow(true)
            }
        }
    }

    function dispatchGetHint() {
        if (!state.currentWordProgress.length) {
            for (let key in state.correctMap) {
                if (state.correctMap[key].filter(el => !el).length > 0) {
                    return mockLetterPress(key)
                }
            }
        } else {
            mockLetterPress(state.currentWordProgress)
        }
    }

    function mockLetterPress(key) {
        let openIndex = state.correctMap[key].indexOf(false);
        let index = state.puzzle.wordPath[key][openIndex];
        if (index) {
            let { x, y } = state.puzzle.wordPath[key][openIndex]
            return letterPress(x + 1, y)
        } else {
            return
        }
    }

    function letterPress(row, i) {
        dispatch({
            type: actions.LETTER_PRESS,
            payload: {
                x: row - 1, y: i
            }
        })
    }

    function outsideClose() {
        setShow(false)
    }

    if (state.puzzle) {
        return (<>
            <ConfigClues
                dispatchGetWord={() => dispatchGetWord(dispatch)}
                dispatchGetHint={dispatchGetHint}
            />
            <GuessDisplay
                classAttr={animate}
                classesApplied={classes.animate}
            />
            <LettersMatrix
                letterPress={letterPress}
                wordGroups={wordGroups}
            />
            <SelectedLetters
                classesApplied={classes.plopAnimate}
            />
            <Dialog
                title="Congratulations!"
                show={show}
                outsideClose={outsideClose}
                buttonElement={<></>}
                textContent={"Game Win!!"}
            />
        </>);
    } else {
        return <div className={classes.linearRoot}>
            <Typography classes={{ root: classes.text }} variant="h4" gutterBottom>
                Loading...
            </Typography>
            <LinearProgress classes={{
                colorPrimary: classes.color1,
                barColorPrimary: classes.color3
            }} />
            <LinearProgress classes={{
                colorPrimary: classes.color2,
                barColorPrimary: classes.color4
            }} />

            {tryAgain ? <Typography onClick={() => dispatchGetWord(dispatch)} classes={{ root: classes.text }} variant="h6" gutterBottom>
                Click here if nothing loads...
            </Typography> : null}
        </div>
    }

}

export default MainPage;
