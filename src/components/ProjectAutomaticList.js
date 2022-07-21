import React from 'react'
import { useTheme } from '@material-ui/core/styles'
import { Grid, Paper } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import ProjectListComponent from './ProjectListComponent'
import SearchByKeywordComponent from './SearchByKeywordComponent'

export default function ProjectList() {
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

  return (
    <React.Fragment>
      <Grid container spacing={4}>
        {/* Recent Reviews */}
        <Grid
          item
          xs={12}
          justifyContent="center"
          style={{ textAlign: 'center' }}
        >
          <Paper className={classes.paper}>
            <SearchByKeywordComponent />
          </Paper>
        </Grid>

        {/* Recent Reviews */}
        <Grid item xs={12}>
          <ProjectListComponent />
        </Grid>
      </Grid>
    </React.Fragment>
  )
}
