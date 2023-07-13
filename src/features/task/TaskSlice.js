import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import { cloudinaryUpload } from "../../utils/cloudinary";
import apiService from "../../app/apiService";

const initialState = {
  isLoading: false,
  error: null,
  listTasks: [],
  tasksById: {},
  statusArchive: [],
  currentPageTasks: [],
  singleTask: null,
  totalPages: 1,
};

const slice = createSlice({
  name: "task",
  initialState,
  reducers: {
    startLoading(state) {
      state.isLoading = true;
    },

    hasError(state, action) {
      state.isLoading = false;
      state.error = action.payload;
    },
    getTasksList(state, action) {
      state.isLoading = false;
      state.error = null;
      const { tasks, count, totalPages } = action.payload;
      state.listTasks = tasks;
      state.totalTasks = count;
      state.totalPages = totalPages;
    },
    getTask(state, action) {
      state.isLoading = false;
      state.error = null;

      const { tasks } = action.payload;
      state.statusArchive = tasks.filter((task) => task.status === "archive");
      state.totalTasks = tasks.length;
      tasks.forEach((task) => (state.tasksById[task._id] = task));
      state.currentPageTasks = tasks.map((task) => task._id);
    },
    postTask(state, action) {
      state.isLoading = false;
      state.error = null;

      const { task } = action.payload;
      state.tasksById[task._id] = task;
      state.currentPageTasks.unshift(task._id);
    },
    deleteTask(state, action) {
      state.isLoading = false;
      state.error = null;

      const { id } = action.payload;
      state.tasksById[id] = undefined;
      state.currentPageTasks = state.currentPageTasks.filter((user) => user !== id);
    },
    removeEditSuccess(state, action) {
      state.isLoading = false;
      state.error = null;

      const { taskId, editTask, progress } = action.payload;

      if (editTask.status === "archive") {
        state.statusArchive.unshift(editTask);
      }
      if (progress) {
        state.tasksById[taskId].progress = progress;
      }
      state.tasksById[taskId] = editTask;
    },
  },
});
export default slice.reducer;

export const getTasksMine = () => async (dispatch) => {
  dispatch(slice.actions.startLoading());
  try {
    const response = await apiService.get("/tasks/me");
    dispatch(slice.actions.getTask(response.data));
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
      if (filterName) params.name = filterName;
      const response = await apiService.get("/tasks", { params });
      dispatch(slice.actions.getTasksList(response.data));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
      toast.error(error.message);
    }
  };

export const getTaskInProject =
  ({ projectId }) =>
  async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await apiService.get(`/tasks/project/${projectId}`);
      dispatch(slice.actions.getTask(response.data));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
      toast.error(error.message);
    }
  };

export const getUpDateTaskStatus =
  ({ taskId, status }) =>
  async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await apiService.put(`/tasks/${taskId}`, { status });
      dispatch(
        slice.actions.removeEditSuccess({
          taskId,
          editTask: response.data,
        })
      );
    } catch (error) {
      dispatch(slice.actions.hasError(error));
      toast.error(error.message);
    }
  };

export const postNewTask =
  ({ name, assignee, dueAt, important, urgent, projectId }) =>
  async (dispatch) => {
    dispatch(slice.actions.startLoading());
    console.log(name, assignee, dueAt, important, urgent, projectId);
    try {
      const response = await apiService.post(`/tasks/`, { name, assignee, dueAt, important, urgent, projectId });
      dispatch(slice.actions.postTask(response.data));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
      toast.error(error.message);
    }
  };
export const removTask =
  ({ id }) =>
  async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      await apiService.delete(`/tasks/${id}`);
      dispatch(slice.actions.deleteTask({ id }));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
      toast.error(error.message);
    }
  };
export const editTask =
  ({ name, assignee, dueAt, important, urgent, taskId }) =>
  async (dispatch) => {
    dispatch(slice.actions.startLoading());
    console.log(assignee);
    try {
      const response = await apiService.put(`/tasks/${taskId}`, { name, assignee, dueAt, important, urgent });
      dispatch(
        slice.actions.removeEditSuccess({
          taskId,
          editTask: response.data,
        })
      );
    } catch (error) {
      dispatch(slice.actions.hasError(error));
      toast.error(error.message);
    }
  };
export const reviewTask =
  ({ review, taskId }) =>
  async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await apiService.put(`/tasks/review/${taskId}`, { review });
      console.log(response);
      dispatch(
        slice.actions.removeEditSuccess({
          taskId,
          editTask: response.data,
        })
      );
    } catch (error) {
      dispatch(slice.actions.hasError(error));
      toast.error(error.message);
    }
  };
export const progressTask =
  ({ progress, taskId }) =>
  async (dispatch) => {
    try {
      const response = await apiService.put(`/tasks/${taskId}`, { progress });
      console.log(response);
      dispatch(
        slice.actions.removeEditSuccess({
          progress,
          taskId,
          editTask: response.data,
        })
      );
    } catch (error) {
      dispatch(slice.actions.hasError(error));
      toast.error(error.message);
    }
  };
export const createFile =
  ({ projectId, file, taskId }) =>
  async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      const FileUrl = await cloudinaryUpload(file);
      const response = await apiService.post(`/files/`, { FileUrl, projectId, taskId });
      dispatch(
        slice.actions.removeEditSuccess({
          taskId,
          editTask: response.data.task,
        })
      );
    } catch (error) {
      dispatch(slice.actions.hasError(error));
      toast.error(error.message);
    }
  };
