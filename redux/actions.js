export function progressionLogAdded(photo, memo) {
    return {
        type: "progressionLogAdded",
        payload: {
            logPhoto: photo,
            logMemo: memo 
          }
    };
}