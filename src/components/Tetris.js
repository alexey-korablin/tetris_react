import React from 'react';

import { Display } from './Display';
import { Stage } from './Stage';
import { StartButton } from './StartButton';
import { createStage } from "../helpers/gameHelpers";
import {
    StyledTetrisWrapper,
    StyledTetris
} from './styles/StyledTetris';

export const Tetris = () => {
    return (
        <StyledTetrisWrapper>
            <StyledTetris>
                <Stage stage={createStage()}/>
                <aside>
                    <Display text='Score' />
                    <Display text='Rows' />
                    <Display text='Level' />
                </aside>
                <StartButton />
            </StyledTetris>
        </StyledTetrisWrapper>
    )
}