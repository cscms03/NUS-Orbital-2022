import * as actions from "./actionTypes";

let lastId = 0;
var date = new Date().getDate();
var month = new Date().getMonth() + 1;
var year = new Date().getFullYear();
var dateAdded = date + "-" + month + "-" + year;

export default function reducer(state = [], action) {
  if (action.type === actions.progressionLogAdded)
    return [
      {
        id: ++lastId,
        logDate: dateAdded,
        logPhoto: action.payload.logPhoto,
        logMemo: action.payload.logMemo,
      },
      ...state,
    ];
  else if (action.type === actions.progressionLogRemoved)
    return state.filter(
      (progressionLog) => progressionLog.id !== action.payload.id
    );
  else if (action.type === actions.progressionLogEdited)
    return state.map((log) =>
      log.id === action.payload.oriLogInfo.id
        ? {
            id: log.id,
            logDate: log.logDate,
            logPhoto: action.payload.logPhoto,
            logMemo: action.payload.logMemo,
          }
        : log
    );
  // [

  //   ...state.splice(0, action.payload.index),
  //   {
  //     id: action.payload.oriLogInfo.id,
  //     logDate: action.payload.oriLogInfo.logDate,
  //     logPhoto: action.payload.logPhoto,
  //     logMemo: action.payload.logMemo
  //   },
  //   ...state.splice(action.payload.index+1)
  // ]

  return state;
}
