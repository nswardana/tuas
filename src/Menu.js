import React from 'react'
import {
  List,
  Divider,
  ListItem,
  ListItemText,
  ListItemIcon,
  ListSubheader,
} from '@material-ui/core'
import { Link } from 'react-router-dom'

import {
  Assignment as AssignmentIcon,
  People as PeopleIcon,
  Autorenew as AutorenewIcon,
  SelectAll as MoreTimeIcon,
  Twitter as TwitterIcon,
  PeopleAlt as HubIcon,
  Language as LanguageIcon,
} from '@material-ui/icons'

//import HubIcon from '@mui/icons-material/Hub'

export default function Menu({ className = '' }) {
  var project_id = sessionStorage.getItem('project_id')
  console.log('TopHastags project_id ')
  console.log(project_id)

  const classes = className
  //const [setOpen] = React.useState(true)

  const [selectedIndex, setSelectedIndex] = React.useState(1)
  const handleListItemClick = (event, index) => {
    setSelectedIndex(index)
  }

  return (
    <React.Fragment>
      <List>
        <ListSubheader
          component="div"
          id="nested-list-subheader"
          style={{ background: '#FFF' }}
        >
          Analytic Mode
        </ListSubheader>
        <Divider />

        <Link
          to="/projectautomatic"
          className={classes.navLink}
          state={{ projectType: 'automatic' }}
        >
          <ListItem
            button
            selected={selectedIndex === 0}
            onClick={(event) => {
              return handleListItemClick(event, 0)
            }}
          >
            <ListItemIcon style={{ color: '#12939A' }}>
              <AutorenewIcon />
            </ListItemIcon>
            <ListItemText primary="Automatic Mode" />
          </ListItem>
        </Link>
        <Link to="/project" className={classes.navLink}>
          <ListItem
            button
            selected={selectedIndex === 1}
            onClick={(event) => {
              return handleListItemClick(event, 1)
            }}
          >
            <ListItemIcon style={{ color: '#12939A' }}>
              <MoreTimeIcon />
            </ListItemIcon>
            <ListItemText primary="Request Mode" />
          </ListItem>
        </Link>
      </List>
      <Divider />
      <ListSubheader
        component="div"
        id="nested-list-subheader"
        style={{ background: '#FFF' }}
      >
        Social Network Analyzer
      </ListSubheader>
      <Divider />
      <Link to="/overview" className={classes.navLink}>
        <ListItem
          button
          selected={selectedIndex === 2}
          onClick={(event) => {
            return handleListItemClick(event, 2)
          }}
        >
          <ListItemIcon style={{ color: '#12939A' }}>
            <AssignmentIcon />
          </ListItemIcon>
          <ListItemText primary="Overview" />
        </ListItem>
      </Link>

      <Link to="/twitteruser" className={classes.navLink}>
        <ListItem
          button
          selected={selectedIndex === 4}
          onClick={(event) => {
            return handleListItemClick(event, 4)
          }}
        >
          <ListItemIcon style={{ color: '#12939A' }}>
            <PeopleIcon />
          </ListItemIcon>
          <ListItemText primary="User" />
        </ListItem>
      </Link>

      <Link to="/tweets" className={classes.navLink}>
        <ListItem
          button
          selected={selectedIndex === 3}
          onClick={(event) => {
            return handleListItemClick(event, 3)
          }}
        >
          <ListItemIcon style={{ color: '#12939A' }}>
            <TwitterIcon />
          </ListItemIcon>
          <ListItemText primary="Tweets" />
        </ListItem>
      </Link>

      <Link to="/usertweetnetwork" className={classes.navLink}>
        <ListItem
          button
          selected={selectedIndex === 19}
          onClick={(event) => {
            return handleListItemClick(event, 19)
          }}
        >
          <ListItemIcon style={{ color: '#12939A' }}>
            <HubIcon />
          </ListItemIcon>
          <ListItemText primary="Network" />
        </ListItem>
      </Link>

      <Link to="/tweetnetwork" className={classes.navLink}>
        <ListItem
          button
          selected={selectedIndex === 29}
          onClick={(event) => {
            return handleListItemClick(event, 29)
          }}
        >
          <ListItemIcon style={{ color: '#12939A' }}>
            <LanguageIcon />
          </ListItemIcon>
          <ListItemText primary="Tweet Network" />
        </ListItem>
      </Link>

      <Divider />
      <ListSubheader
        component="div"
        id="nested-list-subheader"
        style={{ background: '#FFF' }}
      >
        Settings
      </ListSubheader>
      <Divider />
      <Link to="/users" className={classes.navLink}>
        <ListItem
          button
          selected={selectedIndex === 9}
          onClick={(event) => {
            return handleListItemClick(event, 9)
          }}
        >
          <ListItemIcon style={{ color: '#12939A' }}>
            <PeopleIcon />
          </ListItemIcon>
          <ListItemText primary="Users" />
        </ListItem>
      </Link>
      <Divider />
    </React.Fragment>
  )
}
