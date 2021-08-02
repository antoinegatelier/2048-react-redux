import React from 'react';
import './board.css';
import { Tile } from '../../components/Tile/Tile';
import { useSelector } from 'react-redux';
import { selectBoard } from './boardSlice';

export function Board() {

    const boardState = useSelector(selectBoard);
    const tiles = [
        new Array(4),
        new Array(4),
        new Array(4),
        new Array(4)
    ];
    
    for (let i = 0; i < boardState.length; i++) {
        for (let y = 0; y < boardState[i].length; y++) {
            tiles[i][y] = <Tile key={`${i}${y}`} i={i} y={y} />;
        }
    }

    return (
        <div className="board">
            {tiles}
        </div>
    )
}