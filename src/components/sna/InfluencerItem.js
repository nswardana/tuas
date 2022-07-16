import React from 'react'

import { FlexRow, FlexCol, Item } from '@mui-treasury/component-flex'

import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'

import Avatar from '@material-ui/core/Avatar'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
import IconButton from '@material-ui/core/IconButton'

import { useHistory, useLocation } from 'react-router-dom'
import { Twitter as TwitterIcon } from '@material-ui/icons'
import { useSizedIconButtonStyles } from '@mui-treasury/styles/iconButton/sized'

export default function PersonItem({
  src = '',
  name = '',
  count = 0,
  desc = 'Tweets',
  user = '',
}) {
  const history = useHistory()
  const small = useSizedIconButtonStyles({
    color: '#000',
    padding: 8,
    childSize: 24,
  })

  return (
    <FlexRow
      gap={2}
      p={2}
      noWrap
      tyle={{
        border: '2px solid #fff ',
        marginLeft: 20,
        marginRight: 20,
      }}
    >
      <Item noShrink>
        <Avatar src={src} />
      </Item>
      <FlexRow gap={1} grow stackPoint={240} alignItems="center">
        <Item grow>
          <Typography
            noWrap
            sx={{
              fontWeight: 600,
              fontSize: '1rem',
              color: '#122740',
            }}
          >
            <b>{user.name}</b>
            <IconButton
              classes={small}
              target="_blank"
              href={'https://mobile.twitter.com/' + user.screen_name}
              rel="noreferrer"
            >
              <TwitterIcon style={{ color: '#4DD0E1' }} />
            </IconButton>
          </Typography>

          <Typography
            noWrap
            style={{
              fontSize: '0.875rem',
              color: '#758392',
              mt: -0.25,
            }}
          >
            Rank {count} | Follower {user.followers_count} | Following{' '}
            {user.following_count}
          </Typography>
        </Item>
        <Item>
          <Button
            size="small"
            variant={'outlined'}
            style={{
              borderRadius: 5,
              padding: '0.125rem 0.75rem',
              borderColor: '#becddc',
              fontSize: '0.75rem',
            }}
            onClick={() => {
              history.push('/twitteruserdetail/' + user.user_id)
            }}
          >
            Show User
          </Button>
        </Item>
        <Table size="small">
          <TableBody>
            <TableRow>
              <TableCell></TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </FlexRow>
    </FlexRow>
  )
}
