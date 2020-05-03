import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Fab from '@material-ui/core/Fab';
import Grid from '@material-ui/core/Grid';
import { colors } from '../utility/API';
import { useGameplayContext } from '../utility/GlobalState';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  fab: {
    textAlign: 'center',
    color: 'white',
    textShadow: '0px 1px 2px black',
    fontSize: '1.25em',
    fontWeight: '700',
    padding: theme.spacing(1),
    width: '50px',
    height: '50px',
    margin: '2.5px',
  },
  hidden: {
    padding: theme.spacing(1),
    width: '50px',
    height: '50px',
    margin: '2.5px',
    visibility: 'hidden'
  },
  activated: {
    backgroundColor: theme.palette.secondary
  }
}));

export default function LettersMatrix({ letterPress, wordGroups }) {
  const classes = useStyles();
  const [state] = useGameplayContext();

  function FormRow({ subLetters, row }) {

    function Button({ letter, i }) {
      const [show, setShow] = useState(true);
      const { light, base, dark } = colors[(i + 1) * row];

      function conceal(i) {
        console.log("hide", row, i)
        setShow(false)
      }

      return (
        <Fab
          style={{ backgroundColor: base, backgroundImage: `radial-gradient(rgba(255,255,255,.3), ${light}, ${base}, ${dark}, rgba(0,0,0,.7))` }}
          onClick={() => {
            conceal(i)
            letterPress(letter, row, i)
          }}
          className={show ? classes.fab : classes.hidden}>
          {letter}
        </Fab>
      )
    }

    return (
      <React.Fragment>
        <Grid item>
          {
            subLetters.map((letter, i) =>
              <Button key={i} i={i} letter={letter} />
            )}
        </Grid>
      </React.Fragment>
    );
  }

  return (
    <div className={classes.root}>
      <Grid container spacing={1} justify="center">
        {
          state.puzzle.puzzle.length ?
            <>
              <Grid container item justify="center" xs={12} spacing={wordGroups.length > 2 ? 3 : 4}>
                <FormRow row={1} subLetters={state.puzzle.puzzle[0]} />
              </Grid>
              <Grid container item justify="center" xs={12} spacing={wordGroups.length > 2 ? 3 : 4}>
                <FormRow row={2} subLetters={state.puzzle.puzzle[1]} />
              </Grid>
              <Grid container item justify="center" xs={12} spacing={wordGroups.length > 2 ? 3 : 4}>
                <FormRow row={3} subLetters={state.puzzle.puzzle[2]} />
              </Grid>
              {
                wordGroups.length > 2 ?
                  <Grid container item justify="center" xs={12} spacing={3}>
                    <FormRow row={4} subLetters={state.puzzle.puzzle[3]} />
                  </Grid>
                  : null
              }
            </>
            : null
        }
      </Grid>
    </div>
  );
}