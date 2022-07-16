import React from 'react'
import { useTheme } from '@material-ui/core/styles'
import { Grid, Paper } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'

import clsx from 'clsx'
import TwitterUser from './TwitterUser'
import TwitterCardUser from '../TwitterCardUser'

import TwitterInfluencer from './TwitterInfluencer'

export default function Tweets() {
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
      {/* TwitterUser */}
      <Grid container spacing={4}>
        <Grid item xs={6}>
          <TwitterUser />
        </Grid>
        <Grid item xs={6}>
          <TwitterInfluencer loading="false" />
        </Grid>
      </Grid>
    </React.Fragment>
  )
}
