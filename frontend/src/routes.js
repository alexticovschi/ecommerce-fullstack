import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import SignUp from './user/SignUp';
import SignIn from './user/SignIn';
import Home from './components/Home/Home';

const routes = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route path='/signup' exact component={SignUp} />
        <Route path='/signin' exact component={SignIn} />
        <Route path='/' exact component={Home} />
      </Switch>
    </BrowserRouter>
  );
};

export default routes;
