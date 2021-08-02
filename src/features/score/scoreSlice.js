import { createSlice } from "@reduxjs/toolkit";

const scoreSlice = createSlice({
    name: 'score',
    initialState : {
        score: 0,
        sessionHighscore: 0,
        userHighscore: 0
    },
    reducers: {
        updateScore: (state) => {

        },
        updateSessionHighscore: (state, action) => {

        },
        updateUserHighscore: (state, action) => {

        }
    }
});

//Actionc reators for each case reducer function
export const selectScore = state => state.score;
export const { updateActualScore, updateSessionHighscore, updateUserHighscore } = scoreSlice.actions;
export default scoreSlice.reducer;