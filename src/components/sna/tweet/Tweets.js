import React from 'react'
import { useTheme } from '@material-ui/core/styles'
import { Grid, Paper } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import clsx from 'clsx'

import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import Divider from '@material-ui/core/Divider'
import ListItemText from '@material-ui/core/ListItemText'
import ListItemAvatar from '@material-ui/core/ListItemAvatar'
import Avatar from '@material-ui/core/Avatar'
import Typography from '@material-ui/core/Typography'

import { useQuery, gql } from '@apollo/client'
import CircularProgress from '@material-ui/core/CircularProgress'

import { useDynamicAvatarStyles } from '@mui-treasury/styles/avatar/dynamic'
import { useGradientAvatarStyles } from '@mui-treasury/styles/avatar/gradient'

import { FlexRow, FlexCol, Item } from '@mui-treasury/component-flex'

const GET_TOPTWEETS = gql`
  query getQuery($project_id: Int) {
    getTopTweetByProject(project_id: $project_id) {
      tweet_text
      retweets_count
      username
      profile_image_url
    }
  }
`

export default function Tweets() {
  var project_id = sessionStorage.getItem('project_id')
  console.log('TopHastags project_id ')
  console.log(project_id)

  const { error, loading, data } = useQuery(GET_TOPTWEETS, {
    variables: { project_id: parseInt(project_id) },
  })

  console.log('data')
  console.log(data.getTopTweetByProject)

  const avatarStyles = useGradientAvatarStyles({
    size: 72,
    thickness: 3,
    color: 'linear-gradient(to right, #8a2387, #e94057, #f27121);',
    gapColor: '#f4f7fa',
  })
  const avatarStyles2 = useDynamicAvatarStyles({ size: 72 })

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
          <Typography variant="h6">Tweets</Typography>
        </Item>
        <Divider />

        <List
          sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}
        >
          {data.getTopTweetByProject.map((tweet, index) => (
            <ListItem key={index} style={{ borderTop: '#12939A' }}>
              <ListItemAvatar>
                <Avatar
                  alt="Travis Howard"
                  src={tweet.profile_image_url}
                  onError={({ currentTarget }) => {
                    currentTarget.onerror = null // prevents looping
                    currentTarget.src = 'img/avatar2.jpg'
                  }}
                />
              </ListItemAvatar>
              <ListItemText
                primary={tweet.username}
                secondary={
                  <React.Fragment>
                    <Typography
                      sx={{ display: 'inline' }}
                      component="span"
                      variant="body2"
                      color="textPrimary"
                    ></Typography>
                    {tweet.tweet_text}
                  </React.Fragment>
                }
              />
            </ListItem>
          ))}
        </List>
      </FlexRow>
    </FlexCol>
  )
}
