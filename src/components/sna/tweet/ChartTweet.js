import React from 'react'
import {
  XYPlot,
  XAxis,
  YAxis,
  HorizontalGridLines,
  makeWidthFlexible,
  FlexibleWidthXYPlot,
  VerticalGridLines,
  VerticalBarSeries,
  LabelSeries,
} from 'react-vis'

import { FlexRow, FlexCol, Item } from '@mui-treasury/component-flex'

import Typography from '@material-ui/core/Typography'
import { useQuery, gql } from '@apollo/client'
import CircularProgress from '@material-ui/core/CircularProgress'
const GET_TWEET_CHART = gql`
  query getQuery($project_id: Int) {
    getSentimentByProjectId(project_id: $project_id) {
      sentiment_summary
      jumlah
    }
  }
`

export default function ChartTweet(props) {
  var project_id = sessionStorage.getItem('project_id')
  console.log('ChartTweet project_id ')
  console.log(project_id)

  const { loading, error, data } = useQuery(GET_TWEET_CHART, {
    variables: { project_id: parseInt(project_id) },
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
    label: 'NULL!',
    style: { fontSize: 14 },
  })
  dataChart.push({
    x: 'NEUTRAL',
    y: data.getSentimentByProjectId[1].jumlah,
    color: '#59b953',
    label: 'NEUTRAL!',
    style: { fontSize: 14 },
  })
  dataChart.push({
    x: 'NEGATIVE',
    y: data.getSentimentByProjectId[2].jumlah,
    color: '#ba4fb9',
    label: 'NEGATIVE!',
    style: { fontSize: 14 },
  })

  const labelData = dataChart.map((d, idx) => ({
    x: d.x,
    y: Math.max(dataChart[idx].y),
  }))

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
            title="Number of Tweets"
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
      </FlexRow>
    </FlexCol>
  )
}
