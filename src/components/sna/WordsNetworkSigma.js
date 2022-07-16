import React from 'react'
import { useEffect, useState } from 'react'
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

import Graph from 'graphology'
import {
  Sigma,
  SigmaContainer,
  RandomizeNodePositions,
  RelativeSize,
  ZoomControl,
  DragNodes,
  NOverlap,
  LoadJSON,
} from 'react-sigma'

import {
  ChevronLeft as ChevronLeftIcon,
  Menu as MenuIcon,
  Dashboard as DashboardIcon,
  Assignment as AssignmentIcon,
  Twitter as TwitterIcon,
  MoreVert as MoreVertIcon,
  People as PeopleIcon,
} from '@material-ui/icons'

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

  let myGraph = {
    nodes: [
      { id: 'n1', label: 'Alice', size: 15 },
      { id: 'n2', label: 'Rabbit', size: 30 },
    ],
    edges: [{ id: 'e1', source: 'n1', target: 'n2', label: 'SEES' }],
  }

  return (
    <React.Fragment>
      {/* TwitterUser */}
      <Grid container spacing={4}>
        <Grid item xs={12}>
          <Card>
            <CardHeader
              avatar={
                <Typography variant="h5" component="div">
                  <PeopleIcon /> Words Network
                </Typography>
              }
              action={
                <IconButton aria-label="settings">
                  <MoreVertIcon />
                </IconButton>
              }
            />
            <Sigma
              settings={{
                batchEdgesDrawing: true,
                defaultLabelColor: '#777',
                defaultLabelSize: 20,
                defaultNodeColor: '#3388AA',
                drawEdgeLabels: false,
                drawEdges: true,
                hoverFontStyle: 'text-size: 11',
                labelThreshold: 12,
                animationsTime: 6000,
                drawLabels: true,
              }}
              style={{
                height: '400px',
                maxWidth: 'inherit',
                background: '#0333',
              }}
            >
              <LoadJSON path="./upwork.json">
                <RelativeSize initialSize={15} />
                <DragNodes
                  onDrag={function noRefCheck() {}}
                  onDragend={function noRefCheck() {}}
                  onDrop={function noRefCheck() {}}
                  onStartdrag={function noRefCheck() {}}
                />

                <NOverlap
                  duration={1000}
                  easing="quadraticInOut"
                  gridSize={40}
                  maxIterations={100}
                  nodeMargin={20}
                  scaleNodes={10}
                  speed={10}
                />
              </LoadJSON>
            </Sigma>
          </Card>
        </Grid>
      </Grid>
    </React.Fragment>
  )
}
