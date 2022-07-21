import React from 'react'
import Button from '@material-ui/core/Button'
import { SearchOutlined as ManageSearchIcon } from '@material-ui/icons'

import TextField from '@material-ui/core/TextField'

const CREATE_PROJECT_AUTO = gql`
  mutation(
    $project_id: Int
    $title: String
    $keywords: String
    $socialmedia: String
    $status: String
    $fromDate: String
    $toDate: String
    $project_type: String
  ) {
    createProjects(
      input: {
        project_id: $project_id
        title: $title
        keywords: $keywords
        socialmedia: $socialmedia
        status: $status
        fromDate: $fromDate
        toDate: $toDate
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

export default function SearchByKeywordComponent() {
  function getCurrentDate(separator = '') {
    let newDate = new Date()
    let date = newDate.getDate()
    let month = newDate.getMonth() + 1
    let year = newDate.getFullYear()

    return `${year}${separator}${
      month < 10 ? `0${month}` : `${month}`
    }${separator}${date}`
  }

  const title = 'Project Created ' + getCurrentDate('-')
  const [keywords, SetKeywords] = React.useState('')
  const fromDate = getCurrentDate('-')
  const toDate = getCurrentDate('-')
  const project_type = 'AUTOMATIC'
  const socialmedia = 'Twitter' // sekarang bisanyanya twitter dahulu
  const status = 'ON GOING' //status di set ON GOING

  const [createPost] = useMutation(CREATE_PROJECT_AUTO, {
    onCompleted: (data) => {
      console.log('Data from mutation', data)
      // jika berhasil crawling data di twitter
    },
  })

  function handleCreatePost(event) {
    event.preventDefault()
    const project_id = parseInt(Math.floor(Math.random() * 1000))

    createPost({
      variables: {
        project_id,
        title,
        keywords,
        socialmedia,
        status,
        fromDate,
        toDate,
        project_type,
      },
    })
  }

  return (
    <React.Fragment>
      <form onSubmit={handleCreatePost}>
        <div style={{ marginTop: 20, alignContent: 'center' }}>
          <TextField
            label="keywords"
            name="keywords"
            variant="outlined"
            id="outlined-helperText"
            helperText="Trending: #PemilikSahamLepasTangan, Idul Adha 2022, Kaya vs Bali United"
            onChange={(e) => SetKeywords(e.target.value)}
            style={{ id: 'outlined-helperText', width: 500 }}
          />
          <Button
            variant="contained"
            size="large"
            color="secondary"
            sx={{ padding: 50, marginTop: 20, color: 'secondary' }}
            style={{ color: 'success.main', size: 'large', padding: 14 }}
            startIcon={<ManageSearchIcon />}
          >
            SEARCH
          </Button>
        </div>
      </form>
    </React.Fragment>
  )
}
