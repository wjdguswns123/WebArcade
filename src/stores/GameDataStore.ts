import { create } from "zustand";
import { GameInfo, getInitGameInfo } from "../resources/gameInfo";

interface GameData {
  selectGameID: number;
  selectGameInfo: GameInfo;
  setSelectGameID: (value: number) => void; 
  setSelectGameInfo: (value: GameInfo) => void;
}

export const useGameDataStore = create<GameData>((set) => ({
  selectGameID: 0,
  selectGameInfo: getInitGameInfo(),
  setSelectGameID: (value: number) => set((state) => ({...state, selectGameID: value})),
  setSelectGameInfo: (value: GameInfo) => set((state) => ({...state, selectGameInfo: value})),
}));