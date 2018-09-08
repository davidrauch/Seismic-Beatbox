import initialState from '../store/initialState';
import geodataReducer from './geodataReducer';
import audioReducer from './audioReducer';

export default (state = initialState, action) => ({
  ...state,
  audio: audioReducer(state, action),
  geodata: geodataReducer(state, action),
});
