import CONFIG from '../config';

// Action: New data was requested from the API
export const REQUEST_DATA = "GEODATA_REQUEST_DATA";
export const requestData = () => ({
  type: REQUEST_DATA
});

// Action: New data was received from the API
export const RECEIVE_DATA = "GEODATA_RECEIVE_DATA";
export const receiveData = (data) => ({
  type: RECEIVE_DATA,
  data
});

// Action: The data was updated
export const UPDATE_DATA = "GEODATA_UPDATE_DATA";
export const updateData = () => ({
  type: UPDATE_DATA
});

// Action: New data should be loaded
export const fetchData = () => dispatch => {
  // Dispatch request action
  dispatch(requestData())

  // Load data from network, return promise
  return fetch(CONFIG.GEODATA_API_ENDPOINT)
    .then(response => response.json()) // Parse returned JSON
    .then(json => dispatch(receiveData(json))) // Dispatch receive action with new data
    .then(() => dispatch(updateData())) // Dispatch update action
}
