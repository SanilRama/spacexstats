import React, { Component } from "react";
import { gql } from "apollo-boost";
import { graphql } from "react-apollo";

// Components
import SimpleLineChart from "../../charts/SimpleLineChart";

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
class AllMonthly extends Component {
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
      var dYear = this.props.year; // current year (e.g "2020")
      var dates = []; // array to save dates from query
      var counts = {};
      var monthArray = [];
      var monthCounts = [];
      dates = data.past_launches.map((item) => item.launch_date_utc);

      // Extract the month from dates
      const month = dates
        .map((item) => new Date(item))
        .filter((item) => item.getFullYear() > 1970)
        .map((item) =>
          item.toLocaleString("en-US", {
            month: "short",
            year: "numeric",
          })
        )
        .filter((name) => name.includes(dYear)) // filters by month of selected year
        .map((item) => item.substr(0, 3)); // array type: ["Jan 2020", "Feb 2020",...] -> extracts only "jan", "feb"
      console.log("month", month);

      // Count the number of launches per month
      month.forEach(function (x) {
        counts[x] = (counts[x] || 0) + 1;
      });

      // Create 2 separate array with months and respective counts
      monthArray = Object.keys(counts);
      monthCounts = Object.values(counts);
      console.log("2 arrays", monthArray, monthCounts);

      // Format data for Recharts (array of objects format)
      var chartData = [];
      var len = monthArray.length;
      for (var i = 0; i < len; i++) {
        chartData.push({
          year: monthArray[i],
          number: monthCounts[i],
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
            legend={`Number of Flights p/ month in ${dYear}`}
          />
        )}
      </div>
    );
  }
}

export default graphql(getPastLaunchesQuery)(AllMonthly);
