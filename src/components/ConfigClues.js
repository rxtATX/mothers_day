import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';


const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    margin: '2em 3em'
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
}));

export default function ConfigClues({
  dispatchGetWord, dispatchGetHint
}) {
  const classes = useStyles();


  return (
    <div className={classes.root}>
      <Grid container justify="center" spacing={3}>
        {/* <Grid item xs={12} /*md={3} /> */}
        <Grid item xs={12} /*md={2}*/>
          <Button
            onClick={dispatchGetWord}
            variant="contained"
            color="primary"
            disableElevation
          >
            New Game
          </Button>
        </Grid>
        <Grid item xs={12} /*md={2}*/>
          <Button
            onClick={dispatchGetHint}
            variant="contained"
            color="secondary"
            disableElevation
          >
            Hint
          </Button>
        </Grid>
      </Grid>
    </div>
  );
}