import Cookies from 'js-cookie';
import { createContext, useReducer } from 'react';
import { toast } from 'react-toastify';

export const StoreContext = createContext();

const initialState = {
  userInfo: Cookies.get('userInfo')
    ? JSON.parse(Cookies.get('userInfo'))
    : null,

  cart: {
    cartItems: Cookies.get('cartItems')
      ? JSON.parse(Cookies.get('cartItems'))
      : [],
  },
};

const reducer = (state, action) => {
  switch (action.type) {
    case 'LOGIN_USER':
      return { ...state, userInfo: action.payload };

      case 'LOGOUT_USER':
      return { ...state, userInfo: null };

    case 'ADD_ITEM_TO_CART': {
      const newItem = action.payload;
      const existingItem = state.cart.cartItems.find(
        (item) => item._key === newItem._key
      );
      const cartItems = existingItem
        ? state.cart.cartItems.map((item) =>
            item._key === existingItem._key ? newItem : item
          )
        : [...state.cart.cartItems, newItem];
      Cookies.set('cartItems', JSON.stringify(cartItems));
      return { ...state, cart: { ...state.cart, cartItems } };
    }

    case 'REMOVE_ITEM_FROM_CART': {
      const cartItems = state.cart.cartItems.filter(
        (item) => item._key !== action.payload._key
      );
      Cookies.set('cartItems', JSON.stringify(cartItems));
      return { ...state, cart: { ...state.cart, cartItems } };
    }

    case 'INCREASE_ITEM_QUANTITY': {
      // const itemIndex = state.cart.cartItems.findIndex(
      //   (item) => item._key === action.payload._key
      // );
      // if (state.cart.cartItems[itemIndex].quantity > 1) {
      //   state.cart.cartItems[itemIndex].quantity -= 1;
      // } else if (state.products[itemIndex].productQuantity === 1) {
      //   const filteredProduct = state.products.filter(
      //     (product) => product._id !== action.payload._id
      //   );
      //   state.products = filteredProduct;
      // }

      const itemIndex = state.cart.cartItems.findIndex(
        (item) => item._key === action.payload._key
      );

      if (itemIndex >= 0) {
        state.cart.cartItems[itemIndex].quantity += 1;
        toast.info(`${action.payload.name} quantity in cart increased by 1`, {
          position: 'bottom-right',
        });
      } else {
        const cartItems = { ...action.payload, quantity: 1 };
        // state.cart = [...state.cart.cartItems, cartItems];

        Cookies.set('cartItems', JSON.stringify(cartItems));
        return { ...state, cart: { ...state.cart, cartItems } };
        toast.success(`${action.payload.name} added to cart`, {
          position: 'bottom-right',
        });
      }
    }

    case 'DECREASE_ITEM_QUANTITY': {
      const itemIndex = state.cart.cartItems.findIndex(
        (item) => item._key === action.payload._key
      );
      if (state.cart.cartItems[itemIndex].quantity > 1) {
        state.cart.cartItems[itemIndex].quantity -= 1;
      } else if (state.cart.cartItems[itemIndex].quantity === 1) {
        const cartItems = state.cart.cartItems.filter(
          (item) => item._key !== action.payload._key
        );
        Cookies.set('cartItems', JSON.stringify(cartItems));
        return { ...state, cart: { ...state.cart, cartItems } };
      }
    }

    case 'CLEAR_CART': {
      const cartItems = state.cart.cartItems;
      cartItems = [];
      Cookies.set('cartItems', JSON.stringify(cartItems));
      return { ...state, cart: { ...state.cart, cartItems } };
    }

    default:
      return state;
  }
};

export const StoreProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const value = { state, dispatch };
  return (
    <StoreContext.Provider value={value}>{children}</StoreContext.Provider>
  );
};
