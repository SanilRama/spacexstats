import React, { Component } from "react";
import { gql } from "apollo-boost";

// Components
import AllMonthly from "./FlightStats/AllMonthly.js";
import AllYearly from "./FlightStats/AllYearly.js";

// React Bootstrap
import ButtonGroup from "react-bootstrap/ButtonGroup";
import Button from "react-bootstrap/Button";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";

// Styles and Icons
import "./styles/FlightStats.scss";

class FlightStats extends Component {
  constructor(props) {
    super(props);
    this.state = {
      rangeClick: "1", // all-1, year-2, month-3
      year: "2020", // selected year
    };

    // Binding
  }

  render() {
    // Get all years since 2006 to current year
    let yearArray = [];
    const currentYear = new Date().getFullYear();
    yearArray = Array.from(
      { length: (2006 - currentYear) / -1 + 1 },
      (_, i) => currentYear + i * -1
    );
    console.log("testing", yearArray);

    return (
      <div className="card-section">
        <h5>Flight Statistics</h5>
        <div className="container-fluid">
          <div className="row">
            <div className=" col-md-9 col-lg-9 order-xs-2 order-sm-2 order-md-1 order-lg-1  mt-5">
              {this.state.rangeClick === "1" ? (
                <AllYearly />
              ) : (
                <AllMonthly year={this.state.year} />
              )}
            </div>
            <div className=" col-md-3 col-lg-3 order-xs-1 order-sm-1 order-md-2 order-lg-2 my-5 py-3  mini-card">
              <h5>Control Panel</h5>
              <br />
              {/* RANGE SELECTION */}
              Range by:
              <ButtonGroup className="ml-2" size="sm">
                <Button
                  id="1"
                  variant="outline-light"
                  className={
                    this.state.rangeClick === "1" ? "active" : "disabled"
                  }
                  onClick={(e) => this.setState({ rangeClick: e.target.id })}
                >
                  All time
                </Button>
                <Button
                  id="2"
                  variant="outline-light"
                  className={
                    this.state.rangeClick === "2" ? "active" : "disabled"
                  }
                  onClick={(e) => this.setState({ rangeClick: e.target.id })}
                >
                  Year
                </Button>

                {/* DROPDOWN BY YEAR */}
                {this.state.rangeClick === "2" ? (
                  <DropdownButton
                    size="sm"
                    as={ButtonGroup}
                    title={`${this.state.year}`}
                    variant="outline-light"
                    id="bg-nested-dropdown"
                    onClick={(e) => this.setState({ year: e.target.innerHTML })}
                  >
                    {yearArray.map((item, index) => (
                      <Dropdown.Item key={index} eventKey="1" value={item}>
                        {item}
                      </Dropdown.Item>
                    ))}
                  </DropdownButton>
                ) : (
                  ""
                )}
              </ButtonGroup>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default FlightStats;
