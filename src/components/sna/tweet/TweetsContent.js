import React from 'react'
import { Grid } from '@material-ui/core'

import HastagUserCount from './HastagUserCount'
import ChartTweet from './ChartTweet'

export default function Overview() {
  return (
    <Grid container spacing={4}>
      {/* ChartTweetRetweet */}
      <Grid item xs={6}>
        <ChartTweet />
      </Grid>
      {/* Top Hastag */}
      <Grid item xs={6}>
        <HastagUserCount />
      </Grid>
    </Grid>
  )
}
