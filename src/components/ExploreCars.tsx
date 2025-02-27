import { useEffect, useState } from "react";
import { db } from "../services/firebase";
import { collection, getDocs } from "firebase/firestore";
import { useNavigate } from "react-router-dom";

interface CarType {
  id: string;
  name: string;
  imageUrl: string;
}

const ExploreCars = () => {
  const [carTypes, setCarTypes] = useState<CarType[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCarTypes = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "carTypes"));
        const typesList = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        })) as CarType[];
        setCarTypes(typesList);
      } catch (error) {
        console.error("Error fetching car types:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCarTypes();
  }, []);

  return (
    <section className="py-10 px-5 container mx-auto">
      <h2 className="text-3xl font-bold mb-5">║ Explore Our Cars</h2>

      {loading ? (
        <p>Loading car types...</p>
      ) : (
        <div className="ml-[2rem] flex space-x-8 overflow-x-auto">
          {carTypes.map((car) => (
            <div
              key={car.id}
              className="w-40 h-36 flex flex-col items-center justify-center p-4 rounded-lg shadow-md cursor-pointer transition hover:shadow-lg"
              onClick={() => navigate("/listings")} // Navigate to the listings page
            >
              <img
                src={car.imageUrl}
                alt={car.name}
                className="h-32 w-32 object-cover mb-2 rounded-md"
              />
              <span className="text-lg font-medium text-center">{car.name}</span>
            </div>
          ))}
        </div>
      )}
    </section>
  );
};

export default ExploreCars;
