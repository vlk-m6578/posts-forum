import { create } from "zustand";

interface ModalState {
  type: string;
  isOpen: boolean;

  openModal: (type: string) => void;
  closeModal: () => void;
}

export const useModalStore = create<ModalState>((set) => ({
  type: '',
  isOpen: false,

  openModal: (type) => {
    set({
      type,
      isOpen: true,
    })
  },
  closeModal: () => {
    set({
      type: '',
      isOpen: false,
    })
  },
}))