"use client";
import Chart from "chart.js/auto";
import { useEffect, useRef } from "react";

export default function LinePlot({ data }: { data: [number, number][] }) {
  const ref = useRef<HTMLCanvasElement | null>(null);
  useEffect(() => {
    if (!ref.current) return;
    const chart = new Chart(ref.current, {
      type: "bar",
      data: {
        labels: data.map((row) => row[0] + " $"),
        datasets: [
          {
            label: "Car spent's",
            data: data.map((row) => row[1]),
          },
        ],
      },
    });
    return () => chart.destroy();
  }, [ref, data]);

  return <canvas ref={ref} id="svgChartBlock"></canvas>;
}
