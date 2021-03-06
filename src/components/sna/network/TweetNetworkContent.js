import React from 'react'
import { Grid } from '@material-ui/core'
import TweetNetwork from './TweetNetwork'
import TopHastags from '../overview/TopHastags'

export default function TweetNetworkContent() {
  return (
    <React.Fragment>
      {/* TwitterUser */}
      <Grid container spacing={4}>
        <Grid item xs={8}>
          <TweetNetwork />
        </Grid>
        <Grid item xs={4}>
          <TopHastags />
        </Grid>
      </Grid>
    </React.Fragment>
  )
}
