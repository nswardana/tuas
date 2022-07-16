import React from 'react'
import {
  XYPlot,
  XAxis,
  YAxis,
  HorizontalGridLines,
  LineSeries,
  makeWidthFlexible,
  FlexibleWidthXYPlot,
  DiscreteColorLegend,
  VerticalGridLines,
  VerticalBarSeries,
} from 'react-vis'

import Title from '../Title'
import Avatar from '@material-ui/core/Avatar'
import Typography from '@material-ui/core/Typography'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import CardHeader from '@material-ui/core/CardHeader'

import IconButton from '@material-ui/core/IconButton'

import {
  ChevronLeft as ChevronLeftIcon,
  Menu as MenuIcon,
  Dashboard as DashboardIcon,
  Assignment as AssignmentIcon,
  Twitter as TwitterIcon,
  MoreVert as MoreVertIcon,
  FormatQuote as FormatQuoteIcon,
} from '@material-ui/icons'

export default function SentimentData(props) {
  const greenData = [
    { x: 'Positive', y: 10 },
    { x: 'Negative', y: 5 },
    { x: 'Netral', y: 15 },
  ]

  const blueData = [
    { x: 'Positive', y: 12 },
    { x: 'Negative', y: 2 },
    { x: 'Neutral', y: 11 },
  ]

  const labelDataGreen = greenData.map((d, idx) => ({
    x: d.x,
    y: 0,
  }))

  const labelDataBlue = blueData.map((d, idx) => ({
    x: d.x,
    y: -10,
  }))

  return (
    <React.Fragment>
      <Card sx={{ borderTop: 1 }}>
        <CardHeader
          color={'blue'}
          avatar={
            <Typography
              variant="h5"
              component="div"
              style={{ color: '#12939A' }}
            >
              <FormatQuoteIcon /> Sentiment Data
            </Typography>
          }
          action={
            <IconButton aria-label="settings">
              <MoreVertIcon />
            </IconButton>
          }
        />

        <CardContent>
          <FlexibleWidthXYPlot
            margin={{ bottom: 70 }}
            xType="ordinal"
            height={300}
            width={300}
            xDistance={100}
            stackBy="y"
          >
            <VerticalGridLines />
            <HorizontalGridLines />
            <XAxis tickLabelAngle={0} />
            <YAxis />
            <VerticalBarSeries
              className="vertical-bar-series-example"
              data={greenData}
            />
            <VerticalBarSeries data={blueData} />
          </FlexibleWidthXYPlot>
        </CardContent>
      </Card>
    </React.Fragment>
  )
}
