import React from 'react'
import Typography from '@material-ui/core/Typography'
import Breadcrumbs from '@material-ui/core/Breadcrumbs'
import { Link as RouterLink } from 'react-router-dom'
import { Route } from 'react-router-dom'

export default function Breadcrumb() {
  var project_title = sessionStorage.getItem('project_title')
  console.log('project_title : ' + project_title)

  return (
    <Route>
      {({ location }) => {
        const pathnames = location.pathname.split('/').filter((x) => x)
        return (
          <Breadcrumbs aria-label="Breadcrumb">
            <RouterLink color="inherit" to="/">
              Home
            </RouterLink>
            {pathnames.map((value, index) => {
              const last = index === pathnames.length - 1
              const to = `/${pathnames.slice(0, index + 1).join('/')}`

              return last ? (
                <Typography color="textPrimary" key={to}>
                  {value} / {project_title}
                </Typography>
              ) : (
                <RouterLink color="inherit" to={to} key={to}>
                  {value} / {project_title}
                </RouterLink>
              )
            })}
          </Breadcrumbs>
        )
      }}
    </Route>
  )
}
