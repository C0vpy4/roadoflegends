import { create } from "zustand";
import { supabase } from "./utils/supabase";

interface Tour {
  id: number;
  title: string;
  description: string;
  price: number;
  duration: string;
  created_at: string;
}

interface TourStore {
  tours: Tour[];
  fetchTours: () => Promise<void>;
  addTour: (tour: Omit<Tour, "id" | "created_at">) => Promise<void>;
}

export const useTourStore = create<TourStore>((set) => ({
  tours: [],
  async fetchTours() {
    const { data, error } = await supabase.from("tours").select();
    if (error) throw error;
    set({ tours: data });
  },
  async addTour(tour) {
    const { error } = await supabase.from("tours").insert([tour]);
    if (error) throw error;
    await this.fetchTours();
  },
}));
