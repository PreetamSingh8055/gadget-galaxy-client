import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import API from "@/API/Interceptor";
import { Link } from "react-router-dom";

const ReviewAndPlaceOrder = ({ currentStep, setCurrentStep }) => {
  const cartItems = useSelector((state) => state.cartReducer.data.cartItem);
  const totalAmount = useSelector((state) => state.cartReducer.data.cartPrice);
  const user = useSelector((state) => state.cartReducer.data.user);
  const [selectedAddress, setSelectedAddress] = useState({});
  const [paymentMethod, setPaymentMethod] = useState("COD");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchAddress = async () => {
      try {
        const { data } = await API.get("/address/selected");
        setSelectedAddress(data.address);
      } catch (error) {
        console.error("Failed to fetch address", error);
      }
    };
    fetchAddress();
  }, []);

  // CREATE ORDER API
  const createOrder = async (payload) => {
    try {
      const { data } = await API.post("/order/create", payload);
      await API.delete("/cart/empty");
      return data;
    } catch (error) {
      console.log("ORDER CREATION ERROR →", error);
    }
  };

  const handleCOD = async () => {
    const payload = {
      orderId: `ORD-${Date.now()}`, // unique ID like Amazon
      user: {
        userId: user?._id,
        name: user?.userName,
        email: user?.email,
      },

      items: cartItems?.map((item) => ({
        productId: item.product?._id,
        name: item.product?.name,
        price: Number(item.product?.price),
        quantity: item.quantity,
        totalPrice: Number(item.product?.price) * item.quantity,
        image: item.product?.image,
        category: item.product?.category,
      })),

      pricing: {
        itemsTotal: totalAmount,
        shippingFee: totalAmount > 499 ? 0 : 40,
        tax: Math.round(totalAmount * 0.05),
        finalAmount:
          totalAmount +
          (totalAmount > 499 ? 0 : 40) +
          Math.round(totalAmount * 0.05),
      },

      address: {
        house: selectedAddress.house,
        street: selectedAddress.streetAddress,
        city: selectedAddress.city,
        state: selectedAddress.state,
        pincode: selectedAddress.pinCode,
        phone: selectedAddress.phoneNumber,
        country: selectedAddress.country,
        label: selectedAddress.label,
      },

      payment: {
        method: "COD",
        status: "PENDING",
      },

      status: {
        orderStatus: "PLACED",
        placedAt: new Date().toISOString(),
      },
    };

    console.log("COD ORDER PAYLOAD →", payload);
    const res = await createOrder(payload);

    if (res?.success) {
      setCurrentStep(currentStep + 1);
    }
  };

  // online
  const handleOnlinePayment = async () => {
    try {
      // Calculate amounts
      const shippingFee = totalAmount > 499 ? 0 : 40;
      const tax = Math.round(totalAmount * 0.05);
      const finalAmount = totalAmount + shippingFee + tax;

      // 1) Create razorpay order from backend
      const { data } = await API.post("/order/create-payment", {
        amount: finalAmount,
      });

      const order = data.order;

      // 2) Open Razorpay Checkout
      const options = {
        key: import.meta.env.VITE_RAZORPAY_KEY_ID,
        amount: order.amount,
        currency: "INR",
        name: "Gadget Shop",
        description: "Order Payment",
        order_id: order.id,

        handler: async function (response) {
          // 3) verify payment
          const verify = await API.post("/order/verify-payment", {
            razorpay_order_id: response.razorpay_order_id,
            razorpay_payment_id: response.razorpay_payment_id,
            razorpay_signature: response.razorpay_signature,
          });

          if (verify.data.success) {
            console.log("PAYMENT VERIFIED ✔");

            // FINAL ORDER PAYLOAD → SAME STRUCTURE AS COD
            const payload = {
              orderId: `ORD-${Date.now()}`, // same as COD

              user: {
                userId: user?._id,
                name: user?.userName,
                email: user?.email,
              },

              items: cartItems?.map((item) => ({
                productId: item.product?._id,
                name: item.product?.name,
                price: Number(item.product?.price),
                quantity: item.quantity,
                totalPrice: Number(item.product?.price) * item.quantity,
                image: item.product?.image,
                category: item.product?.category,
              })),

              pricing: {
                itemsTotal: totalAmount,
                shippingFee: shippingFee,
                tax: tax,
                finalAmount: finalAmount,
              },

              address: {
                house: selectedAddress.house,
                street: selectedAddress.streetAddress,
                city: selectedAddress.city,
                state: selectedAddress.state,
                pincode: selectedAddress.pinCode,
                phone: selectedAddress.phoneNumber,
                country: selectedAddress.country,
                label: selectedAddress.label,
              },

              payment: {
                method: "ONLINE",
                status: "PAID",
                transactionId: response.razorpay_payment_id, // extra
                razorpayOrderId: response.razorpay_order_id, // extra
              },

              status: {
                orderStatus: "PLACED",
                placedAt: new Date().toISOString(),
              },
            };

            console.log("ONLINE ORDER PAYLOAD →", payload);
            const res = await createOrder(payload);

            if (res?.success) {
              setCurrentStep(currentStep + 1);
            }
          } else {
            alert("Payment verification failed!");
          }
        },

        theme: { color: "#0f172a" },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (error) {
      console.log(error);
    }
  };

  // place order:
  const placeOrderHandler = () => {
    if (paymentMethod === "COD") {
      handleCOD();
    } else {
      handleOnlinePayment();
    }
  };

  return (
    <>
      {!cartItems || cartItems.length === 0 ? (
        <div className="flex flex-col items-center justify-center h-[70vh] text-center px-6">
          <img
            src="https://cdn-icons-png.flaticon.com/512/11329/11329060.png"
            alt="empty cart"
            className="w-40 opacity-80 mb-6"
          />

          <h2 className="text-2xl font-bold text-gray-800 mb-2">
            Your Cart is Empty
          </h2>

          <p className="text-gray-500 max-w-md mb-6">
            With an empty cart, you cannot place an order. Start adding items
            and enjoy your shopping experience!
          </p>

          <Link to="/">
            <button className="px-6 py-3 bg-purple-600 text-white font-semibold rounded-lg shadow hover:bg-purple-700 transition cursor-pointer">
              Go & Shop for Gadgets
            </button>
          </Link>
        </div>
      ) : (
        <div className="container mx-auto px-4 py-8 flex flex-col md:flex-row gap-6">
          {/* LEFT SECTION */}
          <div className="flex-1 space-y-6">
            {/* Address Section */}
            <div className="bg-white shadow-md rounded-xl p-6 border border-gray-100">
              <h2 className="text-xl font-semibold border-b pb-3 mb-4">
                Delivery Address
              </h2>

              <div className="text-gray-700 space-y-1">
                <p className="font-medium">
                  {user?.userName}{" "}
                  <span className="text-gray-500">
                    | {selectedAddress.phoneNumber}
                  </span>
                </p>
                <p className="text-sm leading-6">
                  {selectedAddress.house}, {selectedAddress.streetAddress},{" "}
                  {selectedAddress.city}, {selectedAddress.state} -{" "}
                  {selectedAddress.pinCode}, {selectedAddress.country}
                </p>
              </div>
            </div>

            {/* Products Section */}
            <div className="bg-white shadow-md rounded-xl p-6 border border-gray-100">
              <h2 className="text-xl font-semibold border-b pb-3 mb-4">
                Items in your Cart
              </h2>

              <div className="divide-y">
                {cartItems?.map((item) => (
                  <div
                    key={item.productId}
                    className="flex justify-between py-4"
                  >
                    <div>
                      <p className="font-medium text-gray-800">
                        {item.product.name}
                      </p>
                      <p className="text-sm text-gray-500">
                        Qty: {item.quantity}
                      </p>
                    </div>
                    <p className="font-semibold text-gray-800">
                      ₹{item.product.price * item.quantity}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Payment Method */}
            <div className="bg-white shadow-md rounded-xl p-6 border border-gray-100">
              <h2 className="text-xl font-semibold border-b pb-3 mb-4">
                Payment Options
              </h2>

              <div className="space-y-3">
                <label className="flex items-center gap-3 cursor-pointer">
                  <input
                    type="radio"
                    value="COD"
                    checked={paymentMethod === "COD"}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                    className="w-4 h-4 text-orange-600"
                  />
                  <span className="text-gray-700 font-medium">
                    Cash on Delivery
                  </span>
                </label>

                <label className="flex items-center gap-3 cursor-pointer">
                  <input
                    type="radio"
                    value="ONLINE"
                    checked={paymentMethod === "ONLINE"}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                    className="w-4 h-4 text-orange-600"
                  />
                  <span className="text-gray-700 font-medium">
                    Online Payment (UPI / Card / Wallet)
                  </span>
                </label>
              </div>
            </div>
          </div>

          {/* RIGHT SUMMARY SECTION */}
          <div className="w-full md:w-1/3">
            <div className="bg-white shadow-xl rounded-xl p-6 border border-gray-100 sticky top-24">
              <h2 className="text-xl font-semibold mb-4 border-b pb-3">
                Order Summary
              </h2>

              <p className="text-gray-700 mb-1">Items: {cartItems.length}</p>
              <p className="text-gray-700 mb-1">Amount: {totalAmount}</p>

              <p className="text-gray-700 mb-1">
                {" "}
                shippingFee: {totalAmount > 499 ? 0 : 40}
              </p>

              <p className="text-gray-700 mb-1">
                {" "}
                tax: {Math.round(totalAmount * 0.05)}
              </p>
              <p className="text-2xl font-bold text-gray-800">
                Total: ₹
                {totalAmount +
                  (totalAmount > 499 ? 0 : 40) +
                  Math.round(totalAmount * 0.05)}
              </p>

              <button
                onClick={placeOrderHandler}
                disabled={loading}
                className="w-full mt-6 py-3 bg-purple-600 hover:bg-purple-700 transition text-white font-medium rounded-lg shadow cursor-pointer"
              >
                {loading ? "Processing..." : "Place Order"}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ReviewAndPlaceOrder;
