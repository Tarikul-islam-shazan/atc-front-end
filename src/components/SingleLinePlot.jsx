import React, { useEffect, useState, useRef } from "react";
import * as d3 from "d3";
import {
  PiArrowFatLeftDuotone,
  PiArrowFatRightDuotone,
  PiArrowFatUpDuotone,
  PiArrowFatDownDuotone,
} from "react-icons/pi";

const SingleLinePlot = ({
  data,
  data2,
  width = window.innerWidth,
  height = 400,
  marginTop = 10,
  marginRight = 30,
  marginBottom = 30,
  marginLeft = 60,
  status,
  iconStatus,
}) => {
  const gx = useRef();
  const gy = useRef();
  const gx1 = useRef();

  const GetKeyIcon = () => {
    if (iconStatus === -1) return <></>;

    if (iconStatus === 0)
      return <PiArrowFatLeftDuotone size={26} color="gray" />;
    if (iconStatus === 1)
      return <PiArrowFatRightDuotone size={26} color="gray" />;
    if (iconStatus === 2) return <PiArrowFatUpDuotone size={26} color="gray" />;
    if (iconStatus === 3)
      return <PiArrowFatDownDuotone size={26} color="gray" />;
  };

  const curve1 = [
    [marginLeft + 200, height - 300],
    [marginLeft + 900, height - 270],
    [width - marginRight, height - marginBottom],
  ];
  const curve2 = [
    [marginLeft, height - 250],
    [marginLeft + 900, height - 220],
    [width - marginRight, height - marginBottom],
  ];
  const curve3 = [
    [marginLeft + 200, height - 200],
    [marginLeft + 900, height - 170],
    [width - marginRight, height - marginBottom],
  ];

  const curve4 = [
    [marginLeft + 200, height - 160],
    [marginLeft + 900, height - 170],
    [width - marginRight, marginTop],
  ];
  const curve5 = [
    [marginLeft, height - 220],
    [marginLeft + 900, height - 220],
    [width - marginRight, marginTop],
  ];
  const curve6 = [
    [marginLeft + 200, height - 250],
    [marginLeft + 900, height - 270],
    [width - marginRight, marginTop],
  ];
  //const curve5 = [[marginLeft, height-250],[marginLeft+900, height-220],[width-marginRight, height - marginBottom]];
  //const curve6 = [[marginLeft+200, height-200],[marginLeft+900, height-170],[width-marginRight, height - marginBottom]];

  const x = d3
    .scaleLinear()
    .domain([0, 1000])
    .range([marginLeft, width - marginRight]);

  const y = d3
    .scaleLinear()
    .domain([
      0,
      d3.max(data, function (d) {
        return d.y;
      }),
    ])
    .range([height - marginBottom, marginTop]);

  const y_y = d3.scaleLinear().domain([0, 1000]).range([0, 1000]);
  const x_x = d3.scaleLinear().domain([0, 1000]).range([0, 1000]);

  const baseGraphExtra = d3
    .line()
    .x(function (d) {
      return x_x(d.x);
    })
    .y(function (d) {
      return y_y(d.y);
    });

  const y1 = d3
    .scaleLinear()
    .domain([
      0,
      d3.max(data2, function (d) {
        return d.y;
      }),
    ])
    .range([height - marginBottom, marginTop]);
  //d3.scaleLinear(d3.extent(data), [height - marginBottom, marginTop]);

  const line = d3.line().curve(d3.curveNatural);

  useEffect(
    () => void d3.select(gx.current).call(d3.axisBottom(x).tickSize(0)),
    [gx, x]
  );

  const baseGraph = d3
    .line()
    .x(function (d) {
      return x(d.x);
    })
    .y(function (d) {
      return y(d.y);
    });

  const baseGraph2 = d3
    .line()
    .x(function (d) {
      return x(d.x);
    })
    .y(function (d) {
      return y1(d.y);
    });

  const getValueLastObject = (jsonArray) => {
    const lastIndex = jsonArray.length - 1;
    const lastObject = jsonArray[lastIndex];

    return lastObject;
  };

  const getValueColor = (jsonArray) => {
    const lastIndex = jsonArray.length - 1;
    const lastObject = jsonArray[lastIndex];
    return lastObject.y < 200 ? "green" : "red";
  };

  return (
    <svg width={width} height={height} id="my-svg">
      { status !== "ATC" && <g
        ref={gx}
        color="grey"
        transform={`translate(0,${height - marginBottom})`}
      />}
      <g transform={`translate(${marginLeft},0)`} />
      <g fill="white" stroke="currentColor" strokeWidth="1.5">
        { status === "ATC" &&<line color='grey'  x1={marginLeft} y1={marginTop} x2={width - marginRight} y2={marginTop}/>}
        <line
          color="grey"
          x1={marginLeft}
          y1={marginTop}
          x2={marginLeft}
          y2={height - marginBottom}
        />
        <line
          color="grey"
          opacity="0.4"
          x1={x(25)}
          y1={marginTop}
          x2={x(25)}
          y2={height - marginBottom}
        />
        <line
          color="grey"
          opacity="0.4"
          x1={x(50)}
          y1={marginTop}
          x2={x(50)}
          y2={height - marginBottom}
        />
        <line
          color="grey"
          opacity="0.4"
          x1={x(75)}
          y1={marginTop}
          x2={x(75)}
          y2={height - marginBottom}
        />
        <line
          color="grey"
          x1={x(100)}
          y1={marginTop}
          x2={x(100)}
          y2={height - marginBottom}
        />

        <line
          color="grey"
          opacity="0.4"
          x1={x(125)}
          y1={marginTop}
          x2={x(125)}
          y2={height - marginBottom}
        />
        <line
          color="grey"
          opacity="0.4"
          x1={x(150)}
          y1={marginTop}
          x2={x(150)}
          y2={height - marginBottom}
        />
        <line
          color="grey"
          opacity="0.4"
          x1={x(175)}
          y1={marginTop}
          x2={x(175)}
          y2={height - marginBottom}
        />
        <line
          color="grey"
          x1={x(200)}
          y1={marginTop}
          x2={x(200)}
          y2={height - marginBottom}
        />

        <line
          color="grey"
          opacity="0.4"
          x1={x(225)}
          y1={marginTop}
          x2={x(225)}
          y2={height - marginBottom}
        />
        <line
          color="grey"
          opacity="0.4"
          x1={x(250)}
          y1={marginTop}
          x2={x(250)}
          y2={height - marginBottom}
        />
        <line
          color="grey"
          opacity="0.4"
          x1={x(275)}
          y1={marginTop}
          x2={x(275)}
          y2={height - marginBottom}
        />
        <line
          color="grey"
          x1={x(300)}
          y1={marginTop}
          x2={x(300)}
          y2={height - marginBottom}
        />

        <line
          color="grey"
          opacity="0.4"
          x1={x(400)}
          y1={marginTop}
          x2={x(400)}
          y2={height - marginBottom}
        />
        <line
          color="grey"
          opacity="0.4"
          x1={x(500)}
          y1={marginTop}
          x2={x(500)}
          y2={height - marginBottom}
        />
        <line
          color="grey"
          opacity="0.4"
          x1={x(600)}
          y1={marginTop}
          x2={x(600)}
          y2={height - marginBottom}
        />
        <line
          color="grey"
          opacity="0.4"
          x1={x(700)}
          y1={marginTop}
          x2={x(700)}
          y2={height - marginBottom}
        />
        <line
          color="grey"
          opacity="0.4"
          x1={x(800)}
          y1={marginTop}
          x2={x(800)}
          y2={height - marginBottom}
        />
        <line
          color="grey"
          opacity="0.4"
          x1={x(900)}
          y1={marginTop}
          x2={x(900)}
          y2={height - marginBottom}
        />
        <line
          color="grey"
          opacity="0.4"
          x1={x(1000)}
          y1={marginTop}
          x2={x(1000)}
          y2={height - marginBottom}
        />
      </g>
      <path
        fill="none"
        color="grey"
        stroke="currentColor"
        strokeWidth="1.5"
        d={line(status === "ATC" ? curve4 : curve1)}
      />
      <path
        fill="none"
        color="grey"
        stroke="currentColor"
        strokeWidth="1.5"
        d={line(status === "ATC" ? curve5 : curve2)}
      />

      {data.length > 0 && (
        <text
          x={width - marginRight - 80} // Adjust the X-coordinate to align with the top-right corner
          y={marginTop + 10} // Adjust the Y-coordinate to align with the top margin
          fill={getValueColor(data)} // Text color
          fontSize="16" // Font size
          fontWeight="bold" // Font weight
        >
          {getValueLastObject(data).x}-{getValueLastObject(data).y}
        </text>
      )}

      {data2.length > 0 && (
        <text
          x={width - marginRight - 80} // Adjust the X-coordinate to align with the top-right corner
          y={marginTop + 10} // Adjust the Y-coordinate to align with the top margin
          fill={getValueColor(data2)} // Text color
          fontSize="16" // Font size
          fontWeight="bold" // Font weight
        >
          {getValueLastObject(data2).x}-{getValueLastObject(data2).y}
        </text>
      )}

      <GetKeyIcon />

      <path
        fill="none"
        color="grey"
        stroke="currentColor"
        strokeWidth="1.5"
        d={line(status === "ATC" ? curve6 : curve3)}
      />

      <path
        fill="none"
        stroke="steelblue"
        strokeWidth="1.5"
        d={baseGraphExtra(status === "ATC" ? data2 : data)}
      />
    </svg>
  );
};

export default SingleLinePlot;