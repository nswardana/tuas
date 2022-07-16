import React from 'react'
import {
  XYPlot,
  XAxis,
  YAxis,
  HorizontalGridLines,
  LineSeries,
  makeWidthFlexible,
} from 'react-vis'

import RVStyles from 'react-vis-styles'
import Title from './Title'
const FlexibleXYPlot = makeWidthFlexible(XYPlot)

import Typography from '@material-ui/core/Typography'
import {
  ChevronLeft as ChevronLeftIcon,
  Menu as MenuIcon,
  Dashboard as DashboardIcon,
  Assignment as AssignmentIcon,
  MoreVert as MoreVertIcon,
  FormatQuote as FormatQuoteIcon,
} from '@material-ui/icons'
import MultilineChartOutlined from '@material-ui/icons/MultilineChartRounded'

export default function ChartLine() {
  return (
    <React.Fragment>
      <Typography variant="h6" component="div" style={{ color: '#12939A' }}>
        <MultilineChartOutlined /> Graph of Projects
      </Typography>

      <RVStyles />
      <FlexibleXYPlot height={300}>
        <HorizontalGridLines />
        <LineSeries
          color="#FF7F00"
          data={[
            { x: 1, y: 10, label: 'Januari' },
            { x: 2, y: 5, label: 'Maret' },
            { x: 3, y: 15, label: 'April' },
          ]}
        />
        <XAxis />
        <YAxis />
      </FlexibleXYPlot>
    </React.Fragment>
  )
}
