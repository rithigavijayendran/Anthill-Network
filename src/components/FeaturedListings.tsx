import { useEffect, useState } from "react";
import { db } from "../services/firebase";
import { collection, getDocs } from "firebase/firestore";
import { FaHeart } from "react-icons/fa";
import Button from "../components/ui/Button";
import Card from "../components/ui/Card";
import CardContent from "../components/ui/CardContent";
import { useNavigate } from "react-router-dom";

interface Car {
  id: string;
  name: string;
  images: string[];
  price: string;
  fuelType: string;
  mileage: string;
  transmission: string;
}

const FeaturedListings = () => {
  const [cars, setCars] = useState<Car[]>([]);
  const [visibleCars, setVisibleCars] = useState<Car[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCars = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "cars"));
        const carList = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        })) as Car[];
        setCars(carList);
        setVisibleCars(carList.slice(0, 6)); 
      } catch (error) {
        console.error("Error fetching cars:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchCars();
  }, []);


  const handleLoadMore = () => {
    navigate("/listings");
  };

  return (
    <section className="py-12 px-6 container mx-auto">
      <h2 className="text-4xl font-bold text-gray-900 mb-8">║ Featured Listings</h2>
      {loading ? (
        <p className="text-center text-lg font-medium text-gray-600">Loading cars...</p>
      ) : (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 ml-[2rem]">
            {visibleCars.map((car) => (
              <Card
                key={car.id}
                className="relative rounded-xl overflow-hidden shadow-md hover:shadow-xl transition duration-300"
              >
                <img
                  src={car.images[0]}
                  alt={car.name}
                  className="w-full h-56 object-cover transition-transform duration-300 transform hover:scale-105"
                />
                <div className="absolute top-3 right-3 bg-red-500 text-white px-3 py-1 text-sm font-bold rounded-full">
                  Featured
                </div>
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
                      variant="default"
                      className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg"
                      onClick={() => navigate("/listings")}
                    >
                      View Details
                    </Button>
                    <FaHeart className="text-gray-400 cursor-pointer hover:text-red-500 text-2xl transition duration-300" />
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
          <div className="text-center mt-6">
            <Button
              onClick={handleLoadMore}
              className="bg-red-500 hover:bg-red-600 text-white px-6 py-2 rounded-lg"
            >
              Load More
            </Button>
          </div>
        </>
      )}
    </section>
  );
};

export default FeaturedListings;
