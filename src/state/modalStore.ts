import create from "zustand";

interface State {
  isOpen: boolean;
  closeModal: () => void;
  openModal: () => void;
}

export const useModalStore = create<State>((set) => ({
  isOpen: false,
  closeModal: () => set(() => ({ isOpen: false })),
  openModal: () => set(() => ({ isOpen: true })),
}));
