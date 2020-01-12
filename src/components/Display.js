import React from 'react';

import { StyledDisplay } from './styles/StyledDisplay';

export const Display = ({ gameOver, text, data }) => {
    if (data) console.log(data);
    return (
    <StyledDisplay gameOver={gameOver}>{text}</StyledDisplay>
)};