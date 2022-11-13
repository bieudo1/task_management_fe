import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import { cloudinaryUpload } from "../../utils/cloudinary";
import apiService from "../../app/apiService";

const initialState = {
    isLoading: false,
    error: null,
    currentPageFiles: [],
    filesById:{},
    totalPages: 1,
    count:null
  };

const slice = createSlice({
    name: "file",
    initialState,
    reducers:{
      startLoading(state) {
        state.isLoading = true;
      },
  
      hasError(state, action) {
        state.isLoading = false;
        state.error = action.payload;
      },
        getFilesList(state,action){
            state.isLoading = false;
            state.error = null;

          const { files, count, totalPages } = action.payload;
          files.forEach((file) => (state.filesById[file._id] = file));
          state.currentPageFiles = files.map((file) => file._id);
          state.count= count;
          state.totalPages = totalPages;
        },
    }

}) 
export default slice.reducer;

export const getFiles = ({projectId}) =>async (dispatch) => {
  console.log(projectId)
    dispatch(slice.actions.startLoading());
    try {
      const response = await apiService.get(`/files/${projectId}`);
      console.log(response.data)
      dispatch(slice.actions.getFilesList(response.data));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
      toast.error(error.message);
    }
  };

  export const createFile = ({projectId,file,taskId}) =>async (dispatch) => {
    console.log(projectId)
      dispatch(slice.actions.startLoading());
      try {
      const FileUrl = await cloudinaryUpload(file);
        const response = await apiService.get(`/files/`,{FileUrl});
        console.log(response.data)
        dispatch(slice.actions.postFile(response.data));
      } catch (error) {
        dispatch(slice.actions.hasError(error));
        toast.error(error.message);
      }
    };