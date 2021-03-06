import React from 'react'
import { Grid } from '@material-ui/core'
import Typography from '@material-ui/core/Typography'
import Card from '@material-ui/core/Card'
import CardHeader from '@material-ui/core/CardHeader'
import IconButton from '@material-ui/core/IconButton'
import { Item } from '@mui-treasury/component-flex'

import { MoreVert as MoreVertIcon } from '@material-ui/icons'
import CircularProgress from '@material-ui/core/CircularProgress'

import { Graph } from 'react-d3-graph'
import { useQuery, gql } from '@apollo/client'

const GET_USER_TWEET_REL = gql`
  query getTrack($community_id: Int) {
    getUserAndTweetByCommunityId(community_id: $community_id) {
      node_id
      screen_name
      name
      username
      tweet_id
      tweet
      type_rel
      node_start
      node_end
      community_id
      profile_image_url
      conversation_id
      user_id
    }
  }
`

import { useHistory } from 'react-router-dom'

export default function UserCommunityNetwork(ObjComId) {
  const history = useHistory()

  var commId = parseInt(ObjComId.community_id)
  console.log('community_id ' + commId)

  const nodeQuery = useQuery(GET_USER_TWEET_REL, {
    variables: { community_id: commId },
  })

  const error = nodeQuery.error
  const loading = nodeQuery.loading

  if (error) return <p>Error</p>
  if (loading) return <CircularProgress />

  // graph payload (with minimalist structure)
  var nodes = []
  var links = []

  console.log('nodeQuery')
  console.log(nodeQuery.data.getUserAndTweetByCommunityId)

  const generateKey = (pre) => {
    return `${pre}_${new Date().getTime()}`
  }

  nodeQuery.data.getUserAndTweetByCommunityId.map(
    ({
      user_id,
      name,
      profile_image_url,
      node_start,
      node_end,
      type_rel,
      index,
      conversation_id,
    }) => {
      var imgIcon =
        'https://toppng.com/public/uploads/thumbnail/business-loans-person-icon-png-red-11563187772c5f6v57lng.png'
      if (profile_image_url !== null) imgIcon = profile_image_url

      if (!nodes.some(({ id }) => id == node_start)) {
        nodes.push({
          id: node_start,
          color: '#2D82B5',
          strokeColor: '#015C92',
          svg: imgIcon,
          label: name,
          size: 400,
          index: index,
          fontSize: 10,
          node_type: 'user',
          user_id: user_id,
        })
      }
      if (!nodes.some(({ id }) => id == node_end)) {
        nodes.push({
          id: node_end,
          color: '#FE7A15',
          strokeColor: '#205072',
          size: 200,
          //label: tweet,
          label: '',
          index: index,
          fontSize: 10,
          node_type: 'tweet',
          conversation_id: conversation_id,
          svg:
            'https://w7.pngwing.com/pngs/239/740/png-transparent-twitter-logo-icon-twitter-file-logo-social-media-news-thumbnail.png',
        })
      }

      if (
        !links.some(
          ({ source, target }) => source == node_start && target == node_end
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
    automaticRearrangeAfterDropNode: true,
    collapsible: true,
    height: window.innerHeight,
    highlightDegree: 2,
    highlightOpacity: 0.2,
    nodeHighlightBehavior: true,
    directed: true,

    d3: {
      alphaTarget: 0.05,
      gravity: -230,
      linkLength: 100,
      linkStrength: 1,
      disableLinkForce: false,
    },
    node: {
      highlightStrokeColor: '#FE7A15',
      labelProperty: 'label',
      fontSize: 10,
      fontWeight: 'bold',
      renderLabel: true,
      highlightFontSize: 13,
      highlightFontWeight: 'bold',
      labelPosition: 'left',
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
      <Grid container spacing={4}>
        <Grid item xs={12}>
          <Card>
            <CardHeader
              avatar={
                <Item grow mr={1}>
                  <Typography
                    variant="h5"
                    component="div"
                    style={{ color: '#000' }}
                  >
                    Network Community
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
              onClickNode={onClickNode}
              config={myConfig}
            />
            ;
          </Card>
        </Grid>
      </Grid>
    </React.Fragment>
  )
}
