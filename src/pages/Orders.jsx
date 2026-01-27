import React, { useEffect, useState } from "react";
import dayjs from "dayjs";
import API from "@/API/Interceptor";

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState(null);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const { data } = await API.get("/order/user-orders");
        if (data.success) setOrders(data.orders);
      } catch (err) {
        console.log("Order fetch error:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchOrders();
  }, []);

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">My Orders</h1>

      {/* LOADING */}
      {loading ? (
        <div className="space-y-4">
          <div className="h-24 bg-gray-200 animate-pulse rounded-xl"></div>
          <div className="h-24 bg-gray-200 animate-pulse rounded-xl"></div>
        </div>
      ) : orders.length === 0 ? (
        <div className="text-center py-16 bg-white rounded-2xl shadow-sm">
          <h2 className="text-xl font-semibold">No Orders Yet</h2>
          <p className="text-gray-500 mt-2">Place an order to see it here 🙂</p>
        </div>
      ) : (
        <div className="space-y-5">
          {orders.map((order) => (
            <div
              key={order._id}
              className="bg-white rounded-2xl shadow-md p-5 flex items-start justify-between border hover:shadow-lg transition cursor-pointer"
              onClick={() => setSelected(order)}
            >
              {/* LEFT */}
              <div className="flex items-start gap-4">
                <img
                  src={order.items[0]?.image || "/placeholder.png"}
                  className="w-20 h-20 rounded-lg border object-cover"
                  alt=""
                />
                <div>
                  <h2 className="text-lg font-bold">{order.orderId}</h2>
                  <p className="text-gray-600 text-sm">
                    {order.items.length} items •{" "}
                    {dayjs(order.createdAt).format("DD MMM YYYY")}
                  </p>
                  <p className="text-sm text-gray-700 mt-1">
                    Status:{" "}
                    <span className="font-semibold">
                      {order.status?.orderStatus}
                    </span>
                  </p>
                </div>
              </div>

              {/* RIGHT */}
              <div className="text-right">
                <p className="font-bold text-lg">
                  ₹{order.pricing?.finalAmount}
                </p>
                <button className="mt-2 px-4 py-2 bg-black text-white rounded-lg">
                  View Details
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* DETAILS MODAL */}
      {selected && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 w-[90%] max-w-3xl shadow-xl relative max-h-[90vh] overflow-y-auto">
            <button
              className="absolute top-3 right-3 text-gray-600"
              onClick={() => setSelected(null)}
            >
              ✖
            </button>

            <h2 className="text-2xl font-bold mb-4">
              Order {selected.orderId}
            </h2>

            <h3 className="font-semibold mb-2">Items</h3>
            <div className="space-y-4">
              {selected.items.map((item) => (
                <div
                  key={item.productId}
                  className="flex items-center gap-4 border-b pb-3"
                >
                  <img
                    src={item.image}
                    className="w-16 h-16 rounded border object-cover"
                    alt=""
                  />
                  <div className="flex-1">
                    <p className="font-semibold">{item.name}</p>
                    <p className="text-sm text-gray-500">
                      Qty: {item.quantity}
                    </p>
                  </div>
                  <p className="font-bold">₹{item.totalPrice}</p>
                </div>
              ))}
            </div>

            <h3 className="font-semibold mt-6 mb-2">Order Summary</h3>
            <div className="space-y-1 text-gray-700">
              <p>Items Total: ₹{selected.pricing?.itemsTotal}</p>
              <p>Shipping Fee: ₹{selected.pricing?.shippingFee}</p>
              <p>Tax: ₹{selected.pricing?.tax}</p>
              <p className="font-bold text-lg">
                Total: ₹{selected.pricing?.finalAmount}
              </p>
            </div>

            <h3 className="font-semibold mt-6 mb-2">Delivery Address</h3>
            <div className="text-gray-700">
              <p>
                {selected.address?.house}, {selected.address?.street}
              </p>
              <p>
                {selected.address?.city}, {selected.address?.state} -{" "}
                {selected.address?.pincode}
              </p>
              <p>📞 {selected.address?.phone}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Orders;
