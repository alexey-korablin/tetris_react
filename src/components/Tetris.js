import React, { useState } from 'react';

// Custom hooks
import { usePlayer } from '../hooks/usePlayer';
import { useStage } from '../hooks/useStage';

// Components
import { Display } from './Display';
import { Stage } from './Stage';
import { StartButton } from './StartButton';

// Helper
import { createStage } from '../helpers/gameHelpers';

// Styled Components
import {
    StyledTetrisWrapper,
    StyledTetris
} from './styles/StyledTetris';

export const Tetris = () => {
    const [dropTime, setDropTime] = useState(null);
    const [gameOver, setgameOver] = useState(false);
    const [player, updatePlayerPos, resetPlayer] = usePlayer();
    const [stage, setStage] = useStage(player);

    console.log('re-render');

    // const updatePlayerPos = () => {};
    // const resetPlayer = () => {};

    const movePlayer = (dir) => {
        updatePlayerPos({ x: dir, y: 0 })
    };

    const startGame = () => {
        setStage(createStage());
        resetPlayer();
    };

    const drop = () => {
        updatePlayerPos({ x: 0, y: 1, collided: false });
    };

    const dropPlayer = () => {
        drop();
    };

    const move = ({ keyCode }) => {
        if (!gameOver) {
            if (keyCode === 37 ) {
                movePlayer(-1);
            } else if (keyCode === 39) {
                movePlayer(1);
            } else if (keyCode === 40) {
                dropPlayer();
            }
        }
    }

    return (
        <StyledTetrisWrapper role="button" tabIndex="0" onKeyDown={(e) => move(e)}>
            <StyledTetris>
                <Stage stage={stage}/>
                <aside>
                    {gameOver ? <Display gameOver={gameOver} text='Game Over'/> :
                        (<>
                            <Display text='Score' />
                            <Display text='Rows' />
                            <Display text='Level' />
                            <StartButton onClick={startGame} />
                        </>)
                    }
                </aside>
            </StyledTetris>
        </StyledTetrisWrapper>
    )
}