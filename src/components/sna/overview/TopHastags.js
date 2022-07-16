import React from 'react'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'

import { FlexRow, FlexCol, Item } from '@mui-treasury/component-flex'
import Link from '@material-ui/core/Link'
import Box from '@material-ui/core/Box'
import Typography from '@material-ui/core/Typography'

import {
  ChevronLeft as ChevronLeftIcon,
  Menu as MenuIcon,
  Dashboard as DashboardIcon,
  Assignment as AssignmentIcon,
  Twitter as TwitterIcon,
  MoreVert as MoreVertIcon,
  FormatQuote as FormatQuoteIcon,
  MultilineChartTwoTone as MultilineChartTwoToneIcon,
} from '@material-ui/icons'

import { useQuery, gql } from '@apollo/client'
import CircularProgress from '@material-ui/core/CircularProgress'

const GET_TOPHASTAG = gql`
  {
    getTopHastags {
      hashtag_text
      countHastag
    }
  }
`
export default function TopHastags() {
  const { loading, error, data } = useQuery(GET_TOPHASTAG)

  if (error) return <p>Error</p>
  if (loading) return <CircularProgress />

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
            <b> Hastags</b>
          </Typography>
        </Item>
        <Item>Number of Hastags</Item>
        <Table size="small">
          <TableBody>
            {data.getTopHastags.map((hastag, index) => (
              <TableRow key={hastag.hashtag_text}>
                <TableCell># {hastag.hashtag_text}</TableCell>
                <TableCell align="right">{hastag.countHastag}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </FlexRow>
    </FlexCol>
  )
}
