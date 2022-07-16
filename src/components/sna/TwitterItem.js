import React from 'react'

import { FlexRow, FlexCol, Item } from '@mui-treasury/component-flex'
import Divider from '@material-ui/core/Divider'
import Link from '@material-ui/core/Link'

import Avatar from '@material-ui/core/Avatar'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'

export default function PersonItem({
  src = '',
  name = '',
  count = 0,
  desc = 'Tweets',
}) {
  return (
    <FlexRow
      gap={2}
      p={2}
      noWrap
      style={{
        border: '2px solid #fff ',
        marginLeft: 20,
        marginRight: 20,
      }}
    >
      <Item noShrink>
        <Avatar src={src} />
      </Item>
    </FlexRow>
  )
}
