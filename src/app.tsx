import { FC, lazy, Suspense } from 'react';
import { 
  Route, 
  BrowserRouter as Router, 
  Switch 
} from 'react-router-dom';

import AppHeader from './components/common/app-header/app-header';
import Spinner from './components/common/spinner/spinner';

const Page404 = lazy(() => import('./components/pages/page404'));
const MainPage = lazy(() => import('./components/pages/main-page'));
const SelectDeckPage = lazy(() => import('./components/pages/select-deck-page'));
const CreateDeckPage = lazy(() => import('./components/pages/create-deck-page'));
const SettingsPage = lazy(() => import('./components/pages/settings-page'));
const LearningPage = lazy(() => import('./components/pages/learning-page'));
const EditDeckPage = lazy(() => import('./components/pages/edit-deck-page'));
const ProfilePage = lazy(() => import('./components/pages/profile-page'));
const UsersPage = lazy(() => import('./components/pages/users-page'));

import {
  ForgotPassword, 
  Login, 
  PrivateRoute, 
  Signup, 
  UpdateProfile 
} from './components/authentication'

import { useAuth } from './components/contexts/auth-context';

import './app.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import ErrorBoundary from './components/common/error-boundary/error-boundary';
import { Container } from 'react-bootstrap';

const App: FC = () => {
  const { currentUser, isAdmin } = useAuth();

  return (
    <Router>
      <div className="app">
        {currentUser && <AppHeader/>}
        {currentUser ?
          <Suspense fallback={<Spinner/>}>
            <Switch>
              <PrivateRoute exact path="/">
                <ErrorBoundary>
                  <MainPage/>
                </ErrorBoundary>
              </PrivateRoute>
              <PrivateRoute exact path="/select-deck-page">
                <ErrorBoundary>
                  <SelectDeckPage/>
                </ErrorBoundary>
              </PrivateRoute>
              <PrivateRoute exact path="/create-deck-page">
                <ErrorBoundary>
                  <CreateDeckPage/>
                </ErrorBoundary>
              </PrivateRoute>
              <PrivateRoute exact path="/settings-page">
                <ErrorBoundary>
                  <SettingsPage/>
                </ErrorBoundary>
              </PrivateRoute>
              <PrivateRoute exact path="/main-table-page">
                <ErrorBoundary>
                  <LearningPage/>
                </ErrorBoundary>
              </PrivateRoute>
              <PrivateRoute exact path="/edit-deck-page">
                <ErrorBoundary>
                  <EditDeckPage/>
                </ErrorBoundary>
              </PrivateRoute>
              <PrivateRoute exact path="/dashboard">
                <ErrorBoundary>
                  <ProfilePage/>
                </ErrorBoundary>
              </PrivateRoute>
              <PrivateRoute exact path="/update-profile">
                <ErrorBoundary>
                  <UpdateProfile/>
                </ErrorBoundary>
              </PrivateRoute>
              {isAdmin && 
                <PrivateRoute exact path="/users">
                  <ErrorBoundary>
                    <UsersPage/>
                  </ErrorBoundary>
                </PrivateRoute>
              }
              <Route path="*">
                <Page404/>
              </Route>
            </Switch>
          </Suspense>
          :
          <Container
            className="d-flex align-items-center justify-content-center"
            style={{ minHeight: "100vh" }}
          >
            <div className="w-100" style={{ maxWidth: "400px" }}>
              <Switch>
                <Route exact path="/">
                  <Login/>
                </Route>
                <Route path="/signup">
                  <Signup/>
                </Route>
                <Route path="/forgot-password">
                  <ForgotPassword/>
                </Route>
              </Switch>
            </div>
          </Container>
        }
      </div>
    </Router>
  );
};

export default App;
