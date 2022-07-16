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

import { useQuery, gql } from '@apollo/client'
import Title from './Title'
import moment from 'moment'
import CircularProgress from '@material-ui/core/CircularProgress'

import {
  ChevronLeft as ChevronLeftIcon,
  Menu as MenuIcon,
  Dashboard as DashboardIcon,
  Assignment as AssignmentIcon,
  Twitter as TwitterIcon,
  MoreVert as MoreVertIcon,
  People as PeopleIcon,
} from '@material-ui/icons'

import {
  ForceGraph,
  ForceGraphNode,
  ForceGraphLink,
  ForceGraphArrowLink,
} from 'react-vis-force'

import lesMisJSON from './les-miserables.json'

const GET_ALL_USER = gql`
  {
    getAllUser {
      id
      username
      screen_name
    }
  }
`

export default function UsersNetwork() {
  const { loading, error, data } = useQuery(GET_ALL_USER)

  if (error) return <p>Error</p>
  if (loading) return <CircularProgress />

  const theme = useTheme()
  const useStyles = makeStyles((theme) => ({
    root: {
      display: 'flex',
    },
    paper: {
      padding: theme.spacing(2),
      display: 'flex',
      overflow: 'auto',
      flexDirection: 'column',
    },
    fixedHeight: {
      height: 240,
    },
  }))

  const classes = useStyles(theme)
  const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight)

  console.log(lesMisJSON)

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
                  <PeopleIcon /> User Network
                </Typography>
              }
              action={
                <IconButton aria-label="settings">
                  <MoreVertIcon />
                </IconButton>
              }
            />
            <ForceGraph>
              {lesMisJSON.nodes.map((node, index) => (
                <ForceGraphNode
                  key={node.id}
                  fill="#47d3d9"
                  node={{ ...node, radius: 5 }}
                />
              ))}
              {lesMisJSON.links.map((link, index) => (
                <ForceGraphLink
                  key={`${link.source}=>${link.target}`}
                  link={{ ...link, value: 2 }}
                />
              ))}
            </ForceGraph>
          </Card>
        </Grid>
      </Grid>
    </React.Fragment>
  )
}
