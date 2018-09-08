import CONFIG from '../config';

// The timer that fires for every audio tick
// "tick" = Every possible time a sound could be played
let AUDIO_TIMER = null;

// Action: Audio was started
export const AUDIO_START = "AUDIO_START";
export const audioStart = () => (dispatch) => {
  // Clear the old timer
  clearInterval(AUDIO_TIMER);

  // Set up a new timer to fire for every tick
  AUDIO_TIMER = setInterval(() => {
    dispatch(audioTick());
  }, CONFIG.AUDIO_TICK_DURATION);

  // Dispatch the start action
  dispatch({
    type: AUDIO_START
  });

  // Dispatch the first tick (otherwise we have to wait for the timer)
  dispatch(audioTick());
}

// Action: Audio was stoped
export const AUDIO_STOP = "AUDIO_STOP";
export const audioStop = () => {
  clearInterval(AUDIO_TIMER);
  return {
    type: AUDIO_STOP
  };
}

// Action: Audio tick has fired
export const AUDIO_TICK = "AUDIO_TICK";
export const audioTick = () => ({
  type: AUDIO_TICK
})
