import React, { useEffect, useState } from "react";
import "./LineChart.css";
import Chart from "react-google-charts";

const LineChart = ({ historicalData }) => {
  const [data, setData] = useState([["Date", "Prices"]]);

  useEffect(() => {
    let datacopy = [["Date", "Prices"]];
    
    if (historicalData && historicalData.prices) {
      historicalData.prices.forEach((item) => {
        let date = new Date(item[0]).toLocaleDateString( "en-IN", { day: "numeric", month: "short" });
       
        datacopy.push([date, item[1]]);
      });

      setData(datacopy);
    }
  }, [historicalData]);

  return (
    <div className="line-chart">
      <Chart 
        chartType="LineChart"
        data={data}
        height="400px"
        legendToggle
      />
    </div>
  );
};

export default LineChart;
