import React from 'react'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'

import { FlexRow, FlexCol, Item } from '@mui-treasury/component-flex'
import Typography from '@material-ui/core/Typography'

import { useQuery, gql } from '@apollo/client'
import CircularProgress from '@material-ui/core/CircularProgress'

const GET_HASTAGUSERCOUNT = gql`
  {
    getHastagsUsersCount {
      hastag
      tweet_count
      user_count
      tweets_per_user
    }
  }
`
export default function TopHastags() {
  const { loading, error, data } = useQuery(GET_HASTAGUSERCOUNT)

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
            {data.getHastagsUsersCount.map((hastag, index) => (
              <TableRow key={index}>
                <TableCell># {hastag.hastag}</TableCell>
                <TableCell align="right">{hastag.tweet_count}</TableCell>
                <TableCell align="right">{hastag.user_count}</TableCell>
                <TableCell align="right">
                  {hastag.tweets_per_user.toLocaleString(undefined, {
                    maximumFractionDigits: 2,
                  })}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </FlexRow>
    </FlexCol>
  )
}
