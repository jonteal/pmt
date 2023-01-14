import * as actions from '../constants/actionTypes';
import { ProjectsService } from '../../services/projects';

// GET ALL PROJECTS
export const getAllProjects = () => dispatch => {
  ProjectsService.getAllProjects()
    .then(projects => {
      dispatch({
        type: actions.ALL_PROJECTS_LOADED,
        payload: {
          projects,
        }
      })
    })
}