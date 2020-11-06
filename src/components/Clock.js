import React, { Component } from "react";

// Components
import SvgCircle from "./SvgCircle";

const zerofill = (num) => (num < 10 && num >= 0 ? `0${num}` : num);

class Clock extends Component {
  constructor(props) {
    super(props);
    this.state = {
      days: 0,
      hours: 0,
      minutes: 0,
      seconds: 0,
    };
  }

  componentDidMount() {
    this.timerId = setInterval(
      () => this.getTimeUntil(this.props.deadline),
      1000
    );
  }
  componentWillUnmount() {
    clearInterval(this.timerId);
  }
  getTimeUntil(deadline) {
    const time = Date.parse(deadline) - Date.parse(new Date());
    const seconds = Math.floor((time / 1000) % 60);
    const minutes = Math.floor((time / 1000 / 60) % 60);
    const hours = Math.floor((time / (1000 * 60 * 60)) % 24);
    const days = Math.floor(time / (1000 * 60 * 60 * 24));

    this.setState({ days, hours, minutes, seconds });
  }
  render() {
    return (
      <div className="clock">
        <div className="clock__display">
          <SvgCircle
            className="clock__circle"
            max={365}
            done={this.state.days}
          />
          <div className="clock__text clock__text--days text-center">
            <span className="clock__amount">{zerofill(this.state.days)}</span>
            <span className="clock__unit"> d</span>
          </div>
        </div>
        <div className="clock__display">
          <SvgCircle max={24} done={this.state.hours} />
          <div className="clock__text clock__text--hours text-center">
            <span className="clock__amount">{zerofill(this.state.hours)}</span>
            <span className="clock__unit"> hrs</span>
          </div>
        </div>
        <div className="clock__display">
          <SvgCircle max={60} done={this.state.minutes} />
          <div className="clock__text clock__text--minutes text-center">
            <span className="clock__amount">
              {zerofill(this.state.minutes)}
            </span>
            <span className="clock__unit"> min</span>
          </div>
        </div>
        <div className="clock__display">
          <SvgCircle max={60} done={this.state.seconds} />
          <div className="clock__text clock__text--seconds text-center">
            <span className="clock__amount">
              {zerofill(this.state.seconds)}
            </span>
            <span className="clock__unit"> sec</span>
          </div>
        </div>
      </div>
    );
  }
}

export default Clock;
