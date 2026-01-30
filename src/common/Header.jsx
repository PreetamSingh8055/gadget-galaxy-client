import * as React from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Blocks,
  Logs,
  ShoppingCart,
  User,
  UserCheck,
  Menu,
  X,
} from "lucide-react";
import { useUser } from "@/context/AuthContext.jsx";
import { useDispatch, useSelector } from "react-redux";
import { clearCart } from "@/redux/slice/cart.slice";
import { fetchCartDetails } from "@/redux/actions/cart.action";
import { useEffect, useState } from "react";

const Header = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user, isAuthenication, logout } = useUser();
  const [mobileOpen, setMobileOpen] = useState(false);

  const cartData = useSelector((state) => state.cartReducer.data);
  const items = cartData?.cartItem || [];

  useEffect(() => {
    dispatch(fetchCartDetails());
  }, [user]);

  const closeMobileMenu = () => setMobileOpen(false);

  return (
    <header className="sticky top-0 z-[999] bg-gradient-to-r from-gray-900 to-blue-200">
      {/* TOP BAR */}
      <div className="flex items-center justify-between px-4 py-3 md:px-8">
        {/* LOGO */}
        <Link to="/" onClick={closeMobileMenu}>
          <div className="flex items-center gap-2 text-white font-semibold">
            <Blocks />
            Gadget Shop
          </div>
        </Link>

        {/* DESKTOP MENU */}
        <nav className="hidden md:flex items-center gap-6 text-white">
          <Link to="/" className="hover:text-purple-300">
            Home
          </Link>
          <Link to="/products" className="hover:text-purple-300">
            Products
          </Link>
          <Link to="/aboutus" className="hover:text-purple-300">
            About
          </Link>
          <Link to="/cart" className="relative hover:text-purple-300">
            <ShoppingCart />
            {items.length > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-600 text-white text-[10px] w-4 h-4 flex items-center justify-center rounded-full">
                {items.length}
              </span>
            )}
          </Link>

          {isAuthenication ? (
            <>
              <Link to="/my-orders" className="hover:text-purple-300">
                <Logs />
              </Link>
              <button
                onClick={() => {
                  logout();
                  dispatch(clearCart());
                }}
                className="hover:text-red-400"
              >
                Logout
              </button>
              <span className="ml-2 text-sm bg-gray-700 px-3 py-1 rounded-xl">
                {user}
              </span>
            </>
          ) : (
            <>
              <Link to="/signin">
                <User />
              </Link>
              <Link to="/signup">
                <UserCheck />
              </Link>
            </>
          )}
        </nav>

        {/* MOBILE BUTTON */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="md:hidden text-white"
        >
          {mobileOpen ? <X size={26} /> : <Menu size={26} />}
        </button>
      </div>

      {/* MOBILE MENU */}
    {/* MOBILE MENU */}
{mobileOpen && (
  <div className="md:hidden bg-gray-900 text-white px-6 py-6">
    <div className="flex flex-col gap-3">
      {/* MAIN LINKS */}
      <Link
        to="/"
        onClick={closeMobileMenu}
        className="block px-4 py-3 rounded-lg bg-gray-800 hover:bg-gray-700"
      >
        Home
      </Link>

      <Link
        to="/products"
        onClick={closeMobileMenu}
        className="block px-4 py-3 rounded-lg bg-gray-800 hover:bg-gray-700"
      >
        Products
      </Link>

      <Link
        to="/aboutus"
        onClick={closeMobileMenu}
        className="block px-4 py-3 rounded-lg bg-gray-800 hover:bg-gray-700"
      >
        About
      </Link>

      <Link
        to="/cart"
        onClick={closeMobileMenu}
        className="block px-4 py-3 rounded-lg bg-gray-800 hover:bg-gray-700"
      >
        Cart ({items.length})
      </Link>

      <div className="h-px bg-gray-700 my-3"></div>

      {/* AUTH SECTION */}
      {isAuthenication ? (
        <>
          <Link
            to="/my-orders"
            onClick={closeMobileMenu}
            className="block px-4 py-3 rounded-lg bg-gray-800 hover:bg-gray-700"
          >
            My Orders
          </Link>

          <button
            onClick={() => {
              logout();
              dispatch(clearCart());
              closeMobileMenu();
            }}
            className="w-full text-left px-4 py-3 rounded-lg bg-red-500/10 text-red-400 hover:bg-red-500/20"
          >
            Logout
          </button>
        </>
      ) : (
        <>
          <Link
            to="/signin"
            onClick={closeMobileMenu}
            className="block px-4 py-3 rounded-lg bg-purple-600 hover:bg-purple-700 text-center font-semibold"
          >
            Sign In
          </Link>

          <Link
            to="/signup"
            onClick={closeMobileMenu}
            className="block px-4 py-3 rounded-lg bg-blue-600 hover:bg-blue-700 text-center font-semibold"
          >
            Sign Up
          </Link>
        </>
      )}
    </div>
  </div>
)}

    </header>
  );
};

export default Header;
