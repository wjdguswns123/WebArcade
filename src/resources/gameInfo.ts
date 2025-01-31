// 게임 정보 인터페이스.
export interface GameInfo {
  id: number,
  name: string,
  description: string,
  buildPath: string,
}

// // 임시 게임 정보 배열.
// export const gameInfos: GameInfo[] = [
//   {
//     id: 1,
//     name: "테스트 게임 1",
//     description: "테스트 게임 1 입니다.",
//     buildPath: "Build/TestGame1/TestGame1",
//   },
//   {
//     id: 2,
//     name: "테스트 게임 2",
//     description: "테스트 게임 2 입니다.",
//     buildPath: "Build/TestGame2/TestGame2",
//   },
// ];

export let gameInfos: GameInfo[] =[];

export const loadGameInfo = () => {
  if(gameInfos.length === 0) {
    fetch("Datas/gameInfo.csv").then(
      response => response.text()
    ).then(responseText => {      
      const lows = responseText.split("\r\n");

      for(let i = 1; i < lows.length; ++i) {
        if(lows[i] !== "") {
          const datas = lows[i].split(",");
          const data: GameInfo = {
            id: Number.parseInt(datas[0]),
            name: datas[1],
            description: datas[2],
            buildPath: datas[3]
          };

          if(gameInfos.find(i => i.id === data.id) === undefined) {
            gameInfos.push(data);
          }
        }
      }
    });
  }
};