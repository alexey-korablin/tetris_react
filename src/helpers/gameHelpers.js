export const STAGE_WIDTH = 12;
export const STAGE_HEIGHT = 20;
export const DEFAULT_STAT = {
    'I': 0,
    'Z': 0,
    'T': 0,
    'S': 0,
    'O': 0,
    'L': 0,
    'J': 0,
};

export const createStage = () => 
    Array.from(Array(STAGE_HEIGHT), () => 
        new Array(STAGE_WIDTH).fill([0, 'clear'])
    );

export const checkCollision = (player, stage, { x: moveX, y: moveY }) => {
    for (let y = 0; y < player.tetromino.length; y++) {
        for (let x = 0; x < player.tetromino[0].length; x++) {
            if (player.tetromino[y][x] !== 0) {
                if (!stage[y + player.pos.y + moveY] 
                    || !stage[y + player.pos.y + moveY][x + player.pos.x + moveX]
                    || stage[y + player.pos.y + moveY][x + player.pos.x + moveX][1] !== 'clear') {
                        return true;
                    }
            }
        }
    }
};

export const getPlayerType = (player) => player.tetromino.length > 1 
? player.tetromino.reduce((ack, l) => [...ack, ...l], []).find(t => t !== 0)
: '-';

export const getStatisticText = (stat) => {
    return Object.keys(stat).reduce((ack, k) => ack + `${k}: ${stat[k]}, `, '');
}