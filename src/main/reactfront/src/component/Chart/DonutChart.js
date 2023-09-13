
import { useState } from "react";

import ReactApexChart from "react-apexcharts";

function DounutChart_user() {
  const x = {
    series: [44, 55, 41, 17, 15],
    options: {
      chart: {
        type: 'donut',
      },
      labels: ['Team A', 'Team B', 'Team C', 'Team D', 'Team E'],
      colors:['#4b0082', '#dda0dd', '#9C27B0', '#00ced1', '#228b22'],
      responsive: [{
        breakpoint: 480,
        options: {
          chart: {
            width: 200
          },
          legend: {
            position: 'bottom'
          }
        }
      }]
    },

  };

  const [data, setData] = useState(x);

  return (
      <div id="chart">
        <ReactApexChart options={data.options} series={data.series} type="donut" width={346}/>
      </div>
  )
}

export default DounutChart_user;
