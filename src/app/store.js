import { configureStore, combineReducers } from "@reduxjs/toolkit";
import projectReducer from "../features/project/ProjectSlice";
import fileReducer from "../features/file/FileSlice";
import personnelReducer from "../features/personnel/PersonnelSlice";
import adminReducer from "../features/admin/adminSlice";
import taskReducer from "../features/task/TaskSlice";
import menuReducer from "./menu";

const rootReducer = combineReducers({
  project: projectReducer,
  file: fileReducer,
  admin: adminReducer,
  task: taskReducer,
  menu: menuReducer,
  personnel: personnelReducer,
});

const store = configureStore({
  reducer: rootReducer,
});

export default store;