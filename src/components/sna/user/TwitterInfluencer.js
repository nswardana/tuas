import React from 'react'
import Typography from '@material-ui/core/Typography'

import { FlexRow, FlexCol, Item } from '@mui-treasury/component-flex'
import Divider from '@material-ui/core/Divider'
import Link from '@material-ui/core/Link'
import InfluencerItem from '../InfluencerItem'

import { useQuery, gql } from '@apollo/client'
import CircularProgress from '@material-ui/core/CircularProgress'

const GET_USER_INFLUENCER = gql`
  query getQuery($project_id: Int) {
    getUserRankByProject(project_id: $project_id) {
      id
      username
      screen_name
      name
      score
      profile_image_url
      followers_count
      following_count
      user_id
    }
  }
`

export default function TwitterInfluencer() {
  var project_id = sessionStorage.getItem('project_id')
  console.log('TwitterInfluencer project_id ')
  console.log(project_id)

  const userInfluencer = useQuery(GET_USER_INFLUENCER, {
    variables: { project_id: parseInt(project_id) },
  })

  const error = userInfluencer.error
  const loading = userInfluencer.loading

  if (error) return <p>Error</p>
  if (loading) return <CircularProgress />

  return (
    <FlexCol
      borderRadius={2}
      sx={{
        bgcolor: 'rgb(244, 247, 250)',
        boxShadow: '0 8px 16px 0 #BDC9D7',
      }}
    >
      <FlexRow
        alignItems="baseline"
        p={2}
        sx={{
          bgcolor: '#fff',
        }}
      >
        <Item grow mr={1}>
          <Typography variant="h6">
            <b>Most Influencer Users</b>
          </Typography>
        </Item>
        <Item>
          <Link href="#">Refresh</Link> • <Link href="#">See all</Link>
        </Item>
      </FlexRow>
      <Divider />
      {userInfluencer.data.getUserRankByProject.map((user, index) => (
        <InfluencerItem
          src={user.profile_image_url}
          name={user.screen_name}
          count={
            user.score
              ? user.score.toLocaleString(undefined, {
                  maximumFractionDigits: 2,
                })
              : '0'
          }
          desc="Rank"
          user={user}
          key={index}
        />
      ))}
    </FlexCol>
  )
}
