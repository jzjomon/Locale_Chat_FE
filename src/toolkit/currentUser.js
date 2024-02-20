import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    currentUser : null
};

const currentChatSlice = createSlice({
    name : "currentChat",
    initialState,
    reducers : {
        setCurrentUser : (state, action) => {
            state.currentUser = action.payload;
        }
    }
});

export const { setCurrentUser } = currentChatSlice.actions;
export default currentChatSlice.reducer;
