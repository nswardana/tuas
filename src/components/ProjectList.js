import React from 'react'
import { useTheme } from '@material-ui/core/styles'
import { Grid, Paper } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import clsx from 'clsx'

import ProjectListComponent from './ProjectListComponent'
import ChartLine from './ChartLine'
import ChartBar from './ChartBar'

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

  return (
    <React.Fragment>
      <Grid container spacing={4}>
        {/* Recent Reviews */}
        <Grid item xs={12}>
          <ProjectListComponent />
        </Grid>
        {/* ChartBar */}
        <Grid item xs={6}>
          <Paper className={classes.paper} style={{ background: '#ECEFF1' }}>
            <ChartBar />
          </Paper>
        </Grid>
        <Grid item xs={6}>
          <Paper className={classes.paper} style={{ background: '#ECEFF1' }}>
            <ChartLine />
          </Paper>
        </Grid>
      </Grid>
    </React.Fragment>
  )
}
