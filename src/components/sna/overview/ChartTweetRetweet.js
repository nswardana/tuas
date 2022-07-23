import React from 'react'
import {
  XAxis,
  YAxis,
  LineSeries,
  FlexibleWidthXYPlot,
  DiscreteColorLegend,
  HorizontalGridLines,
  VerticalGridLines,
} from 'react-vis'

import RVStyles from 'react-vis-styles'

import { FlexRow, FlexCol, Item } from '@mui-treasury/component-flex'
import Box from '@material-ui/core/Box'

import Typography from '@material-ui/core/Typography'

import { useQuery, gql } from '@apollo/client'
import CircularProgress from '@material-ui/core/CircularProgress'

const GET_TWEETS_BY_PROJECT = gql`
  query getTweet($project_id: Int) {
    getTweetByDateProject(project_id: $project_id) {
      dateTweet
      countTweet
      countRetweet
    }
  }
`
export default function ChartTweetRetweet() {
  var project_id = sessionStorage.getItem('project_id')
  console.log('ChartTweetRetweet project_id ')
  console.log(project_id)

  const tweet = useQuery(GET_TWEETS_BY_PROJECT, {
    variables: { project_id: parseInt(project_id) },
  })

  const errors = tweet.error
  const loading = tweet.loading

  if (errors) return <p>Error</p>
  if (loading) return <CircularProgress />

  const arrDataTweet = tweet.data.getTweetByDateProject.map(
    ({ dateTweet, countTweet }) => ({
      x: dateTweet,
      y: countTweet,
      label: countTweet,
    })
  )

  const arrDataReTweet = tweet.data.getTweetByDateProject.map(
    ({ dateTweet, countRetweet }) => ({
      x: dateTweet,
      y: countRetweet,
    })
  )

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
            <b>Tweet and Retweet</b>
          </Typography>
        </Item>
        <Box sx={{ width: '100%' }}>
          <RVStyles />
          <DiscreteColorLegend
            colors={['#19CDD7', '#DDB27C']}
            items={['Tweet', 'Retweet']}
            orientation="horizontal"
          />

          <FlexibleWidthXYPlot
            height={300}
            margin={{
              bottom: 80,
            }}
            xType="ordinal"
          >
            <VerticalGridLines />
            <HorizontalGridLines />

            <XAxis
              title="Date"
              attr="x"
              attrAxis="y"
              orientation="bottom"
              tickFormat={function tickFormat(d) {
                return new Date(d).toLocaleDateString()
              }}
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

            <LineSeries
              color="#19CDD7"
              data={arrDataTweet}
              opacity={1}
              strokeStyle="solid"
              style={{}}
            />
            <LineSeries
              color="#DDB27C"
              data={arrDataReTweet}
              opacity={1}
              strokeStyle="solid"
              style={{}}
            />
          </FlexibleWidthXYPlot>
        </Box>
      </FlexRow>
    </FlexCol>
  )
}
