import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import { useGameplayContext } from '../utility/GlobalState';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    marginTop: '2em'
  },
  paper: {
    height: 45,
    width: 24,
    textAlign: 'center',
    lineHeight: '1.5em',
    fontSize: '24px',
    fontVariant: 'all-small-caps',
  },
  hidden: {
    textAlign: 'center',
    lineHeight: '1em',
    fontSize: '24px',
    fontVariant: 'all-small-caps',
    height: 45,
    width: 24,
    background: "#999"
  },
  control: {
    padding: theme.spacing(2),
  },
}));

export default function SelectedLetters() {
  const classes = useStyles();
  const [state] = useGameplayContext();

  function determineRender(word) {
    if (state.correctMap[word]) {
      return state.correctMap[word].map((letter, i) => {
        if (!letter) {
          return (
            <Grid key={i} item>
              <Paper className={classes.hidden}>{""}</Paper>
            </Grid>
          )
        } else {
          return (
            <Grid key={i} item>
              <Paper className={classes.paper}>{word[i]}</Paper>
            </Grid>
          )
        }
      })
    }
  }

  return (
    <Grid container className={classes.root} spacing={1}>
      {state.puzzle.words.map((word, index) => (
        <Grid item xs={state.puzzle.words.length === 4 ? 6 : 12} key={index}>
          <Grid container justify="center" spacing={1}>
            {determineRender(word)}
          </Grid>
        </Grid>
      ))}
    </Grid>
  )
}