import React from 'react'
import { Grid } from '@material-ui/core'

export default function Home() {
  return (
    <React.Fragment>
      <Grid container spacing={4}>
        {/* Ratings Chart */}
        <Grid item xs={3} alignContent="center" alignItems="center"></Grid>
        <Grid item xs={8} alignContent="center" alignItems="center">
          <img src="img/tuas-logo.png" width="400" height="300" alt="Tuas" />
        </Grid>
        <Grid item xs={2} alignContent="center" alignItems="center"></Grid>
      </Grid>
    </React.Fragment>
  )
}
