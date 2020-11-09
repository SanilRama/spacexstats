import React, { Component } from "react";
import { gql } from "apollo-boost";
import { graphql } from "react-apollo";

// Styles and Icons
import "./styles/SummaryStats.scss";

const getPastLaunchesQuery = gql`
  {
    past_launches {
      mission_name
      flight_number
      launch_success
      rocket {
        rocket_name
      }
    }
  }
`;

class SummaryStats extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fields: [
        "total missions",
        "falcon 1 missions",
        "falcon 9 missions",
        "falcon heavy missions",
      ],
    };

    // Binding
    this.displayStats = this.displayStats.bind(this);
  }

  displayStats(id) {
    var data = this.props.data;

    var resArray = [];
    var perArray = []; // percentage array

    if (data.loading === true) {
      return "Loading value";
    } else {
      // Total missions
      let totalSuccess = data.past_launches.filter(
        (past_launch) => past_launch.launch_success === true
      ).length;
      let total = data.past_launches.length;
      let p1 = ((totalSuccess / total) * 100).toFixed(2);
      resArray.push(totalSuccess + "/ " + total);
      perArray.push(p1);

      // Falcon 1 missions
      let f1TotalSuccess = data.past_launches.filter(
        (past_launch) =>
          past_launch.rocket.rocket_name === "Falcon 1" &&
          past_launch.launch_success === true
      ).length;
      let f1Total = data.past_launches.filter(
        (past_launch) => past_launch.rocket.rocket_name === "Falcon 1"
      ).length;
      let p2 = ((f1TotalSuccess / f1Total) * 100).toFixed(2);
      resArray.push(f1TotalSuccess + "/ " + f1Total);
      perArray.push(p2);

      // Falcon 9 missions
      let f9TotalSuccess = data.past_launches.filter(
        (past_launch) =>
          past_launch.rocket.rocket_name === "Falcon 9" &&
          past_launch.launch_success === true
      ).length;
      let f9Total = data.past_launches.filter(
        (past_launch) => past_launch.rocket.rocket_name === "Falcon 9"
      ).length;
      let p3 = ((f9TotalSuccess / f9Total) * 100).toFixed(2);
      resArray.push(f9TotalSuccess + "/ " + f9Total);
      perArray.push(p3);

      // Falcon Heavy missions
      let FHTotalSuccess = data.past_launches.filter(
        (past_launch) =>
          past_launch.rocket.rocket_name === "Falcon Heavy" &&
          past_launch.launch_success === true
      ).length;
      let FHTotal = data.past_launches.filter(
        (past_launch) => past_launch.rocket.rocket_name === "Falcon Heavy"
      ).length;
      let p4 = ((FHTotalSuccess / FHTotal) * 100).toFixed(2);
      resArray.push(FHTotalSuccess + "/ " + FHTotal);
      perArray.push(p4);

      return (
        <span className="">
          {resArray[id]}
          <span className="text-secondary"> ({perArray[id]}%)</span>
        </span>
      );
    }
  }
  render() {
    return (
      <div className="card-section">
        <h5>Statistics Summary:</h5>
        <div className="container-fluid ">
          <div className="d-flex flex-wrap justify-content-between py-3">
            <div className="flex-fill summary-list p-0">
              {this.state.fields.map((item, index) => {
                return (
                  <div
                    key={index}
                    className="text-capitalize border-bottom border-dark py-1"
                  >
                    <span>{item}</span>
                  </div>
                );
              })}
            </div>
            <div className="summary-list text-right p-0">
              {this.state.fields.map((item, index) => {
                return (
                  <div
                    key={item}
                    className="text-capitalize border-bottom border-dark py-1"
                  >
                    {/* <li key={index}>hello there</li> */}
                    {this.displayStats(index)}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default graphql(getPastLaunchesQuery)(SummaryStats);
