'use strict';

import Settings from './Settings';

export default function MethodReducer(state = {outputResult:{method:Settings.METHOD_SNOW}}, action) {
    switch (action.type) {
        case 'METHOD_CHANGED':
            return state.outputResult.method = 123 ;
        default:
            return state ;
    }
}