import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    userDetails : JSON.parse(localStorage.getItem("userDetails")) ?? {}
};

const userSlice = createSlice({
    name : "userDetails",
    initialState,
    reducers : {
        setUserDetails : (state, action) => {
            state.userDetails = action.payload;
        },
    }
});

export const { setUserDetails } = userSlice.actions;
export default userSlice.reducer;