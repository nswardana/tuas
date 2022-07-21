import React from 'react'
import {
  XAxis,
  YAxis,
  HorizontalGridLines,
  FlexibleWidthXYPlot,
  VerticalGridLines,
  VerticalBarSeries,
} from 'react-vis'

import Typography from '@material-ui/core/Typography'
import { BarChartRounded as BarChartRoundedIcon } from '@material-ui/icons'

export default function ChartBar() {
  return (
    <React.Fragment>
      <Typography variant="h6" component="div" style={{ color: '#12939A' }}>
        <BarChartRoundedIcon /> Graph of Projects
      </Typography>
      <FlexibleWidthXYPlot xType="ordinal" height={300}>
        <VerticalGridLines />
        <HorizontalGridLines />
        <XAxis
          style={{
            text: {
              stroke: 'none',
              top: 20,
              fontSize: 10,
              fontWeight: 100,
              transform: 'translate(10px, 0)',
            },
          }}
        />
        <YAxis />
        <VerticalBarSeries
          color="#FF7F00"
          data={[
            { x: '2017', y: 10 },
            { x: '2018', y: 5 },
            { x: '2019', y: 15 },
            { x: '2020', y: 55 },
            { x: '2021', y: 35 },
            { x: '2022', y: 45 },
          ]}
        />
      </FlexibleWidthXYPlot>
    </React.Fragment>
  )
}
