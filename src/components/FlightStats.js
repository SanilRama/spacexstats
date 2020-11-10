import React, { Component } from "react";

// Components
import SimpleLineChart from "../charts/SimpleLineChart.js";

// Styles and Icons
import "./styles/FlightStats.scss";

class FlightStats extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <div className="card-section">
        <h5>Flight Statistics</h5>
        <SimpleLineChart />
      </div>
    );
  }
}

export default FlightStats;
