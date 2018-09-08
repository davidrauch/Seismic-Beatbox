// External
import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

// Internal
import Point from './Point/Point';
import * as audioActions from '../../actions/audioActions';
import './Map.css';
import earth from './mercator.svg';

// A Map showing the world and points for earthquakes
class Map extends React.Component {
  render() {
    // Generate points
    const points = this.props.geodata.dataPoints
      .map((dataPoint, index) => (
        <Point
          key={'point' + index} // Required by React because this is a list
          visible={dataPoint.time === this.props.audio.time}
          position={dataPoint.position}
          strength={dataPoint.strength}
        />
      ));

    return (
      <div className="Map">
        <img src={earth} className="earth" alt="earth" width="100%"/>
        {points}
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
