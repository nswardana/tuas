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
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import CardHeader from '@material-ui/core/CardHeader'

import IconButton from '@material-ui/core/IconButton'

import { useQuery, gql } from '@apollo/client'
import CircularProgress from '@material-ui/core/CircularProgress'

import Chip from '@material-ui/core/Chip'
import { Column, Row } from '@mui-treasury/components/flex'
import {
  Info,
  InfoTitle,
  InfoSubtitle,
  InfoCaption,
} from '@mui-treasury/components/info'

import { useChatzInfoStyles } from '@mui-treasury/styles/info/chatz'
import { useDynamicAvatarStyles } from '@mui-treasury/styles/avatar/dynamic'
import { useGradientAvatarStyles } from '@mui-treasury/styles/avatar/gradient'

import { FlexRow, FlexCol, Item } from '@mui-treasury/component-flex'
import Link from '@material-ui/core/Link'

import {
  ChevronLeft as ChevronLeftIcon,
  Menu as MenuIcon,
  Dashboard as DashboardIcon,
  Assignment as AssignmentIcon,
  Twitter as TwitterIcon,
  MoreVert as MoreVertIcon,
} from '@material-ui/icons'
import { borders } from '@material-ui/system'

const GET_TOPTWEETS = gql`
  {
    getTopTweet {
      tweet_text
      retweets_count
      username
      profile_image_url
    }
  }
`

export default function Tweets() {
  const { loading, error, data } = useQuery(GET_TOPTWEETS)

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
          {data.getTopTweet.map((tweet, index) => (
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
