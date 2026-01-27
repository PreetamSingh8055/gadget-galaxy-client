import API from "@/API/Interceptor";
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { ShoppingCart, Wallet, ArrowLeft } from "lucide-react";
import { useDispatch } from "react-redux";
import { createCartItems } from "@/redux/actions/cart.action";

/* ---------------------------------------
   Helper function
------------------------------------------ */
const createProductDetail = (product) => [
  { label: "Category", value: product.category },
  { label: "Stock Available", value: `${product.stock} units` },
  {
    label: "About this Product",
    value: product.description || "No description available.",
  },
];

const ProductDetail = () => {
  const [productData, setProductData] = useState(null);
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch(); // ✅ MUST BE HERE

  const getProductByID = async () => {
    try {
      const response = await API.get(`/product/${id}`);
      setProductData(response.data.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getProductByID();
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [id]);

  // ✅ HANDLERS MUST BE INSIDE COMPONENT
  const handleAddToCart = () => {
    dispatch(createCartItems({ productId: productData._id }));
  };

  const handleBuyNow = async () => {
    await dispatch(createCartItems({ productId: productData._id }));
    navigate("/cart");
  };

  if (!productData) {
    return (
      <div className="flex items-center justify-center h-[80vh] text-gray-500 text-lg">
        Loading product details...
      </div>
    );
  }

  const productDetails = createProductDetail(productData);

  return (
    <div className="min-h-screen bg-gray-100 py-16 px-4 flex justify-center">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-6xl w-full bg-white rounded-3xl shadow-xl overflow-hidden"
      >
        {/* 🔙 Back */}
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 p-6 text-gray-600 hover:text-black"
        >
          <ArrowLeft size={18} /> Back
        </button>

        <div className="grid md:grid-cols-2 gap-10 p-10">
          {/* Image */}
          <div className="flex justify-center">
            <img
              src={productData.image}
              alt={productData.name}
              className="rounded-xl w-full max-w-md object-cover"
            />
          </div>

          {/* Info */}
          <div className="space-y-6">
            <h1 className="text-4xl font-bold">{productData.name}</h1>

            <p className="text-2xl font-semibold text-purple-600">
              ₹{productData.price}
            </p>

            <div className="space-y-3">
              {productDetails.map((item, i) => (
                <div key={i}>
                  <p className="text-xs uppercase text-gray-400">
                    {item.label}
                  </p>
                  <p className="font-medium">{item.value}</p>
                </div>
              ))}
            </div>

            {/* Actions */}
            <div className="flex gap-4 pt-4">
              <Button
                onClick={handleAddToCart}
                className="w-1/2 bg-black text-white"
              >
                <ShoppingCart className="mr-2" />
                Add to Cart
              </Button>

              <Button
                onClick={handleBuyNow}
                className="w-1/2 bg-purple-600 text-white"
              >
                <Wallet className="mr-2" />
                Buy Now
              </Button>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default ProductDetail;
