import { useState, useCallback, useEffect } from 'react';

import { DEFAULT_STAT } from '../helpers/gameHelpers';

export const useGameStatistics = (player, playerType) => {
    const [stats, setStats] = useState(DEFAULT_STAT);
    const [playerId, setPlayerId] = useState(0);
    // console.log(player);
    // console.log(playerType);

    const resetStats = () => {
        console.log('stats reset');
        setStats({
            'I': 0,
            'Z': 0,
            'T': 0,
            'S': 0,
            'O': 0,
            'L': 0,
            'J': 0,
        })
    };

    const updateStatistics = useCallback(() => {
        console.log(playerId, player.id);
        if (playerId !== player.id) {
            setStats(prev => {
                console.table(prev);
                return ({ ...prev, [playerType]: prev[playerType] += 1 })
            });
            setPlayerId(player.id);
        }
    }, [playerId, player, playerType])

    useEffect(() => {
        updateStatistics();
    }, [player, updateStatistics])

    return [stats, resetStats];
}