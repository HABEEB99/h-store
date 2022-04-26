import React, { useContext, useState } from 'react';
import { HiShoppingCart } from 'react-icons/hi';
import { BsCart2 } from 'react-icons/bs';
import { ImSearch } from 'react-icons/im';
import { RiUserSettingsFill } from 'react-icons/ri';
import SearchBar from '../search-bar/SearchBar';
import User from '../user/User';
import CartItem from '../cart-item/CartItem';
import { StoreContext } from '../../context/StoreContext';

const Header = () => {
  const [openSerchBar, setOpenSearchBar] = useState(false);
  const handleSearchBar = () => setOpenSearchBar(!openSerchBar);

  const [userOnline, setUserOnline] = useState(false);
  const handleUserOnline = () => setUserOnline(!userOnline);

  const [openCart, setOpenCart] = useState(false);
  const handleOpenCart = () => setOpenCart(!openCart);

  const {
    state: {
      cart: { cartItems },
    },
    dispatch,
  } = useContext(StoreContext);

  return (
    <div className="flex items-center justify-between w-screen h-[10vh] bg-header px-4 sm:px-6 md:px-12 lg:px-32">
      <div className="flex items-center space-x-1 font-bold  text-yellow-700">
        <HiShoppingCart className="text-xl lg:text-3xl" />
        <h1 className="text-xl lg:text-3xl">H-STORE</h1>
      </div>

      <div className="flex items-center space-x-4">
        <ImSearch
          onClick={handleSearchBar}
          className="text-lg sm:text-lg md:text-3xl text-logo hover:text-btn font-bold cursor-pointer"
        />

        <div
          onClick={handleOpenCart}
          className="relative flex items-center justify-center"
        >
          <div className="flex items-center justify-center absolute -top-[0.8rem] right-[0.09rem] md:-top-[1.1rem] md:right-[0.18rem] w-4 h-4 lg:w-6 lg:h-6 rounded-[50%] bg-yellow-500">
            <span className="text-xs md:text-base text-white font-bold">
              {cartItems && cartItems.length}
            </span>
          </div>
          <BsCart2 className="text-lg sm:text-lg md:text-3xl text-logo hover:text-btn font-extrabold cursor-pointer" />
        </div>

        <RiUserSettingsFill
          onClick={handleUserOnline}
          className="text-lg sm:text-lg md:text-3xl text-logo hover:text-btn animate-pulse font-bold cursor-pointer"
        />
      </div>

      {openSerchBar && <SearchBar />}
      {userOnline && <User />}
      {openCart && <CartItem />}
    </div>
  );
};

export default Header;
