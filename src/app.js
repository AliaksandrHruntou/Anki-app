import { useState } from 'react';
import { Route, BrowserRouter as Router, Switch } from 'react-router-dom';

import AppHeader from './components/app-header/app-header';

import MainPage from './components/main-page/main-page';
import SelectDeckPage from './components/select-deck-page/select-deck-page';
import CreateDeckPage from './components/create-deck-page/create-deck-page';
import SettingsPage from './components/settings-page/settings-page';
import MainTablePage from './components/main-table-page/main-table-page';
import EditDeckPage from './components/edit-deck-page/edit-deck-page';

import ScheduleAlgorithm from './hooks/schedule-algorithm'; 

import './app.css';


const store = require('store');

const App = () => {

  const [editMode, setEditMode] = useState(false);
  const [mode, setMode] = useState("Front/Back"); 
  const [deck, setDeck] = useState({
    deckTitle: '',
    items: []
  });

  const { selectRepetitionCards } = ScheduleAlgorithm();

  const onSelectDeck = (title, editMode) => {
    setEditMode(editMode);
    const selectedDeck = store.get(title);
    if (!editMode) {
      selectedDeck.items = selectRepetitionCards(selectedDeck.items);
    } 
    setDeck(selectedDeck);
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
        <AppHeader/>
        <Switch>
          <Route exact path="/">
            <MainPage/>
          </Route>
          <Route exact path="/select-deck-page">
            <SelectDeckPage onSelectDeck={ onSelectDeck }/>
          </Route>
          <Route exact path="/create-deck-page">
            <CreateDeckPage 
              deck={ deck } 
              clearState={ clearState }
              onSetEditMode={ (mode) => setEditMode(mode) }
            />
          </Route>
          <Route exact path="/settings-page">
            <SettingsPage onSetMode={ (mode) => setMode(mode) }/>
          </Route>
          <Route exact path="/main-table-page">
            <MainTablePage 
              deck={ deck } 
              clearState={ clearState }
              mode={ mode }
              setDeck={ setDeck }
            />
          </Route>
          <Route exact path="/edit-deck-page">
            <EditDeckPage
              deck={ deck } 
              clearState={ clearState } 
              editMode={ editMode }
              onSetEditMode={ (mode) => setEditMode(mode) }
            />
          </Route>
        </Switch>
      </div>
    </Router>
  );
};

export default App;
