import { useState } from 'react';

import { createStage } from '../helpers/gameHelpers'

export const useStage = () => {
    const [stage, setStage] = useState(createStage());

    return [stage, setStage];
}