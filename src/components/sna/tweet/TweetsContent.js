import React from 'react'
import { useTheme } from '@material-ui/core/styles'
import { Grid, Paper } from '@material-ui/core'

import clsx from 'clsx'

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
