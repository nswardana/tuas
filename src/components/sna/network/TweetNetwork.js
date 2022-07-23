import React from 'react'
import Typography from '@material-ui/core/Typography'
import Card from '@material-ui/core/Card'
import CardHeader from '@material-ui/core/CardHeader'
import IconButton from '@material-ui/core/IconButton'
import { Item } from '@mui-treasury/component-flex'

import { MoreVert as MoreVertIcon } from '@material-ui/icons'
import CircularProgress from '@material-ui/core/CircularProgress'

import { Graph } from 'react-d3-graph'
import { useQuery, gql } from '@apollo/client'

const GET_TWEET_REL = gql`
  query getTrack($project_id: Int) {
    getTweetNetwork(project_id: $project_id) {
      node_id
      tweet
      type_rel
      node_start
      node_end
      conversation_id
    }
  }
`

import { useHistory } from 'react-router-dom'

export default function TweetNetwork() {
  const history = useHistory()

  var project_id = sessionStorage.getItem('project_id')
  console.log('TweetNetwork project_id ')
  console.log(project_id)

  const nodeQuery = useQuery(GET_TWEET_REL, {
    variables: { project_id: parseInt(project_id) },
  })

  const error = nodeQuery.error
  const loading = nodeQuery.loading

  if (error) return <p>Error</p>
  if (loading) return <CircularProgress />

  // graph payload (with minimalist structure)

  var nodes = []
  var links = []

  console.log('nodeQuery')
  console.log(nodeQuery.data.getTweetNetwork)

  const generateKey = (pre) => {
    return `${pre}_${new Date().getTime()}`
  }

  nodeQuery.data.getTweetNetwork.map(
    ({ type_rel, node_start, node_end, conversation_id }) => {
      if (!nodes.some(({ id }) => id == node_end)) {
        nodes.push({
          id: node_end,
          color: '#FE7A15',
          strokeColor: '#205072',
          size: 200,
          //label: tweet,
          label: '',
          fontSize: 10,
          type: 'tweet',
          node_type: 'tweet',
          conversation_id: conversation_id,
          svg:
            'https://w7.pngwing.com/pngs/239/740/png-transparent-twitter-logo-icon-twitter-file-logo-social-media-news-thumbnail.png',
        })
      }

      if (
        !links.some(
          ({ source, target, label }) =>
            source == node_start && target == node_end && label == type_rel
        )
      ) {
        var type_curve = 'CURVE_SMOOTH'
        if (type_rel === 'REPLY') type_curve = 'CURVE_FULL'
        if (type_rel === 'MENTIONS' || type_rel === 'POST')
          type_curve = 'STRAIGHT'

        if (type_rel === 'MENTIONS') {
          links.push({
            key: generateKey(node_start),
            source: node_end,
            target: node_start,
            label: type_rel,
            type: type_curve,
          })
        } else {
          links.push({
            key: generateKey(node_start),
            source: node_start,
            target: node_end,
            label: type_rel,
            type: type_curve,
          })
        }
      }
    }
  )

  /*
  const uniqueIds = []
  uniqueNodes = nodes.filter((node) => {
    const isDuplicate = uniqueIds.includes(node.id)
    if (!isDuplicate) {
      uniqueIds.push(node.id)
      return true
    }
    return false
  })
 */
  const data = {
    nodes: nodes,
    links: links,
  }
  console.log('data')
  console.log(data)

  // the graph configuration, just override the ones you need
  const myConfig = {
    d3: {
      alphaTarget: 0.05,
      gravity: -230,
      linkLength: 100,
      linkStrength: 1,
      disableLinkForce: false,
    },
    nodeHighlightBehavior: true,
    directed: true,
    node: {
      highlightStrokeColor: '#FE7A15',
      labelProperty: 'label',
      fontSize: 10,
      fontWeight: 'bold',
      labelPosition: 'left',
      highlightFontWeight: 'bold',
      highlightFontSize: '10',
      highlightColor: '#FE7A15',
    },
    link: {
      highlightColor: '#FE7A15',
      labelProperty: 'label',
      renderLabel: true,
      highlightFontSize: '10',
      highlightFontWeight: 'bold',
      strokeLinecap: 'round',
    },
  }

  const onClickNode = function (nodeId, node) {
    console.log('onClickNode')
    console.log(node)

    if (node.conversation_id != null && node.conversation_id !== undefined) {
      var tweet_conv =
        'https://twitter.com/EnableNick/status/' + node.conversation_id
      window.open(tweet_conv, '_blank')
    }

    if (node.user_id != null && node.user_id !== undefined) {
      history.push('/twitteruserdetail/' + node.user_id)
    }
  }

  return (
    <React.Fragment>
      {/* TwitterUser */}
      <Card>
        <CardHeader
          avatar={
            <Item grow mr={1}>
              <Typography
                variant="h5"
                component="div"
                style={{ color: '#000' }}
              >
                Network Tweets
              </Typography>
            </Item>
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
        />
        ;
      </Card>
    </React.Fragment>
  )
}
