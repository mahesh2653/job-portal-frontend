// src/store/useAuthStore.ts
import { create } from "zustand";
import axiosApi from "../utils/interceptor";
import { toastInfo } from "../utils/toast";

interface User {
  id: string;
  email: string;
  name: string;
  role: string;
}

interface AuthStore {
  isDarkMode: boolean;
  toggleDarkMode: () => void;
  user: User | null;
  token: string | null;
  loading: boolean;
  isAuthenticated: boolean;
  setUser: (user: User | null) => void;
  setToken: (token: string | null) => void;
  logout: () => void;
  initializeAuth: () => Promise<void>;
}

export const useAuthStore = create<AuthStore>((set, get) => ({
  isDarkMode: true,
  toggleDarkMode: () => set((state) => ({ isDarkMode: !state.isDarkMode })),
  user: null,
  token: null,
  loading: true,
  isAuthenticated: false,
  setUser: (user) => set({ user, isAuthenticated: !!user && !!get().token }),
  setToken: (token) => {
    localStorage.setItem("Token", token || "");
    console.log("SET TOKEN", !!token && !!get().user);
    set({ token, isAuthenticated: !!token && !!get().user });
  },

  logout: () => {
    toastInfo("Logout successfully");
    localStorage.removeItem("Token");
    set({ token: null, user: null, isAuthenticated: false });
    setTimeout(() => {
      window.location.reload();
    }, 50);
  },

  initializeAuth: async () => {
    const storedToken = localStorage.getItem("Token");
    if (storedToken) {
      try {
        const response = await axiosApi.get(`/users/auth`);
        console.log("MAHESH", response.data);
        set({
          user: response.data.data,
          token: storedToken,
          isAuthenticated: true,
        });
      } catch (error) {
        localStorage.removeItem("Token");
        set({ user: null, token: null, isAuthenticated: false });
      }
    }
    set({ loading: false });
  },
}));
