import React, { Component } from "react";
import { gql } from "apollo-boost";
import { graphql } from "react-apollo";

// Styles and Icons
import "./styles/MainHeader.scss";
import { FaReddit, FaTwitter, FaYoutube } from "react-icons/fa";
import Spinner from "react-bootstrap/Spinner";

// Components
import Clock from "./Clock";

const getNextLaunchQuery = gql`
  {
    next_launch {
      mission_name
      launch_date_utc
      rocket {
        rocket_name
      }
    }
  }
`;

class MainHeader extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    // Query date from next launch
    var data = this.props.data;
    if (data.loading === false) {
      // Variables to save fetched data
      let date = data.next_launch.launch_date_utc;
      var deadline = date;
      var mission_name = data.next_launch.mission_name;

      // Change format to YYYY-MM-DD
      date = new Date(date);
      var year = date.getFullYear();
      var month = date.getMonth() + 1;
      var dt = date.getDate();

      if (dt < 10) {
        dt = "0" + dt;
      }
      if (month < 10) {
        month = "0" + month;
      }

      var launch_date = dt + "-" + month + "-" + year;

      // Get hours, minutes and seconds
      var hours = date.getHours();
      console.log("hours", hours);
      var minutes = date.getMinutes();

      var launch_time = "";

      hours < 10
        ? (launch_time = "0" + hours + ":" + minutes)
        : (launch_time = hours + ":" + minutes);
    }
    return (
      <React.Fragment>
        <div className="container-fluid">
          <div className="row py-3 text-center align-items-center">
            <div className="col-xs-3 col-sm-3 col-md-3 col-lg-3">
              <div className="d-flex flex-column text-justify pl-5 launch-info-banner">
                <div>
                  Next Mission: <span> {mission_name}</span>
                </div>
                <div>
                  Date: <span>{launch_date}</span>
                </div>
                <div>
                  Time: <span>{launch_time} UTC</span>
                </div>
              </div>
            </div>
            <div className="col-xs-6 col-sm-6 col-md-6 col-lg-6 pt-5 title">
              <h1>SpaceX Stats</h1>
              <a
                href="https://www.youtube.com/channel/UCtI0Hodo5o5dUb67FeUjDeA"
                target="_blank"
                rel="noreferrer"
              >
                <span className="px-4">
                  <FaYoutube size={20} className="ic-youtube" />
                </span>
              </a>
              <a
                href="https://twitter.com/SpaceX"
                target="_blank"
                rel="noreferrer"
              >
                <span className="px-4">
                  <FaTwitter size={20} className="ic-twitter" />
                </span>
              </a>
              <a
                href="https://www.reddit.com/r/spacex/"
                target="_black"
                rel="noreferrer"
              >
                <span className="px-4">
                  <FaReddit size={20} className="ic-reddit" />
                </span>
              </a>
            </div>
            <div className="col-xs-3 col-sm-12 col-md-3 col-lg-3 pt-3 px-5">
              {data.loading ? (
                <div className="text-center">
                  Loading coundown clock...{" "}
                  <Spinner animation="border" variant="primary" size="sm" />
                </div>
              ) : (
                <Clock deadline={deadline} />
              )}
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default graphql(getNextLaunchQuery)(MainHeader);
