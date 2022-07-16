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

import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import Button from '@material-ui/core/Button'

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
  ForceAtlas2,
} from 'react-sigma'

import ForceLink from 'react-sigma/lib/ForceLink'
import ZoomButtons from './ZoomButtons'

import {
  ChevronLeft as ChevronLeftIcon,
  Menu as MenuIcon,
  Dashboard as DashboardIcon,
  Assignment as AssignmentIcon,
  Twitter as TwitterIcon,
  MoreVert as MoreVertIcon,
  People as PeopleIcon,
} from '@material-ui/icons'

import { useQuery, useLazyQuery, gql } from '@apollo/client'
import Title from './Title'
import moment from 'moment'
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

const GET_RELATIONAL_USER = gql`
  {
    getAllUserRelations {
      node_start
      node_end
      label
    }
  }
`

const GET_COUNT_RELATIONAL_USER = gql`
  {
    getTopUserWithCountRel {
      id
      username
      screen_name
      countrel
    }
  }
`
import userIcon from './user.png'

export default function UsersNetwork() {
  var userEmail = ''
  const user = useQuery(GET_ALL_USER)
  const userrel = useQuery(GET_RELATIONAL_USER, {
    skip: user.loading,
  })

  const userCountRel = useQuery(GET_COUNT_RELATIONAL_USER, {
    skip: userrel.loading,
  })

  const errors = user.error || userrel.error || userCountRel.error
  const loading = user.loading || userrel.loading || userCountRel.loading

  if (errors) return <p>Error</p>
  if (loading) return <CircularProgress />

  console.log('data')
  console.log(user.data)

  console.log('dataRel')
  console.log(userrel.data)

  const userCountRelArr = [...userCountRel.data.getTopUserWithCountRel].sort(
    (a, b) => b.countrel - a.countrel
  )

  const userCountRelArr10 = userCountRelArr.slice(0, 10)

  const userCountRelArrObj = userCountRelArr10.map(
    ({ id, username, countrel }) => ({
      id: id,
      countrel: countrel,
      username: username,
    })
  )

  console.log(userCountRelArrObj)

  console.log('userCountRelArr')
  console.log(userCountRelArr)

  function setSizeNode(nodeId) {
    const found = userCountRelArr10.find((obj) => {
      return obj.id === nodeId
    })
    var sizeNode = 3
    var colorNode = '#008cc2'
    var typeIcon = 'image'
    var image = {
      url: userIcon,
      // scale/clip are ratio values applied on top of 'size'
      scale: 3,
      clip: 3,
      w: 24,
      h: 24,
    }

    if (typeof found != 'undefined')
      if (found.countrel > 10) {
        sizeNode = 15
        colorNode = '#d24e01'
        typeIcon = 'image'
        image = {
          url: userIcon,
          // scale/clip are ratio values applied on top of 'size'
          scale: 3,
          clip: 3,
          w: 24,
          h: 24,
        }
      }
    return {
      sizeNode: sizeNode,
      colorNode: colorNode,
      typeIcon: typeIcon,
      image: image,
    }
  }

  const NodeUser = user.data.getAllUser.map(
    ({ id, username, screen_name, index }) => ({
      id: id,
      label: screen_name,
      x: 100 * Math.cos((2 * 1 * Math.PI) / Math.random()),
      y: 100 * Math.cos((2 * 1 * Math.PI) / Math.random()),
      size: setSizeNode(id).sizeNode,
      color: setSizeNode(id).colorNode,
      type: 'image',
      image: setSizeNode(id).image,
      icon: {
        // icon object
        name: 'f007', // Fontawesome unicode
        color: '#171c1c', // Color of the font
        scale: 1.0, // Scale ratio
      },
    })
  )
  const rellUser = userrel.data.getAllUserRelations.map(
    ({ node_start, node_end, label }) => ({
      id: Math.random(),
      source: node_start,
      target: node_end,
      type: 'curve',
      label: label,
      color: '#DDD',
    })
  )

  var graph = { nodes: NodeUser, edges: rellUser }

  console.log('graph')
  console.log(graph)

  Sigma.bind(
    'overNode outNode clickNode doubleClickNode rightClickNode',
    function (e) {
      alert('')
      console.log(e.type, e.data.node.label, e.data.captor)
    }
  )

  return (
    <React.Fragment>
      {/* TwitterUser */}
      <Grid container spacing={4}>
        <Grid item xs={9}>
          <Sigma
            renderer="canvas"
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
              height: '1000px',
              Width: '1000px',
              backgroundColor: 'lightgray',
            }}
            graph={graph}
          >
            <RelativeSize initialSize={8} />

            <DragNodes
              onDrag={function noRefCheck() {}}
              onDragend={function noRefCheck() {}}
              onDrop={function noRefCheck() {}}
              onStartdrag={function noRefCheck() {}}
            />

            <ForceAtlas2 timeout={2000} worker />

            <Grid item xs={6}>
              &nbsp;&nbsp;
              <ZoomButtons
                style={{
                  margin: '0px',
                }}
              />
            </Grid>
          </Sigma>
        </Grid>
        <Grid item xs={3}>
          <Card>
            <CardHeader
              avatar={
                <Typography
                  variant="h5"
                  component="div"
                  style={{ color: '#12939A' }}
                >
                  <PeopleIcon /> User
                </Typography>
              }
              action={
                <IconButton aria-label="settings">
                  <MoreVertIcon />
                </IconButton>
              }
            />
            <CardContent>
              <Table size="small">
                <TableBody>
                  {userCountRelArr10.map((userArr, index) => (
                    <TableRow key={userArr.id}>
                      <TableCell> {userArr.screen_name}</TableCell>
                      <TableCell align="right">{userArr.countrel}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </React.Fragment>
  )
}
