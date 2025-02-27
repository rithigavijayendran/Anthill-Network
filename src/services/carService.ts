import { db } from "./firebase";
import { collection, addDoc, doc, getDocs, getDoc, updateDoc, deleteDoc } from "firebase/firestore";

// Add a new car
export const addCar = async (carData: any) => {
  try {
    const docRef = await addDoc(collection(db, "cars"), carData);
    return { success: true, id: docRef.id, message: "Car added successfully!" };
  } catch (error) {
    console.error("Error adding car:", error);
    return { success: false, message: "Failed to add car." };
  }
};

// Update a car
export const updateCar = async (id: string, updatedData: any) => {
  try {
    const carRef = doc(db, "cars", id);
    await updateDoc(carRef, updatedData);
    return { success: true, message: "Car updated successfully!" };
  } catch (error) {
    console.error("Error updating car:", error);
    return { success: false, message: "Failed to update car." };
  }
};

// Delete a car
export const deleteCar = async (id: string) => {
  try {
    const carRef = doc(db, "cars", id);
    await deleteDoc(carRef);
    return { success: true, message: "Car deleted successfully!" };
  } catch (error) {
    console.error("Error deleting car:", error);
    return { success: false, message: "Failed to delete car." };
  }
};

// Fetch all cars
export const getCars = async () => {
  try {
    const querySnapshot = await getDocs(collection(db, "cars"));
    return querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
  } catch (error) {
    console.error("Error fetching cars:", error);
    return [];
  }
};

// Fetch single car details
export const getCarById = async (carId: string) => {
  try {
    const carRef = doc(db, "cars", carId);
    const carSnap = await getDoc(carRef);
    return carSnap.exists() ? { id: carSnap.id, ...carSnap.data() } : null;
  } catch (error) {
    console.error("Error fetching car:", error);
    return null;
  }
};
