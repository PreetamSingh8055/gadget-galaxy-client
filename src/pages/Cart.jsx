import {
  fetchCartDetails,
  updateCartItem,
  deleteCartItem,
} from "@/redux/actions/cart.action";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

const Cart = () => {
  const dispatch = useDispatch();
  const cartData = useSelector((state) => state.cartReducer.data);

  const cart = cartData;
  const items = cart?.cartItem || [];

  useEffect(() => {
    dispatch(fetchCartDetails());
  }, []);

  const handleUpdate = (itemId, newQty) => {
    if (newQty < 1) return;
    dispatch(updateCartItem({ productId: itemId, quantity: newQty }));
  };

  const handleDelete = (itemId) => {
    dispatch(deleteCartItem(itemId));
  };

  return (
    <div>
      {items.length > 0 ? (
        <div className="min-h-screen bg-gradient-to-br from-[#6A5ACD] via-[#7B68EE] to-[#5F9EA0] p-8 flex justify-center">
          <div className="w-full max-w-6xl grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* LEFT SECTION */}
            <div className="md:col-span-2 bg-white/10 backdrop-blur-xl border border-white/20 p-8 rounded-2xl shadow-[0_0_35px_rgba(0,0,0,0.4)]">
              <h1 className="text-3xl font-bold text-white text-center mb-8 tracking-wide">
                🛒 Your Cart
              </h1>

              <div className="space-y-6">
                {items.map((item) => (
                  <div
                    key={item._id}
                    className="flex gap-6 bg-white/10 rounded-xl p-6 border border-white/10 shadow-lg hover:bg-white/20 transition-all duration-200"
                  >
                    <img
                      src={item.product.image}
                      alt={item.product.name}
                      className="w-28 h-28 rounded-xl object-cover shadow-md border border-white/20"
                    />

                    <div className="flex flex-col justify-between w-full">
                      <div className="flex justify-between items-start">
                        <div>
                          <h2 className="text-xl font-semibold text-white">
                            {item.product.name}
                          </h2>
                          <p className="text-white/60 mt-1 text-sm">
                            {item.product.description}
                          </p>
                        </div>

                        {/* DELETE BUTTON */}
                        <button
                          onClick={() => handleDelete(item._id)}
                          className="p-2 hover:bg-red-500/20 rounded-lg transition cursor-pointer"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={1.7}
                            stroke="white"
                            className="w-6 h-6 hover:stroke-red-400 transition"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M6 7h12m-9 4v6m6-6v6M9 4h6l1 3H8l1-3z"
                            />
                          </svg>
                        </button>
                      </div>

                      {/* QUANTITY + PRICE */}
                      <div className="flex justify-between items-center mt-4">
                        <div className="flex items-center gap-3">
                          <button
                            onClick={() =>
                              handleUpdate(item._id, item.quantity - 1)
                            }
                            className="w-8 h-8 flex items-center justify-center bg-white/20 hover:bg-white/30 text-white rounded-lg transition text-lg font-bold cursor-pointer"
                          >
                            -
                          </button>

                          <span className="text-white font-semibold text-lg w-6 text-center">
                            {item.quantity}
                          </span>

                          <button
                            onClick={() =>
                              handleUpdate(item._id, item.quantity + 1)
                            }
                            className="w-8 h-8 flex items-center justify-center bg-white/20 hover:bg-white/30 text-white rounded-lg transition text-lg font-bold cursor-pointer"
                          >
                            +
                          </button>
                        </div>

                        <div className="text-right">
                          <p className="text-white/70 text-sm">Price</p>
                          <p className="text-white font-bold text-xl">
                            ₹{Number(item.product.price) * item.quantity}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* RIGHT SUMMARY */}
            <div className="bg-white/10 backdrop-blur-xl border border-white/20 p-8 rounded-2xl shadow-xl h-fit sticky top-8">
              <h2 className="text-2xl font-bold text-white text-center mb-6 tracking-wide">
                🧾 Order Summary
              </h2>

              <div className="flex justify-between text-white/90 mb-2 text-lg">
                <span>Subtotal</span>
                <span>₹{cart?.cartPrice || 0}</span>
              </div>

              <div className="flex justify-between text-white/70 text-sm mb-4">
                <span>Delivery Charges</span>
                <span>Free</span>
              </div>

              <div className="flex justify-between text-white font-bold text-xl mt-4 border-t border-white/20 pt-4">
                <span>Total</span>
                <span>₹{cart?.cartPrice || 0}</span>
              </div>

              <Link to="/order">
                <button className="cursor-pointer mt-6 w-full bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 text-white font-bold py-3 rounded-xl shadow-xl tracking-wide transition-all duration-200">
                  Checkout
                </button>
              </Link>
            </div>
          </div>
        </div>
      ) : (
        <div className="min-h-screen flex flex-col justify-center items-center gap-3 text-white text-2xl">
          <div>Cart is empty 🛒</div>

          <Link to="/">
            <button className="border-1 border-gray-300 py-2 px-4 rounded-4xl cursor-pointer bg-gradient-to-br from-[#6A5ACD] via-[#7B68EE] to-[#5F9EA0]">
              Start Shopping
            </button>
          </Link>
        </div>
      )}
    </div>
  );
};

export default Cart;
