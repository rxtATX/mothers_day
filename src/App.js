import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import MainPage from './components/MainPage'
import { GameplayProvider } from './utility/GlobalState'
import './App.css';

const useStyles = makeStyles((theme) => ({
  root: {
    margin: '5em 3em'
  },
}));

function App() {
  const classes = useStyles();

  return (
    <main className={classes.root}>
      <GameplayProvider>
        <MainPage />
      </GameplayProvider>
    </main>
  );
}

export default App;
