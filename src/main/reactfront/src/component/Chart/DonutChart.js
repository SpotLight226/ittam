
import { useState } from "react";

import ReactApexChart from "react-apexcharts";

function DounutChart_user({myAssetChartCnt}) {
  const x = {
    series: [myAssetChartCnt.pcCnt, myAssetChartCnt.swcnt, myAssetChartCnt.etcCnt, myAssetChartCnt.serverCnt],
    options: {
      chart: {
        type: 'donut',
      },
      labels: ['PC', '스프트웨어', '주변기기', '서버'],
      colors:['#4b0082', '#6a5acd', '#9C27B0', '#dda0dd'],
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
