import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import '../css/_checkout.scss';

/**
 * COMPONENT
 */
export const Checkout = (props) => {
  const { user, cart } = props;
  const { name, email, billingAddress, shippingAddress } = user;
  let subtotal = 0.00;
  let items = 0;
  if (cart.length) {
    cart.forEach((a) => {
      subtotal += a.price * a.quantity;
      items += a.quantity;
    });
  }
  const tax = subtotal * 0.1025;
  const shipping = subtotal > 0 ? 8.95 * items : 0.00;
  const total = subtotal + tax + shipping;

  return (
    <div className="checkout-wrapper">

      <div className="checkout-details">
        <div className="title">
          <h3>Cart Summary</h3>
        </div>
        {
          cart.map(item => (
            <div key={item.id} className="checkout-item">
              <img src={item.product.image} />
              <p>{item.product.name}</p>
              <p>${item.price}</p>
              <p>Quantity: {item.quantity}</p>
            </div>
          ))
        }
      </div>

      <div className="user-details">
        <div className="title">
          <h3>Checkout Details</h3>
        </div>
        <form>

          <label>Contact Details</label>
          <div className="user-section">
            <input type="email" placeholder="JohnDoe@email.com" defaultValue={email} />
          </div>

          <label>Shipping Address</label>
          <div className="address-section">
            <input name="ship-name" type="text" placeholder="John Doe" defaultValue={name} />
            <input name="ship-address" type="text" placeholder="123 South Oak Street" defaultValue={shippingAddress} />
            <input name="ship-city" type="text" placeholder="Chicago" />
            <input name="ship-state" type="text" placeholder="IL" />
            <input name="ship-zip" type="text" placeholder="60601" />
          </div>

          <label>Billing Address</label>
          <div className="address-section">
            <input name="bill-name" type="text" placeholder="John Doe" defaultValue={name} />
            <input name="bill-address" type="text" placeholder="123 South Oak Street" defaultValue={billingAddress} />
            <input name="bill-city" type="text" placeholder="Chicago" />
            <input name="bill-state" type="text" placeholder="IL" />
            <input name="bill-zip" type="text" placeholder="60601" />
          </div>

          <label>Payment Details</label>
          <div className="card-section">
            <input name="card-name" type="text" placeholder="John Doe" defaultValue={name} />
            <input name="card-date" type="text" placeholder="00/00" />
            <input name="card-number" type="text" placeholder="0000-0000-0000-0000" />
            <input name="card-ccv" type="text" placeholder="000" />
          </div>

          <label>Summary</label>
          <div className="confirm-section">
            <div className="confirm-total">
              <p>S&H: ${shipping.toFixed(2)}</p>
              <p>Tax: ${tax.toFixed(2)}</p>
              <p>Sub-Total: ${subtotal.toFixed(2)}</p>
              <p><b>Total: ${total.toFixed(2)}</b></p>
            </div>
            <Link to="/successful-order">Order Now</Link>
          </div>
        </form>
      </div>

    </div>
  );
};

/**
 * CONTAINER
 */
const mapState = (state) => {
  return {
    user: state.user,
    cart: state.cart,
  };
};

const mapDispatch = null;

// const mapDispatch = (dispatch) => {
//   return {

//   };
// };

export default connect(mapState, mapDispatch)(Checkout);

/**
 * PROP TYPES
 */
Checkout.propTypes = {

};