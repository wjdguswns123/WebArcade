import { create } from "zustand";

export type InputTypes = "forward" | "backward" | "left" | "right" | "space";

interface InputState {
  forward: boolean;
  backward: boolean;
  left: boolean;
  right: boolean;
  space: boolean;
  setInput: (input: InputTypes, value: boolean) => void;
}

export const useInputStateStore = create<InputState>((set) => ({
  forward: false,
  backward: false,
  left: false,
  right: false,
  space: false,
  setInput: (input, value) => set((state) => ({...state, [input]: value})),
}));