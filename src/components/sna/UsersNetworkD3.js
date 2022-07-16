import React from 'react'
import { useTheme } from '@material-ui/core/styles'
import { Grid, Paper } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import clsx from 'clsx'

import Avatar from '@material-ui/core/Avatar'
import Typography from '@material-ui/core/Typography'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import CardHeader from '@material-ui/core/CardHeader'
import IconButton from '@material-ui/core/IconButton'

import {
  ChevronLeft as ChevronLeftIcon,
  Menu as MenuIcon,
  Dashboard as DashboardIcon,
  Assignment as AssignmentIcon,
  Twitter as TwitterIcon,
  MoreVert as MoreVertIcon,
  People as PeopleIcon,
} from '@material-ui/icons'

import { Graph } from 'react-d3-graph'

import { useQuery, gql } from '@apollo/client'
import CircularProgress from '@material-ui/core/CircularProgress'

const GET_ALL_USER = gql`
  {
    getAllUser {
      id
      username
      screen_name
    }
  }
`

export default function UsersNetworkD3() {
  const { loading, error, data } = useQuery(GET_ALL_USER)

  if (error) return <p>Error</p>
  if (loading) return <CircularProgress />

  console.log('data')
  console.log(data)

  const NodeUser = data.getAllUser.map(({ id, username, screen_name }) => ({
    id: username,
    label: username,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: 10,
    color: '#008cc2',
  }))
  // graph payload (with minimalist structure)
  const dataNodeUser = {
    nodes: NodeUser,
    links: [],
  }

  // the graph configuration, just override the ones you need
  const myConfig = {
    nodeHighlightBehavior: true,
    node: {
      color: 'red',
      size: 240,
      highlightStrokeColor: 'blue',
    },
    link: {
      highlightColor: 'lightblue',
    },
    linkHighlightBehavior: true,
    maxZoom: 12,
    minZoom: 0.05,
    panAndZoom: false,
    staticGraph: false,
    collapsible: true,
    focusZoom: 4,
  }

  const onClickNode = function (nodeId) {
    window.alert(`Clicked node ${nodeId}`)
  }

  const onClickLink = function (source, target) {
    window.alert(`Clicked link between ${source} and ${target}`)
  }

  return (
    <React.Fragment>
      {/* TwitterUser */}
      <Grid container spacing={4}>
        <Grid item xs={12}>
          <Card>
            <CardHeader
              avatar={
                <Typography
                  variant="h5"
                  component="div"
                  style={{ color: '#12939A' }}
                >
                  # Users Network
                </Typography>
              }
              action={
                <IconButton aria-label="settings">
                  <MoreVertIcon />
                </IconButton>
              }
            />
            <Graph
              id="graph-id" // id is mandatory
              data={dataNodeUser}
              config={myConfig}
              onClickNode={onClickNode}
              onClickLink={onClickLink}
            />
            ;
          </Card>
        </Grid>
      </Grid>
    </React.Fragment>
  )
}
