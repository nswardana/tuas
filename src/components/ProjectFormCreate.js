import React from 'react'

import Grid from '@material-ui/core/Grid'
import TextField from '@material-ui/core/TextField'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import FormControl from '@material-ui/core/FormControl'
import Select from '@material-ui/core/Select'
import MenuItem from '@material-ui/core/MenuItem'
import Button from '@material-ui/core/Button'
import CircularProgress from '@material-ui/core/CircularProgress'
import InputLabel from '@material-ui/core/InputLabel'

import FormLabel from '@material-ui/core/FormLabel'
import FormGroup from '@material-ui/core/FormGroup'
import Checkbox from '@material-ui/core/Checkbox'

import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import CardHeader from '@material-ui/core/CardHeader'

import IconButton from '@material-ui/core/IconButton'
import moment from 'moment'

import Typography from '@material-ui/core/Typography'
import { useHistory } from 'react-router-dom'

import {
  MoreVert as MoreVertIcon,
  SearchOutlined as ManageSearchIcon,
} from '@material-ui/icons'

/*
const defaultValues = {
  name: '',
  age: 0,
  gender: '',
  os: '',
  favoriteNumber: 0,
}
*/

const CREATE_PROJECT = gql`
  mutation(
    $project_id: Int
    $title: String
    $keywords: String
    $socialmedia: String
    $status: String
    $fromDateTime: DateTime
    $toDateTime: DateTime
    $project_type: String
  ) {
    createProjects(
      input: {
        project_id: $project_id
        title: $title
        keywords: $keywords
        socialmedia: $socialmedia
        status: $status
        fromDate: $fromDateTime
        toDate: $toDateTime
        project_type: $project_type
      }
    ) {
      projects {
        project_id
        title
        keywords
        status
      }
    }
  }
`

import { useMutation, gql } from '@apollo/client'
export default function ProjectFormCreate() {
  const history = useHistory()

  function getCurrentDate(separator = '') {
    let newDate = new Date()
    let date = newDate.getDate()
    let month = newDate.getMonth() + 1
    let year = newDate.getFullYear()

    return `${year}${separator}${
      month < 10 ? `0${month}` : `${month}`
    }${separator}${date}`
  }

  const [title, SetProjectName] = React.useState('')
  const [keywords, SetKeywords] = React.useState('')
  const [fromDate, SetFromDate] = React.useState(getCurrentDate('-'))
  const [toDate, SetToDate] = React.useState(getCurrentDate('-'))
  const [project_type, SetProjectType] = React.useState('')
  const socialmedia = 'Twitter' // sekarang bisanyanya twitter dahulu
  const status = 'ON GOING' //status di set ON GOING

  const [createPost, { loading }] = useMutation(CREATE_PROJECT, {
    onCompleted: (data) => {
      console.log('Data from mutation', data)
      // jika berhasil crawling data di twitter

      if (project_type == 'REQUEST') history.push('/project')
      else history.push('/projectautomatic')
    },
  })

  function handleCreatePost(event) {
    event.preventDefault()
    // let IdFromDate = new Date().getTime()
    const project_id = parseInt(Math.floor(Math.random() * 1000))

    var toDateTime = moment(toDate).format('YYYY-MM-DD HH:mm:ss')
    var fromDateTime = moment(fromDate).format('YYYY-MM-DD HH:mm:ss')

    createPost({
      variables: {
        project_id,
        title,
        keywords,
        socialmedia,
        status,
        fromDateTime,
        toDateTime,
        project_type,
      },
    })
  }

  if (loading) return <CircularProgress />
  return (
    <React.Fragment>
      <form onSubmit={handleCreatePost}>
        <Card>
          <CardHeader
            avatar={
              <Typography
                variant="h5"
                component="div"
                style={{ color: '#12939A' }}
              >
                <ManageSearchIcon /> Create Social Media Analytic
              </Typography>
            }
            action={
              <IconButton aria-label="settings">
                <MoreVertIcon />
              </IconButton>
            }
          />
          <CardContent>
            <Grid container spacing={2}>
              <Grid item xs={8}>
                <TextField
                  id="name-input"
                  name="projectname"
                  label="Project Name"
                  type="text"
                  variant="outlined"
                  defaultValue=" "
                  style={{ width: '100%' }}
                  onChange={(e) => SetProjectName(e.target.value)}
                />
              </Grid>
              <Grid item xs={4}></Grid>
              <Grid item xs={8}>
                <TextField
                  id="name-input"
                  name="keywords"
                  label="Keywords"
                  type="text"
                  variant="outlined"
                  defaultValue=" "
                  style={{ width: '100%' }}
                  onChange={(e) => SetKeywords(e.target.value)}
                />
              </Grid>
              <Grid item xs={4}></Grid>
              <Grid item xs={4}>
                <TextField
                  id="date"
                  name="fromDate"
                  label="From Date"
                  type="Date"
                  value={fromDate}
                  variant="outlined"
                  sx={{ width: 220 }}
                  style={{ width: '100%' }}
                  InputLabelProps={{
                    shrink: true,
                  }}
                  onChange={(e) => SetFromDate(e.target.value)}
                />
              </Grid>
              <Grid item xs={4}>
                <TextField
                  id="date"
                  label="To Date"
                  name="toDate"
                  type="Date"
                  value={toDate}
                  variant="outlined"
                  style={{ width: '100%' }}
                  sx={{ width: 220 }}
                  InputLabelProps={{
                    shrink: true,
                  }}
                  onChange={(e) => SetToDate(e.target.value)}
                />
              </Grid>
              <Grid item xs={4}></Grid>
              <Grid item xs={4}>
                <FormControl
                  sx={{ m: 3 }}
                  component="fieldset"
                  variant="standard"
                >
                  <FormLabel component="legend">Media Social</FormLabel>
                  <FormGroup>
                    <FormControlLabel
                      control={<Checkbox />}
                      label="Twitter"
                      checked
                    />
                    <FormControlLabel
                      control={<Checkbox />}
                      label="Facebook"
                      disabled
                    />
                    <FormControlLabel
                      control={<Checkbox />}
                      label="Instagram"
                      disabled
                    />
                  </FormGroup>
                </FormControl>
              </Grid>
              <Grid item xs={4}>
                <FormControl fullWidth>
                  <InputLabel id="demo-simple-select-label">Mode</InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={project_type}
                    name="project_type"
                    label="Mode"
                    onChange={(e) => SetProjectType(e.target.value)}
                  >
                    <MenuItem value={'AUTOMATIC'}>AUTOMATIC</MenuItem>
                    <MenuItem value={'REQUEST'}>REQUEST</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
            </Grid>
            <div>
              <Button
                type="submit"
                variant="contained"
                size="large"
                color="secondary"
                style={{ color: 'success', size: 'large', marginTop: 10 }}
                startIcon={<ManageSearchIcon />}
              >
                CREATE PROJECT
              </Button>
            </div>
          </CardContent>
        </Card>
      </form>
    </React.Fragment>
  )
}
