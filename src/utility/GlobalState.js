import React, { createContext, useReducer, useContext } from "react";
import * as actions from './actions';
import PuzzleMaker from "./classGame";

const defaultState = {
    hintPreference: false,
    currentGuess: [],
    finalizedWords: {},
    correctMap: {}
}

const GameplayContext = createContext({
    id: "",
    name: "",
    priority: false
});
const { Provider } = GameplayContext;

function reducer(state = defaultState, action) {
    switch (action.type) {
        case actions.SET_PUZZLE_CONSTRUCTOR:
            let puzzle = new PuzzleMaker(action.payload);
            puzzle.generatePuzzle();

            if (puzzle.length % 2 !== 0) {
                puzzle = new PuzzleMaker(action.payload)
                puzzle.generatePuzzle()
            }
            return {
                ...state,
                ...defaultState,
                puzzle,
            }
        case 'SET_HINT_PREFERENCE':
            return {
                ...state,
                hintPreference: action.payload
            }
        case "LETTER_PRESS":
            return {
                ...state,
                currentGuess: [
                    ...state.currentGuess,
                    action.payload
                ]
            }
        case "RESET_GUESSES":
            return {
                ...state,
                currentGuess: []
            }
        case 'FINALIZE_WORD':
            let finalizedWordPath = state.puzzle.wordPath[action.payload]
            finalizedWordPath.forEach(coord => {
                state.puzzle.puzzle[coord.x][coord.y] = false
            })
            return {
                ...state,
                finalizedWords: {
                    ...state.finalizedWords,
                    [action.payload]: true
                }
            }
        case 'GET_HINT':
            return {
                ...state,
                hintLetters: []
            }
        case 'CORRECT_MAP':
            return {
                ...state,
                correctMap: action.payload
            }
        default:
            return state;
    }
}

function GameplayProvider({ value = {}, ...props }) {
    const [state, dispatch] = useReducer(reducer, defaultState);

    return <Provider value={[state, dispatch]} {...props} />;
}

function useGameplayContext() {
    return useContext(GameplayContext);
}

export { GameplayProvider, useGameplayContext };
