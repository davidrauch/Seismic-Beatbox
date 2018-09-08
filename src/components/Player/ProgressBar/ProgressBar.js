import React from 'react';
import './ProgressBar.css';

export default class ProgressBar extends React.Component {

  render() {
    if(!this.props.dataPoints.length) {
      return null;
    }

    // Calculate our current time position in percent
    const progress = calculatePercentProgress(
      this.props.currentTime,
      this.props.startTime,
      this.props.endTime
    );

    const points = this.props.dataPoints.map((dataPoint, index) => (
      <div
        key={'point' + index}
        className='point'
        style={{
          left: calculatePercentProgress(
            dataPoint.time,
            this.props.startTime,
            this.props.endTime
          ) + '%',
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

const calculatePercentProgress = (currentTime, startTime, endTime) => {
  const duration = endTime - startTime;
  const progress = currentTime - startTime;
  return progress / duration * 100;
}
