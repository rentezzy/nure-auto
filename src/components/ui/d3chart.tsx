"use client";
import * as d3 from "d3";
import { useEffect, useRef } from "react";
const width = 840,
  height = 400,
  marginTop = 20,
  marginRight = 20,
  marginBottom = 40,
  marginLeft = 40;

export default function LinePlot({ data }: { data: [number, number][] }) {
  const ref = useRef<HTMLDivElement | null>(null);
  console.log(data);
  useEffect(() => {
    if (!ref.current) return;
    if (ref.current.hasChildNodes()) return;
    const ext = d3.extent(data, (d) => d[0]);
    const x = d3.scaleUtc(ext[0] && ext[1] ? ext : [0, 100], [
      marginLeft,
      width - marginRight,
    ]);

    // Declare the y (vertical position) scale.
    const y = d3.scaleLinear(
      [0, d3.max(data, (d) => d[1]) || 100],
      [height - marginBottom, marginTop]
    );

    // Declare the line generator.
    const line = d3
      .line()
      .x((d) => x(d[0]))
      .y((d) => y(d[1]));
    // Create the SVG container.
    const svg = d3
      .select("#svgChartBlock")
      .append("svg")
      .attr("width", width)
      .attr("height", height)
      .attr("viewBox", [0, 0, width, height])
      .attr("style", "max-width: 100%; height: auto; height: intrinsic;");

    // Add the x-axis.
    svg
      .append("g")
      .attr("transform", `translate(0,${height - marginBottom})`)
      .call(
        d3
          .axisBottom(x)
          .ticks(width / 80)
          .tickSizeOuter(0)
      );

    // Add the y-axis, remove the domain line, add grid lines and a label.
    svg
      .append("g")
      .attr("transform", `translate(${marginLeft},0)`)
      .call(d3.axisLeft(y).ticks(height / 40))
      .call((g) => g.select(".domain").remove())
      .call((g) =>
        g
          .selectAll(".tick line")
          .clone()
          .attr("x2", width - marginLeft - marginRight)
          .attr("stroke-opacity", 0.1)
      )
      .call((g) =>
        g
          .append("text")
          .attr("x", -marginLeft)
          .attr("y", 10)
          .attr("fill", "currentColor")
          .attr("text-anchor", "start")
          .text("↑ Car spent ($)")
      );

    // Append a path for the line.
    svg
      .append("path")
      .attr("fill", "none")
      .attr("stroke", "steelblue")
      .attr("stroke-width", 1.5)
      .attr("d", line(data));
  }, [ref, data]);

  return <div ref={ref} id="svgChartBlock"></div>;
}
