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

  // Form states
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

  // Fetch Addresses
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

  // Handle Add Address
  const handleAddAddress = async (e) => {
    e.preventDefault();
    try {
      const res = await API.post("/address", form);
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

      // Reset dropdowns
      setSelectedCountry(null);
      setSelectedState(null);
      fetchAddresses();
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to add address");
    }
  };

  // Set as default
  const setDefault = async (id) => {
    try {
      await API.put(`/address/default/${id}`);
      toast.success("Address Selected!");
      fetchAddresses();
    } catch (err) {
      toast.error("Failed to select address");
    }
  };

  // Delete
  const deleteAddress = async (id) => {
    try {
      await API.delete(`/address/${id}`);
      toast.success("Address deleted");
      fetchAddresses();
    } catch (err) {
      toast.error("Failed to delete address");
    }
  };

  //   update:
  const handleUpdateAddress = async (e) => {
    e.preventDefault();
    try {
      await API.put(`/address/${editForm._id}`, editForm);
      toast.success("Address updated!");
      setShowEditModal(false);
      fetchAddresses();
    } catch (err) {
      toast.error("Failed to update address");
    }
  };

  return (
    <div className="w-full max-w-3xl mx-auto py-8">
      <h1 className="text-2xl font-bold mb-6">Your Addresses</h1>

      {/* Loading */}
      {loading && <p className="text-gray-400">Loading...</p>}

      {/* If no addresses */}
      {!loading && addresses.length === 0 && (
        <p className="text-gray-300 mb-4">
          No address found. Add a new address.
        </p>
      )}

      {/* Addresses List */}
      <div className="space-y-4">
        {addresses.map((addr) => (
          <div
            key={addr._id}
            className="bg-gray-800/60 border border-gray-700 rounded-xl p-5 shadow-md flex justify-between items-start transition hover:shadow-lg hover:border-purple-500"
          >
            {/* LEFT SIDE INFO */}
            <div className="space-y-1">
              <p className="font-bold text-lg capitalize flex items-center gap-2">
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
              <p className="text-gray-400 text-sm">Pincode: {addr.pinCode}</p>
              <p className="text-gray-400 text-sm">Phone: {addr.phoneNumber}</p>
            </div>

            {/* ACTION ICONS */}
            <div className="flex flex-col items-center gap-3">
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

      {/* ADD ADDRESS FORM */}
      <h2 className="text-xl font-bold mt-10 mb-4">Add New Address</h2>

      <form
        onSubmit={handleAddAddress}
        className="grid grid-cols-1 md:grid-cols-2 gap-4 text-white"
      >
        <input
          type="text"
          placeholder="House"
          className="p-2 bg-gray-800 border rounded"
          value={form.house}
          onChange={(e) => setForm({ ...form, house: e.target.value })}
          required
        />

        <input
          type="text"
          placeholder="Street Address"
          className="p-2 bg-gray-800 border rounded"
          value={form.streetAddress}
          onChange={(e) => setForm({ ...form, streetAddress: e.target.value })}
          required
        />

        {/* COUNTRY */}
        <select
          className="p-2 bg-gray-800 border rounded"
          value={selectedCountry?.isoCode || ""}
          onChange={(e) => {
            const country = Country.getAllCountries().find(
              (c) => c.isoCode === e.target.value
            );
            setSelectedCountry(country);
            setForm({ ...form, country: country.name, state: "", city: "" });
            setSelectedState(null);
          }}
          required
        >
          <option value="">Select Country</option>

          {Country.getAllCountries().map((country) => (
            <option key={country.isoCode} value={country.isoCode}>
              {country.name}
            </option>
          ))}
        </select>

        {/* STATE */}
        <select
          className="p-2 bg-gray-800 border rounded"
          value={selectedState?.isoCode || ""}
          onChange={(e) => {
            const state = State.getStatesOfCountry(
              selectedCountry.isoCode
            ).find((s) => s.isoCode === e.target.value);
            setSelectedState(state);
            setForm({ ...form, state: state.name, city: "" });
          }}
          required
          disabled={!selectedCountry}
        >
          <option value="">Select State</option>

          {selectedCountry &&
            State.getStatesOfCountry(selectedCountry.isoCode).map((state) => (
              <option key={state.isoCode} value={state.isoCode}>
                {state.name}
              </option>
            ))}
        </select>

        {/* CITY */}
        <select
          className="p-2 bg-gray-800 border rounded"
          value={form.city}
          onChange={(e) => setForm({ ...form, city: e.target.value })}
          required
          disabled={!selectedState}
        >
          <option value="">Select City</option>

          {selectedState &&
            City.getCitiesOfState(
              selectedCountry.isoCode,
              selectedState.isoCode
            ).map((city) => (
              <option key={city.name} value={city.name}>
                {city.name}
              </option>
            ))}
        </select>

        <input
          type="text"
          placeholder="Pincode"
          className="p-2 bg-gray-800 border rounded"
          value={form.pinCode}
          onChange={(e) => setForm({ ...form, pinCode: e.target.value })}
          required
        />

        <input
          type="text"
          placeholder="Phone Number"
          className="p-2 bg-gray-800 border rounded"
          value={form.phoneNumber}
          onChange={(e) => setForm({ ...form, phoneNumber: e.target.value })}
          required
        />

        {/* Label */}
        <select
          className="p-2 bg-gray-800 border rounded"
          value={form.label}
          onChange={(e) => setForm({ ...form, label: e.target.value })}
        >
          <option value="home">Home</option>
          <option value="office">Office</option>
          <option value="other">Other</option>
        </select>

        <button
          type="submit"
          className="col-span-1 md:col-span-2 bg-purple-600 text-white py-2 rounded mt-2 cursor-pointer"
        >
          Add Address
        </button>
      </form>

      {showEditModal && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 mt-10">
          <div className="bg-gray-900 w-full max-w-lg p-6 rounded-xl shadow-lg border border-gray-700">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold">Edit Address</h2>
              <X
                className="cursor-pointer"
                onClick={() => setShowEditModal(false)}
              />
            </div>

            <form
              onSubmit={handleUpdateAddress}
              className="grid grid-cols-1 gap-4"
            >
              {/* House */}
              <input
                type="text"
                placeholder="House"
                className="p-2 bg-gray-800 border rounded"
                value={editForm.house}
                onChange={(e) =>
                  setEditForm({ ...editForm, house: e.target.value })
                }
                required
              />

              {/* Street */}
              <input
                type="text"
                placeholder="Street Address"
                className="p-2 bg-gray-800 border rounded"
                value={editForm.streetAddress}
                onChange={(e) =>
                  setEditForm({ ...editForm, streetAddress: e.target.value })
                }
                required
              />

              {/* COUNTRY */}
              <select
                className="p-2 bg-gray-800 border rounded"
                value={editCountry?.isoCode || ""}
                onChange={(e) => {
                  const c = Country.getAllCountries().find(
                    (x) => x.isoCode === e.target.value
                  );
                  setEditCountry(c);
                  setEditState(null);
                  setEditForm({
                    ...editForm,
                    country: c.name,
                    state: "",
                    city: "",
                  });
                }}
                required
              >
                <option value="">Select Country</option>

                {Country.getAllCountries().map((country) => (
                  <option key={country.isoCode} value={country.isoCode}>
                    {country.name}
                  </option>
                ))}
              </select>

              {/* STATE */}
              <select
                className="p-2 bg-gray-800 border rounded"
                value={editState?.isoCode || ""}
                onChange={(e) => {
                  const st = State.getStatesOfCountry(editCountry.isoCode).find(
                    (s) => s.isoCode === e.target.value
                  );
                  setEditState(st);
                  setEditForm({ ...editForm, state: st.name, city: "" });
                }}
                required
                disabled={!editCountry}
              >
                <option value="">Select State</option>

                {editCountry &&
                  State.getStatesOfCountry(editCountry.isoCode).map((state) => (
                    <option key={state.isoCode} value={state.isoCode}>
                      {state.name}
                    </option>
                  ))}
              </select>

              {/* CITY */}
              <select
                className="p-2 bg-gray-800 border rounded"
                value={editForm.city}
                onChange={(e) =>
                  setEditForm({ ...editForm, city: e.target.value })
                }
                required
                disabled={!editState}
              >
                <option value="">Select City</option>

                {editState &&
                  City.getCitiesOfState(
                    editCountry.isoCode,
                    editState.isoCode
                  ).map((city) => (
                    <option key={city.name} value={city.name}>
                      {city.name}
                    </option>
                  ))}
              </select>

              {/* PINCODE */}
              <input
                type="text"
                placeholder="Pincode"
                className="p-2 bg-gray-800 border rounded"
                value={editForm.pinCode}
                onChange={(e) =>
                  setEditForm({ ...editForm, pinCode: e.target.value })
                }
                required
              />

              {/* PHONE */}
              <input
                type="text"
                placeholder="Phone Number"
                className="p-2 bg-gray-800 border rounded"
                value={editForm.phoneNumber}
                onChange={(e) =>
                  setEditForm({ ...editForm, phoneNumber: e.target.value })
                }
                required
              />

              {/* LABEL */}
              <select
                className="p-2 bg-gray-800 border rounded"
                value={editForm.label}
                onChange={(e) =>
                  setEditForm({ ...editForm, label: e.target.value })
                }
              >
                <option value="home">Home</option>
                <option value="office">Office</option>
                <option value="other">Other</option>
              </select>

              {/* Buttons */}
              <div className="flex justify-end gap-3 mt-3">
                <button
                  type="button"
                  onClick={() => setShowEditModal(false)}
                  className="px-4 py-2 bg-gray-700 rounded cursor-pointer"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="px-4 py-2 bg-purple-600 text-white rounded cursor-pointer"
                >
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
