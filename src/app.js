import MainTable from './components/main-table/main-table'
import Header from './components/header/header';
import SelectDeck from './components/select-deck/select-deck';
import CreateDeck from './components/create-deck/create-deck';
import { useState } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import ScheduleAlgorithm from './components/schedule-algorithm/schedule-algorithm'; 
import SettingsPage from './components/settings-page/settings-page';
import WelcomePage from './components/welcome-page/welcome-page';

import './app.css';


const store = require('store');

const App = () => {

  const [editMode, setEditMode] = useState(false);
  const [mode, setMode] = useState("Front/Back"); 
  const [deck, setDeck] = useState({
    deckTitle: '',
    items: []
  });

  const {selectRepetitionCards} = ScheduleAlgorithm();

  const onSelectDeck = (title, editMode) => {
    setEditMode(editMode);
    const selectedDeck = store.get(title);
    if (!editMode) {
      selectedDeck.items = selectRepetitionCards(selectedDeck.items);
    } 
    setDeck(selectedDeck);
  };

  const onSetEditMode = (mode) => {
    setEditMode(mode);
  };

  const onSetMode = (mode) => {
    setMode(mode);
  };

  const clearState = () => {
    setDeck({
      deckTitle: '',
      items: []
    });
  };

  return (
    <Router>
      <div className="app">
        <Header/>
        <Switch>
          <Route exact path="/">
            <WelcomePage/>
          </Route>
          <Route exact path="/select-deck">
            <SelectDeck onSelectDeck={onSelectDeck}/>
          </Route>
          <Route exact path="/create-deck">
            <CreateDeck 
              deck={deck} 
              clearState={clearState} 
              editMode={editMode}
              onSetEditMode={onSetEditMode}
            />
          </Route>
          <Route exact path="/main-table">
            <MainTable 
              deck={deck} 
              clearState={clearState}
              mode={mode}
              setDeck={setDeck}
            />
          </Route>
          <Route exact path="/settings-page">
            <SettingsPage onSetMode={onSetMode}/>
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
