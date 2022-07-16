import * as React from 'react'
import Box from '@material-ui/core//Box'

import { Chrono } from 'react-chrono'

import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'
import { FlexRow, FlexCol, Item } from '@mui-treasury/component-flex'

export default function HorizontalLinearStepper() {
  const items = [
    {
      title: 'May 1940',
      cardTitle: 'Dunkirk',
      url: 'http://www.history.com',
      cardSubtitle:
        'Men of the British Expeditionary Force (BEF) wade out to..',
      cardDetailedText:
        'Men of the British Expeditionary Force (BEF) wade out to..',
      media: {
        type: 'IMAGE',
        source: {
          url: 'http://someurl/image.jpg',
        },
      },
    },
  ]

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
        <Box sx={{ width: '100%' }}>
          <div style={{ width: '500px', height: '400px' }}>
            <Chrono items={items} mode="HORIZONTAL" />
          </div>
        </Box>
      </FlexRow>
    </FlexCol>
  )
}
