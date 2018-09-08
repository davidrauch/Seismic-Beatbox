import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as audioActions from '../../actions/audioActions';
import './Player.css';
import ProgressBar from './ProgressBar/ProgressBar';
import {
  Button,
  ICON_PLAY,
  ICON_STOP,
} from './Button/Button';

class Player extends React.Component {

  render() {
    return (
      <div className="Player">
        <Button icon={ICON_PLAY} onClick={this.props.audioActions.audioStart} />
        <Button icon={ICON_STOP} onClick={this.props.audioActions.audioStop} />
        <ProgressBar
          position={this.props.audio.position}
          dataPoints={this.props.geodata}
        />
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
)(Player);
