// Internal
import initialState from '../store/initialState';
import CONFIG from '../config';
import {
  AUDIO_START,
  AUDIO_STOP,
  AUDIO_TICK,
} from '../actions/audioActions';
import {
  UPDATE_DATA
} from '../actions/geodataActions'

// The audio reducer
export default function audio(state = initialState, action) {
  switch(action.type) {
    case AUDIO_START:
      // On audio start, go to beginning and start playing
      return {
        ...state.audio,
        index: 0,
        time: state.geodata.startTime,
        isPlaying: true,
      }
    case AUDIO_STOP:
      // On audio stop, go to beginning and stop playing
      return {
        ...state.audio,
        index: 0,
        time: state.geodata.startTime,
        isPlaying: false,
      }
    case AUDIO_TICK:
      // On audio tick, check if there is something left to play
      if(state.audio.index < state.geodata.dataPoints.length) {
        let newIndex = state.audio.index;

        // Play sounds for all earthquakes with the current time
        while(state.geodata.dataPoints[newIndex]
              && state.geodata.dataPoints[newIndex].time === state.audio.time) {
          playDataPoint(state.geodata.dataPoints[newIndex]);
          newIndex++;
        }

        // Set new index and next time
        return {
          ...state.audio,
          index: newIndex,
          time: state.audio.time + CONFIG.GEODATA_ROUND_TIME_TO_MS,
        }
      } else {
        return state.audio;
      }
    case UPDATE_DATA:
      // On data update, set the start time if it has not already been set
      // (We don't want to jump back to the beginning if we are already playing)
      return {
        ...state.audio,
        time: state.audio.time ? state.audio.time : state.geodata.startTime,
      }
    default:
      return state.audio;
  }
}

// Plays the sound for a datapoint
const playDataPoint = dataPoint =>
  playSound(Math.max(40, dataPoint.height - 500))

// The audio context used to play all sounds
let AUDIO_CONTEXT = null;

// Check if AudioContext is supported
// Safari offers webkitAudioContext which has the same API, but sounds horrible. So we don't use it.
if (window.AudioContext) {
    AUDIO_CONTEXT = new window.AudioContext();
} else {
    // Web Audio API is not supported
    alert('Sorry, but the Web Audio API is not supported by your browser');
}

// Plays a sound with a given frequency and duration
// Returns a Promise that resolves when the sound has finished playing
const playSound = (frequency, duration = 0.4, type = 'sine') =>
  new Promise((resolve, reject) => {
    // Only play sound if there is an AudioContext
    if(!AUDIO_CONTEXT) {
      reject();
    } else {
      // Generate oscillator (sound producer) and gain (volume)
      let oscillator = AUDIO_CONTEXT.createOscillator();
      let gain = AUDIO_CONTEXT.createGain();

      // Set sound type and frequency
      oscillator.type = type;
      oscillator.frequency.value = frequency;

      // Connect oscillator and gain
      oscillator.connect(gain);
      gain.connect(AUDIO_CONTEXT.destination);

      // Start playing
      oscillator.start(0);

      // Slowly ramp down volume of sound
      gain.gain.exponentialRampToValueAtTime(0.00001,AUDIO_CONTEXT.currentTime + duration);

      // Resolve promise once sound is quiet
      setTimeout(resolve, duration * 1000);;
    }
  })
