import { create } from "zustand";
import { loginUser, fetchProfile,checkUser,logoutUser} from "../api/userApi";

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
  logout: () =>{
    try {
      logoutUser();
      set({ authUser: null, token: null });
      return true
    } catch (error) {
      console.log(error);
      set({ error: error.message, isLoading: false })
      return false 
    }
    
  },

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

