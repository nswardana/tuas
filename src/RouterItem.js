import React from 'react'
import { Switch, Route, BrowserRouter as Router } from 'react-router-dom'

/* SNA*/
import Overview from './components/sna/overview/Overview'
import TweetsContent from './components/sna/tweet/TweetsContent'
import WordsContent from './components/sna/WordsContent'
import UserTweetNetworkContent from './components/sna/network/UserTweetNetworkContent'
import TweetNetworkContent from './components/sna/network/TweetNetworkContent'

import HastagsNetwork from './components/sna/HastagsNetwork'
import TwitterUserContent from './components/sna/user/TwitterUserContent'
import TwitterUserDetailContent from './components/sna/user/TwitterUserDetailContent'

import SentimentContent from './components/SentimentContent'
import ProjectAutomatic from './components/ProjectAutomaticList'
import ProjectFormCreate from './components/ProjectFormCreate'
import UserList from './components/UserList'
import ProjectList from './components/ProjectList'
import ChartTimeLine from './components/sna/timeline/ChartTimeLine'
import Graph from './components/Graph'
import ReactForceGraph from './components/ReactForceGraph'

import { Box, Typography, Container, Link as MUILink } from '@material-ui/core'

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <MUILink color="inherit" href="">
        TOSCA Universal Analytic Social Media
      </MUILink>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  )
}

export default function RouterItem({ className = '' }) {
  const classes = className
  return (
    <React.Fragment>
      <Container maxWidth="lg" className={classes.container}>
        <Switch>
          <Route exact path="/createproject" component={ProjectFormCreate} />
          <Route exact path="/businesses" component={UserList} />
          <Route exact path="/users" component={UserList} />
          <Route exact path="/project" component={ProjectList} />
          <Route exact path="/projectautomatic" component={ProjectAutomatic} />
          <Route exact path="/Graph" component={Graph} />
          <Route exact path="/overview" component={Overview} />
          <Route exact path="/tweets" component={TweetsContent} />
          <Route exact path="/twitteruser" component={TwitterUserContent} />
          <Route
            exact
            path="/twitteruserdetail/:id"
            component={TwitterUserDetailContent}
          />
          <Route
            exact
            path="/usertweetnetwork"
            component={UserTweetNetworkContent}
          />
          <Route exact path="/tweetnetwork" component={TweetNetworkContent} />

          <Route exact path="/words" component={WordsContent} />
          <Route exact path="/hastagsnetwork" component={HastagsNetwork} />
          <Route exact path="/timeline" component={ChartTimeLine} />
          <Route exact path="/react-force-graph" component={ReactForceGraph} />
        </Switch>
        <Box pt={4}>
          <Copyright />
        </Box>
      </Container>
    </React.Fragment>
  )
}
