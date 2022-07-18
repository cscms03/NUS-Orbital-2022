import * as actions from "./actionTypes";

export function progressionLogAdded(photo, memo) {
  return {
    type: actions.progressionLogAdded,
    payload: {
      logPhoto: photo,
      logMemo: memo,
    },
  };
}

export function progressionLogRemoved(id) {
  return {
    type: actions.progressionLogRemoved,
    payload: {
      id: id,
    },
  };
}

export function progressionLogEdited(log, newPhoto, newMemo) {
  return {
    type: actions.progressionLogEdited,
    payload: {
      oriLogInfo: log,
      logPhoto: newPhoto,
      logMemo: newMemo,
    },
  };
}
