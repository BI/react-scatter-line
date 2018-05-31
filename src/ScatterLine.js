import React from 'react'
import d3 from 'd3'

export default function ScatterLine ({ className, data, width, height, defaultRadius, focusRadius, nameAccessor, valueAccessor }) {
  const gutter = defaultRadius
  const circleY = height / 2
  const xDomain = [d3.min(data, valueAccessor), d3.max(data, valueAccessor)]
  const xRange = width - (2 * gutter)
  const xScale = d3.scale.linear.domain(xDomain).range(xRange)
  const svgCircles = generateSvgCircles(data, xScale, defaultRadius, focusRadius, valueAccessor)
  return (
    <svg className={`react-scatter-line ${className || ''}`} width={width} height={height}>
    
    </svg>
  )
}

ScatterLine.defaultProps = {
  width: 400,
  height: 200,
  defaultRadius: 5,
  focusRadius: 20,
  nameAccessor: (d) => d.name,
  valueAccessor: (d) => d.value
}

function generateSvgCircles(data, xScale, yPosition, defaultRadius, focusRadius, valueAccessor) {
  const circles = data.map((d) => {
    let radius = defaultRadius
    if(d.is_focus) radius = focusRadius

    return (
      <circle cx={xScale(valueAccessor(d))} cy={yPosition} r={radius} />
    )
  })
  return circles
}
