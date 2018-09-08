import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as audioActions from '../../actions/audioActions';
import './Map.css';
import earth from './earth.svg';


class Map extends React.Component {

  render() {
    return (
      <div className="Map">
        <img src={earth} className="earth" alt="earth" />
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    audio: state.audio,
    geodata: state.geodata,
  }
}

function mapDispatchToProps(dispatch) {
  return {
    audioActions: bindActionCreators(audioActions, dispatch)
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Map);
