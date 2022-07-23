import React from 'react'
import Typography from '@material-ui/core/Typography'
import { FlexRow, FlexCol, Item } from '@mui-treasury/component-flex'
import Divider from '@material-ui/core/Divider'
import Link from '@material-ui/core/Link'
import InfluencerItem from '../InfluencerItem'

import { useQuery, gql } from '@apollo/client'
import CircularProgress from '@material-ui/core/CircularProgress'

const GET_MEMBER_OF_COMMUNITY = gql`
  query getUserByCommunityId($community_id: BigInt) {
    users(where: { community_id: $community_id }) {
      community_id
      user_id
      screen_name
      name
      description
      profile_image_url
      followers_count
      following_count
      pagerank_score
    }
  }
`

export default function TwitterUserOfCommunity({ community_id }) {
  const { loading, error, data } = useQuery(GET_MEMBER_OF_COMMUNITY, {
    variables: { community_id: community_id },
  })

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
            <b> Community</b>
          </Typography>
        </Item>
        <Item>
          • <Link href="#">{data.users.length} Members </Link>
        </Item>
      </FlexRow>
      <Divider />
      {data.users.map((user, index) => (
        <InfluencerItem
          src={user.profile_image_url}
          name={user.screen_name}
          count={user.pagerank_score.toLocaleString(undefined, {
            maximumFractionDigits: 2,
          })}
          desc="Rank"
          user={user}
          key={index}
        />
      ))}
    </FlexCol>
  )
}
