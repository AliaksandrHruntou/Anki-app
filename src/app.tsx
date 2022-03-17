import { FC } from 'react';
import { 
  Route, 
  BrowserRouter as Router, 
  Switch 
} from 'react-router-dom';

import AppHeader from './components/common/app-header/app-header';

import { 
  CreateDeckPage, 
  EditDeckPage, 
  MainPage, 
  MainTablePage, 
  SelectDeckPage, 
  SettingsPage
} from './components/pages'

import { 
  Dashboard, 
  ForgotPassword, 
  Login, 
  PrivateRoute, 
  Signup, 
  UpdateProfile 
} from './components/authentication'

import { useAuth } from './components/contexts/auth-context';

import './app.css';
import 'bootstrap/dist/css/bootstrap.min.css';

const App: FC = () => {
  const { currentUser } = useAuth();

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
              <MainTablePage/>
            </PrivateRoute>
            <PrivateRoute exact path="/edit-deck-page">
              <EditDeckPage/>
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
