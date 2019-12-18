import React from 'react';
import { StyledStartButton } from './styles/StyledStartButton';

export const StartButton = ({ callback, gameOver }) => 
    (<StyledStartButton onClick={callback}>
        Start {gameOver && 'New'} Game
    </StyledStartButton>);