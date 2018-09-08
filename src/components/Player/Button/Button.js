// External
import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faPlayCircle,
  faStopCircle,
} from '@fortawesome/free-solid-svg-icons';

// Internal
import './Button.css';

// Constants for icons
export const ICON_PLAY = faPlayCircle;
export const ICON_STOP = faStopCircle;

// A Button in the audio player interface
export class Button extends React.Component {
  render() {
    return (
      <a className={['Button', this.props.enabled ? 'enabled' : 'disabled'].join(' ')}
        onClick={this.props.enabled ? this.props.onClick : null}>
        <FontAwesomeIcon className='icon' icon={this.props.icon} size='2x'/>
      </a>
    );
  }
}
