import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import apiService from "../../app/apiService";

const initialState = {
    isLoading: false,
    error: null,
    currentPageProjects: [],
    projectsById:{},
    assignee: [],
    progress:null,
    singleProject:null,
    totalPages: 1,
    usersInTeam:[],
    count:null
  };

const slice = createSlice({
    name: "project",
    initialState,
    reducers:{
        startLoading(state) {
            state.isLoading = true;
          },
      
          hasError(state, action) {
            state.isLoading = false;
            state.error = action.payload;
          },
        getProjectsList(state,action){
            state.isLoading = false;
            state.error = null;

          const { projects, count, totalPages } = action.payload;

          projects.forEach((project) => (state.projectsById[project._id] = project));
          state.currentPageProjects = projects.map((project) => project._id);
          state.count= count;
          state.totalPages = totalPages;
        },
        getProject(state,action){
          state.isLoading = false;
          state.error = null;

          const {project} = action.payload
          state.singleProject = project;
          state.assignee = project.assignee.map((user) =>({value: user._id,label: user.name}))
          if (project.task.length !== 0)
          { 
          const listprogress = project.task.map((ta)=> ta.progress)
          const total = listprogress.reduce((accumulator, currentValue) => accumulator + currentValue)
          state.progress = total/listprogress.length
        }

        },
        postProject(state,action){
          state.isLoading = false;
          state.error = null;

          const { project} = action.payload
          console.log(project)
          state.projectsById[project._id] = project
          state.currentPageProjects.unshift(project._id);
        },
        deleteProject(state,action) {
          state.isLoading = false;
          state.error = null;

          const { id } = action.payload;
          state.projectsById[id] = undefined
          state.currentPageProjects = state.currentPageProjects.filter(project => project !== id);
        },
        getTeam(state,action) {
          state.isLoading = false;
          state.error = null;
          
          const {team} = action.payload
          state.usersInTeam = team.workers.map((user) =>({value: user._id,label: user.name}))

        },
        putProject(state,action) {
          state.isLoading = false;
          state.error = null;
          
          const {projectId,editProject} = action.payload

          state.projectsById[projectId].name = editProject.name
          state.projectsById[projectId].description = editProject.description
          state.projectsById[projectId].assignee = editProject.assignee
        }
    }

}) 
export default slice.reducer;

export const getProjects = ({ filterName, page = 1, limit = 12 }) =>async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      const params = { page, limit };
      if (filterName) params.name = filterName;
      const response = await apiService.get(`/projects/`,{params});
      console.log(response.data)
      dispatch(slice.actions.getProjectsList(response.data));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
      toast.error(error.message);
    }
  };

  export const getSingleProject = (id) => async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await apiService.get(`/projects/${id}`);
      console.log(response.data)
      dispatch(slice.actions.getProject(response.data));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
      toast.error(error.message);
    }
  };

  export const newProject = ({name,teamId,status,description,assignee}) => async (dispatch) => {
    dispatch(slice.actions.startLoading());
    
    try {
      const response = await apiService.post(`/projects/`,{name,teamId,status,description,assignee});
      console.log(response.data)
      dispatch(slice.actions.postProject(response.data));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
      toast.error(error.message);
    }
  };

  export const editProject = ({name,description,assignee, projectId}) => async (dispatch) => {
    dispatch(slice.actions.startLoading());
    
    try {
      const response = await apiService.put(`/projects/${projectId}`,{name,description,assignee});
      console.log(response.data)
      dispatch(slice.actions.putProject({
        projectId,
        editProject:response.data}
        ));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
      toast.error(error.message);
    }
  };

  export const projectFinished = ({status, projectId}) => async (dispatch) => {
    dispatch(slice.actions.startLoading());
    
    try {
      const response = await apiService.put(`/projects/${projectId}`,{status});
      console.log(response.data)
      dispatch(slice.actions.putProject({
        projectId,
        editProject:response.data}
        ));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
      toast.error(error.message);
    }
  };

  export const removeProject =
  ({id}) =>
  async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      await apiService.delete(`/projects/${id}`);
      dispatch(slice.actions.deleteProject({id}));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
      toast.error(error.message);
    }
  };

  export const getSingleTeam =
  ({id}) =>
  async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      const response =await apiService.get(`/teams/${id}`);
      console.log(response.data)
      dispatch(slice.actions.getTeam(response.data));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
      toast.error(error.message);
    }
  };