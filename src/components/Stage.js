import React from 'react';

import Cell from './Cell';
import { StyledStage } from './styles/StyledStage';
import { StyledSplash } from './styles/StyledSplash';
import { StyledWrapper } from './styles/StyledWrapper';
import { StyledSplashMessage } from './styles/StyledSplashMessage';
import { StyledSplashTips } from './styles/StyledSplashTips';

export const Stage = ({ stage, pause }) => (
    <StyledWrapper>
        {pause && <StyledSplash>
            <StyledSplashMessage>paused</StyledSplashMessage>
            <StyledSplashTips>to resume the game press 'r'</StyledSplashTips>
            </StyledSplash>   } 
        <StyledStage 
            width={stage[0].length} 
            height={stage.length} 
            pause={pause}>
            {stage.map(row => row.map((cell, x) => 
                <Cell key={x} type={cell[0]} />))}
        </StyledStage>
    </StyledWrapper>
);