import * as actions from './actionTypes'

export function progressionLogAdded(photo, memo) {
    return {
        type: actions.progressionLogAdded,
        payload: {
            logPhoto: photo,
            logMemo: memo 
          }
    };
}

export function progressionLogRemoved(id) {
    return {
        type: actions.progressionLogRemoved,
        payload: {
            id: id
        }
    };
}