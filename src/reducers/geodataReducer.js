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
      return parseGeodata(action.data);
    default:
      return state.geodata;
  }
}


const parseGeodata = geodata =>
  geodata.features
    .map(item => {
      if(item.type !== 'Feature' || item.properties.type !== 'earthquake') {
        return null;
      }
      return {
        height: 1000 - (item.geometry.coordinates[2] * 2),
        strength : item.properties.mag,
        time: item.properties.time
      }
    })
    .filter(item => item !== null)
    .sort((itemA, itemB) => itemA.time - itemB.time)
