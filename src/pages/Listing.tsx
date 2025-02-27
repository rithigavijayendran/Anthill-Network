import { useEffect, useState } from "react";
import { db } from "../services/firebase";
import { collection, getDocs } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { FaHeart } from "react-icons/fa";
import Button from "../components/ui/Button";
import CardContent from "../components/ui/CardContent";
import Card from "../components/ui/Card";

const Listings = () => {
  const [cars, setCars] = useState([]);
  const [filteredCars, setFilteredCars] = useState([]);
  const [search, setSearch] = useState("");
  const [fuelType, setFuelType] = useState("");
  const [transmission, setTransmission] = useState("");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  useEffect(() => {
    const fetchListings = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "cars"));
        const carData = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
        setCars(carData);
        setFilteredCars(carData);
      } catch (err) {
        console.error("Error fetching cars:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchListings();
  }, []);

  const handleFilter = () => {
    let filtered = cars.filter((car) =>
      car.name.toLowerCase().includes(search.toLowerCase())
    );
    if (fuelType) filtered = filtered.filter((car) => car.fuelType === fuelType);
    if (transmission) filtered = filtered.filter((car) => car.transmission === transmission);
    if (minPrice) filtered = filtered.filter((car) => car.price >= parseInt(minPrice));
    if (maxPrice) filtered = filtered.filter((car) => car.price <= parseInt(maxPrice));
    setFilteredCars(filtered);
  };

  useEffect(() => {
    handleFilter();
  }, [search, fuelType, transmission, minPrice, maxPrice, cars]);

  const handleReset = () => {
    setSearch("");
    setFuelType("");
    setTransmission("");
    setMinPrice("");
    setMaxPrice("");
    setFilteredCars(cars);
  };

  if (loading) return <p className="text-center text-lg text-gray-600">Loading cars...</p>;

  return (
    <div>
      {/* Hero Section */}
      <section
        className="relative w-full h-[400px] md:h-[600px] bg-cover bg-center flex items-center"
        style={{
          backgroundImage: `url("https://images.unsplash.com/photo-1549207107-2704df6b92ab?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D")`,
        }}
      >
        <div className="absolute inset-0 bg-black opacity-50"></div>
        <div className="relative container mx-auto px-5 flex justify-start">
          <div className="text-white text-left max-w-lg">
            <motion.h1
              className="text-3xl md:text-5xl font-bold"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              Find Quality-Assured Cars <br /> Tailored to Your Budget and Preferences
            </motion.h1>
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.4, duration: 0.5 }}
            >
              <Button
                className="mt-6 bg-red-500 hover:bg-red-600 text-white px-6 py-3 text-lg rounded-lg shadow-lg"
                onClick={() => navigate("/listings")}
              >
                Book My Car
              </Button>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Main Section */}
      <div className="container mx-auto px-6 py-8 flex flex-col md:flex-row gap-6">
        {/* Sidebar Filters */}
        <aside className="md:w-1/4 p-6 bg-white mb-300 shadow-lg rounded-lg">
          <h2 className="text-xl font-semibold mb-4">Filter Search</h2>
          <input
            type="text"
            placeholder="Search car model..."
            className="w-full p-2 mb-4 border rounded"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <select className="w-full p-2 mb-4  border rounded" onChange={(e) => setFuelType(e.target.value)}>
            <option value="">Fuel Type</option>
            <option value="Petrol">Petrol</option>
            <option value="Diesel">Diesel</option>
            <option value="Electric">Electric</option>
          </select>
          <select className="w-full p-2 mb-4 border rounded" onChange={(e) => setTransmission(e.target.value)}>
            <option value="">Transmission</option>
            <option value="Automatic">Automatic</option>
            <option value="Manual">Manual</option>
          </select>
          <div className="flex gap-2">
            <input
              type="number"
              placeholder="Min Price"
              className="w-1/2 p-2 border rounded"
              onChange={(e) => setMinPrice(e.target.value)}
            />
            <input
              type="number"
              placeholder="Max Price"
              className="w-1/2 p-2 border rounded"
              onChange={(e) => setMaxPrice(e.target.value)}
            />
            
          </div>
          <button
            className="w-full mt-4 p-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-all"
            onClick={() => handleFilter()}
          >
            Search
          </button>
          <button
            className="w-full mt-2 p-2 bg-gray-400 text-white rounded-lg hover:bg-gray-500 transition-all"
            onClick={handleReset}
          >
            Reset Filters
          </button>
        </aside>

        <section className="md:w-3/4">
          <h1 className="text-3xl font-bold mb-6">║ Used Cars for Sale Nationwide</h1>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 ml-[2rem]">
            {filteredCars.map((car) => (
              <Card
                key={car.id}
                className="relative rounded-xl overflow-hidden shadow-md hover:shadow-xl transition duration-300"
              >
                <img
                  src={car.images?.[0] || ""}
                  alt={car.name}
                  className="w-full h-56 object-cover transition-transform duration-300 transform hover:scale-105"
                />

                <CardContent className="p-5">
                  <h3 className="text-2xl font-bold text-gray-900">{car.name}</h3>
                  <p className="text-red-500 font-semibold text-xl mt-1">₹ {car.price}</p>

              <div className="flex justify-between items-center text-sm text-gray-700 mt-4">
                <div className="flex flex-col items-center">
                  <p className="font-semibold">⛽ Fuel</p>
                  <p>{car.fuelType}</p>
                </div>
                <div className="flex flex-col items-center">
                  <p className="font-semibold">⚙ Transmission</p>
                  <p>{car.transmission}</p>
                </div>
                <div className="flex flex-col items-center">
                  <p className="font-semibold">🚗 Mileage</p>
                  <p>{car.mileage} km</p>
                </div>
              </div>

                  <div className="flex justify-between items-center mt-5">
                  <Button
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg"
           onClick={() => navigate(`/car/${car.id}`)}>
                      View Details
                    </Button>
                    <FaHeart className="text-gray-400 cursor-pointer hover:text-red-500 text-2xl transition duration-300" />
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};

export default Listings;
