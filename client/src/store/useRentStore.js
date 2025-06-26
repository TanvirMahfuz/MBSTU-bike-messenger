import { create } from "zustand";
import { createRent, rentCompletion,getUserRent } from "../api/rentApi";
import { useUserStore } from "./useUserStore";

export const useRentStore = create((set)=>({
  isLoading: false,
  error: null,
  rents: [],
  userRents: [],
  createRent: async (rentData) => {
    set({ isLoading: true });
    try {
      const newRent = await createRent(rentData);
      console.log(newRent);
      set((state) => ({
        rents: [...state.rents, newRent],
        isLoading: false,
        error: null,
      }));
      useUserStore.getState().check();
      return true;
    } catch (error) {
      console.log(error);
      set({
        error: error.response?.data?.message || error.message,
        isLoading: false,
      });
      return false;
    }
  },
  rentCompletion: async (rentData) => {
    set({ isLoading: true });
    try {
      const completedRent = await rentCompletion(rentData);
      set((state) => ({
        rents: state.rents.map((rent) =>
          rent.id === completedRent._id ? completedRent : rent
        ),
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
  getRentedBikeOfUser: async (userId) => {
    set({ isLoading: true });
    try {
      const userRents = await getUserRent(userId);
      console.log(userRents);
      set({ userRents, isLoading: false, error: null });
    } catch (error) {
      set({
        error: error.response?.data?.message || error.message,
        isLoading: false,
      });
    }
  },
}))