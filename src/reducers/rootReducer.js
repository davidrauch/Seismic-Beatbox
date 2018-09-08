import initialState from '../store/initialState';
import geodataReducer from './geodataReducer';
import audioReducer from './audioReducer';

export default (state = initialState, action) => ({
  ...state,
  geodata: geodataReducer(state, action),
  audio: audioReducer(state, action),
});
