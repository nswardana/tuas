import React from 'react'
import { useTheme } from '@material-ui/core/styles'
import { Grid, Paper } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import clsx from 'clsx'
import TwitterUserDetail from './TwitterUserDetail'
import TwitterUserOfCommunity from './TwitterUserOfCommunity'
import UserCommunityNetwork from './UserCommunityNetwork'
import ChartTimeLine from '../timeline/ChartTimeLine'

import { useQuery, useLazyQuery, gql } from '@apollo/client'
import { useParams } from 'react-router-dom'
import CircularProgress from '@material-ui/core/CircularProgress'

export const GET_PROFILE_USERS = gql`
  query getUserById($user_id: BigInt) {
    users(where: { user_id: $user_id }) {
      community_id
      user_id
      screen_name
      name
      description
      profile_image_url
      followers_count
      following_count
      pagerank_score
      total_neutral_sentiment
      total_positive_sentiment
      total_negative_sentiment
    }
  }
`

export default function TwitterUserDetailContent() {
  const { id } = useParams()
  const { loading, error, data } = useQuery(GET_PROFILE_USERS, {
    variables: { user_id: id },
  })

  if (error) return <p>Error</p>
  if (loading) return <CircularProgress />

  var dataUser = data.users[0]

  console.log('data id : ' + id)
  console.log(dataUser)
  console.log('community_id')
  const community_id = dataUser.community_id
  console.log(community_id)

  return (
    <React.Fragment>
      {/* TwitterUser */}
      <Grid container spacing={2}>
        <Grid item xs={4}>
          <TwitterUserDetail dataUser={dataUser} />
          <br></br>
          <TwitterUserOfCommunity community_id={community_id} />
        </Grid>
        <Grid item xs={8}>
          {community_id !== 'null' ? (
            <UserCommunityNetwork community_id={community_id} />
          ) : (
            'Community is empty'
          )}
        </Grid>
      </Grid>
    </React.Fragment>
  )
}
