import { useState } from 'react';
import ReactApexChart from "react-apexcharts";

function DepartChart({departNum}) {

  const value = {

    series: [departNum.design, departNum.rnd, departNum.eng, departNum.fin, departNum.pur, departNum.sales, departNum.dev, departNum.mark, departNum.hr, departNum.prod],
    options: {
      chart: {
        width: 380,
        type: 'pie',
      },
      labels: ['디자인', '연구개발', '엔지니어링', '재무', '구매', '영업', '개발', '마케팅', '인사', ' 생산'],
      colors:['#FFB300', '#8BC34A', '#26A69A', '#7E57C2', '#EF5350', '#8D6E63', '#00B0FF', '#F57C00', '#F06292', '#AFB42B'],
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

  const [data, setData] = useState(value);




  return (
    <div id="chart">
    <ReactApexChart options={data.options} series={data.series} type="pie" width={480} />
  </div>

  )
}

export default DepartChart;