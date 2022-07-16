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

const GET_ALL_USER_TWEET = gql`
  {
    getUserAndTweet {
      user_id
      username
      screen_name
      tweet_id
      tweet
      type_rel
      node_start
      node_end
    }
  }
`

import userIcon from './icons/user.png'

export default function UsersTweetNetwork() {
  var userEmail = ''
  const user = useQuery(GET_ALL_USER_TWEET)

  const errors = user.error
  const loading = user.loading

  if (errors) return <p>Error</p>
  if (loading) return <CircularProgress />

  console.log('data')
  console.log(user.data)

  let graphData = {
    nodes: [],
    edges: [],
  }

  const userArr = user.data.getUserAndTweet.map(
    ({
      user_id,
      username,
      screen_name,
      name,
      tweet_id,
      tweet,
      node_start,
      node_end,
      type_rel,
      index,
    }) =>
      graphData.nodes.push({
        id: user_id,
        label: username,
        x: 40 * Math.random(),
        y: 40 * Math.random(),
        size: 15,
        color: '#48bf53',
        borderColor: '#FF3333',
      })
  )

  user.data.getUserAndTweet.map(
    ({
      user_id,
      username,
      screen_name,
      name,
      tweet_id,
      tweet,
      node_start,
      node_end,
      type_rel,
      index,
    }) =>
      graphData.nodes.push({
        id: tweet_id,
        label: tweet,
        x: 40 * Math.random(),
        y: 40 * Math.random(),
        size: 8,
        color: '#F37413',
        borderColor: '#FF3333',
      })
  )

  user.data.getUserAndTweet.map(
    ({
      user_id,
      username,
      screen_name,
      name,
      tweet_id,
      tweet,
      node_start,
      node_end,
      type_rel,
      index,
    }) =>
      graphData.edges.push({
        id: Math.random(),
        source: node_start,
        target: node_end,
        size: 3,
        color: '#ff0000',
        neighborsOf: 'n' + ((Math.random() * 2) | 0),
        nodesBy: 'n' + ((Math.random() * 2) | 0),
        type: 'dotted',
      })
  )

  console.log('graphData')
  console.log(graphData)

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
              height: '400px',
              maxWidth: '800px',
              background: '#0333',
            }}
            graph={graphData}
          >
            <RelativeSize initialSize={15} />

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
        <Grid item xs={3}></Grid>
      </Grid>
    </React.Fragment>
  )
}
