import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { collection, addDoc, updateDoc, doc, getDocs } from "firebase/firestore";
import { db } from "../services/firebase";

interface Car {
  id?: string;
  name: string;
  price: number;
  fuelType: string;
  mileage: number;
  transmission: string;
  image: string;
}

interface CarState {
  cars: Car[];
  loading: boolean;
  error: string | null;
}

const initialState: CarState = {
  cars: [],
  loading: false,
  error: null,
};

// Fetch cars from Firestore
export const fetchCars = createAsyncThunk("cars/fetchCars", async () => {
  const querySnapshot = await getDocs(collection(db, "cars"));
  return querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })) as Car[];
});

// Add new car
export const addCar = createAsyncThunk("cars/addCar", async (car: Car) => {
  const docRef = await addDoc(collection(db, "cars"), car);
  return { id: docRef.id, ...car };
});

// Update car details
export const updateCar = createAsyncThunk("cars/updateCar", async ({ id, ...car }: Car) => {
  const carRef = doc(db, "cars", id!);
  await updateDoc(carRef, { ...car });
  return { id, ...car };
});

export const requestPurchase = createAsyncThunk("cars/requestPurchase", async (carId: string) => {
    const docRef = await addDoc(collection(db, "purchaseRequests"), { carId });
    return { id: docRef.id, carId };
  });
  

const carSlice = createSlice({
  name: "cars",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCars.fulfilled, (state, action) => {
        state.cars = action.payload;
        state.loading = false;
      })
      .addCase(addCar.fulfilled, (state, action) => {
        state.cars.push(action.payload);
      })
      .addCase(updateCar.fulfilled, (state, action) => {
        const index = state.cars.findIndex((car) => car.id === action.payload.id);
        if (index !== -1) {
          state.cars[index] = action.payload;
        }
      });
  },
});

export default carSlice.reducer;
