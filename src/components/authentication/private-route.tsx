import { FC } from 'react';
import { Redirect, Route } from 'react-router-dom';
import { useAuth } from '../contexts/auth-context';

type PrivateRoutePropsType = {
  exact: boolean,
  path: string
}

const PrivateRoute: FC<PrivateRoutePropsType> = ({
  exact,
  path,
  children
}) => {
  const { currentUser } = useAuth();
  return (
    <Route
      exact = {exact}
      path = {path}
      render={() => {
        return currentUser ?
          children :
          <Redirect to='/login'/>
      }}
    >
    </Route>
  );
};

export default PrivateRoute;