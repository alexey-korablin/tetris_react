import React, { useState } from 'react';

// Custom hooks
import { usePlayer } from '../hooks/usePlayer';
import { useStage } from '../hooks/useStage';
import { useInterval } from '../hooks/useInterval';
import { useGameStatus } from '../hooks/useGameStatus';
import { useGameStatistics } from '../hooks/useGameStatistics';

// Components
import { Display } from './Display';
import { Stage } from './Stage';
import { StartButton } from './StartButton';

// Helper
import { createStage, checkCollision } from '../helpers/gameHelpers';
import { getStatisticText } from '../helpers/gameHelpers';

// Styled Components
import {
    StyledTetrisWrapper,
    StyledTetris
} from './styles/StyledTetris';

export const Tetris = () => {
    const [dropTime, setDropTime] = useState(null);
    const [gameOver, setGameOver] = useState(false);
    const [
        player,
        updatePlayerPos,
        resetPlayer,
        playerRotate,
        nextPlayerType,
        playerType] = usePlayer();
    const [stage, setStage, rowsCleared] = useStage(player, resetPlayer);
    const [
        score,
        setScore,
        rows,
        setRows,
        level,
        setLevel,
        pause,
        setPause] = useGameStatus(rowsCleared);
    const [stats, resetStats] = useGameStatistics(player, playerType);

    const movePlayer = (dir) => {
        if (!checkCollision(player, stage, { x: dir, y: 0 })) {
            updatePlayerPos({ x: dir, y: 0 })
        }
    };

    const startGame = () => {
        setStage(createStage());
        resetStats();
        setDropTime(1000);
        resetPlayer();
        setGameOver(false);
        setScore(0);
        setRows(0);
        setLevel(0);
        setPause(null);
    };

    const pauseGame = () => {
        if (!pause) {
            setDropTime(null);
        } else {
            setDropTime(1000 / (level + 1) + 200); 
        }
        setPause(prev => !prev);
    }

    const drop = () => {
        if (rows > (level + 1) * 10) {
            setLevel(prev => prev + 1);
            setDropTime(1000 / (level + 1) + 200);
        }
        if (!checkCollision(player, stage, { x: 0, y: 1 })) {
            updatePlayerPos({ x: 0, y: 1, collided: false });
        } else {
            if (player.pos.y < 1) {
                setGameOver(true);
                setDropTime(null)
            }
            updatePlayerPos({ x: 0, y: 0, collided: true });
        }
    };

    const keyUp = ({ keyCode }) => {
        if (!gameOver) {
            if ( keyCode === 40 ) {
                setDropTime(1000 / (level + 1) + 200);
            }
        }
    }

    const dropPlayer = () => {
        setDropTime(null);
        drop();
    };

    const handleKeyDown = ({ keyCode }) => {
        if (!gameOver) {
            if (keyCode === 37 ) {
                movePlayer(-1);
            } else if (keyCode === 39) {
                movePlayer(1);
            } else if (keyCode === 40) {
                dropPlayer();
            } else if (keyCode === 38) {
                playerRotate(stage, 1);
            } else if (keyCode === 80) {
                pauseGame();
            } else if (keyCode === 70) {
                setGameOver(true);
                setDropTime(null);
            }
        } 
        if (keyCode === 83) {
            startGame();
        }
    }

    useInterval(() => { drop(); }, dropTime);

    return (
        <StyledTetrisWrapper 
            role="button" 
            tabIndex="0" 
            onKeyDown={(e) => handleKeyDown(e)}
            onKeyUp={keyUp}>
            <StyledTetris>
                <Stage stage={stage} pause={pause}/>
                <aside>
                <>
                    {gameOver && <Display gameOver={gameOver} text='Game Over'/>}
                    <Display text={`Score: ${score}`} />
                    <Display text={`Rows: ${rows}`} />
                    <Display text={`Level: ${level}`} />
                    <Display text={`Next Brick: ${nextPlayerType}`} />
                    <Display text={getStatisticText(stats)} data={stats}/>
                    <StartButton callback={startGame} gameOver={gameOver}/>
                </>
                </aside>
            </StyledTetris>
        </StyledTetrisWrapper>
    )
}