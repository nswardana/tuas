import React from 'react'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import { useQuery, gql } from '@apollo/client'
import Title from './Title'

const GET_PERSONS = gql`
  {
    reviews(options: { limit: 10, sort: { date: DESC } }) {
      user {
        name
      }
      business {
        name
      }
      date
      text
      stars
    }
  }
`
export default function PersonListComponent() {
  const { loading, error, data } = useQuery(GET_PERSONS, { errorPolicy: 'all' })
  if (error) return <p>Error</p>
  if (loading) return <p>Loading</p>
  return (
    <React.Fragment>
      <Title style={{ color: '#12939A' }}>List of Project</Title>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>Nama</TableCell>
            <TableCell>Usia</TableCell>
          </TableRow>
        </TableHead>
      </Table>
    </React.Fragment>
  )
}
