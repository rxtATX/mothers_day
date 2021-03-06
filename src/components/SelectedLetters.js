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
    background: "#ebfbff"
  },
  control: {
    padding: theme.spacing(2),
  },
  start: {
    justifyContent: 'flex-start',
    marginLeft: '.25em',
    paddingLeft: 0,
  },
  end: {
    justifyContent: 'flex-end',
    marginRight: '1em'
  },
  center: {
    justifyContent: 'center'
  }
}));

export default function SelectedLetters({ classAttr, classesApplied }) {
  const classes = useStyles();
  const [state] = useGameplayContext();

  function determineRender(word) {
    // console.log(word, state.finalizedWords)
    // if (state.correctMap[word]) {
    // return state.correctMap[word].map((letter, i) => {
    // return state.puzzle.words.map((one) => {
    return word.split("").map((letter, i) => {

      if (state.finalizedWords[word]) {
        // if (!letter) {
        return (
          <Grid key={i} item>
            <Paper className={`${classesApplied} ${classes.paper}`}>{letter}</Paper>
          </Grid>
        )
      } else {
        return (
          <Grid key={i} item>
            <Paper className={classes.hidden}>{""}</Paper>
          </Grid>
        )
      }
    })
    // })
    // }
  }

  return (
    <Grid container className={classes.root} spacing={state.puzzle.words.length === 4 ? 2 : 1}>
      {state.puzzle.words.map((word, index) => (
        <Grid item xs={state.puzzle.words.length === 4 ? 6 : 12} key={index}>
          <Grid className={(index === 0 || index === 2) && state.puzzle.words.length === 4 ? classes.end : (index === 1 || index === 3) && state.puzzle.words.length === 4 ? classes.start : classes.center} container spacing={1}>
            {determineRender(word)}
          </Grid>
        </Grid>
      ))}
    </Grid>
  )
}