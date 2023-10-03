import React, { useRef, useEffect, useState } from "react";
import * as d3 from "d3";
import io from "socket.io-client";
import { PiArrowFatLeftDuotone, PiArrowFatRightDuotone } from "react-icons/pi";
import { SOCKET_SERVER_URL } from "../environment/environment";

const socket = io.connect(SOCKET_SERVER_URL);

export default function ATCChart({
  data,
  width = window.innerWidth,
  height = 400,
  marginTop = 10,
  marginRight = 30,
  marginBottom = 30,
  marginLeft = 60,
  accessControlStatus,
  updateState,
}) {
  const gx = useRef();


  const curve1 = [
    [marginLeft + 200, height - 130],
    [marginLeft + 400, height - 130],
    [marginLeft + 800, height - 135],
    [marginLeft + 1000, height - 140],
    [marginLeft + 1200, height - 145],
    [marginLeft + 1400, height - 180],
    [width - marginRight, marginTop + 70],
  ];
  const curve2 = [
    [marginLeft, height - 175],
    [marginLeft + 200, height - 175],
    [marginLeft + 400, height - 175],
    [marginLeft + 800, height - 180],
    [marginLeft + 1000, height - 185],
    [marginLeft + 1200, height - 190],
    [marginLeft + 1400, height - 225],
    [width - marginRight, marginTop + 70],
  ];
  const curve3 = [
    [marginLeft + 200, height - 220],
    [marginLeft + 400, height - 220],
    [marginLeft + 800, height - 225],
    [marginLeft + 1000, height - 230],
    [marginLeft + 1200, height - 235],
    [marginLeft + 1400, height - 260],
    [width - marginRight, marginTop + 70],
  ];

  const x = d3
    .scaleLinear()
    .domain([0, 1000])
    .range([marginLeft, width - marginRight]);
  const y = d3
    .scaleLinear()
    .domain([0, 100])
    .range([height - marginBottom, marginTop]);

  const line = d3.line().curve(d3.curveNatural);

  const [keyStatus, setKeyStatus] = useState("");

  const sendAtcEvent = async (data) => {
    const emitPayload = {
      senderName: "Pilot",
      targetUserName: "ATC",
      flightInfo: {
        flightName: "Flight123",
        top: data.x,
        left: data.y,
        right: 75.0,
        down: 10.0,
        airCraftSpeed: 200,
        speed: keyStatus === "" ? -1 : keyStatus === "left" ? 0 : 1,
      },
    };

    socket.emit("ATC", emitPayload, async (status) => {
      //console.log("Message sent : " + status);
    });
  };


  useEffect(() => {
    const handleKeyDown = (event) => {
      if (accessControlStatus) {
        const step = 1; // Adjust the step size as needed
        let updatedPosition = {};

        if (accessControlStatus) {
          //   updatedPosition = { ...marker1stItem };
          updatedPosition = { ...data };
          switch (event.key) {
            case "ArrowLeft":
              updatedPosition.y = updatedPosition.y - step;
              updatedPosition.x = updatedPosition.x + step;
              setKeyStatus("left");
              break;
            case "ArrowRight":
              updatedPosition.y = updatedPosition.y + step;
              updatedPosition.x = updatedPosition.x + step;
              setKeyStatus("right");
              break;
            default:
              return;
          }
        }

        updateState(updatedPosition);
        sendAtcEvent(updatedPosition);
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [accessControlStatus, updateState, data, sendAtcEvent, setKeyStatus]);


  useEffect(
    () => void d3.select(gx.current).call(d3.axisBottom(x).tickSize(0)),
    [gx, x]
  );

  const GetKeyIcon = () => {
    if (keyStatus == "") return <></>;

    return keyStatus === "left" ? (
      <PiArrowFatLeftDuotone size={26} color="gray" />
    ) : (
      <PiArrowFatRightDuotone size={26} color="gray" />
    );
  };

  return (
    <div style={{ background: "black" }}>
      <svg width={width} height={height} id="my-svg">
        <g transform={`translate(${marginLeft},0)`} />
        <g fill="white" stroke="currentColor" strokeWidth="1.5">
          <line
            color="grey"
            x1={marginLeft}
            y1={marginTop}
            x2={width - marginRight}
            y2={marginTop}
          />
          <line
            color="grey"
            x1={marginLeft}
            y1={marginTop}
            x2={marginLeft}
            y2={height - marginBottom}
          />
           {/* <line
            color="grey"
            x1={marginLeft}
            y1={marginTop}
            x2={marginLeft}
            y2={height - marginBottom}
          /> */}
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

          {/* <line
            color="grey"
            opacity="0.4"
            x1={x(225)}
            y1={marginTop}
            x2={x(225)}
            y2={height - marginBottom}
          /> */}
          <line
            color="grey"
            opacity="0.4"
            x1={x(250)}
            y1={marginTop}
            x2={x(250)}
            y2={height - marginBottom}
          />
          {/* <line
            color="grey"
            opacity="0.4"
            x1={x(275)}
            y1={marginTop}
            x2={x(275)}
            y2={height - marginBottom}
          /> */}
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
            x1={x(350)}
            y1={marginTop}
            x2={x(350)}
            y2={height - marginBottom}
          />    

          <line
            color="grey"
            opacity="0.4"
            x1={x(410)}
            y1={marginTop}
            x2={x(410)}
            y2={height - marginBottom}
          />
          <line
            color="grey"
            opacity="0.4"
            x1={x(480)}
            y1={marginTop}
            x2={x(480)}
            y2={height - marginBottom}
          />
          <line
            color="grey"
            opacity="0.4"
            x1={x(570)}
            y1={marginTop}
            x2={x(570)}
            y2={height - marginBottom}
          />
          <line
            color="grey"
            opacity="0.4"
            x1={x(680)}
            y1={marginTop}
            x2={x(680)}
            y2={height - marginBottom}
          />
          <line
            color="grey"
            opacity="0.4"
            x1={x(820)}
            y1={marginTop}
            x2={x(820)}
            y2={height - marginBottom}
          />
          {/* <line
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
          /> */}
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
          d={line(curve1)}
        /> 
         <path
          fill="none"
          color="grey"
          stroke="currentColor"
          strokeWidth="1.5"
          d={line(curve2)}
        /> 

        <GetKeyIcon />

        <path
          fill="none"
          color="grey"
          stroke="currentColor"
          strokeWidth="1.5"
          d={line(curve3)}
        /> 

        <defs>
          <filter x="0" y="0" width="1" height="1" id="solid">
            <feFlood floodColor="white" result="bg" />
            <feMerge>
              <feMergeNode in="bg" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
          <filter x="0" y="0" width="1" height="1" id="solid1">
            <feFlood floodColor="black" result="bg" />
            <feMerge>
              <feMergeNode in="bg" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        <text
          x={data.x}
          y={data.y - 50}
          //style={{background: 'white'}}
          //fill="white"
          filter="url(#solid)"
          textAnchor="middle"
          stroke="black"
          strokeWidth="1px"
          alignmentBaseline="middle"
        >
          {" "}
          {data.airCraftSpeed} /{" "}
          {parseFloat(
            (Math.atan2(
              Math.abs(data.y - (height - 220)),
              Math.abs(data.x - (marginLeft + 900))
            ) *
              180) /
              Math.PI
          ).toFixed(2)}
        </text>

        <text
          x={data.x}
          y={data.y}
          //style={{background: 'white'}}
          //fill="white"
          filter="url(#solid1)"
          textAnchor="middle"
          stroke="black"
          strokeWidth="1px"
          alignmentBaseline="middle"
          fontSize={48}
        >
       🛬
        </text>

        {/* <circle
          cx={data.x}
          cy={data.y}
          r={10} // Adjust the radius of the pointer
          fill="green" // Change the fill color to your liking
        /> */}
      </svg>
    </div>
  );
}
