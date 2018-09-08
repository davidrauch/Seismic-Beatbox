import initialState from '../store/initialState';
import {
  AUDIO_START,
  AUDIO_STOP,
  AUDIO_TICK,
} from '../actions/audioActions';

const AUDIO_CONTEXT = new AudioContext();

export default function audio(state = initialState, action) {

  switch(action.type) {
    case AUDIO_START:
      //console.log("Started");
      return {
        ...state.audio,
        position: 0,
        isPlaying: true,
      }
    case AUDIO_STOP:
      //console.log("Stopped");
      return {
        ...state.audio,
        position: 0,
        isPlaying: false,
      }
    case AUDIO_TICK:
      if(!state.audio.isPlaying) {
        return state.audio;
      }

      //console.log(`Tick ${state.audio.position}`);
      if(state.audio.position >= state.geodata.length) {
        return {
          ...state.audio,
          position: 0,
          isPlaying: false,
        }
      } else {
        playSound(Math.max(40, state.geodata[state.audio.position].height - 500));
        return {
          ...state.audio,
          position: state.audio.position + 1,
        }
      }
    default:
      return state.audio;
  }
}

/*const playGeodata = async geodata => {
  const noteFrequencies = [261.6, 277.2, 293.7, 311.1, 329.6, 349.2, 370.0, 392.0, 415.3, 440.0, 466.2, 493.9]

  for(let item of geodata) {
    await playSound(context, Math.max(40, item.height - 500));
  }
}*/

function playSound(frequency, duration = 0.4, type = 'sine'){
  return new Promise((resolve, reject) => {
    var o=AUDIO_CONTEXT.createOscillator()
    var g=AUDIO_CONTEXT.createGain()
    o.type=type
    o.connect(g)
    o.frequency.value=frequency
    g.connect(AUDIO_CONTEXT.destination)
    o.start(0)
    g.gain.exponentialRampToValueAtTime(0.00001,AUDIO_CONTEXT.currentTime + duration)
    setTimeout(resolve, duration * 1000);
  })
}
