import React from "react";
import { Bar } from "react-chartjs-2";
import { Chart as ChartJS} from "chart.js/auto"

export default function BarChartCount({countOutOfDate,countOnTime}) {
  const dates = Object.keys(countOutOfDate)
  const data1 = Object.values(countOutOfDate)
  const data2 = Object.values(countOnTime)

return (
  <Bar
        data={{
          labels: dates,
          datasets:[
            {
          label: "count Out Of Date",
          data: data1,
          backgroundColor: ["#ef5350"],
          },
          {
            label: "count On Time",
            data: data2,
            backgroundColor: ["#4caf50"],
          }
        ],
        }}
      />

)  
}