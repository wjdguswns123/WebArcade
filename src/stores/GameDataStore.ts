import { create } from "zustand";

interface GameData {
  selectGameID: number;
  setSelectGameID: (value: number) => void; 
}

export const useGameDataStore = create<GameData>((set) => ({
  selectGameID: 0,
  setSelectGameID: (value: number) => set((state) => ({...state, selectGameID: value})),
}));