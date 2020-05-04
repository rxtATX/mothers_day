import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import HelpOutline from '@material-ui/icons/HelpOutline';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import Dialog from './UI/Dialog';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import { useGameplayContext } from '../utility/GlobalState';

const useStyles = makeStyles((theme) => {
  return {
    root: {
      flexGrow: 1,
      margin: '2em 3em 1em'
    },
    button: {
      borderRadius: '10px',
      lineHeight: 2,
      background: `radial-gradient(${theme.palette.secondary.light}, ${theme.palette.secondary.main}, ${theme.palette.secondary.dark})`,
      textAlign: 'center',
      color: 'white',
      textShadow: '0px 1px 2px black',
      fontSize: '1.25em',
      fontWeight: '700',
      padding: '.5em 2em'
    },
    paper: {
      padding: theme.spacing(2),
      textAlign: 'center',
      color: theme.palette.text.secondary,
    },
    hintButton: {
      position: 'fixed',
      top: 0,
      right: 0
    }
  }
});

function ButtonElement({ hintButton, onClick }) {
  return (
    <IconButton
      className={hintButton}
      onClick={onClick}
      color="secondary"
    >
      <HelpOutline />
    </IconButton>
  )
}

export default function ConfigClues({
  dispatchGetWord, dispatchGetHint
}) {
  const classes = useStyles();
  const [checked, setChecked] = useState(false);
  const [state, dispatch] = useGameplayContext();

  useEffect(() => {
    setChecked(state.hintPreference)
  }, [state.hintPreference])

  function accept() {
    dispatchChange()
    dispatchGetHint()
  }

  function handleChange(e) {
    setChecked(!checked)
  }

  function dispatchChange() {
    dispatch({ type: 'SET_HINT_PREFERENCE', payload: checked })
  }

  return (
    <div className={classes.root}>
      <Grid container justify="center" alignItems="baseline" spacing={3}>
        <Grid item>
          <Button
            onClick={dispatchGetWord}
            variant="contained"
            className={classes.button}
          >
            New Game
          </Button>
        </Grid>
      </Grid>
      {!state.hintPreference ? <Dialog
        title="Too hard?"
        accept={accept}
        textContent="Would you like a hint?"
        buttonElement={<ButtonElement dispatchGetHint={dispatchGetHint}
          hintButton={classes.hintButton} />}
      >
        <FormControlLabel
          control={
            <Checkbox
              checked={checked}
              onChange={handleChange}
              name="hintPreference"
              color="primary"
            />
          }
          label="Check to not ask again."
        />
      </Dialog> : <ButtonElement onClick={dispatchGetHint}
        hintButton={classes.hintButton} />}
    </div>
  );
}