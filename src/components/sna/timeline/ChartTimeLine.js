import React from 'react'

import Typography from '@material-ui/core/Typography'
import Card from '@material-ui/core/Card'
import CardHeader from '@material-ui/core/CardHeader'
import IconButton from '@material-ui/core/IconButton'

import Timeline from 'react-calendar-timeline'
// make sure you include the timeline stylesheet or the timeline will not be styled
import 'react-calendar-timeline/lib/Timeline.css'
import moment from 'moment'

import {
  MoreVert as MoreVertIcon,
  Timelapse as TimelapseIcon,
} from '@material-ui/icons'

export default function Words() {
  const groups = [
    { id: 1, title: '@wadiHarapan' },
    { id: 2, title: '@kebunKopi' },
  ]

  const items = [
    {
      id: 1,
      group: 1,
      title: 'Indonesia Maju',
      start_time: moment(),
      end_time: moment().add(1, 'hour'),
    },
    {
      id: 2,
      group: 2,
      title: 'Indonesia Hebat',
      start_time: moment().add(-0.5, 'hour'),
      end_time: moment().add(0.5, 'hour'),
    },
    {
      id: 3,
      group: 1,
      title: 'Indonesia Hebat',
      start_time: moment().add(2, 'hour'),
      end_time: moment().add(3, 'hour'),
    },
  ]

  return (
    <div id="chart">
      <Card>
        <CardHeader
          avatar={
            <Typography
              variant="h5"
              component="div"
              style={{ color: '#12939A' }}
            >
              <TimelapseIcon /> Time Line
            </Typography>
          }
          action={
            <IconButton aria-label="settings">
              <MoreVertIcon />
            </IconButton>
          }
        />

        <Timeline
          groups={groups}
          items={items}
          defaultTimeStart={moment().add(-12, 'hour')}
          defaultTimeEnd={moment().add(12, 'hour')}
        />
      </Card>
    </div>
  )
}
