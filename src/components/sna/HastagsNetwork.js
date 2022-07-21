import React from 'react'
import { Grid } from '@material-ui/core'

import Typography from '@material-ui/core/Typography'
import Card from '@material-ui/core/Card'
import CardHeader from '@material-ui/core/CardHeader'
import IconButton from '@material-ui/core/IconButton'

import { MoreVert as MoreVertIcon } from '@material-ui/icons'

import { Graph } from 'react-d3-graph'

export default function Words() {
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
                  # Hastags Network
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
