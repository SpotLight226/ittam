
import { useState } from 'react';
import ReactApexChart from 'react-apexcharts';



function AreaChart() {

const date_n = (n) => {
  const today = new Date();
  let today_n = new Date();
  today_n.setDate(today.getDate() - n);
  return (today_n.getMonth()+1)+"/"+today_n.getDate().toString();
}
const month_n = (n) => {
  const today = new Date();
  let today_n = new Date();
  today_n.setMonth(today.getMonth() - n);
  return today_n.getMonth() + 1 + "월";
}


  const x = {

    series: [{
      name: '총 자산 갯수',
      data: [31, 40, 70, 50, 42, 60, 65]
    }, {
      name: '사용중인 자산',
      data: [11, 32, 45, 32, 34, 52, 41]
    },
    {
      name: '폐기된 자산',
      data: [5, 20, 40, 20, 15, 40, 30]
    },
    
  ],

    options: {
      chart: {
        height: 250,
        type: 'area'
      },
      dataLabels: {
        enabled: true,

      },
      stroke: {
        curve: 'smooth'
      },
      xaxis: {
        type: 'text',
        categories: [date_n(6),date_n(5), date_n(4), date_n(3), date_n(2), date_n(1), date_n(0)]
        // categories: [month_n(6),month_n(5), month_n(4), month_n(3), month_n(2), month_n(1), month_n(0)]
      },
      tooltip: {
        x: {
          format: 'yy/MM/dd'
        },
      },
    },


  };



  const [datas, setData] = useState(x);



  return (
    <div className="app">
     
      <div id="chart">
        <ReactApexChart options={datas.options} series={datas.series} type="area" height={250} />
      </div>


    </div>
  )


}

export default AreaChart;