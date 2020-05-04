import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
// import Fab from '@material-ui/core/Fab';
import Grid from '@material-ui/core/Grid';
// import { colors } from '../utility/API';
// import { useGameplayContext } from '../utility/GlobalState'

const useStyles = makeStyles((theme) => ({
    // fab: {
    //     textAlign: 'center',
    //     color: 'white',
    //     textShadow: '0px 1px 2px black',
    //     fontSize: '1em',
    //     fontWeight: '600',
    //     margin: '1.5px',
    //     transform: 'scale(.85)'
    // },
    root: {
        minHeight: '2.75em',
        marginBottom: '1.5em',
        marginTop: '1em'
    }
}))

function GuessDisplay() {
    const classes = useStyles();
    // const [state] = useGameplayContext();

    // function getColor(x, y) {
    //     return colors[(x + 1) * y];
    // }

    return (
        <Grid className={classes.root} container justify="center">
            {/* {state.currentGuess.map(guess =>
                <Grid item>
                    <Fab
                        size="small"
                        style={{
                            backgroundColor: getColor(guess.x, guess.y).base,
                            backgroundImage: `radial-gradient(
                        rgba(255,255,255,.3), 
                        ${getColor(guess.x, guess.y).light},
                        ${getColor(guess.x, guess.y).base}, 
                        ${getColor(guess.x, guess.y).dark}, 
                        rgba(0,0,0,.7))`
                        }}
                        className={classes.fab}>
                        {state.puzzle.puzzle[guess.x][guess.y]}
                    </Fab>
                </Grid>)} */}
        </Grid>
    )
}

export default GuessDisplay;