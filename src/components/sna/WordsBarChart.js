import React from 'react'
import {
  XYPlot,
  XAxis,
  YAxis,
  VerticalGridLines,
  HorizontalGridLines,
  VerticalBarSeries,
} from 'react-vis'

import Typography from '@material-ui/core/Typography'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import CardHeader from '@material-ui/core/CardHeader'

import IconButton from '@material-ui/core/IconButton'

import {
  MoreVert as MoreVertIcon,
  FormatQuote as FormatQuoteIcon,
} from '@material-ui/icons'

export default function WordsChartBar() {
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
              <FormatQuoteIcon /> Words Chart
            </Typography>
          }
          action={
            <IconButton aria-label="settings">
              <MoreVertIcon />
            </IconButton>
          }
        />

        <CardContent>
          <XYPlot
            margin={{ bottom: 70 }}
            xType="ordinal"
            width={450}
            height={300}
          >
            <VerticalGridLines />
            <HorizontalGridLines />
            <XAxis tickLabelAngle={-45} />
            <YAxis />
            <VerticalBarSeries
              data={[
                { x: '2012', y: 56 },
                { x: '2013', y: 39 },
                { x: '2014', y: 15 },
                { x: '2015', y: 81 },
                { x: '2016', y: 54 },
                { x: '2017', y: 42 },
                { x: '2018', y: 16 },
                { x: '2019', y: 34 },
                { x: '2021', y: 58 },
                { x: '2022', y: 15 },
              ]}
            />
          </XYPlot>
        </CardContent>
      </Card>
    </React.Fragment>
  )
}
