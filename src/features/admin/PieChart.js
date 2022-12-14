import React from "react";
import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS} from "chart.js/auto"

export default function PieChart({statur}) {

return (
  <Doughnut
        data={{
          labels: ["archive","working","review","done","rework"],
    datasets:[{
      label: "Count Statur",
      data: statur.slice(0,5),
      backgroundColor: [
        "#CC66FF",
        "#42a5f5",
        "#ffb300",
        "#4caf50",
        "#ef5350",
      ],
    }],
        }}
      />

)  
}