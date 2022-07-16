import React from 'react'
import { Switch, Route, BrowserRouter as Router } from 'react-router-dom'
import UserList from './components/UserList'
import clsx from 'clsx'
import { createTheme, ThemeProvider } from '@material-ui/core/styles'

import { makeStyles } from '@material-ui/core/styles'

import {
  CssBaseline,
  Drawer,
  Box,
  AppBar,
  Toolbar,
  List,
  Typography,
  Divider,
  IconButton,
  Container,
  Link as MUILink,
  ListItem,
  ListItemText,
  ListItemIcon,
  ListSubheader,
} from '@material-ui/core'
import { Link, useLocation } from 'react-router-dom'

import {
  ChevronLeft as ChevronLeftIcon,
  Menu as MenuIcon,
  Dashboard as DashboardIcon,
  Assignment as AssignmentIcon,
  People as PeopleIcon,
  FormatQuote as FormatQuoteIcon,
  SettingsEthernet as SettingsEthernetIcon,
  Textsms as TextsmsIcon,
  Style as StyleIcon,
  Timeline as TimelineIcon,
  Autorenew as AutorenewIcon,
  SelectAll as MoreTimeIcon,
} from '@material-ui/icons'

import EditIcon from '@material-ui/icons/Edit'

import Menu from './Menu'
import RouterItem from './RouterItem'

/* SNA*/
import Overview from './components/sna/overview/Overview'
import TweetsContent from './components/sna/tweet/TweetsContent'
import WordsContent from './components/sna/WordsContent'
import UsersNetwork from './components/sna/UsersNetwork'
import WordsNetwork from './components/sna/WordsNetwork'
import WordsNetworkSigma from './components/sna/WordsNetworkSigma'
import UsersNetworkSigma from './components/sna/UsersNetworkSigma'
import UsersNetworkD3 from './components/sna/UsersNetworkD3'
import HastagsNetwork from './components/sna/HastagsNetwork'
import ChartTimeLine from './components/sna/ChartTimeLine'
import TwitterUserContent from './components/sna/user/TwitterUserContent'
import TwitterUserDetailContent from './components/sna/user/TwitterUserDetailContent'

import SentimentContent from './components/SentimentContent'
import ProjectAutomatic from './components/ProjectAutomaticList'

import UsersTweetNetworkSigma from './components/sna/UsersTweetNetworkSigma'

const drawerWidth = 240
const useStyles = makeStyles((theme) => ({
  palette: {
    primary: '#1769aa',
    secondary: '#DDB27C',
  },
  root: {
    display: 'flex',
  },
  toolbar: {
    paddingRight: 24, // keep right padding when drawer closed
  },
  toolbarIcon: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: '0 8px',
    ...theme.mixins.toolbar,
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: 36,
  },
  menuButtonHidden: {
    display: 'none',
  },
  title: {
    flexGrow: 1,
  },
  drawerPaper: {
    position: 'relative',
    whiteSpace: 'nowrap',
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerPaperClose: {
    overflowX: 'hidden',
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    width: theme.spacing(7),
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing(9),
    },
  },
  appBarSpacer: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    height: '100vh',
    overflow: 'auto',
  },
  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
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
  navLink: {
    textDecoration: 'none',
    color: 'inherit',
  },
  appBarImage: {
    maxHeight: '70px',
    paddingRight: '20px',
  },
}))

export default function App() {
  const classes = useStyles()
  const [open, setOpen] = React.useState(true)
  const handleDrawerOpen = () => {
    setOpen(true)
  }
  const handleDrawerClose = () => {
    setOpen(false)
  }

  const [selectedIndex, setSelectedIndex] = React.useState(1)
  const handleListItemClick = (event, index) => {
    setSelectedIndex(index)
  }

  return (
    <Router>
      <div className={classes.root} style={{ height: '100%' }}>
        <CssBaseline />
        <AppBar
          position="absolute"
          className={clsx(classes.appBar, open && classes.appBarShift)}
          style={{ background: '#12939A' }}
        >
          <Toolbar className={classes.toolbar}>
            <IconButton
              edge="start"
              color="inherit"
              aria-label="open drawer"
              onClick={handleDrawerOpen}
              className={clsx(
                classes.menuButton,
                open && classes.menuButtonHidden
              )}
            >
              <MenuIcon />
            </IconButton>
            <img
              className={classes.appBarImage}
              src="img/sna.png"
              alt="Social Network logo"
            />
            <Typography
              component="h1"
              variant="h6"
              color="inherit"
              noWrap
              className={classes.title}
            >
              TOSCA Universal Analytic Social Media
            </Typography>
          </Toolbar>
        </AppBar>
        <Drawer
          variant="permanent"
          classes={{
            paper: clsx(classes.drawerPaper, !open && classes.drawerPaperClose),
          }}
          open={open}
        >
          <div className={classes.toolbarIcon}>
            <IconButton onClick={handleDrawerClose}>
              <ChevronLeftIcon />
            </IconButton>
          </div>
          <Menu className={classes} />
        </Drawer>
        <main className={classes.content}>
          <div className={classes.appBarSpacer} />
          <RouterItem className={classes} />
        </main>
      </div>
    </Router>
  )
}
