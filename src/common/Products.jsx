import API from "@/API/Interceptor";
import React, { useEffect } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "@/redux/actions/product.action";
import { createCartItems } from "@/redux/actions/cart.action";

const Products = () => {
  const productData = useSelector((state) => state.productReducer.data);
  const dispatch = useDispatch();

  const getProduct = async () => {
    try {
      dispatch(fetchProducts());
    } catch (err) {
      console.log(err);
    }
  };

  const handleAddToCart = (productId) => {
    dispatch(createCartItems({ productId }));
  };

  useEffect(() => {
    getProduct();
  }, []);

  return (
    <div className="min-h-screen bg-black py-8 sm:py-10 px-3 sm:px-4">
      {/* Heading */}
      <h1 className="text-3xl sm:text-4xl font-bold text-white text-center mb-8 sm:mb-10 tracking-wide">
        GADGETS
      </h1>

      {/* Products Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6 sm:gap-8 max-w-7xl mx-auto">
        {productData?.map((item) => (
          <motion.div
            key={item._id}
            className="bg-zinc-900 border border-zinc-700 rounded-2xl shadow-lg overflow-hidden flex flex-col"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.98 }}
          >
            {/* Image */}
            <div className="w-full h-44 sm:h-52 md:h-56 overflow-hidden">
              <img
                src={item.image}
                alt={item.name}
                className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
              />
            </div>

            {/* Card Content */}
            <div className="p-4 sm:p-5 flex flex-col flex-grow justify-between">
              <div>
                <h2 className="text-lg sm:text-xl font-semibold text-white mb-1">
                  {item.name}
                </h2>
                <p className="text-gray-400 text-sm mb-3 line-clamp-2 min-h-[40px]">
                  {item.description}
                </p>
              </div>

              {/* Price + Actions */}
              <div className="mt-auto">
                <p className="text-base sm:text-lg font-bold text-purple-400 mb-4">
                  ₹{item.price}
                </p>

                <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 sm:justify-between sm:items-center">
                  <Link to={`/product/${item._id}`} className="w-full sm:w-auto">
                    <button className="w-full cursor-pointer bg-gradient-to-r from-purple-600 to-purple-800 text-white px-4 py-2 rounded-xl font-medium hover:from-purple-700 hover:to-purple-900 transition-all duration-200">
                      View Product
                    </button>
                  </Link>

                  <button
                    onClick={() => handleAddToCart(item._id)}
                    className="w-full sm:w-auto cursor-pointer border border-purple-500 text-purple-300 px-4 py-2 rounded-xl font-medium hover:bg-purple-700 hover:text-white transition-all duration-200"
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Products;
