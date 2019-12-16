import { useState, useEffect } from 'react';

import { createStage } from '../helpers/gameHelpers'

export const useStage = (player, resetPlayer) => {
    const [stage, setStage] = useState(createStage());
    const [rowsCleared, setRowsCleared] = useState(0);
    console.log(player);

    useEffect(() => {
        setRowsCleared(0);

        const sweepRows = newStage => newStage.reduce((ack, row) => {
            if (row.findIndex(cell => cell[0] === 0) === -1) {
                setRowsCleared(prev => prev + 1);
                ack.unshift(new Array(newStage[0].length).fill([0, 'clear']));
                return ack;
            }
            ack.push(row);
            return ack;
        }, []);

        const updateStage = prevStage => {
            // flush the stage
            const newStage = prevStage.map(row => 
                row.map(cell => (cell[1] === 'clear' ? [0, 'clear'] : cell)));
            // draw the tetromino
            console.log(player);
            player.tetromino.forEach((row, y) => {
                row.forEach((value, x) => {
                    if (value !== 0) {
                        newStage[y + player.pos.y][x + player.pos.x] = [
                            value,
                            `${player.collided ? 'merged' : 'clear'}`
                        ]
                    }
                });
            });
            // check if collided
            if (player.collided) {
                resetPlayer();
                return sweepRows(newStage);
            }
            return newStage;
        }

        setStage(prev => updateStage(prev))
    }, [player, resetPlayer]);

    return [stage, setStage, rowsCleared];
}