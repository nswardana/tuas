import React from 'react'
import { Grid } from '@material-ui/core'
import TwitterUser from './TwitterUser'
import TwitterInfluencer from './TwitterInfluencer'
export default function TwitterUserContent() {
  return (
    <React.Fragment>
      {/* TwitterUser */}
      <Grid container spacing={4}>
        <Grid item xs={6}>
          <TwitterUser />
        </Grid>
        <Grid item xs={6}>
          <TwitterInfluencer />
        </Grid>
      </Grid>
    </React.Fragment>
  )
}
