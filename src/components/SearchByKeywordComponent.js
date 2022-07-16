import React from 'react'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableHead from '@material-ui/core/TableHead'
import FormGroup from '@material-ui/core/FormGroup'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'

import { useQuery, gql } from '@apollo/client'
import Title from './Title'

import Typography from '@material-ui/core/Typography'

import {
  ChevronLeft as ChevronLeftIcon,
  Menu as MenuIcon,
  Dashboard as DashboardIcon,
  Assignment as AssignmentIcon,
  Twitter as TwitterIcon,
  MoreVert as MoreVertIcon,
  FormatQuote as FormatQuoteIcon,
  TableChart as TableChartIcon,
  SearchOutlined as ManageSearchIcon,
} from '@material-ui/icons'

export default function ProjectListComponent() {
  return (
    <React.Fragment>
      <div style={{ marginTop: 20, alignContent: 'center' }}>
        <TextField
          label="Keyword"
          variant="outlined"
          id="outlined-helperText"
          helperText="Trending: #PemilikSahamLepasTangan, Idul Adha 2022, Kaya vs Bali United"
          style={{ id: 'outlined-helperText', width: 500 }}
        />
        &nbsp;
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
    </React.Fragment>
  )
}
