import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import apiService from "../../app/apiService";

const initialState = {
  isLoading: false,
  error: null,
  projectCount: null,
  teamCount: null,
  userCount: null,
  countOnTime: [],
  countOutOfDate: [],
  taskCount: {},
};

const slice = createSlice({
  name: "admin",
  initialState,
  reducers: {
    startLoading(state) {
      state.isLoading = true;
    },

    hasError(state, action) {
      state.isLoading = false;
      state.error = action.payload;
    },
    getAdmin(state, action) {
      state.isLoading = false;
      state.error = null;

      const { projectCount, teamCount, userCount, taskCount, countOnTime, countOutOfDate } = action.payload;
      state.teamCount = teamCount;
      state.projectCount = projectCount;
      state.userCount = userCount;
      state.taskCount = taskCount;
      state.countOnTime = countOnTime;
      state.countOutOfDate = countOutOfDate;
    },
  },
});
export default slice.reducer;

export const getCount =
  ({ watchDate }) =>
  async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      const params = { watchDate };
      const response = await apiService.get(`users/admin`, { params });
      dispatch(slice.actions.getAdmin(response.data));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
      toast.error(error.message);
    }
  };
