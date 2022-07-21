import React from 'react'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableRow from '@material-ui/core/TableRow'

import { FlexRow, FlexCol, Item } from '@mui-treasury/component-flex'
import Typography from '@material-ui/core/Typography'
import { useQuery, gql } from '@apollo/client'
import CircularProgress from '@material-ui/core/CircularProgress'

const GET_COMMUNITY = gql`
  query getQuery($project_id: Int) {
    getCommunityByProject(project_id: $project_id) {
      community_id
      countUser
    }
  }
`

export default function CommunityList() {
  var project_id = sessionStorage.getItem('project_id')
  console.log('CommunityList project_id ')
  console.log(project_id)

  const queryComm = useQuery(GET_COMMUNITY, {
    variables: { project_id: parseInt(project_id) },
  })

  console.log('queryComm')
  console.log(queryComm.data)

  if (queryComm.error) return <p>Error</p>
  if (queryComm.loading) return <CircularProgress />

  const userCountCommArr = [...queryComm.data.getCommunityByProject].sort(
    (a, b) => b.countUser - a.countUser
  )

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
            <b># Community</b>
          </Typography>
        </Item>
        <Item></Item>
        <Table size="small">
          <TableBody>
            <TableRow>
              <TableCell>
                <b># Community</b>
              </TableCell>
              <TableCell align="right">
                <b>Users</b>
              </TableCell>
            </TableRow>
            {userCountCommArr.map((comm, index) => (
              <TableRow key={index}>
                <TableCell>CommId {comm.community_id}</TableCell>
                <TableCell align="right">{comm.countUser}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </FlexRow>
    </FlexCol>
  )
}
