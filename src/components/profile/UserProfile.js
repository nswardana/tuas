import React from 'react'
import { useTheme } from '@material-ui/core/styles'
import { Grid, Paper } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'

import clsx from 'clsx'
import TopHastags from './TopHastags'
import ChartTweetRetweet from './ChartTweetRetweet'

export default function Overview() {
  return (
    <React.Fragment>
      <Grid container spacing={4}>
        {/* ChartTweetRetweet */}
        <Grid item xs={8}>
          <Paper className={classes.paper} style={{ background: '#ECEFF1' }}>
            <ChartTweetRetweet />
          </Paper>
        </Grid>
        {/* Top Hastag */}
        <Grid item xs={4}>
          <Paper className={classes.paper} style={{ background: '#ECEFF1' }}>
            <TopHastags />
          </Paper>
        </Grid>
      </Grid>
    </React.Fragment>
  )
}
