import React from 'react'
import { Grid } from '@material-ui/core'
import UserTweetNetwork from './UserTweetNetwork'
import CommunitiyList from './CommunityList'

import {
  Twitter as TwitterIcon,
  MoreVert as MoreVertIcon,
  People as PeopleIcon,
} from '@material-ui/icons'

export default function UserTweetNetworkContent() {
  return (
    <React.Fragment>
      {/* TwitterUser */}
      <Grid container spacing={4}>
        <Grid item xs={9}>
          <UserTweetNetwork />
        </Grid>
        <Grid item xs={3}>
          <CommunitiyList />
        </Grid>
      </Grid>
    </React.Fragment>
  )
}
