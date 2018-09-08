// External
import React from 'react';

// Internal
import './Point.css';

// A Point on the Map, representing an earthquake
export default class Point extends React.Component {
  render() {
    return (
      <div
        className={'Point ' + (this.props.visible ? 'visible' : 'hidden')}
        style={{
          // Position is set in percent on the map
          left: this.props.position.left + '%',
          bottom: this.props.position.bottom + '%',

          // Height and width depend on the strength of the earthquake
          width: this.props.strength * 10 + 'px',
          height: this.props.strength * 10 + 'px',

          // Negative margins are used to ensure the point is centered at the earthquake
          marginLeft: this.props.strength * -5 + 'px',
          marginTop: this.props.strength * -5 + 'px',

          // Make the point round with border radius
          borderRadius: this.props.strength * 5 + 'px',
        }} />
    );
  }
}
