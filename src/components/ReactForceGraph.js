import React from 'react'
import { useTheme } from '@material-ui/core/styles'
import { Grid, Paper } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'

import clsx from 'clsx'

import ChartReactForceGraph from './ChartReactForceGraph'

export default function Graph() {
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
        {/* ChartForceGraph */}
        <Grid item xs={12}>
          <Paper className={fixedHeightPaper}>
            <ChartReactForceGraph />
          </Paper>
        </Grid>
      </Grid>
    </React.Fragment>
  )
}
