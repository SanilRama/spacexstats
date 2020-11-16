import React, { PureComponent } from "react";

// Styles
import "./SimpleLineChart.scss";

// Recharts
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

// const data = [
//   {
//     name: "Page A",
//     pv: 2400,
//   },
//   {
//     name: "Page B",
//     pv: 1398,
//   },
//   {
//     name: "Page C",
//     pv: 9800,
//   },
//   {
//     name: "Page D",
//     pv: 3908,
//   },
//   {
//     name: "Page E",
//     pv: 4800,
//   },
//   {
//     name: "Page F",
//     pv: 3800,
//   },
//   {
//     name: "Page G",
//     pv: 4300,
//   },
// ];

const CustomTooltip = ({ active, payload, label }) => {
  if (active) {
    return (
      <div className="custom-tooltip">
        <p className="label">{`${label} : ${payload[0].value}`}</p>
      </div>
    );
  }

  return null;
};

export default class SimpleLineChart extends PureComponent {
  render() {
    return (
      <ResponsiveContainer width="100%" minHeight={350} minWidth={340}>
        <LineChart
          data={this.props.data}
          margin={{
            top: 5,
            right: 20,
            left: -20,
            bottom: 5,
          }}
        >
          <CartesianGrid stroke="#6C757D" strokeDasharray="3 3" />
          <XAxis dataKey={this.props.XAxis} />
          <YAxis />
          <Tooltip content={<CustomTooltip />} />
          <Legend wrapperStyle={{ left: 0, paddingTop: "10px" }} />
          <Line
            name={this.props.legend}
            type="monotone"
            dataKey={this.props.yAxis}
            label="banana tester"
            stroke="#8884d8"
            activeDot={{ r: 8 }}
          />
        </LineChart>
      </ResponsiveContainer>
    );
  }
}
