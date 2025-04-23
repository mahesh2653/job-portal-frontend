import { create } from "zustand";
import { User } from "../types";

interface Store {
  isDarkMode: boolean;
  toggleDarkMode: () => void;
  currentUser: User | null;
  setCurrentUser: (user: User | null) => void;
}

export const useStore = create<Store>((set) => ({
  isDarkMode: true,
  toggleDarkMode: () => set((state) => ({ isDarkMode: !state.isDarkMode })),
  currentUser: null,
  setCurrentUser: (user) => set({ currentUser: user }),
}));
