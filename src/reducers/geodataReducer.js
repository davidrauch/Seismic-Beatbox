// Internal
import initialState from '../store/initialState';
import {
  RECEIVE_DATA
} from '../actions/geodataActions'

// The geodata reducer
export default function geodata(state = initialState, action) {
  switch(action.type) {
    case RECEIVE_DATA:
      // When data is received, add it to the existing datapoints
      // Parse new points (also filters out all points that are too old)
      const newDataPoints = parseDataPoints(action.data, state.geodata.exactEndTime);
      console.log(newDataPoints.length + ' new datapoints found');

      // Insert new datapoints
      const dataPoints = [...state.geodata.dataPoints, ...newDataPoints];

      // Extract some metadata if we have points and set new state
      if(dataPoints.length) {
        return {
          ...state.geodata,
          startTime: dataPoints[0].time,
          endTime: dataPoints[dataPoints.length - 1].time,
          exactEndTime: dataPoints[dataPoints.length - 1].exactTime,
          dataPoints: dataPoints,
        }
      } else {
        return state.geodata;
      }
    default:
      return state.geodata;
  }
}

// Parses and filters datapoints to only include new points and relevant properties
const parseDataPoints = (geodata, lastTime = 0) =>
  geodata.features
    .map(item => {
      if(item.type !== 'Feature'
         || item.properties.type !== 'earthquake'
         || item.properties.time <= lastTime) {
        return null;
      }
      return {
        id: item.id,
        height: 1000 - processDepth(item.geometry.coordinates[2]),
        strength : item.properties.mag,
        time: processTime(item.properties.time),
        exactTime: item.properties.time,
        position: processPosition(item.geometry.coordinates)
      }
    })
    .filter(item => item !== null)
    .sort((itemA, itemB) => itemA.time - itemB.time)

// Processes depth data from the API to the desired format
const processDepth = depth =>
  // Force depth in range 0 - 50, then stretch to range 0 - 1000
  Math.max(0, Math.min(50, depth)) * 20;

// Processes time data from the API to the desired format
const processTime = time => {
  // Round time into 5 minute intervals
  const msInFiveMinutes = 5 * 60 * 1000;
  return Math.ceil(time / msInFiveMinutes) * msInFiveMinutes
}

// Processes position data from the API to the desired format
const processPosition = coordinates => {
  // Transform from longitude and latitude to x and y coordinates on a mercator projection
  // See https://en.wikipedia.org/wiki/Mercator_projection#Derivation_of_the_Mercator_projection
  let x = (coordinates[0] + 180) / 3.6;

  let latRad = coordinates[1] * Math.PI / 180;
  let mercN = Math.log(Math.tan((Math.PI / 4) + (latRad / 2)));
  let y = 50 + (100 * mercN / (2 * Math.PI));

  return {
    left: x,
    bottom: y
  }
}
