import React from 'react'
import { Grid } from '@material-ui/core'

import WordsBarChart from './WordsBarChart'

export default function Words() {
  return (
    <React.Fragment>
      {/* TwitterUser */}
      <Grid container spacing={4}>
        <Grid item xs={6}></Grid>
        <Grid item xs={6}></Grid>
        <Grid item xs={6}></Grid>
        <Grid item xs={6}>
          <WordsBarChart />
        </Grid>
      </Grid>
    </React.Fragment>
  )
}
