import React, { useState } from 'react'

export const Project = {
  project_id: 313500,
}

export const ProjectContext = React.createContext(Project.project_id)

function updateProject({ proj_id }) {
  const [project_id, setProjectId] = useState({ project_id: '' })

  console.log('updateProject project_id')
  console.log(project_id)

  setProjectId((proj_id) => ({
    project_id: proj_id,
  }))

  return <ProjectContext.Provider value={project_id}></ProjectContext.Provider>
}

export { updateProject }
