import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as audioActions from '../../actions/audioActions';
import './Map.css';
import earth from './mercator.svg';


class Map extends React.Component {

  render() {
    const points = this.props.geodata.dataPoints
      //.filter(dataPoint => dataPoint.time === this.props.audio.time)
      .map((dataPoint, index) => (
        <div
          key={'point' + index}
          className={'point ' + (dataPoint.time === this.props.audio.time ? 'visible' : 'hidden')}
          style={{
            left: dataPoint.position.left + '%',
            bottom: dataPoint.position.bottom + '%',
          }} />
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
