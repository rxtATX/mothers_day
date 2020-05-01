import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';

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

export default function SelectedLetters({ word, guessedLetters }) {
  const classes = useStyles();
  return (
    <Grid container className={classes.root} spacing={1}>
      <Grid item xs={12}>
        <Grid container justify="center" spacing={1}>
          {word.split("").map((value, i) => (
            <Grid key={i} item>
              <Paper className={guessedLetters[i] === value ? classes.paper : classes.hidden}>{guessedLetters[i] === value ? value : ""}</Paper>
            </Grid>
          ))}
        </Grid>
      </Grid>
    </Grid>
  )
}