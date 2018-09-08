export const REQUEST_DATA = "GEODATA_REQUEST_DATA";
export const requestData = () => ({
  type: REQUEST_DATA
});

export const RECEIVE_DATA = "GEODATA_RECEIVE_DATA";
export const receiveData = (data) => ({
  type: RECEIVE_DATA,
  data
});

export function fetchData() {
  return dispatch => {
    dispatch(requestData())
    return fetch('https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_day.geojson')
      .then(response => response.json())
      .then(json => dispatch(receiveData(json)))
  }
}
