import { create } from "zustand";
import { persist } from "zustand/middleware";

// Интерфейс для хранилища
interface TourState {
  selectedTour: string;
  setSelectedTour: (tour: string) => void;
}

// Создаем хранилище с персистентностью
export const useTourStore = create<TourState>()(
  persist(
    (set) => ({
      selectedTour: "",
      setSelectedTour: (tour) => set({ selectedTour: tour }),
    }),
    {
      name: "tour-storage", // имя для localStorage
    }
  )
);
