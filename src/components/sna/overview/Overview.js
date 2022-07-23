import React from 'react'
import { Grid } from '@material-ui/core'

import TopHastags from './TopHastags'
import ChartTweetRetweet from './ChartTweetRetweet'
import CardStatistic from './CardStatistic'

import { useQuery, gql } from '@apollo/client'
import CircularProgress from '@material-ui/core/CircularProgress'

const GET_USER = gql`
  query getQuery($project_id: Int) {
    getNumberOfUser(project_id: $project_id) {
      jumlah
    }
  }
`

const GET_TWEET = gql`
  query getQuery($project_id: Int) {
    getNumberOfTweet(project_id: $project_id) {
      jumlah
    }
  }
`

const GET_HASTAG = gql`
  query getQuery($project_id: Int) {
    getNumberOfHastag(project_id: $project_id) {
      jumlah
    }
  }
`

export default function Overview() {
  var project_id = sessionStorage.getItem('project_id')
  console.log('TwitterUser project_id ')
  console.log(project_id)

  if (!window.location.hash) {
    window.location = window.location + '#loaded'
    window.location.reload()
  }

  const queryUser = useQuery(GET_USER, {
    variables: { project_id: parseInt(project_id) },
  })

  const queryTweet = useQuery(GET_TWEET, {
    skip: queryUser.loading,
    variables: { project_id: parseInt(project_id) },
  })

  const queryHastag = useQuery(GET_HASTAG, {
    skip: queryUser.loading,
    variables: { project_id: parseInt(project_id) },
  })

  var errors = queryUser.error || queryTweet.error
  var loadings = queryUser.loading || queryTweet.loading || queryHastag.loading

  if (errors) return <p>Error</p>
  if (loadings) return <CircularProgress />

  console.log(queryUser.data.getNumberOfUser[0].jumlah)
  console.log(queryTweet.data.getNumberOfTweet[0].jumlah)
  console.log(queryHastag.data.getNumberOfHastag[0].jumlah)

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
            subtitle={queryHastag.data.getNumberOfHastag[0].jumlah}
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
