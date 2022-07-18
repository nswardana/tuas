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
  query getQuery($project_id: Int) {
    getHastagsUsersCountByProject(project_id: $project_id) {
      hastag
      tweet_count
      user_count
      tweets_per_user
    }
  }
`

export default function HastagUserCount() {
  var project_id = sessionStorage.getItem('project_id')
  console.log('TopHastags project_id ')
  console.log(project_id)

  const { loading, error, data } = useQuery(GET_HASTAGUSERCOUNT, {
    variables: { project_id: parseInt(project_id) },
  })

  const userCountArr = [...data.getHastagsUsersCountByProject].sort(
    (a, b) => b.tweet_count - a.tweet_count
  )

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
        <Table size="small">
          <TableHead>
            <TableCell>Hastag</TableCell>
            <TableCell>Tweets</TableCell>
            <TableCell>Users</TableCell>
            <TableCell>Tweet/ User</TableCell>
          </TableHead>
          <TableBody>
            {userCountArr.map((hastag, index) => (
              <TableRow key={index}>
                <TableCell># {hastag.hastag}</TableCell>
                <TableCell align="right">{hastag.tweet_count}</TableCell>
                <TableCell align="right">{hastag.user_count}</TableCell>
                <TableCell align="right">
                  {(hastag.tweet_count / hastag.user_count).toLocaleString(
                    undefined,
                    {
                      maximumFractionDigits: 2,
                    }
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </FlexRow>
    </FlexCol>
  )
}
