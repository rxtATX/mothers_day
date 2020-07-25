import React from 'react';
import MainPage from './components/MainPage'
import { GameplayProvider } from './utility/GlobalState'
import './App.css';

function App() {

  return (
    <main>
      <GameplayProvider>
        <MainPage />
      </GameplayProvider>
    </main>
  );
}

export default App;
