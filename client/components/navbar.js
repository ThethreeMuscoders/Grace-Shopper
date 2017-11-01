import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { logout } from '../store';

export const Navbar = (props) => {
  const { isLoggedIn, handleClick } = props;

  return (
    <div>
      <div className="nav">
        <div className="logo">
          <img src="assets/gamepad.svg" alt="game controller icon" />
          <h1>gamepackig</h1>
        </div>
        <nav>
          {
            isLoggedIn
              ? <div>
                {/* The navbar will show these links after you log in */}
                <Link to="/home">Home</Link>
                <a href="#" onClick={handleClick}>Logout</a>
              </div>
              : <div>
                {/* The navbar will show these links before you log in */}
                <Link to="/checkout"><i className="fa fa-shopping-cart" aria-hidden="true"></i>Cart
                </Link>
                <Link to="/login">Login</Link>
                <Link to="/signup">Sign Up</Link>
              </div>
          }
        </nav>

      </div>
      <div className="sub-nav">
        <div className="nav-cat">
          <a>Categories</a>
        </div>
        <div className="nav-search">
          <input type="text" placeholder="search" />
        </div>
      </div>
    </div>
  )
}

/**
 * CONTAINER
 */
const mapState = (state) => {
  return {
    isLoggedIn: !!state.user.id,
  };
};

const mapDispatch = (dispatch) => {
  return {
    handleClick() {
      dispatch(logout());
    },
  };
};

// The `withRouter` wrapper makes sure that updates are not blocked
// when the url changes
export default connect(mapState, mapDispatch)(Navbar);

/**
 * PROP TYPES
 */
Navbar.propTypes = {
  handleClick: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired,
};
