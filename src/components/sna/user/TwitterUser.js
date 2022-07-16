import React from 'react'
import { useTheme } from '@material-ui/core/styles'
import { Grid, Paper } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import clsx from 'clsx'

import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import { Divider as Pemisah } from '@material-ui/core/Divider'
import ListItemText from '@material-ui/core/ListItemText'
import ListItemAvatar from '@material-ui/core/ListItemAvatar'
import Avatar from '@material-ui/core/Avatar'
import Typography from '@material-ui/core/Typography'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import CardHeader from '@material-ui/core/CardHeader'

import { FlexRow, FlexCol, Item } from '@mui-treasury/component-flex'
import Divider from '@material-ui/core/Divider'
import Link from '@material-ui/core/Link'
import PersonItem from '../PersonItem'

import IconButton from '@material-ui/core/IconButton'

import {
  ChevronLeft as ChevronLeftIcon,
  Menu as MenuIcon,
  Dashboard as DashboardIcon,
  Assignment as AssignmentIcon,
  Twitter as TwitterIcon,
  MoreVert as MoreVertIcon,
  People as PeopleIcon,
} from '@material-ui/icons'

import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import Button from '@material-ui/core/Button'

const GET_COUNT_TWEET_USER = gql`
  {
    getTopUserWithCountTweet {
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

import { useQuery, useLazyQuery, gql } from '@apollo/client'
import CircularProgress from '@material-ui/core/CircularProgress'

export default function TwitterUser() {
  const userCountTweet = useQuery(GET_COUNT_TWEET_USER)

  console.log('userCountTweet')
  console.log(userCountTweet.data)

  if (userCountTweet.errors) return <p>Error</p>
  if (userCountTweet.loading) return <CircularProgress />

  const userCountTweetArr = [
    ...userCountTweet.data.getTopUserWithCountTweet,
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
