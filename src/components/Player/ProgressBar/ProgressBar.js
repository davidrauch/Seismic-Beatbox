import React from 'react';
import './ProgressBar.css';

export default class ProgressBar extends React.Component {

  render() {
    if(!this.props.dataPoints.length) {
      return null;
    }

    const progress = this.props.position / this.props.dataPoints.length * 100;

    const points = this.props.dataPoints.map((dataPoint, index) => (
      <div
        key={'point' + index}
        className='point'
        style={{
          left: index / this.props.dataPoints.length * 100 + '%',
          bottom: dataPoint.height / 12 + '%'
        }} />
    ));

    return (
      <div className="ProgressBar">
        {points}
        <div className="handle" style={{left: progress + '%'}} />
      </div>
    );
  }
}
