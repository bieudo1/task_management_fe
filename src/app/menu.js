// types
import { createSlice } from '@reduxjs/toolkit';
import { toast } from "react-toastify";

// initial state
const initialState = {
    openItem: ['Task'],
    openComponent: 'buttons',
    drawerOpen: false,
    targetProjectId:null,
    componentDrawerOpen: true
};

// ==============================|| SLICE - MENU ||============================== //

const slice = createSlice({
    name: 'menu',
    initialState,
    reducers: {
        activeItem(state, action) {
            const {openItem,targetProjectId} =action.payload;
            state.openItem = openItem;
            state.targetProjectId = targetProjectId;
            console.log(targetProjectId)
        },

        activeComponent(state, action) {
            state.openComponent = action.payload.openComponent;
        },

        openDrawer(state, action) {
            // console.log(action.payload)
            state.drawerOpen = action.payload;
        },

        openComponentDrawer(state, action) {
            state.componentDrawerOpen = action.payload.componentDrawerOpen;
        }
    }
});

export default slice.reducer;

export const { activeItem, activeComponent, openDrawer, openComponentDrawer } = slice.actions;
