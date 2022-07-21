import React from 'react'

import Avatar from '@material-ui/core/Avatar'
import { Row, Item } from '@mui-treasury/components/flex'
import { Info, InfoTitle, InfoSubtitle } from '@mui-treasury/components/info'
import { useDynamicAvatarStyles } from '@mui-treasury/styles/avatar/dynamic'
import { useTrendInfoStyles } from '@mui-treasury/styles/info/trend'
import Typography from '@material-ui/core/Typography'

export default function CardStatistic({
  bgcolor = '#FFF',
  title = 'User',
  subtitle = '300',
  desc = '',
  avatar = './icons/group-team.png',
}) {
  const avatarStyles = useDynamicAvatarStyles({ size: 48, radius: 6 })

  return (
    <Row gap={3} bgcolor={bgcolor} borderRadius={16}>
      <Item>
        <Avatar variant={'rounded'} classes={avatarStyles} src={avatar} />
      </Item>
      <Info useStyles={useTrendInfoStyles}>
        <InfoTitle>{title}</InfoTitle>
        <Typography variant="h4" align="center">
          {subtitle}
        </Typography>
        <InfoSubtitle>{desc}</InfoSubtitle>
      </Info>
    </Row>
  )
}
