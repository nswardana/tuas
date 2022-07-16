import React from 'react'
import { useTheme } from '@material-ui/core/styles'
import { Grid, Paper } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import clsx from 'clsx'

import RatingsChart from './RatingsChart'
import Sentiment from './ProjectListComponent'
import ChartLine from './ChartLine'
import ChartBar from './ChartBar'
import ChartForceGraph from './ChartForceGraph'
import SentimentDataAnalytic from './sna/SentimentDataAnalytic'

export default function ProjectList() {
  const theme = useTheme()
  const useStyles = makeStyles((theme) => ({
    root: {
      display: 'flex',
    },
    paper: {
      padding: theme.spacing(2),
      display: 'flex',
      overflow: 'auto',
      flexDirection: 'column',
    },
    fixedHeight: {
      height: 240,
    },
  }))

  const classes = useStyles(theme)
  const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight)

  return (
    <React.Fragment>
      <Grid container spacing={4}>
        {/* ChartBar */}
        <Grid item xs={6}>
          <SentimentDataAnalytic />
        </Grid>
      </Grid>
    </React.Fragment>
  )
}
