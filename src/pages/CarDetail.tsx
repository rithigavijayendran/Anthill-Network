import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { db } from "../services/firebase";
import { doc, getDoc } from "firebase/firestore";
import FeaturedListings from "../components/FeaturedListings";
import { collection, addDoc } from "firebase/firestore";


interface Car {
  id: string;
  name: string;
  price: number;
  discountPrice: number;
  images: string[];
  fuelType: string;
  mileage: number;
  transmission: string;
  description: string;
  location: string;
  features: string[];
  engine: string;
  seating: number;
  stockNumber: string;
  vinNumber: string;
  cylinders: number;
  color: string;
  driveType: string;
  cityMpg: number;
  highwayMpg: number;
}

const CarDetails = () => {
  const { carId } = useParams<{ carId: string }>();
  const [car, setCar] = useState<Car | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
    const [totalAmount, setTotalAmount] = useState<number | "">("");
    const [downPayment, setDownPayment] = useState<number | "">("");
    const [loanTerm, setLoanTerm] = useState<number | "">("");
    const [interestRate, setInterestRate] = useState<number | "">("");
    const [monthlyPayment, setMonthlyPayment] = useState<number | null>(null);
  const [message, setMessage] = useState("");
  const [formData, setFormData] = useState({ name: "", email: "", phone: "", message: "" });

  

  useEffect(() => {
    const fetchCarDetails = async () => {
      try {
        if (!carId) return;

        const carRef = doc(db, "cars", carId);
        const carSnap = await getDoc(carRef);

        if (carSnap.exists()) {
          setCar(carSnap.data() as Car);
        }
      } catch (error) {
        console.error("Error fetching car details:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCarDetails();
  }, [carId]);

  const handlePurchaseRequest = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!formData.name || !formData.email || !formData.phone || !formData.message) {
      alert("Please fill all fields");
      return;
    }

    try {
      await addDoc(collection(db, "purchaseRequests"), {
        carId,
        ...formData,
        timestamp: new Date(),
      });
      setMessage("✅ Purchase Request Sent Successfully!");
      setFormData({ name: "", email: "", phone: "", message: "" });
      setTimeout(() => setMessage(""), 3000);
    } catch (error) {
      setMessage("❌ Failed to send inquiry.");
      console.error("Error submitting purchase request:", error);
    }
  };
  if (loading) return <p>Loading car details...</p>;
  if (!car) return <p>No car details found.</p>;

   // Loan Calculator Function
   const calculateEMI = () => {
    if (!totalAmount || !downPayment || !loanTerm || !interestRate) {
      alert("Please fill all fields correctly.");
      return;
    }

    const loanAmount = totalAmount - downPayment;
    const monthlyRate = interestRate / 12 / 100;
    const totalMonths = loanTerm * 12;

    if (loanAmount <= 0 || monthlyRate <= 0 || totalMonths <= 0) {
      alert("Invalid input values. Please enter valid numbers.");
      return;
    }

    const emi =
      (loanAmount * monthlyRate * Math.pow(1 + monthlyRate, totalMonths)) /
      (Math.pow(1 + monthlyRate, totalMonths) - 1);

    setMonthlyPayment(parseFloat(emi.toFixed(2))); 
  };


  const resetCalculator = () => {
    setTotalAmount("");
    setDownPayment("");
    setLoanTerm("");
    setInterestRate("");
    setMonthlyPayment(null);
  };
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };


  return (
    <div className="mt-10 container mx-auto p-6">
      <div className="flex justify-between items-center">
  <h2 className="text-3xl font-bold">{car.name}</h2>
  <div className="text-right">
    <p className="text-red-500 text-xl font-semibold">₹{car.discountPrice.toLocaleString()}</p>
    <p className="text-gray-500 line-through">₹{car.price.toLocaleString()}</p>
  </div>
</div>


      {/* Car Images */}
      <div className="mt-4">
        <img src={car.images[0]} alt={car.name} className="w-full h-120 object-cover rounded-lg" />
        <div className="flex gap-2 mt-2 overflow-x-auto">
          {car.images.slice(1).map((img, index) => (
            <img key={index} src={img} alt={car.name} className="w-24 h-24 object-cover rounded-md" />
          ))}
        </div>
      </div>

      {/* Car Description */}
      <div className="mt-6">
        <h3 className="text-xl font-bold mb-2">Description</h3>
        <p className="text-gray-700">{car.description}</p>
      </div>

      {/* Purchase Inquiry | Overview & Features */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
{/* Purchase Inquiry Form */}
<div className="bg-white p-6 rounded-lg shadow-md border mt-4">
        <h3 className="text-lg font-bold mb-4">Send Purchase Request</h3>
        <form onSubmit={handlePurchaseRequest}>
          <input type="text" name="name" placeholder="Your Name" 
                value={formData.name} onChange={handleChange} className="w-full p-3 border rounded-md mb-3" required />
          <input type="email" name="email" placeholder="Email Address" 
                value={formData.email} onChange={handleChange} className="w-full p-3 border rounded-md mb-3" required />
          <input type="tel" name="phone" placeholder="Phone Number"
                value={formData.phone} onChange={handleChange} className="w-full p-3 border rounded-md mb-3" required />
          <textarea name="message" placeholder="Your Message" 
                value={formData.message} onChange={handleChange} className="w-full p-3 border rounded-md h-24 mb-3" required />
          <button type="submit" className="w-full bg-red-600 text-white py-3 rounded-md hover:bg-red-700 transition">Send Purchase Request</button>
          {message && <p className="mt-3 text-center">{message}</p>}
        </form>
      </div>
        {/* Right - Car Overview & Features */}
        <div className="bg-gray-100 p-6 rounded-lg shadow-md border mt-4">
          <h3 className="text-xl font-bold mb-2">Car Overview</h3>
          <div className="grid grid-cols-2 gap-4 text-gray-700">
            <p><strong>Fuel Type:</strong> {car.fuelType}</p>
            <p><strong>Mileage:</strong> {car.mileage} km</p>
            <p><strong>Transmission:</strong> {car.transmission}</p>
            <p><strong>Engine:</strong> {car.engine}</p>
            <p><strong>Seating:</strong> {car.seating} people</p>
            <p><strong>Drive Type:</strong> {car.driveType}</p>
            <p><strong>City MPG:</strong> {car.cityMpg}</p>
            <p><strong>Highway MPG:</strong> {car.highwayMpg}</p>
            <p><strong>Color:</strong> {car.color}</p>
            <p><strong>Stock Number:</strong> {car.stockNumber}</p>
          </div>

          {/* Features Section */}
          <h3 className="text-lg font-bold mt-4 mb-2">Features</h3>
          <div className="grid grid-cols-2 gap-2">
            {car.features.map((feature, index) => (
              <span key={index}>✅ {feature}</span>
            ))}
          </div>
        </div>
      </div>

      {/* Car Location */}
      <div className="mt-6 bg-gray-100 p-6 rounded-lg shadow-md border">
        <h3 className="text-lg font-bold mb-2 text-red-500">📍 Location</h3>
        <p className="mb-2 text-gray-700">{car.location}</p>
        <iframe
          title="Car Location"
          src={`https://www.google.com/maps?q=${car.location}&output=embed`}
          className="w-full h-64 rounded-lg"
        />
      </div>

      {/* Loan Calculator */}
      <div className="mt-6 bg-white p-6 rounded-lg shadow-md border">
        <h3 className="text-lg font-bold mb-4 text-red-500">💰 Loan Calculator</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
         <input
            type="number"
            placeholder="Total Amount"
            className="w-full p-2 border rounded-md"
            value={totalAmount}
            onChange={(e) => setTotalAmount(Number(e.target.value))}
          />
          <input
            type="number"
            placeholder="Down Payment"
            className="w-full p-2 border rounded-md"
            value={downPayment}
            onChange={(e) => setDownPayment(Number(e.target.value))}
          />
          <input
            type="number"
            placeholder="Loan Term (Years)"
            className="w-full p-2 border rounded-md"
            value={loanTerm}
            onChange={(e) => setLoanTerm(Number(e.target.value))}
          />
          <input
            type="number"
            placeholder="Interest Rate (%)"
            className="w-full p-2 border rounded-md"
            value={interestRate}
            onChange={(e) => setInterestRate(Number(e.target.value))}
          />
          </div>
        <div className="flex gap-4 mt-4">
          <button onClick={calculateEMI} className="w-full bg-red-500 text-white py-2 rounded-md hover:bg-red-600">
            Calculate
          </button>
          <button onClick={resetCalculator} className="w-full bg-gray-300 text-black py-2 rounded-md hover:bg-gray-400">
            Reset
          </button>
        </div>
        {monthlyPayment !== null && (
          <div className="mt-4 text-center">
            <p className="text-lg font-semibold text-gray-700">
              Monthly EMI: ₹{monthlyPayment.toFixed(2)}
            </p>
          </div>
        )}
      </div>
      <FeaturedListings/>
    </div>
  );
};

export default CarDetails;
