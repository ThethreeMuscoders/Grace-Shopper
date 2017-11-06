import { createStore, combineReducers, applyMiddleware } from 'redux';
import createLogger from 'redux-logger';
import thunkMiddleware from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import user from './user';
import products from './products';
import selectedProduct from './singleProduct';
import cart from './cart';
import filteredProducts from './filters';
import reviews from './review';
import purchaseHistory from './purchaseHistory';
import categories from './categories';
import error from './error';

const reducer = combineReducers({
  user,
  products,
  cart,
  filteredProducts,
  selectedProduct,
  reviews,
  purchaseHistory,
  categories,
  error,
});

const middleware = composeWithDevTools(applyMiddleware(
  thunkMiddleware,
  createLogger({ collapsed: true }),
));

const store = createStore(reducer, middleware);

export default store;
export * from './user';
export * from './products';
export * from './filters';
export * from './cart';
export * from './singleProduct';
export * from './review';
export * from './purchaseHistory';
export * from './categories';
export * from './error';
