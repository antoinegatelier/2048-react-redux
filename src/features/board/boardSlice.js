import { createSlice } from "@reduxjs/toolkit";

//helper functions

const generateNewValue = () => {
    let randomValue = Math.random().toFixed(1);
    if (randomValue > 0.6) {
        return 4
    }
    else {
        return 2
    }
}

const freeTilesSelector = (state) => {
    let freeTiles = [];
    for (let i = 0; i < state.length; i++) {
        for (let y = 0; y < state[i].length; y++) {
            if (!state[i][y]) { freeTiles.push( { i: i, y: y } ) }
        }
    };
    return freeTiles;
}

const isGameOver = (state) => {
    let gameOver = false;
    if (freeTilesSelector(state).length === 0) {
        for (let i = 0; i < state.length; i++) {
            for (let y = 0; y < state[i].length - 1; y++) {
                if (y + 1 < state[i].length && state[i][y] === state[i][y + 1]) {
                    return;
                }
                if (y + 1 < state.length && state[y][i] === state[y + 1][i]) {
                    return;
                }
            }
            gameOver = true;
        }
    }
    if (gameOver) {
        document.querySelector('.gameover').classList.remove('hidden');
        return;
    }
}

const generateNewTile = (state, freeTiles) => {
    let randomSelector = Math.floor(Math.random() * freeTiles.length);
    state[freeTiles[randomSelector].i][freeTiles[randomSelector].y] = generateNewValue();
    return state;
}

const testAndUpdate = (state, isReversed, isVertical) => {
    for (let i = 0; i < state.length; i++) {
        let valuesArray = [];
        if (isVertical) {
            for (let y = 0; y < state.length; y++) {
                valuesArray.push(state[y][i]);
            };
        } else {
            valuesArray = state[i];
        }
        let reducedArray = isReversed ? valuesArray.filter(value => value !==null).reverse() : valuesArray.filter(value => value !==null);
        for (let y = 0; y < reducedArray.length - 1; y++) {
            if (reducedArray[y] === reducedArray[y + 1]) {
                    return updateBoard(state, isReversed, isVertical);
            }
        }
        if (isReversed) {
            for (let y = valuesArray.length - 1; y > 0; y--) {
                if (valuesArray[y] === null && valuesArray[y - 1] > 1) {
                        return updateBoard(state, isReversed, isVertical);
                }
            }
        } else {
            for (let y = 0; y < valuesArray.length - 1; y++) {
                if (valuesArray[y] === null && valuesArray[y + 1] > 1) {
                        return updateBoard(state, isReversed, isVertical);
                }
            }
        }
    }
    return true;
}

const updateBoard = (state, isReversed, isVertical) => {
    let values = state;
    for (let i = 0; i < state.length; i++) {
        let counter = isReversed ? state.length - 1 : 0;
        if(isVertical) {
            let columnValues = [];
            for (let y = 0; y < values.length; y++) {
                columnValues.push(values[y][i]);
                state[y][i] = null;
            }
            columnValues = isReversed ? columnValues.filter(value => value !== null).reverse() : columnValues.filter(value => value !== null);
            while (columnValues.length > 0) {
                if (columnValues.length > 1 && columnValues[0] === columnValues[1]) {
                    state[counter][i] = columnValues.shift() + columnValues.shift();
                } else {
                    state[counter][i] = columnValues.shift();
                }
                isReversed ? counter-- : counter++;
            }
        } else {
            let rowValues = isReversed ? values[i].filter(value => value !== null).reverse() : values[i].filter(value => value !== null);
            state[i].fill(null);
            while (rowValues.length > 0) {
                if (rowValues.length > 1 && rowValues[0] === rowValues[1]) {
                    state[i][counter] = rowValues.shift() + rowValues.shift();
                    isReversed ? counter-- : counter++;
                } else {
                    state[i][counter] = rowValues.shift();
                    isReversed ? counter-- : counter++;
                }
            }
        }
    }
    state = generateNewTile(state, freeTilesSelector(state));
    isGameOver(state);
    return state;
}

//

const boardSlice = createSlice({
    name: 'board',
    initialState: new Array(4).fill(new Array(4).fill(null)),
    reducers: {
        clearBoard: (state) => {
            state.fill(new Array(4).fill(null))
        },
        generateNewGame: (state) => {
            for (let i = 0; i < 3; i++) {
                state = generateNewTile(state, freeTilesSelector(state));
            }
            return state;
        },
        moveToLeft: (state) => {
            testAndUpdate(state, false, false);
        },
        moveToRight: (state) => {
            testAndUpdate(state, true, false);
        },
        moveUp: (state) => {
            testAndUpdate(state, false, true);
        },
        moveDown: (state) => {
            testAndUpdate(state, true, true);
        }
    }
});

//Action creators for each case reducer function

export const selectBoard = state => state.board;
export const { clearBoard, generateNewGame, moveToLeft, moveToRight, moveDown, moveUp } = boardSlice.actions;
export default boardSlice.reducer;