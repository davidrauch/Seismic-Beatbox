import initialState from '../store/initialState';
import {
  REQUEST_DATA,
  RECEIVE_DATA
} from '../actions/geodataActions'

export default function geodata(state = initialState, action) {
  switch(action.type) {
    case REQUEST_DATA:
      return state.geodata;
    case RECEIVE_DATA:
      const dataPoints = parseDataPoints(action.data);
      if(dataPoints.length) {
        return {
          ...state.geodata,
          startTime: dataPoints[0].time,
          endTime: dataPoints[dataPoints.length - 1].time,
          dataPoints: dataPoints,
        }
      } else {
        return state.geodata;
      }
    default:
      return state.geodata;
  }
}


const parseDataPoints = geodata =>
  geodata.features
    .map(item => {
      if(item.type !== 'Feature' || item.properties.type !== 'earthquake') {
        return null;
      }
      return {
        height: 1000 - sanitizeDepth(item.geometry.coordinates[2]),
        strength : item.properties.mag,
        time: sanitizeTime(item.properties.time)
      }
    })
    .filter(item => item !== null)
    .sort((itemA, itemB) => itemA.time - itemB.time)

const sanitizeDepth = depth =>
  // Force depth in range 0 - 50, then stretch to range 0 - 1000
  Math.max(0, Math.min(50, depth)) * 20;

const sanitizeTime = time => {
  // Round time into 5 minute intervals
  const msInFiveMinutes = 5 * 60 * 1000;
  return Math.round(time / msInFiveMinutes) * msInFiveMinutes
}
