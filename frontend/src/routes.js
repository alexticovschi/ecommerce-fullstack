import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import SignUp from './user/SignUp';
import SignIn from './user/SignIn';
import Home from './components/Home/Home';
import Layout from './components/Layout/Layout';
import PrivateRoute from './auth/PrivateRoute';
import AdminRoute from './auth/AdminRoute';
import Account from './user/Account';
import AdminDashboard from './admin/AdminDashboard';

const routes = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Layout>
          <Route path='/signup' exact component={SignUp} />
          <Route path='/signin' exact component={SignIn} />
          <Route path='/' exact component={Home} />
          <PrivateRoute path='/user/account' exact component={Account} />
          <AdminRoute
            path='/admin/dashboard'
            exact
            component={AdminDashboard}
          />
        </Layout>
      </Switch>
    </BrowserRouter>
  );
};

export default routes;
