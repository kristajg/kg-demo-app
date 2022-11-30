import React, { Component } from 'react';
import Timer from 'react-timer-wrapper';
import Timecode from 'react-timecode';

class DurationCounter extends Component {
  render() {
    const { isActive } = this.props;
    return (
      <Timer
        active={isActive}
        onFinish={this.onTimerFinish}
        onStart={this.onTimerStart}
        onStop={this.onTimerStop}
        onTimeUpdate={this.onTimerTimeUpdate}
        duration={null}
      >
        <Timecode />
      </Timer>
    );
  }
}

export default DurationCounter;

