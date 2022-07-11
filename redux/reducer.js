import * as actions from './actionTypes'

let lastId = 0;
var date = new Date().getDate();
var month = new Date().getMonth() + 1;
var year = new Date().getFullYear();
var dateAdded = date + '-' + month + '-' + year;

export default function reducer(state = [], action) {
  if (action.type === actions.progressionLogAdded)
    return [
      {
        id: ++lastId,
        logDate: dateAdded,
        logPhoto: action.payload.logPhoto,
        logMemo:  action.payload.logMemo
      },
      ...state
    ];

  else if (action.type === actions.progressionLogRemoved)
    return state.filter(progressionLog => progressionLog.id !== action.payload.id);
  
  return state;
}