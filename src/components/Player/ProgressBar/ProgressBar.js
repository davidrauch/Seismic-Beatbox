// External
import React from 'react';

// Internal
import './ProgressBar.css';

// The progress bar of the audio player interface
export default class ProgressBar extends React.Component {
  render() {
    // Only show a progress bar if we have datapoints to show
    if(!this.props.dataPoints.length) {
      return null;
    }

    // Calculate our current play progress in percent
    const progress = calculatePercentProgress(
      this.props.currentTime,
      this.props.startTime,
      this.props.endTime
    );

    // Generate points to show earthquakes
    const points = this.props.dataPoints.map((dataPoint, index) => (
      <div
        key={'point' + index} // Required by React because this is a list
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

// Calculates the position (in percent) of currentTime within the (startTime, endTime) period
const calculatePercentProgress = (currentTime, startTime, endTime) => {
  const duration = endTime - startTime;
  const progress = currentTime - startTime;
  return progress / duration * 100;
}
