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

  // graph payload (with minimalist structure)
  const data = {
    nodes: [
      { id: 'Hendrayanto' },
      { id: 'Sally' },
      { id: 'Alice' },

      { id: 'Nanang' },
      { id: 'Dhirar' },
      { id: 'Darwis' },
      { id: 'Zaini' },
      { id: 'Izbiq' },

      { id: 'Mantan SUZ' },
    ],
    links: [
      { source: 'Hendrayanto', target: 'Sally' },
      { source: 'Hendrayanto', target: 'Alice' },

      { source: 'Hendrayanto', target: 'Mantan SUZ' },
      { source: 'Nanang', target: 'Mantan SUZ' },
      { source: 'Dhirar', target: 'Mantan SUZ' },
      { source: 'Darwis', target: 'Mantan SUZ' },
      { source: 'Zaini', target: 'Mantan SUZ' },
      { source: 'Izbiq', target: 'Mantan SUZ' },
    ],
  }

  // the graph configuration, just override the ones you need
  const myConfig = {
    automaticRearrangeAfterDropNode: true,
    collapsible: false,
    directed: false,
    height: 600,
    highlightDegree: 1,
    highlightOpacity: 1,
    linkHighlightBehavior: false,
    maxZoom: 8,
    minZoom: 0.1,
    focusZoom: 1,
    focusAnimationDuration: 0.75,
    nodeHighlightBehavior: true,
    panAndZoom: false,
    staticGraph: false,
    width: 800,
    d3: {
      alphaTarget: 0.05,
      gravity: -300,

      linkStrength: 1,
    },
    node: {
      color: '#7ED321',
      fontColor: 'black',
      fontSize: 12,
      fontWeight: 'normal',
      highlightColor: 'SAME',
      highlightFontSize: 8,
      highlightFontWeight: 'normal',
      highlightStrokeColor: 'SAME',
      highlightStrokeWidth: 1.5,
      labelProperty: 'label',
      mouseCursor: 'pointer',
      opacity: 1,
      renderLabel: true,
      size: 400,
      strokeColor: 'none',
      strokeWidth: 1.5,
      svg: '',
      symbolType: 'circle',
    },
    link: {
      color: '#7ED321',
      highlightColor: '#EEEEEE',
      mouseCursor: 'pointer',
      opacity: 1,
      semanticStrokeWidth: false,
      strokeWidth: 1.5,
    },
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
            <Graph
              id="graph-id" // id is mandatory
              data={data}
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
