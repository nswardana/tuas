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

const GET_TOPHASTAG = gql`
  query getHastaqs($project_id: Int) {
    getTopHastagsByProject(project_id: $project_id) {
      hashtag_text
      countHastag
    }
  }
`

export default function TopHastags() {
  var project_id = sessionStorage.getItem('project_id')
  console.log('TopHastags project_id ')
  console.log(project_id)

  const userCountHastag = useQuery(GET_TOPHASTAG, {
    variables: { project_id: parseInt(project_id) },
  })

  console.log('userCountHastag')
  console.log(userCountHastag.data)

  if (userCountHastag.errors) return <p>Error</p>
  if (userCountHastag.loading) return <CircularProgress />

  const userCountHastagArr = [
    ...userCountHastag.data.getTopHastagsByProject,
  ].sort((a, b) => b.countHastag - a.countHastag)

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
            <b># Hastags</b>
          </Typography>
        </Item>
        <Item></Item>
        <Table size="small">
          <TableBody>
            <TableRow>
              <TableCell>
                <b># Hastag</b>
              </TableCell>
              <TableCell align="right">
                <b>Number</b>
              </TableCell>
            </TableRow>
            {userCountHastagArr.map((hastag, index) => (
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
