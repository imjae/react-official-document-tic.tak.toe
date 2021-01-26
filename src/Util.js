import {BOARD_SIZE} from "./Def"

export const initBoard = (size = BOARD_SIZE) => {
  return Array.from(Array(size), () => Array(size).fill(null));
};

export const convertHistoryArr = (historyArr) => {
    const elementString2Arr = historyArr.map(element => {
        let str2arr = element.split(',');
        let resultArr = [];
        for(let i=0; i<BOARD_SIZE*BOARD_SIZE; i+=BOARD_SIZE) {
            resultArr.push(str2arr.slice(i,i+BOARD_SIZE));
        }
        return resultArr;
    });

    return elementString2Arr;
};