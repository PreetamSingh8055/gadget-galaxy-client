import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Cpu, Laptop, Headphones, Gamepad2, Rocket } from "lucide-react";
import { useUser } from "@/context/AuthContext.jsx";
import { useNavigate } from "react-router-dom";

const Aboutus = () => {
  const navigate = useNavigate();
  const { user } = useUser();

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-purple-900 text-white py-12 sm:py-16 md:py-20 px-4 sm:px-6">
      {/* Header */}
      <motion.div
        className="text-center mb-12 sm:mb-16"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h1 className="text-2xl sm:text-3xl md:text-5xl font-extrabold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-300">
          About Gadget Galaxy ⚡ {user}
        </h1>

        <p className="text-gray-300 max-w-3xl mx-auto text-sm sm:text-base md:text-lg">
          Welcome to{" "}
          <span className="text-purple-400 font-semibold">Gadget Galaxy</span>,
          your one-stop destination for cutting-edge gadgets that combine
          <span className="text-purple-300">
            {" "}
            innovation, style, and performance.
          </span>
        </p>
      </motion.div>

      {/* Mission & Vision */}
      <motion.div
        className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-10 mb-14 sm:mb-20"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.7 }}
      >
        <Card className="bg-gray-900/80 border border-purple-400/20 shadow-xl rounded-2xl backdrop-blur-xl">
          <CardContent className="p-6 sm:p-8">
            <h2 className="text-xl sm:text-2xl md:text-3xl font-bold mb-3 text-purple-300">
              Our Mission
            </h2>
            <p className="text-gray-300 leading-relaxed text-sm sm:text-base">
              To make the latest and most reliable gadgets accessible to
              everyone. From everyday essentials to high-end electronics — we
              bring technology closer to your lifestyle.
            </p>
          </CardContent>
        </Card>

        <Card className="bg-gray-900/80 border border-purple-400/20 shadow-xl rounded-2xl backdrop-blur-xl">
          <CardContent className="p-6 sm:p-8">
            <h2 className="text-xl sm:text-2xl md:text-3xl font-bold mb-3 text-purple-300">
              Our Vision
            </h2>
            <p className="text-gray-300 leading-relaxed text-sm sm:text-base">
              To build a community of tech enthusiasts who trust us for quality,
              innovation, and a seamless shopping experience — where technology
              meets comfort and creativity.
            </p>
          </CardContent>
        </Card>
      </motion.div>

      {/* Categories */}
      <motion.div
        className="flex flex-wrap justify-center gap-8 sm:gap-14 mb-14 sm:mb-16"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.7 }}
      >
        {[ 
          { Icon: Laptop, label: "Laptops" },
          { Icon: Gamepad2, label: "Toys & Gaming" },
          { Icon: Headphones, label: "Audio Devices" },
          { Icon: Cpu, label: "Smart Tech" },
          { Icon: Rocket, label: "Future Gadgets" },
        ].map(({ Icon, label }) => (
          <div key={label} className="flex flex-col items-center">
            <Icon className="w-10 h-10 sm:w-16 sm:h-16 text-purple-400 mb-2 sm:mb-3" />
            <p className="text-gray-300 text-sm sm:text-base">{label}</p>
          </div>
        ))}
      </motion.div>

      {/* Why Choose Us */}
      <motion.div
        className="max-w-5xl mx-auto text-center mb-14 sm:mb-20"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-300">
          Why Choose Us?
        </h2>
        <p className="text-gray-300 text-sm sm:text-base md:text-lg leading-relaxed max-w-3xl mx-auto">
          Because we don’t just sell gadgets — we deliver <b>trust, performance,
          and experience.</b> Every product is handpicked, quality-tested, and
          backed by our promise to bring you the best of technology at unbeatable
          value.
        </p>
      </motion.div>

      {/* Team */}
      <motion.div
        className="max-w-6xl mx-auto text-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-8 text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-300">
          Meet Our Team 👨‍💻
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-8">
          {[
            "Tarun","Deepanshu","Anirudh","Varinder",
            "Ishant","Vipin","Preetam","Divyansh","Aman",
          ].map((name, i) => (
            <Card
              key={i}
              className="bg-gray-900/80 border border-purple-400/20 shadow-lg hover:scale-105 transition-transform duration-300"
            >
              <CardContent className="p-6 text-white">
                <div className="w-20 h-20 sm:w-24 sm:h-24 mx-auto bg-gradient-to-r from-purple-500 to-blue-400 rounded-full mb-4 flex items-center justify-center text-2xl sm:text-3xl font-bold">
                  {name.charAt(0)}
                </div>
                <h3 className="text-lg sm:text-xl font-semibold">{name}</h3>
                <p className="text-gray-400 text-xs sm:text-sm">
                  Co-Founder | Gadget Galaxy
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </motion.div>

      {/* CTA */}
      <motion.div
        className="text-center mt-14 sm:mt-20"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        <h3 className="text-lg sm:text-xl md:text-2xl font-semibold text-purple-300 mb-3">
          Explore the Future of Technology 🔮
        </h3>
        <button
          onClick={() => navigate("/products")}
          className="bg-purple-600 hover:bg-purple-700 text-white font-semibold px-6 sm:px-8 py-3 rounded-2xl shadow-lg transition-all cursor-pointer"
        >
          Shop Now
        </button>
      </motion.div>
    </div>
  );
};

export default Aboutus;
