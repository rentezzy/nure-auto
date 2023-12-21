"use client";
import Chart from "chart.js/auto";
import { useEffect, useRef } from "react";

export default function RoadAccidentChart({
  data,
  label,
}: {
  data: [number, number][];
  label: string;
}) {
  const ref = useRef<HTMLCanvasElement | null>(null);
  useEffect(() => {
    if (!ref.current) return;
    const chart = new Chart(ref.current, {
      type: "line",
      data: {
        labels: data.map((val) => val[0] + " km"),
        datasets: [
          {
            label: label,
            borderColor: "#249283",
            showLine: true,
            data: data,
            fill: false,
          },
        ],
      },
      options: {
        responsive: true,
        scales: {
          y: {
            title: {
              display: true,
              text: "Amount of accident's",
            },
            display: true,
            max: 10,
            min: 0,
            ticks: {
              stepSize: 1,
            },
          },
        },
      },
    });
    return () => chart.destroy();
  }, [ref, data, label]);

  return <canvas ref={ref} id="svgChartBlock"></canvas>;
}
