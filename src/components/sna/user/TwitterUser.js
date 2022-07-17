import React from 'react'
import Typography from '@material-ui/core/Typography'
import { FlexRow, FlexCol, Item } from '@mui-treasury/component-flex'
import Divider from '@material-ui/core/Divider'
import Link from '@material-ui/core/Link'
import PersonItem from '../PersonItem'

const GET_COUNT_TWEET_USER = gql`
  query getQuery($project_id: Int) {
    getTopUserWithCountTweetByProject(project_id: $project_id) {
      id
      username
      screen_name
      name
      score
      profile_image_url
      countTweet
      user_id
    }
  }
`

import { useQuery, gql } from '@apollo/client'
import CircularProgress from '@material-ui/core/CircularProgress'

export default function TwitterUser() {
  var project_id = sessionStorage.getItem('project_id')
  console.log('TwitterUser project_id ')
  console.log(project_id)

  const userCountTweet = useQuery(GET_COUNT_TWEET_USER, {
    variables: { project_id: parseInt(project_id) },
  })

  console.log('userCountTweet')
  console.log(userCountTweet.data)

  if (userCountTweet.errors) return <p>Error</p>
  if (userCountTweet.loading) return <CircularProgress />

  const userCountTweetArr = [
    ...userCountTweet.data.getTopUserWithCountTweetByProject,
  ].sort((a, b) => b.countTweet - a.countTweet)

  const userCountTweetArr10 = userCountTweetArr.slice(0, 10)

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
            <b>Most Active Users</b>
          </Typography>
        </Item>
        <Item>
          <Link href="#">Refresh</Link> • <Link href="#">See all</Link>
        </Item>
      </FlexRow>
      <Divider />
      {userCountTweetArr10.map((tweet, index) => (
        <PersonItem
          src={tweet.profile_image_url}
          name={tweet.screen_name}
          count={tweet.countTweet}
          key={index}
          user_id={tweet.user_id}
        />
      ))}
    </FlexCol>
  )
}
