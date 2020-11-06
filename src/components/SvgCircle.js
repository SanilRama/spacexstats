import React from "react";

function SvgCircle(props) {
  const { className, done, max, radius, stroke, strokeWidth } = props;
  const size = (radius + strokeWidth) * 2;
  const length = Math.ceil(2 * radius * Math.PI);
  const remainingLength =
    length - Math.ceil(2 * radius * Math.PI) * (done / max);
  return (
    <svg
      className={className}
      width={size}
      height={size}
      viewBox={`0 0 ${size} ${size}`}
      xmlns="http://www.w3.org/2000/svg"
    >
      <g>
        <circle
          className="circle"
          r={radius}
          cx={radius + strokeWidth}
          cy={radius + strokeWidth}
          stroke={stroke}
          strokeDasharray={length}
          strokeDashoffset={remainingLength}
          strokeLinecap="round"
          strokeWidth={strokeWidth}
          fill="none"
        />
        <circle
          className="circle--bg"
          r={radius}
          cx={radius + strokeWidth}
          cy={radius + strokeWidth}
          stroke="rgba(255, 255, 255, .1)"
          strokeLinecap="round"
          strokeWidth={strokeWidth}
          fill="none"
        />
      </g>
    </svg>
  );
}

SvgCircle.defaultProps = {
  done: 0,
  max: 24,
  radius: 24,
  stroke: "#d32f2f",
  strokeWidth: 3,
};

export default SvgCircle;
