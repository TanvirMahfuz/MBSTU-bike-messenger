import { create } from "zustand";
import {
  createBike,
  fetchBikes,
  fetchBike,
  updateBike,
  deleteBike,
} from "../api/bikeApi";
import { useUserStore } from "./useUserStore";

export const useBikeStore = create((set) => ({
  bikes: [],
  bike: null,
  isLoading: false,
  error: null,

  fetchAllBikes: async () => {
    console.log("Fetching all bikes (zustand)...");
    set({ isLoading: true });
    try {
      const bikes = await fetchBikes();
      console.log("Fetched bikes:", bikes.data);
      set({ bikes: bikes.data, isLoading: false, error: null });
      return true;
    } catch (error) {
      console.error("Error fetching bikes:", error);
      set({
        error: error.response?.data?.message || error.message,
        isLoading: false,
      });
      return false;
    }
  },

  fetchBikeById: async (id) => {
    // console.log("Fetching bike by ID (zustand)...");
    set({ isLoading: true });
    try {
      const bike = await fetchBike(id);
      // console.log("Fetched bike:", bike);
      set({ bike, isLoading: false, error: null });
    } catch (error) {
      console.log("Error fetching bike:", error);
      set({
        error: error.response?.data?.message || error.message,
        isLoading: false,
      });
    }
  },

  addBike: async (bikeData) => {
    console.log("Adding bike (zustand)...");
    set({ isLoading: true });
    try {
      const newBike = await createBike(bikeData);
      set((state) => ({
        bikes: [...state.bikes, newBike],
        isLoading: false,
        error: null,
      }));
      useUserStore.getState().check();
      return true
    } catch (error) {
      console.log(error)
      set({
        error: error.response?.data?.message || error.message,
        isLoading: false,
      });
      return false;
    }
  },

  updateBikeById: async (id, bikeData) => {
    set({ isLoading: true });
    try {
      const updatedBike = await updateBike(id, bikeData);
      set((state) => ({
        bikes: state.bikes.map((bike) => (bike.id === id ? updatedBike : bike)),
        isLoading: false,
        error: null,
      }));
    } catch (error) {
      set({
        error: error.response?.data?.message || error.message,
        isLoading: false,
      });
    }
  },

  deleteBikeById: async (id) => {
    set({ isLoading: true });
    try {
      await deleteBike(id);
      set((state) => ({
        bikes: state.bikes.filter((bike) => bike.id !== id),
        isLoading: false,
        error: null,
      }));
    } catch (error) {
      set({
        error: error.response?.data?.message || error.message,
        isLoading: false,
      });
    }
  },
}));
