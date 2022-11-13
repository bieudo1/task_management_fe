import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import apiService from "../../app/apiService";

const initialState = {
    isLoading: false,
    error: null,
    listTasks: [],
    tasksById:{},
    currentPageTasks: [],
    singleTask: null,
    totalPages: 1,
    currentTasksMine:[],
    tasksMineById:{},
    tasksMineList:[]
  };

const slice = createSlice({
    name: "task",
    initialState,
    reducers:{
        startLoading(state) {
            state.isLoading = true;
          },
      
          hasError(state, action) {
            state.isLoading = false;
            state.error = action.payload;
          },
        getTasksList(state,action){
            state.isLoading = false;
            state.error = null;
          const { tasks, count, totalPages } = action.payload;
          state.listTasks = tasks
          state.totalTasks  = count;
          state.totalPages = totalPages;
        },
        getTasksMineList(state,action){
          state.isLoading = false;
          state.error = null;

          const { tasks } = action.payload;
          state.tasksMineList = tasks
          tasks.forEach((task) => (state.tasksMineById[task._id] = task));
          state.currentTasksMine = tasks.map((task) => task._id);
      },
        getTask(state,action){
          state.isLoading = false;
          state.error = null;

          const {tasks} = action.payload;
          tasks.forEach((task) => (state.tasksById[task._id] = task));
          state.currentPageTasks = tasks.map((task) => task._id);
        },
        postTask(state,action) {
          state.isLoading = false;
          state.error = null;

          const { task } = action.payload;
          state.tasksById[task._id] = task
          state.currentPageTasks.unshift(task._id);
        },
        deleteTask(state,action){
          state.isLoading = false;
          state.error = null;

          const { id } = action.payload;
          state.tasksById[id] = undefined
          state.currentPageTasks = state.currentPageTasks.filter(user => user !== id);
        },
        removeEditSuccess(state,action){
          state.isLoading = false;
          state.error = null;
    
          const {taskId, editTask} = action.payload;

          state.tasksById[taskId].name= editTask.name;
          state.tasksById[taskId].assignee= editTask.assignee;
          state.tasksById[taskId].dueAt= editTask.dueAt;
          state.tasksById[taskId].important= editTask.important;
          state.tasksById[taskId].urgent= editTask.urgent;
        },
        putTaskMine(state,action){
          state.isLoading = false;
          state.error = null;
    
          const {taskId, editTask} = action.payload;

          state.tasksMineById[taskId].review= editTask.review;
          state.tasksMineById[taskId].reviewAt= editTask.reviewAt;
          state.tasksMineById[taskId].progress= editTask.progress;
          state.tasksMineById[taskId].status= editTask.status;
        },
    }

}) 
export default slice.reducer;

export const getTasksMine =
  () =>
  async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await apiService.get("/tasks/me");
      dispatch(slice.actions.getTasksMineList(response.data));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
      toast.error(error.message);
    }
  };

  export const getTasks =
  ({ filterName, page = 1, limit = 12 }) =>
  async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      const params = { page, limit };
      console.log(filterName)
      if (filterName) params.name = filterName;
      const response = await apiService.get("/tasks", { params });
      console.log(response.data)
      dispatch(slice.actions.getTasksList(response.data));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
      toast.error(error.message);
    }
  };

  export const getTaskInProject = ({projectId}) => async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await apiService.get(`/tasks/project/${projectId}`);
      console.log(response.data)
      dispatch(slice.actions.getTask(response.data));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
      toast.error(error.message);
    }
  };

  export const getUpDateTaskStatus = ({taskId,status}) => async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await apiService.put(`/tasks/${taskId}`,{status});
      console.log(response.data)
      dispatch(slice.actions.putTaskMine({
        taskId,
        editTask: response.data,
      }));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
      toast.error(error.message);
    }
  };

  export const postNewTask = 
  ({name, assignee, dueAt,important,urgent,projectId}) => 
  async(dispatch) => {
    dispatch(slice.actions.startLoading());
    console.log(name, assignee, dueAt,important,urgent,projectId)
    try {
      const response = await apiService.post(`/tasks/`,{name, assignee, dueAt,important,urgent,projectId});
      console.log(response.data)
      dispatch(slice.actions.postTask(response.data));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
      toast.error(error.message);
    }
  }
  export const removTask =
  ({id}) =>
  async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      await apiService.delete(`/tasks/${id}`);
      dispatch(slice.actions.deleteTask({id}));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
      toast.error(error.message);
    }
  };
  export const editTask =
  ({name, assignee, dueAt,important,urgent,taskId}) =>
  async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      const response =await apiService.put(`/tasks/${taskId}`,{name, assignee, dueAt,important,urgent});
      dispatch(slice.actions.removeEditSuccess({
        taskId,
        editTask: response.data,
      }));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
      toast.error(error.message);
    }
  };
  export const reviewTask =
  ({review,taskId}) =>
  async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      const response =await apiService.put(`/tasks/review/${taskId}`,{review});
      console.log(response)
      dispatch(slice.actions.putTaskMine({
        taskId,
        editTask: response.data,
      }));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
      toast.error(error.message);
    }
  };
  export const progressTask =
  ({value,taskId}) =>
  async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      const response =await apiService.put(`/tasks/${taskId}`,{value});
      console.log(response)
      dispatch(slice.actions.putTaskMine({
        taskId,
        editTask: response.data,
      }));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
      toast.error(error.message);
    }
  };