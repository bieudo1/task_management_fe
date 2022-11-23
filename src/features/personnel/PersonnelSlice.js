import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import { cloudinaryUpload } from "../../utils/cloudinary";
import apiService from "../../app/apiService";

const initialState = {
    isLoading: false,
    error: null,
    currentPageTeams:[],
    teamsById:{},
    teamOptions :[],
    userNoTeam:[],
    currentPageUsers: [],
    usersById: {},
    totalUserPages: 1,
    totalTeamPages: 1,
    updatedProfile: null,
  };

const slice = createSlice({
    name: "personnel",
    initialState,
    reducers:{
        startLoading(state) {
            state.isLoading = true;
          },
      
          hasError(state, action) {
            state.isLoading = false;
            state.error = action.payload;
          },
        getTeamList(state,action){
            state.isLoading = false;
            state.error = null;

          const { teams,count,totalPages} = action.payload;

          state.teamOptions = teams.map((team) =>({value: team._id,label: team.name}))
          teams.forEach((team) => (state.teamsById[team._id] = team));
          state.currentPageTeams = teams.map((team) => team._id);
          state.totalTeamm = count;
          state.totalTeamPages = totalPages;
        },
        postTeam(state,action) {
          state.isLoading = false;
          state.error = null;

          const { team } = action.payload;
          state.totalTeamm += 1;
          state.teamsById[team._id] = team
          state.currentPageTeams.unshift(team._id);
        },
        deleteTeam(state,action) {
          state.isLoading = false;
          state.error = null;

          const { id } = action.payload;
          state.totalUsers -= 1;
          state.teamsById[id] = undefined
          state.currentPageTeams = state.currentPageTeams.filter(user => user !== id);
        },
        getUsersSuccess(state, action) {
          state.isLoading = false;
          state.error = null;
    
          const { users, count, totalPages,userNoTeam } = action.payload;
          users.forEach((user) => (state.usersById[user._id] = user));
          state.currentPageUsers = users.map((user) => user._id);
          state.userNoTeam = userNoTeam
          state.totalUsers = count;
          state.totalUserPages = totalPages;
        },
        postUser(state,action) {
          state.isLoading = false;
          state.error = null;

          const { user } = action.payload;
          state.totalUsers += 1;
          if(!user.team){state.userNoTeam.unshift(user) }
          state.usersById[user._id] = user
          state.currentPageUsers.unshift(user._id);
        },
        deleteUser(state,action) {
          state.isLoading = false;
          state.error = null;

          const { id } = action.payload;
          state.totalUsers -= 1;
          state.usersById[id] = undefined
          state.currentPageUsers = state.currentPageUsers.filter(user => user !== id);
          console.log(id)
        },
        updateUserProfileSuccess(state, action) {
          state.isLoading = false;
          state.error = null;
    
          const updatedUser = action.payload;
          state.updatedProfile = updatedUser;
        },
        putTeam(state,action) {
          state.isLoading = false;
          state.error = null;
          
          const {teamId,editTeam} = action.payload

          console.log(teamId,editTeam)
          state.teamsById[teamId] = editTeam
        }
    }

}) 
export default slice.reducer;

export const getTeams =  ({ filterName, page = 1, limit = 12 }) =>
async (dispatch) => {
  dispatch(slice.actions.startLoading());
  try {
    const params = { page, limit };
    if (filterName) params.name = filterName;
    const response = await apiService.get("/teams", { params });
    console.log(response.data)
    dispatch(slice.actions.getTeamList(response.data));
  } catch (error) {
    dispatch(slice.actions.hasError(error));
    toast.error(error.message);
  }
}

 export const postNewUser =
  ({ name, email, password,phone1,position,teamId }) =>
  async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await apiService.post("/users", { name, email, password,phone1,position,teamId });
      dispatch(slice.actions.postUser(response.data));
      if(teamId){
      dispatch(slice.actions.putTeam({
        teamId,
        editTeam:response.data.team}
        ))}
    } catch (error) {
      dispatch(slice.actions.hasError(error));
      toast.error(error.message);
    }
  };

export const removeTeam =
  ({id}) =>
  async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      await apiService.delete(`/teams/${id}`);
      const responseUser = await apiService.get("/users");
      dispatch(slice.actions.deleteTeam({id}));
      dispatch(slice.actions.getUsersSuccess(responseUser.data));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
      toast.error(error.message);
    }
  };

export const getUsers =
  ({ filterName, page = 1, limit = 12 }) =>
  async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      const params = { page, limit };
      if (filterName) params.name = filterName;
      const response = await apiService.get("/users", { params });
      console.log(response.data)
      dispatch(slice.actions.getUsersSuccess(response.data));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
      toast.error(error.message);
    }
  };

  export const postNewTeam =
  ({ name,manager,workers}) =>
  async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      const responseTeam = await apiService.post("/teams", { name,manager,workers });
      const responseUser = await apiService.get("/users");
      console.log(responseTeam.data)
      dispatch(slice.actions.postTeam(responseTeam.data));
      dispatch(slice.actions.getUsersSuccess(responseUser.data));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
      toast.error(error.message);
    }
  };

  export const editTeam = ({name,manager,workers, teamId}) => async (dispatch) => {
    dispatch(slice.actions.startLoading());
    
    try {
      const response = await apiService.put(`/teams/${teamId}`,{name,manager,workers});
      const responseUser = await apiService.get("/users");
      console.log(response.data)
      dispatch(slice.actions.putTeam({
        teamId,
        editTeam:response.data}
        ));
      dispatch(slice.actions.getUsersSuccess(responseUser.data));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
      toast.error(error.message);
    }
  };


  export const removeUser =
  ({id}) =>
  async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await apiService.delete(`/users/${id}`);
      dispatch(slice.actions.deleteUser({id}));
      dispatch(slice.actions.putTeam({
        teamId:response.data.team._id,
        editTeam:response.data.team}
        ))}
  
    catch (error) {
      dispatch(slice.actions.hasError(error));
      toast.error(error.message);
    }
  };
  export const updateUserProfile = 
  ({userId,
    name,
    email,
    avatarUrl,
    phone1,

  }) =>
  async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      const data = {
        userId,
        name,
        email,
        avatarUrl,
        phone1,
          }
      if (avatarUrl instanceof File) {
        const imageUrl = await cloudinaryUpload(avatarUrl);
        data.avatarUrl = imageUrl;
      }
      const response =await apiService.put(`/users/${userId}`, data);
      dispatch(slice.actions.updateUserProfileSuccess(response.data));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
      toast.error(error.message);
    }
  };

  