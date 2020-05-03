import React, { createContext, useReducer, useContext } from "react";
import * as actions from './actions';

const defaultState = {
    hintPreference: false
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
            action.payload.generatePuzzle();
            return {
                ...state,
                puzzle: action.payload,
            }
        case 'SET_HINT_PREFERENCE':
            return {
                ...state,
                hintPreference: action.payload
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
