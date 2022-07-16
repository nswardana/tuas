import React from 'react'
import { useTheme } from '@material-ui/core/styles'
import { Grid, Paper } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'

import clsx from 'clsx'

import TopHastags from './TopHastags'
import ChartTweetRetweet from './ChartTweetRetweet'
import CardStatistic from './CardStatistic'

import { useQuery, gql } from '@apollo/client'
import CircularProgress from '@material-ui/core/CircularProgress'

const GET_USER = gql`
  {
    getNumberOfUser {
      jumlah
    }
  }
`
const GET_TWEET = gql`
  {
    getNumberOfTweet {
      jumlah
    }
  }
`
const GET_HASTAG = gql`
  {
    getNumberOfHastag {
      jumlah
    }
  }
`

export default function Overview() {
  const queryUser = useQuery(GET_USER)

  const queryTweet = useQuery(GET_TWEET, {
    skip: queryUser.loading,
  })
  /*
  const queryHastag = useQuery(GET_HASTAG, {
    skip: queryTweet.loading,
  })

  var errors = queryTweet.error || queryHastag.error
  var loadings = queryTweet.loading || queryHastag.loading

  if (errors) return <p>Error</p>
  if (loadings) return <CircularProgress />
  */

  var errors = queryUser.error || queryTweet.error
  var loadings = queryUser.loading || queryTweet.loading

  if (errors) return <p>Error</p>
  if (loadings) return <CircularProgress />

  console.log(queryUser.data.getNumberOfUser[0].jumlah)
  console.log(queryTweet.data.getNumberOfTweet[0].jumlah)

  return (
    <React.Fragment>
      <Grid container spacing={4}>
        {/* Top Hastag */}
        <Grid item xs={4}>
          <CardStatistic
            bgcolor="#FFF"
            title="User"
            subtitle={queryUser.data.getNumberOfUser[0].jumlah}
            desc=""
            avatar="./icons/group-team.png"
          />
        </Grid>
        <Grid item xs={4}>
          <CardStatistic
            bgcolor="#FFF"
            title="Tweet"
            subtitle={queryTweet.data.getNumberOfTweet[0].jumlah}
            desc=""
            avatar="./icons/tweet.png"
          />
        </Grid>
        <Grid item xs={4}>
          <CardStatistic
            bgcolor="#FFF"
            title="Hastag"
            subtitle={400}
            desc=""
            avatar="./icons/hastag.png"
          />
        </Grid>
      </Grid>
      <Grid container spacing={4}>
        {/* ChartTweetRetweet */}
        <Grid item xs={8}>
          <ChartTweetRetweet />
        </Grid>
        {/* Top Hastag */}
        <Grid item xs={4}>
          <TopHastags />
        </Grid>
      </Grid>
    </React.Fragment>
  )
}
