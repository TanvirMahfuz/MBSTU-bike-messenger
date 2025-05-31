import { create } from "zustand";
import { loginUser, fetchProfile,checkUser} from "../api/userApi";

export const useUserStore = create((set) => ({
  authUser: null,
  token: null,
  isLoading: false,
  error: null,

  check: async ()=>{
    try {
      const response = await checkUser();
      set({
        authUser: response.user,
        isLoading: false,
        error: null,
      });
      return true;
    } catch (error) {
      set({
        error: error.response?.data?.message || error.message,
        isLoading: false,
      });
      return false;
    }
  },
  login: async (email, password) => {
    set({ isLoading: true });
    try {
      const response = await loginUser(email, password);
      set({
        authUser: response.user,
        isLoading: false,
        error: null,
      });
      return true
    } catch (err) {
      set({
        error: err.response?.data?.message || err.message,
        isLoading: false,
      });
      return false
    }
  },
  logout: () => set({ authUser: null, token: null }),

  loadProfile: async () => {
    set({ isLoading: true });
    try {
      const authUser = await fetchProfile(token);
      set({ authUser, isLoading: false });
    } catch (err) {
      set({ error: err.message, isLoading: false });
    }
  },
}));

