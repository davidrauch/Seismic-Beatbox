let AUDIO_TIMER = null;
const AUDIO_TICK_DURATION = 200;

export const AUDIO_START = "AUDIO_START";
export const audioStart = () => (dispatch) => {
  clearInterval(AUDIO_TIMER);
  AUDIO_TIMER = setInterval(() => {
    dispatch(audioTick());
  }, AUDIO_TICK_DURATION);
  dispatch({
    type: AUDIO_START
  });
  dispatch(audioTick());
}

export const AUDIO_STOP = "AUDIO_STOP";
export const audioStop = () => {
  clearInterval(AUDIO_TIMER);
  return {
    type: AUDIO_STOP
  };
}

export const AUDIO_TICK = "AUDIO_TICK";
export const audioTick = () => ({
  type: AUDIO_TICK
})
