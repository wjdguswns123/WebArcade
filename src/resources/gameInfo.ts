// 게임 정보 인터페이스.
export interface GameInfo {
  id: number,
  name: string,
  description: string,
  buildPath: string,
}

// 임시 게임 정보 배열.
export const gameInfos: GameInfo[] = [
  {
    id: 1,
    name: "테스트 게임 1",
    description: "테스트 게임 1 입니다.",
    buildPath: "Build/TestGame1/TestGame1",
  },
  {
    id: 2,
    name: "테스트 게임 2",
    description: "테스트 게임 2 입니다.",
    buildPath: "Build/TestGame2/TestGame2",
  },
];