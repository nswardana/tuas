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

import { FlexRow, FlexCol, Item } from '@mui-treasury/component-flex'

import RVStyles from 'react-vis-styles'
const FlexibleXYPlot = makeWidthFlexible(XYPlot)

import Typography from '@material-ui/core/Typography'
import {
  ChevronLeft as ChevronLeftIcon,
  Menu as MenuIcon,
  Dashboard as DashboardIcon,
  Assignment as AssignmentIcon,
  Twitter as TwitterIcon,
  MoreVert as MoreVertIcon,
  FormatQuote as FormatQuoteIcon,
  BarChartRounded as BarChartRoundedIcon,
} from '@material-ui/icons'

import { useQuery, gql } from '@apollo/client'
import CircularProgress from '@material-ui/core/CircularProgress'

const GET_TWEET_CHART = gql`
  {
    getSentimentByProjectId(project_id: 26) {
      sentiment_summary
      jumlah
    }
  }
`

export default function ChartBar(props) {
  var project_id = 26
  const { loading, error, data } = useQuery(GET_TWEET_CHART, {
    variables: { project_id: project_id },
  })

  if (error) return <p>Error</p>
  if (loading) return <CircularProgress />

  console.log('ChartTweet')
  console.log(data)

  var dataChart = []
  dataChart.push({
    x: 'NULL',
    y: data.getSentimentByProjectId[0].jumlah,
    color: '#cd3b54',
  })
  dataChart.push({
    x: 'NEUTRAL',
    y: data.getSentimentByProjectId[1].jumlah,
    color: '#59b953',
  })
  dataChart.push({
    x: 'NEGATIVE',
    y: data.getSentimentByProjectId[2].jumlah,
    color: '#ba4fb9',
  })

  return (
    <FlexCol
      borderRadius={2}
      sx={{
        bgcolor: 'rgb(244, 247, 250)',
        boxShadow: '0 8px 16px 0 #BDC9D7',
      }}
      style={{ background: '#ECEFF1' }}
    >
      <FlexRow
        alignItems="baseline"
        p={2}
        sx={{
          bgcolor: '#fff',
        }}
      >
        <Item grow mr={1}>
          <Typography variant="h6">
            <b> Tweet Sentiment</b>
          </Typography>
        </Item>
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
          <VerticalBarSeries color="#FF7F00" data={dataChart} />
        </FlexibleWidthXYPlot>
      </FlexRow>
    </FlexCol>
  )
}
