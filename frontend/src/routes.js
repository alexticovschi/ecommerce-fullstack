import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import SignUp from './user/SignUp';
import SignIn from './user/SignIn';
import Home from './components/Home/Home';
import Layout from './components/Layout/Layout';

const routes = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Layout>
          <Route path='/signup' exact component={SignUp} />
          <Route path='/signin' exact component={SignIn} />
          <Route path='/' exact component={Home} />
        </Layout>
      </Switch>
    </BrowserRouter>
  );
};

export default routes;
