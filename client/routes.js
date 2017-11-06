import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Router } from 'react-router';
import { Route, Switch } from 'react-router-dom';
import PropTypes from 'prop-types';
import history from './history';
import {
  Main,
  Login,
  Signup,
  UserHome,
  ProductList,
  FilterSidebar,
  Cart,
  ProductSinglePage,
  Checkout,
  adminMainView,
  adminOrdersView,
  adminProductsView,
  adminUsersView,
} from './components';
import { me, fetchAllProducts, fetchAllCategories } from './store';

/**
 * COMPONENT
 */
class Routes extends Component {
  componentDidMount() {
    this.props.loadInitialData();
  }

  render() {
    const { isLoggedIn, isAdmin } = this.props;

    return (
      <Router history={history}>
        <Main>
          <Switch>
            {/* Routes placed here are available to all visitors */}
            <Route path="/login" component={Login} />
            <Route path="/signup" component={Signup} />
            {
              isLoggedIn &&
              <Switch>
                {/* Routes placed here are only available after logging in */}
                <Route path="/home" component={UserHome} />
                <Route path='/admin' component={adminMainView} />
                <Route path="/admin/products" component={adminProductsView} />
                <Route path="/admin/users" component={adminUsersView} />
                <Route path="/admin/orders" component={adminOrdersView} />
              </Switch>
            }
            {/* Displays our Login component as a fallback */}
            <Route path="/login" component={Login} />
          </Switch>
          <Route exact path="/products" component={FilterSidebar} />
          <Route exact path="/products" component={ProductList} />
          <Route path='/products/:productId' component={ProductSinglePage} />
          <Route path="/cart" component={Cart} />
          <Route path="/checkout" component={Checkout} />
        </Main>
      </Router>
    )
  }
}

/**
 * CONTAINER
 */
const mapState = (state) => {
  return {
    // Being 'logged in' for our purposes will be defined has having a state.user that has a truthy id.
    // Otherwise, state.user will be an empty object, and state.user.id will be falsey
    isLoggedIn: !!state.user.id,
    isAdmin: state.user.isAdmin,
  }
}

const mapDispatch = (dispatch) => {
  return {
    loadInitialData(userId) {
      dispatch(me());
      dispatch(fetchAllProducts());
      dispatch(fetchAllCategories());
    },
  };
};

export default connect(mapState, mapDispatch)(Routes)

/**
 * PROP TYPES
 */
Routes.propTypes = {
  loadInitialData: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired,
  // isAdmin: PropTypes.bool.isRequired,
};
