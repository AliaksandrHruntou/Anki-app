import { useState, FC } from 'react';
import { Route, BrowserRouter as Router, Switch } from 'react-router-dom';

import AppHeader from './components/app-header/app-header';
import Signup from './components/authentication/Signup';

import MainPage from './components/main-page/main-page';
import SelectDeckPage from './components/select-deck-page/select-deck-page';
import CreateDeckPage from './components/create-deck-page/create-deck-page';
import SettingsPage from './components/settings-page/settings-page';
import MainTablePage from './components/main-table-page/main-table-page';
import EditDeckPage from './components/edit-deck-page/edit-deck-page';

import './app.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import { useAuth } from './contexts/auth-context';
import Dashboard from './components/authentication/Dashboard'
import Login from './components/authentication/Login';
import PrivateRoute from './components/authentication/PrivateRoute';
import ForgotPassword from './components/authentication/forgot-password';
import UpdateProfile from './components/authentication/update-profile';
import { DeckType } from './types/types';

const App: FC = () => {
  
  const { 
    currentUser,
    mode
  } = useAuth();
 
  const [currentDeck, setCurrentDeck] = useState<DeckType>({
    deckTitle: '',
    items: []
  });

  const clearState = (): void => {
    setCurrentDeck({
      deckTitle: '',
      items: []
    });
  };

  return (
    <Router>
      <div className="app">
        {currentUser && <AppHeader/>}
        {currentUser ?
          <Switch>
            <PrivateRoute exact path="/">
              <MainPage/>
            </PrivateRoute>
            <PrivateRoute exact path="/select-deck-page">
              <SelectDeckPage/>
            </PrivateRoute>
            <PrivateRoute exact path="/create-deck-page">
              <CreateDeckPage/>
            </PrivateRoute>
            <PrivateRoute exact path="/settings-page">
              <SettingsPage/>
            </PrivateRoute>
            <PrivateRoute exact path="/main-table-page">
              <MainTablePage 
                mode={ mode }
              />
            </PrivateRoute>
            <PrivateRoute exact path="/edit-deck-page">
              <EditDeckPage
                clearState={ clearState }
              />
            </PrivateRoute>
            <PrivateRoute exact path="/Dashboard">
              <Dashboard/>  
            </PrivateRoute>
            <PrivateRoute exact path="/update-profile">
              <UpdateProfile/>
            </PrivateRoute>
          </Switch>
          :
          <Switch>
            <Route path="/signup" component={Signup} />
            <Route path="/login" component={Login} />
            <Route path="/forgot-password" component={ForgotPassword} />
          </Switch>
        }
      </div>
    </Router>
  );
};

export default App;
