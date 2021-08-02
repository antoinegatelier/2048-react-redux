import React from 'react';
import './tile.css';
import { useSelector } from 'react-redux';
import { selectBoard } from '../../features/board/boardSlice';

export function Tile({i, y}) {
    const boardState = useSelector(selectBoard);
    let power = '';

    switch (boardState[i][y]) {
        case 2 ** 1:
            power = 'power1';
            break;
        case 2 ** 2:
            power = 'power2';
            break;
        case 2 ** 3:
            power = 'power3';
            break;
        case 2 ** 4:
            power = 'power4';
            break;
        case 2 ** 5:
            power = 'power5';
            break;
        case 2 ** 6:
            power = 'power6';
            break;
        case 2 ** 7:
            power = 'power7';
            break;
        case 2 ** 8:
            power = 'power8';
            break;
        case 2 ** 9:
            power = 'power9';
            break;
        case 2 ** 10:
            power = 'power10';
            break;
        case 2 ** 11:
            power = 'power11';
            break;
        case 2 ** 12:
            power = 'power12';
            break;
        case 2 ** 13:
            power = 'power13';
            break;
        case 2 ** 14:
            power = 'power14';
            break;
        case 2 ** 15:
            power = 'power15';
            break;
        default:
            break;
    }


    return (
        <div className={`tile ${power}`}>
            {boardState[i][y]}
        </div>
    )
}