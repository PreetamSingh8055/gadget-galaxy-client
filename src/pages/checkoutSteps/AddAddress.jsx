import API from "@/API/Interceptor";
import React, { useEffect, useState } from "react";
import { Country, State, City } from "country-state-city";
import { Pencil, Trash, Star, X } from "lucide-react";
import toast from "react-hot-toast";

const AddAddress = () => {
  const [addresses, setAddresses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [selectedState, setSelectedState] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editForm, setEditForm] = useState(null);
  const [editCountry, setEditCountry] = useState(null);
  const [editState, setEditState] = useState(null);

  const [form, setForm] = useState({
    house: "",
    streetAddress: "",
    city: "",
    state: "",
    country: "",
    pinCode: "",
    phoneNumber: "",
    label: "home",
  });

  const fetchAddresses = async () => {
    try {
      const res = await API.get("/address");
      setAddresses(res.data.addresses || []);
    } catch (err) {
      toast.error(err.message);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchAddresses();
  }, []);

  const handleAddAddress = async (e) => {
    e.preventDefault();
    try {
      await API.post("/address", form);
      toast.success("Address added successfully!");
      setForm({
        house: "",
        streetAddress: "",
        city: "",
        state: "",
        country: "",
        pinCode: "",
        phoneNumber: "",
        label: "home",
      });
      setSelectedCountry(null);
      setSelectedState(null);
      fetchAddresses();
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to add address");
    }
  };

  const setDefault = async (id) => {
    try {
      await API.put(`/address/default/${id}`);
      toast.success("Address Selected!");
      fetchAddresses();
    } catch {
      toast.error("Failed to select address");
    }
  };

  const deleteAddress = async (id) => {
    try {
      await API.delete(`/address/${id}`);
      toast.success("Address deleted");
      fetchAddresses();
    } catch {
      toast.error("Failed to delete address");
    }
  };

  const handleUpdateAddress = async (e) => {
    e.preventDefault();
    try {
      await API.put(`/address/${editForm._id}`, editForm);
      toast.success("Address updated!");
      setShowEditModal(false);
      fetchAddresses();
    } catch {
      toast.error("Failed to update address");
    }
  };

  return (
    <div className="w-full max-w-3xl mx-auto py-6 sm:py-8 px-4 sm:px-0">
      <h1 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6">
        Your Addresses
      </h1>

      {loading && <p className="text-gray-400">Loading...</p>}

      {!loading && addresses.length === 0 && (
        <p className="text-gray-300 mb-4">
          No address found. Add a new address.
        </p>
      )}

      <div className="space-y-4">
        {addresses.map((addr) => (
          <div
            key={addr._id}
            className="bg-gray-800/60 border border-gray-700 rounded-xl p-4 sm:p-5 shadow-md flex flex-col sm:flex-row justify-between items-start gap-4 hover:shadow-lg hover:border-purple-500 transition"
          >
            <div className="space-y-1">
              <p className="font-bold text-base sm:text-lg capitalize flex items-center gap-2">
                {addr.label}
                {addr.isDefault && (
                  <span className="text-yellow-400 text-sm flex items-center gap-1">
                    <Star size={16} /> Selected
                  </span>
                )}
              </p>

              <p className="text-gray-300">
                {addr.house}, {addr.streetAddress}
              </p>
              <p className="text-gray-300">
                {addr.city}, {addr.state}, {addr.country}
              </p>
              <p className="text-gray-400 text-sm">
                Pincode: {addr.pinCode}
              </p>
              <p className="text-gray-400 text-sm">
                Phone: {addr.phoneNumber}
              </p>
            </div>

            <div className="flex flex-row sm:flex-col items-center gap-4 sm:gap-3">
              {!addr.isDefault && (
                <Star
                  size={22}
                  className="text-yellow-300 cursor-pointer hover:scale-110 transition"
                  onClick={() => setDefault(addr._id)}
                />
              )}

              <Pencil
                size={22}
                className="text-blue-400 cursor-pointer hover:scale-110 transition"
                onClick={() => {
                  setEditForm(addr);
                  setEditCountry(
                    Country.getAllCountries().find(
                      (c) => c.name === addr.country
                    )
                  );
                  setEditState(
                    State.getStatesOfCountry(
                      Country.getAllCountries().find(
                        (c) => c.name === addr.country
                      )?.isoCode
                    ).find((s) => s.name === addr.state)
                  );
                  setShowEditModal(true);
                }}
              />

              <Trash
                size={22}
                className="text-red-500 cursor-pointer hover:scale-110 transition"
                onClick={() => deleteAddress(addr._id)}
              />
            </div>
          </div>
        ))}
      </div>

      <h2 className="text-lg sm:text-xl font-bold mt-8 sm:mt-10 mb-4">
        Add New Address
      </h2>

      <form
        onSubmit={handleAddAddress}
        className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4 text-white"
      >
        <input className="p-2 bg-gray-800 border rounded" placeholder="House" value={form.house} onChange={(e) => setForm({ ...form, house: e.target.value })} required />
        <input className="p-2 bg-gray-800 border rounded" placeholder="Street Address" value={form.streetAddress} onChange={(e) => setForm({ ...form, streetAddress: e.target.value })} required />
        <input className="p-2 bg-gray-800 border rounded" placeholder="Pincode" value={form.pinCode} onChange={(e) => setForm({ ...form, pinCode: e.target.value })} required />
        <input className="p-2 bg-gray-800 border rounded" placeholder="Phone Number" value={form.phoneNumber} onChange={(e) => setForm({ ...form, phoneNumber: e.target.value })} required />

        <button
          type="submit"
          className="col-span-1 md:col-span-2 bg-purple-600 text-white py-2 rounded mt-2 w-full"
        >
          Add Address
        </button>
      </form>

      {showEditModal && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 px-4 py-6">
          <div className="bg-gray-900 w-full max-w-lg max-h-[90vh] overflow-y-auto p-4 sm:p-6 rounded-xl border border-gray-700">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg sm:text-xl font-bold">Edit Address</h2>
              <X className="cursor-pointer" onClick={() => setShowEditModal(false)} />
            </div>

            <form onSubmit={handleUpdateAddress} className="grid grid-cols-1 gap-4">
              <input className="p-2 bg-gray-800 border rounded" value={editForm.house} onChange={(e) => setEditForm({ ...editForm, house: e.target.value })} required />
              <input className="p-2 bg-gray-800 border rounded" value={editForm.streetAddress} onChange={(e) => setEditForm({ ...editForm, streetAddress: e.target.value })} required />

              <div className="flex flex-col sm:flex-row justify-end gap-3 mt-3">
                <button type="button" onClick={() => setShowEditModal(false)} className="px-4 py-2 bg-gray-700 rounded">
                  Cancel
                </button>
                <button type="submit" className="px-4 py-2 bg-purple-600 text-white rounded">
                  Update
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AddAddress;
