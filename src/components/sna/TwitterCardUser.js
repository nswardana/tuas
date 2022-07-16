import React from 'react'
import { useTheme } from '@material-ui/core/styles'
import { Grid, Paper } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import clsx from 'clsx'

import { FlexRow, FlexCol, Item } from '@mui-treasury/component-flex'
import Avatar from '@mui/material/Avatar'
import Button from '@mui/material/Button'
import Divider from '@mui/material/Divider'
import Link from '@mui/material/Link'
import Typography from '@mui/material/Typography'

const PersonItem = ({ src = '', name = '', count = 0 }) => {
  return (
    <FlexRow gap={2} p={2} noWrap>
      <Item noShrink>
        <Avatar src={src} />
      </Item>
      <FlexRow gap={1} grow stackPoint={240} alignItems="center">
        <Item grow>
          <Typography
            noWrap
            sx={{
              fontWeight: 600,
              fontSize: '#122740',
            }}
          >
            <b>{name}</b>
          </Typography>
          <Typography
            noWrap
            variant="body2"
            sx={{
              fontSize: '0.875rem',
              color: '#758392',
              mt: -0.25,
            }}
          >
            {count} mutual friends
          </Typography>
        </Item>
        <Item>
          <Button
            size="small"
            variant={'outlined'}
            sx={{
              borderRadius: 5,
              padding: '0.125rem 0.75rem',
              borderColor: '#becddc',
              fontSize: '0.75rem',
            }}
          >
            Follow
          </Button>
        </Item>
      </FlexRow>
    </FlexRow>
  )
}

export default function CardSocial() {
  return (
    <FlexCol
      borderRadius={2}
      sx={{
        bgcolor: '#1f2733',
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
            <b>Who to follow</b>
          </Typography>
        </Item>
        <Item>
          <Link href="#">Refresh</Link> • <Link href="#">See all</Link>
        </Item>
      </FlexRow>
      <PersonItem
        src="https://i.pravatar.cc/300?img=10"
        name="Amber Matthews"
        count={6}
      />
      <Divider />
      <PersonItem
        src="https://i.pravatar.cc/300?img=20"
        name="Russel Robertson"
        count={2}
      />
      <Divider />
      <PersonItem
        src="https://i.pravatar.cc/300?img=30"
        name="Kathleen Ellis"
        count={2}
      />
    </FlexCol>
  )
}
