import { useSearchParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { createCartItems } from "@/redux/actions/cart.action";
import { useDispatch } from "react-redux";
import { motion } from "framer-motion";
import API from "@/API/Interceptor";
import UseDebounce from "@/customHooks/UseDebounce";

const ProductCategory = () => {
  const [searchParams] = useSearchParams();
  const category = searchParams.get("category") || "all";

  const dispatch = useDispatch();

  const [search, setSearch] = useState("");
  const debouncedSearch = UseDebounce(search, 500);

  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(1);
  const [pagination, setPagination] = useState(null);

  const handleAddToCart = (productId) => {
    dispatch(createCartItems({ productId }));
  };

  // Fetch products
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await API.get("/product", {
          params: {
            category,
            search: debouncedSearch,
            page,
          },
        });

        setProducts(res.data.data);
        setPagination(res.data.pagination);
      } catch (error) {
        console.error("Failed to fetch products", error);
      }
    };

    fetchProducts();
  }, [category, debouncedSearch, page]);

  // Reset page when category or search changes
  useEffect(() => {
    setPage(1);
  }, [category, debouncedSearch]);

  return (
    <div className="p-3 py-[4rem] text-white">
      {/* <h1>this is a real</h1> */}
      {/* Heading */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-500">
          {category !== "all"
            ? category.charAt(0).toUpperCase() + category.slice(1)
            : "Products"}
        </h1>
      </div>

      {/* Search */}
      <div className="max-w-md mx-auto mb-10">
        <input
          type="text"
          placeholder="Search products..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full px-4 py-3 rounded-xl bg-zinc-900 border border-zinc-700 text-white"
        />
      </div>

      {/* Products */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 max-w-7xl mx-auto">
        {products.map((item) => (
          <motion.div
            key={item._id}
             className="bg-zinc-900 border border-zinc-700 rounded-2xl overflow-hidden flex flex-col"
            whileHover={{ scale: 1.05 }}
          >
            <div className="h-56">
              <img
                src={item.image}
                alt={item.name}
                className="w-full h-full object-cover"
              />
            </div>

           <div className="p-5 flex flex-col justify-between flex-grow">

              <div>
                <h2 className="text-xl font-semibold text-white">
                  {item.name}
                </h2>
                <p className="text-gray-400 text-sm line-clamp-2">
                  {item.description}
                </p>
              </div>

              <div className="mt-4">
                <p className="text-lg font-bold text-purple-400 mb-3">
                  ₹{item.price}
                </p>

                <div className="flex justify-between">
                  <Link to={`/product/${item._id}`}>
                    <button className="bg-purple-700 px-10 py-2 rounded-xl">
                      View
                    </button>
                  </Link>
                  <button
                    onClick={() => handleAddToCart(item._id)}
                    className="border border-purple-500 px-10 py-2 rounded-xl"
                  >
                    Add
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Pagination */}
      {pagination && (
        <div className="flex justify-center items-center gap-4 mt-12">
          <button
            disabled={!pagination.hasPrevPage}
            onClick={() => setPage((p) => p - 1)}
            className="px-4 py-2 rounded-xl bg-zinc-800 disabled:opacity-40"
          >
            Prev
          </button>

          <span className="text-white">
            Page {pagination.currentPage} of {pagination.totalPages}
          </span>

          <button
            disabled={!pagination.hasNextPage}
            onClick={() => setPage((p) => p + 1)}
            className="px-4 py-2 rounded-xl bg-zinc-800 disabled:opacity-40"
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
};

export default ProductCategory;
