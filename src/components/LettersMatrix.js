import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Fab from '@material-ui/core/Fab';
import Grid from '@material-ui/core/Grid';
const colors = [
  '#e57373',
  '#ba68c8',
  '#64b5f6',
  '#4dd0e1',
  '#4db6ac',
  '#fff176',
  '#ffb74d',
  '#e91e63',
  '#f06292',
  '#e57373',
  '#ba68c8',
  '#64b5f6',
  '#4dd0e1',
  '#4db6ac',
  '#fff176',
  '#ffb74d',
  '#e91e63',
  '#f06292',
]
const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  fab: {
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
  activated: {
    backgroundColor: theme.palette.secondary
  }
}));

export default function LettersMatrix({ letterPress, wordGroups, letterOptions }) {
  const classes = useStyles();

  function FormRow({ subLetters, row }) {
    return (
      <React.Fragment>
        {subLetters.split("").map((letter, i) => <Grid key={i} item xs={3}>
          <Fab
            style={{ backgroundColor: colors[(i + 1) * row] }}
            onClick={() => letterPress(letter)}
            className={classes.fab}>
            {letter}
          </Fab>
        </Grid>)}
      </React.Fragment>
    );
  }

  return (
    <div className={classes.root}>
      <Grid container spacing={1}>
        {letterOptions ? <><Grid container item xs={12} spacing={3}>
          <FormRow row={1} subLetters={wordGroups.length > 2 ? letterOptions.slice(0, 4) : letterOptions.slice(0, 3)} />
        </Grid>
          <Grid container item xs={12} spacing={3}>
            <FormRow row={2} subLetters={wordGroups.length > 2 ? letterOptions.slice(4, 8) : letterOptions.slice(3, 6)} />
          </Grid>
          <Grid container item xs={12} spacing={3}>
            <FormRow row={3} subLetters={wordGroups.length > 2 ? letterOptions.slice(8, 12) : letterOptions.slice(6, 9)} />
          </Grid>
          {wordGroups.length > 2 ? <Grid container item xs={12} spacing={3}>
            <FormRow row={4} subLetters={letterOptions.slice(12, 16)} />
          </Grid> : null}
        </> : null}
      </Grid>
    </div>
  );
}