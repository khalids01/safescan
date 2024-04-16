import { create } from "zustand";
import { persist } from "zustand/middleware";

interface FirstLoad {
  data: {
    firstLoad: boolean;
  };
  setFirstLoad: (value: boolean) => void;
}

export const useFirstLoad = create<FirstLoad>()(
  persist(
    (set) => ({
      data: {
        firstLoad: false,
      },
      setFirstLoad: (value) => set((state) => ({ data: { firstLoad: value } })),
    }),
    {
      name: "firstLoad",
    }
  )
);
