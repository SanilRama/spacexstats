import React, { Component } from "react";
import { gql } from "apollo-boost";
import { graphql } from "react-apollo";

// Components
import SimpleLineChart from "../../charts/SimpleLineChart.js";

// Styles and Icons
import "../styles/FlightStats.scss";

// GraophQL Query
const getPastLaunchesQuery = gql`
  {
    past_launches {
      mission_name
      flight_number
      launch_success
      launch_date_utc
      rocket {
        rocket_name
      }
    }
  }
`;
class AllTime extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    var data = this.props.data;

    if (data.loading === true) {
      console.log("flight stats still loading");
    } else {
      console.log("flight stats loaded", data);

      // Defining variables
      var dates = []; // array to save dates from query
      var counts = {};
      var yearArray = [];
      var yearCounts = [];

      // Filter dates by selected vehicle
      if (this.props.vehicleType === undefined) {
        dates = data.past_launches.map((item) => item.launch_date_utc);
      } else if (this.props.vehicleType === "Falcon 9") {
        dates = data.past_launches
          .map((item) => item)
          .filter((item) => item.rocket.rocket_name === "Falcon 9")
          .map((item) => item.launch_date_utc);
      } else if (this.props.vehicleType === "Falcon Heavy") {
        dates = data.past_launches
          .map((item) => item)
          .filter((item) => item.rocket.rocket_name === "Falcon Heavy")
          .map((item) => item.launch_date_utc);
      }

      // Extract the year from dates
      const year = dates
        .map((item) => new Date(item))
        .filter((item) => item.getFullYear() > 1970)
        .map((item) =>
          item.toLocaleString("en-US", {
            year: "numeric",
          })
        );
      console.log("year", year);

      // Count the number of launches per year
      year.forEach(function (x) {
        counts[x] = (counts[x] || 0) + 1;
      });

      // Create 2 separate array with years and respective counts
      yearArray = Object.keys(counts);
      yearCounts = Object.values(counts);
      console.log("2 arrays", yearArray, yearCounts);

      // Format data for Recharts (array of objects format)
      var chartData = [];
      var len = yearArray.length;
      for (var i = 0; i < len; i++) {
        chartData.push({
          year: yearArray[i],
          number: yearCounts[i], //cumulative
          number2: yearCounts[i - 1], // testing.......
        });
      }
      console.log("array", chartData);
    }
    return (
      <div className="d-flex justify-content-center">
        {data.loading ? (
          <div className="d-flex justify-content-center align-items-center flex-column">
            <div className="spinner-border" role="status"></div>
            <div className="pt-3 text-secondary">Loading chart...</div>
          </div>
        ) : (
          <SimpleLineChart
            data={chartData}
            XAxis="year"
            yAxis="number"
            test="number2"
            legend="Number of Flights p/ year"
          />
        )}
      </div>
    );
  }
}

export default graphql(getPastLaunchesQuery)(AllTime);
