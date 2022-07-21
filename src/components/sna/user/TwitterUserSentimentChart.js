import React from 'react'

import {
  XAxis,
  YAxis,
  HorizontalGridLines,
  FlexibleWidthXYPlot,
  VerticalGridLines,
  VerticalBarSeries,
} from 'react-vis'

export default function TwitterUserSentimentChart({ data = '' }) {
  console.log('TwitterUserSentimentChart')
  console.log(data)

  var dataChart = []
  dataChart.push({
    x: 'NULL',
    y: data.positive,
    color: '#cd3b54',
    label: 'NULL!',
    style: { fontSize: 14 },
  })
  dataChart.push({
    x: 'NEUTRAL',
    y: data.neutral,
    color: '#59b953',
    label: 'NEUTRAL!',
    style: { fontSize: 14 },
  })
  dataChart.push({
    x: 'NEGATIVE',
    y: data.negative,
    color: '#ba4fb9',
    label: 'NEGATIVE!',
    style: { fontSize: 14 },
  })

  dataChart.push({
    x: 'POSITIVE',
    y: data.positive,
    color: '#ba4fb9',
    label: 'POSITIVE!',
    style: { fontSize: 14 },
  })
  return (
    <FlexibleWidthXYPlot xType="ordinal" height={150}>
      <VerticalGridLines />
      <HorizontalGridLines />
      <XAxis
        attr="x"
        attrAxis="y"
        orientation="bottom"
        tickLabelAngle={0}
        style={{
          line: { stroke: '#ADDDE1' },
          ticks: { stroke: '#ADDDE1' },
          text: {
            stroke: 'none',
            fill: '#6b6b76',
            fontWeight: 500,
            fontSize: 8,
            top: 20,
          },
        }}
      />
      <YAxis
        title=""
        attr="y"
        attrAxis="x"
        orientation="left"
        style={{
          line: { stroke: '#ADDDE1' },
          ticks: { stroke: '#ADDDE1' },
          text: {
            stroke: 'none',
            fill: '#6b6b76',
            fontWeight: 600,
            top: 20,
          },
        }}
      />

      <VerticalBarSeries color="#FF7F00" data={dataChart} />
    </FlexibleWidthXYPlot>
  )
}
