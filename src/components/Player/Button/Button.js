import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faPlayCircle,
  faStopCircle,
} from '@fortawesome/free-solid-svg-icons';
import './Button.css';

export const ICON_PLAY = faPlayCircle;
export const ICON_STOP = faStopCircle;

export class Button extends React.Component {
  render() {
    return (
      <a className="Button" onClick={this.props.onClick}>
        <FontAwesomeIcon className="icon" icon={this.props.icon} size="2x"/>
      </a>
    );
  }
}
