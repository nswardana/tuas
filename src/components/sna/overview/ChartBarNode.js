import React from 'react'
import {
  XYPlot,
  XAxis,
  YAxis,
  HorizontalGridLines,
  LineSeries,
  makeWidthFlexible,
  FlexibleWidthXYPlot,
  DiscreteColorLegend,
  VerticalGridLines,
  VerticalBarSeries,
} from 'react-vis'

const FlexibleXYPlot = makeWidthFlexible(XYPlot)

import { FlexRow, FlexCol, Item } from '@mui-treasury/component-flex'
import Divider from '@material-ui/core/Divider'
import Link from '@material-ui/core/Link'

import Typography from '@material-ui/core/Typography'
import { Twitter as TwitterIcon } from '@material-ui/icons'

export default function ChartBar(props) {
  return (
    <FlexCol
      borderRadius={2}
      sx={{
        bgcolor: 'rgb(244, 247, 250)',
        boxShadow: '0 8px 16px 0 #BDC9D7',
      }}
      style={{ background: '#ECEFF1' }}
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
            <b> Data</b>
          </Typography>
        </Item>
        <Item></Item>

        <FlexibleWidthXYPlot xType="ordinal" height={200}>
          <VerticalGridLines />
          <HorizontalGridLines />
          <XAxis
            style={{
              text: {
                stroke: 'none',
                top: 20,
                fontSize: 10,
                fontWeight: 100,
                transform: 'translate(10px, 0)',
              },
            }}
          />
          <YAxis />
          <VerticalBarSeries
            color="#FF7F00"
            data={[
              { x: 'Users', y: 10 },
              { x: 'Tweet', y: 5 },
              { x: 'Hastags', y: 15 },
            ]}
          />
        </FlexibleWidthXYPlot>
      </FlexRow>
    </FlexCol>
  )
}
