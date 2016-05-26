'use strict';

import Settings from './Settings';
import StyleSettings from './StyleSettings';
import ReactGroupSetting from './../../lib/react-group/js/Setting';

let _json_luxury_a = StyleSettings.getStyleLuxuryA();
let _json_luxury_b = StyleSettings.getStyleLuxuryB();

let _json_state_init = _json_luxury_a.method;
let _json_state_test = _json_luxury_b.method;

export default function MethodReducer(state = {method:_json_state_init, sub:_json_state_test}, action) {
    switch (action.type) {
        case _json_luxury_a.value:
            return state = {method:_json_state_init, sub:_json_state_test} ;
        case _json_luxury_b.value:
            return state = {method:_json_state_test, sub:_json_state_init} ;
        default:
            return state ;
    }
}