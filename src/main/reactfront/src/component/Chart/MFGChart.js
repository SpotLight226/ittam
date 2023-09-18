import { useState } from "react";

import ReactApexChart from "react-apexcharts";

function MFGChart({}) {
  const x = {
    series: [44, 55, 41, 20, 5],
    options: {
      chart: {
        type: 'donut',
      },
      labels: ['Samsung', 'Dell', 'HP', 'Lenovo', 'Acer'],
      colors:['#4b0082', '#6a5acd', '#9C27B0', '#dda0dd', '#9C27B0'],
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
      <div id="chart" style={{height: '190px'}}>
        <ReactApexChart options={data.options} series={data.series} type="donut" width={346}/>
      </div>
  )
}

export default MFGChart;