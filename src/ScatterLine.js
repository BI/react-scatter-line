import React from 'react'
import PropTypes from 'prop-types'
import d3 from 'd3'

export default function ScatterLine ({ className, data, width, height, defaultRadius, focusRadius, nameAccessor, valueAccessor, focusAccessor }) {
  const gutter = defaultRadius
  const circleY = height / 2
  const xDomain = [d3.min(data, valueAccessor), d3.max(data, valueAccessor)]
  const xRange = [0, width - (2 * gutter)]
  const xScale = d3.scale.linear().domain(xDomain).range(xRange)
  const svgCircles = generateSvgCircles(data, xScale, circleY, defaultRadius, focusRadius, valueAccessor)
  const meanValue = d3.mean(data, valueAccessor)
  const scaledMean = xScale(meanValue)
  return (
    <svg className={`react-scatter-line ${className || ''}`} width={width} height={height}>
      <g transform={`translate(${gutter}, 0)`}>{svgCircles}<line x1={scaledMean} x2={scaledMean} y1={0} y2={height} style={{ stroke:"#767676", strokeDasharray:"3,3"}} /></g> 
    </svg>
  )
}
 
ScatterLine.defaultProps = {
  width: 400,
  height: 200,
  defaultRadius: 5,
  focusRadius: 20,
  nameAccessor: (d) => d.name,
  valueAccessor: (d) => d.value,
  focusAccessor: (d) => d.is_focus
}

ScatterLine.propTypes = {
  width: PropTypes.number,
  height: PropTypes.number,
  defaultRadius: PropTypes.number,
  focusRadius: PropTypes.number,
  nameAccessor: PropTypes.func,
  valueAccessor: PropTypes.func,
  focusAccessor: PropTypes.func
}

function generateSvgCircles(data, xScale, yPosition, defaultRadius, focusRadius, valueAccessor) {
  const circles = data.map((d, i) => {
    let radius = defaultRadius
    let color = '#D8D8D8'
    let strokeColor = '#ABABAB' 
    let className = 'rsl-standard-dot'
    let text = ''
    if(d.is_focus) {
      radius = focusRadius
      color = '#00316D'
      strokeColor = ''
      className = 'rsl-focus-dot'
      text = <text style={{'fill':'white'}} textAnchor={'middle'} dy='.1em' alignmentBaseline={'middle'} y={yPosition} x={xScale(valueAccessor(d))}>{valueAccessor(d)}</text>
    }
    return [
      <circle className={className} fill={color} stroke={strokeColor} key={i} cx={xScale(valueAccessor(d))} cy={yPosition} r={radius} />, text
    ]
  })
  return circles
}
