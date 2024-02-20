import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    mobile : true,
};

const screenSlice = createSlice({
    name : "screen",
    initialState,
    reducers : {
        setMobile : (state, action) => {
            state.mobile = action.payload
        }
    }
});

export const { setMobile } = screenSlice.actions;
export default screenSlice.reducer;