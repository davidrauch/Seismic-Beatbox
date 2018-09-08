import initialState from '../store/initialState';
import {
  AUDIO_START,
  AUDIO_STOP,
  AUDIO_TICK,
} from '../actions/audioActions';
import {
  UPDATE_DATA
} from '../actions/geodataActions'

const AUDIO_CONTEXT = new AudioContext();

export default function audio(state = initialState, action) {

  switch(action.type) {
    case AUDIO_START:
      //console.log("Started");
      return {
        ...state.audio,
        index: 0,
        time: state.geodata.startTime,
        isPlaying: true,
      }
    case AUDIO_STOP:
      //console.log("Stopped");
      return {
        ...state.audio,
        index: 0,
        time: state.geodata.startTime,
        isPlaying: false,
      }
    case AUDIO_TICK:
      if(!state.audio.isPlaying) {
        return state.audio;
      }

      //console.log(`Tick ${state.audio.position}`);
      if(state.audio.index >= state.geodata.dataPoints.length) {
        return {
          ...state.audio,
          index: 0,
          time: state.geodata.startTime,
          isPlaying: false,
        }
      } else {
        let newIndex = state.audio.index;

        // Play sounds for all earthquakes with the current time
        while(state.geodata.dataPoints[newIndex]
              && state.geodata.dataPoints[newIndex].time === state.audio.time) {
          playDataPoint(state.geodata.dataPoints[newIndex]);
          newIndex++;
        }

        return {
          ...state.audio,
          index: newIndex,
          time: state.audio.time + (5 * 60 * 1000),
        }
      }
    case UPDATE_DATA:
      return {
        ...state.audio,
        index: 0,
        time: state.geodata.startTime,
      }
    default:
      return state.audio;
  }
}


const playDataPoint = dataPoint =>
  playSound(Math.max(40, dataPoint.height - 500))

const playSound = (frequency, duration = 0.4, type = 'sine') =>
  new Promise((resolve, reject) => {
    let oscillator = AUDIO_CONTEXT.createOscillator();
    let gain = AUDIO_CONTEXT.createGain();
    oscillator.type = type;
    oscillator.connect(gain);
    oscillator.frequency.value = frequency;
    gain.connect(AUDIO_CONTEXT.destination);
    oscillator.start(0);
    gain.gain.exponentialRampToValueAtTime(0.00001,AUDIO_CONTEXT.currentTime + duration);
    setTimeout(resolve, duration * 1000);;
  })
