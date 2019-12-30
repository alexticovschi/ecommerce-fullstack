import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import SignUp from './user/SignUp';
import SignIn from './user/SignIn';
import Home from './components/Home/Home';
import Shop from './components/Shop/Shop';
import Cart from './components/Cart/Cart';
import Product from './components/Product/Product';
import Layout from './components/Layout/Layout';
import PrivateRoute from './auth/PrivateRoute';
import AdminRoute from './auth/AdminRoute';
import Account from './user/Account';
import AdminDashboard from './admin/AdminDashboard/AdminDashboard';
import AddCategory from './admin/AddCategory/AddCategory';
import AddProduct from './admin/AddProduct/AddProduct';

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const routes = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Layout>
          <Route path='/signup' exact component={SignUp} />
          <Route path='/signin' exact component={SignIn} />
          <Route path='/shop' exact component={Shop} />
          <Route path='/cart' exact component={Cart} />
          <Route path='/' exact component={Home} />
          <Route path='/product/:id' exact component={Product} />
          <PrivateRoute path='/user/account' exact component={Account} />
          <AdminRoute
            path='/admin/dashboard'
            exact
            component={AdminDashboard}
          />
          <AdminRoute path='/create/category' exact component={AddCategory} />
          <AdminRoute path='/create/product' exact component={AddProduct} />
          <ToastContainer />
        </Layout>
      </Switch>
    </BrowserRouter>
  );
};

export default routes;
