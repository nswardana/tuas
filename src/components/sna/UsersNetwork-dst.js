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

import {
  ForceGraph,
  ForceGraphNode,
  ForceGraphLink,
  ForceGraphArrowLink,
} from 'react-vis-force'
import { scaleCategory20 } from 'd3-scale'
import lesMisJSON from './les-miserables.json'

export default function Words() {
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
  const scale = scaleCategory20()

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

            <ForceGraph simulationOptions={{ height: 300, animate: true }}>
              <ForceGraphNode
                node={{ id: 'first-node', radius: 5 }}
                fill="#11939A"
              />
              <ForceGraphNode
                node={{ id: 'second-node', radius: 10 }}
                fill="#47d3d9"
              />
              <ForceGraphNode
                node={{ id: 'third-node', radius: 15 }}
                fill="#11939A"
              />
              <ForceGraphNode
                node={{ id: 'fourth-node', radius: 15 }}
                fill="#47d3d9"
              />
              <ForceGraphNode
                node={{ id: 'fifth-node', radius: 5 }}
                fill="#11939A"
              />
              <ForceGraphNode
                node={{ id: 'sixth-node', radius: 15 }}
                fill="#47d3d9"
              />
              <ForceGraphNode
                node={{ id: 'seventh-node', radius: 10 }}
                fill="#11939A"
              />
              <ForceGraphNode
                node={{ id: 'eighth-node', radius: 5 }}
                fill="#47d3d9"
              />
              <ForceGraphNode
                node={{ id: 'ninth-node', radius: 5 }}
                fill="#11939A"
              />
              <ForceGraphNode
                node={{ id: 'tenth-node', radius: 5 }}
                fill="#47d3d9"
              />
              <ForceGraphArrowLink
                link={{ source: 'first-node', target: 'second-node' }}
              />
              <ForceGraphArrowLink
                link={{ source: 'third-node', target: 'second-node' }}
              />
              <ForceGraphArrowLink
                link={{ source: 'third-node', target: 'fourth-node' }}
              />
              <ForceGraphArrowLink
                link={{ source: 'fifth-node', target: 'fourth-node' }}
              />
              <ForceGraphArrowLink
                link={{ source: 'fifth-node', target: 'fourth-node' }}
              />
              <ForceGraphArrowLink
                link={{ source: 'sixth-node', target: 'fourth-node' }}
              />
              <ForceGraphArrowLink
                link={{ source: 'seventh-node', target: 'fourth-node' }}
              />
              <ForceGraphArrowLink
                link={{ source: 'eighth-node', target: 'fourth-node' }}
              />
              <ForceGraphArrowLink
                link={{ source: 'ninth-node', target: 'tenth-node' }}
              />
              <ForceGraphArrowLink
                link={{ source: 'tenth-node', target: 'fifth-node' }}
              />
            </ForceGraph>
          </Card>
        </Grid>
      </Grid>
    </React.Fragment>
  )
}
