import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Cpu, Laptop, Headphones, Gamepad2, Rocket } from "lucide-react";
import { useUser } from "@/context/AuthContext.jsx";
import { useNavigate } from "react-router-dom";


const Aboutus = () => {
  const navigate = useNavigate();
  const { user, setUser } = useUser();

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-purple-900 text-white py-20 px-6">
      {/* Header */}
      <motion.div
        className="text-center mb-16"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h1 className="text-5xl font-extrabold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-300">
          About Gadget Galaxy ⚡ {user}
        </h1>

        <p className="text-gray-300 max-w-3xl mx-auto text-lg">
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
        className="max-w-6xl mx-auto grid md:grid-cols-2 gap-10 mb-20"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.7 }}
      >
        <Card className="bg-gray-900/80 border border-purple-400/20 shadow-xl rounded-2xl backdrop-blur-xl">
          <CardContent className="p-8">
            <h2 className="text-3xl font-bold mb-3 text-purple-300">
              Our Mission
            </h2>
            <p className="text-gray-300 leading-relaxed">
              To make the latest and most reliable gadgets accessible to
              everyone. From everyday essentials to high-end electronics — we
              bring technology closer to your lifestyle.
            </p>
          </CardContent>
        </Card>

        <Card className="bg-gray-900/80 border border-purple-400/20 shadow-xl rounded-2xl backdrop-blur-xl">
          <CardContent className="p-8">
            <h2 className="text-3xl font-bold mb-3 text-purple-300">
              Our Vision
            </h2>
            <p className="text-gray-300 leading-relaxed">
              To build a community of tech enthusiasts who trust us for quality,
              innovation, and a seamless shopping experience — where technology
              meets comfort and creativity.
            </p>
          </CardContent>
        </Card>
      </motion.div>

      {/* Categories / Icons */}
      <motion.div
        className="flex flex-wrap justify-center gap-14 mb-16"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.7 }}
      >
        <div className="flex flex-col items-center">
          <Laptop className="w-16 h-16 text-purple-400 mb-3" />
          <p className="text-gray-300">Laptops</p>
        </div>
        <div className="flex flex-col items-center">
          <Gamepad2 className="w-16 h-16 text-purple-400 mb-3" />
          <p className="text-gray-300">Toys & Gaming</p>
        </div>
        <div className="flex flex-col items-center">
          <Headphones className="w-16 h-16 text-purple-400 mb-3" />
          <p className="text-gray-300">Audio Devices</p>
        </div>
        <div className="flex flex-col items-center">
          <Cpu className="w-16 h-16 text-purple-400 mb-3" />
          <p className="text-gray-300">Smart Tech</p>
        </div>
        <div className="flex flex-col items-center">
          <Rocket className="w-16 h-16 text-purple-400 mb-3" />
          <p className="text-gray-300">Future Gadgets</p>
        </div>
      </motion.div>

      {/* Why Choose Us Section */}
      <motion.div
        className="max-w-5xl mx-auto text-center mb-20"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        <h2 className="text-4xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-300">
          Why Choose Us?
        </h2>
        <p className="text-gray-300 text-lg leading-relaxed max-w-3xl mx-auto">
          Because we don’t just sell gadgets — we deliver **trust, performance,
          and experience.** Every product is handpicked, quality-tested, and
          backed by our promise to bring you the best of technology at
          unbeatable value.
        </p>
      </motion.div>

      {/* Team Section */}
      <motion.div
        className="max-w-6xl mx-auto text-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        <h2 className="text-4xl font-bold mb-8 text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-300">
          Meet Our Team 👨‍💻
        </h2>
        <div className="grid md:grid-cols-3 gap-8">
          {[
            "Tarun",
            "Deepanshu",
            "Anirudh",
            "Varinder",
            "Ishant",
            "Vipin",
            "Preetam",
            "Divyansh",
            "Aman",
          ].map((name, i) => (
            <Card
              key={i}
              className="bg-gray-900/80 border border-purple-400/20 shadow-lg hover:scale-105 transition-transform duration-300"
            >
              <CardContent className="p-6 text-white">
                <div className="w-24 h-24 mx-auto bg-gradient-to-r from-purple-500 to-blue-400 rounded-full mb-4 flex items-center justify-center text-3xl font-bold ">
                  {name.charAt(0)}
                </div>
                <h3 className="text-xl font-semibold">{name}</h3>
                <p className="text-gray-400 text-sm">
                  Co-Founder | Gadget Galaxy
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </motion.div>

      {/* CTA */}
      <motion.div
        className="text-center mt-20"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        <h3 className="text-2xl font-semibold text-purple-300 mb-3">
          Explore the Future of Technology 🔮
        </h3>
        <button
          onClick={() => navigate("/products")}
          className="bg-purple-600 hover:bg-purple-700 text-white font-semibold px-8 py-3 rounded-2xl shadow-lg transition-all cursor-pointer"
        >
          Shop Now
        </button>

      </motion.div>
    </div>
  );
};

export default Aboutus;
