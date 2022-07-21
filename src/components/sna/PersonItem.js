import React from 'react'

import { FlexRow, Item } from '@mui-treasury/component-flex'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableRow from '@material-ui/core/TableRow'

import Avatar from '@material-ui/core/Avatar'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'

import { useHistory } from 'react-router-dom'

export default function PersonItem({
  src = '',
  name = '',
  count = 0,
  desc = 'Tweets',
  user_id = '',
}) {
  const history = useHistory()

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
            <b>{name}</b>
          </Typography>
          <Typography
            noWrap
            style={{
              fontSize: '0.875rem',
              color: '#758392',
              mt: -0.25,
            }}
          >
            {count} {desc}
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
              history.push('/twitteruserdetail/' + user_id)
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
