import React from 'react'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import CircularProgress from '@material-ui/core/CircularProgress'

import Button from '@material-ui/core/Button'
import { useQuery, gql } from '@apollo/client'
import { useHistory, useLocation } from 'react-router-dom'

import Title from './Title'

import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import CardHeader from '@material-ui/core/CardHeader'
import IconButton from '@material-ui/core/IconButton'
import moment from 'moment'
import { SelectedProjectContext } from './GlobalParams'
/*
const GET_PROJECTS = gql`
  {
    getAllProject {
      project_id
      title
      socialmedia
      keywords
      project_type
      status
    }
  }
`
*/

export const GET_PROJECTS = gql`
  query getProjectByMode($project_type: String) {
    projects(where: { project_type: $project_type }) {
      project_id
      title
      socialmedia
      keywords
      project_type
      fromDate
      toDate
      status
    }
  }
`

import Typography from '@material-ui/core/Typography'
import {
  ChevronLeft as ChevronLeftIcon,
  Menu as MenuIcon,
  Dashboard as DashboardIcon,
  Assignment as AssignmentIcon,
  Twitter as TwitterIcon,
  MoreVert as MoreVertIcon,
  FormatQuote as FormatQuoteIcon,
  TableChart as TableChartIcon,
  Close as CloseIcon,
  CropRotate as CropRotateIcon,
} from '@material-ui/icons'

export default function ProjectListComponent() {
  const location = useLocation()
  const history = useHistory()
  var pathname = location.pathname

  console.log('pathname')
  console.log(pathname)

  var project_mode = 'REQUEST'
  if (pathname == '/projectautomatic') project_mode = 'AUTOMATIC'

  console.log('project_mode')
  console.log(project_mode)

  const { loading, error, data } = useQuery(GET_PROJECTS, {
    variables: { project_type: project_mode },
  })

  if (error) return <p>Error</p>
  if (loading) return <CircularProgress />

  function createProjectState() {
    history.push('/createproject')
  }

  function ShowButtonStatus(Status) {
    const varStatus = Status
    if (varStatus == 'ON GOING')
      return (
        <Button
          startIcon={<CropRotateIcon />}
          size="small"
          variant="outlined"
          style={{ background: '#4caf50', color: '#FFFFFF' }}
        >
          {varStatus}
        </Button>
      )
    else if (varStatus == 'CLOSED')
      return (
        <Button
          startIcon={<CloseIcon />}
          size="small"
          variant="outlined"
          style={{ background: '#ef5350', color: '#FFFFFF' }}
        >
          {varStatus}
        </Button>
      )
    else return <Button variant="outlined">{varStatus}</Button>
  }

  function selectRowProject(project) {
    console.log(project)
    setProjectIdProvider(project)
    history.push('/overview')
  }

  function setProjectIdProvider(project) {
    return (
      <SelectedProjectContext.Provider
        value={project}
      ></SelectedProjectContext.Provider>
    )
  }

  function ShowButtonCreateProject() {
    const location = useLocation()
    var pathname = location.pathname
    console.log('pathname')
    console.log(pathname)

    if (pathname == '/project')
      return (
        <Button
          variant="contained"
          size="small"
          color="secondary"
          startIcon={<AssignmentIcon />}
          onClick={createProjectState}
        >
          Create New Analytic
        </Button>
      )
  }

  return (
    <React.Fragment>
      <Card>
        <CardHeader
          avatar={
            <Typography
              variant="h6"
              component="div"
              style={{ color: '#12939A' }}
            >
              <TableChartIcon /> List of Projects
            </Typography>
          }
          action={ShowButtonCreateProject()}
          style={{ background: '#ECEFF1' }}
        />
        <CardContent>
          <Table size="small">
            <TableHead>
              <TableRow>
                <TableCell>Project Name</TableCell>
                <TableCell>Media Social</TableCell>
                <TableCell>Keywords</TableCell>
                <TableCell>Date</TableCell>
                <TableCell>Mode</TableCell>
                <TableCell>Status</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data.projects.map((project, index) => (
                <TableRow key={index} onClick={() => selectRowProject(project)}>
                  <TableCell>{project.title}</TableCell>
                  <TableCell>
                    <TwitterIcon style={{ color: '#4DD0E1' }} />
                    Twitter
                  </TableCell>
                  <TableCell>{project.keywords}</TableCell>
                  <TableCell>
                    {moment(project.fromDate).format('DD/MM/YYYY')} -
                    {moment(project.toDate).format('DD/MM/YYYY')}
                  </TableCell>
                  <TableCell>{project.project_type}</TableCell>
                  <TableCell>{ShowButtonStatus(project.status)}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </React.Fragment>
  )
}
