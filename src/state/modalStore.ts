import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

interface State {
  isOpen: boolean;
  closeModal: () => void;
  openModal: () => void;
}

export const useModalStore = create<State>(
  persist(
    (set, get) => ({
      isOpen: false,
      closeModal: () => set(() => ({ isOpen: false })),
      openModal: () => set(() => ({ isOpen: true })),
    }),
    {
      name: "modal-storage",
      storage: createJSONStorage(() => sessionStorage),
    }
  )
);
