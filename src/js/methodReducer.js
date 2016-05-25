'use strict';

import Settings from './Settings';
import StyleSettings from './StyleSettings';
import ReactGroupSetting from './../../lib/react-group/js/Setting';

let _json_init = StyleSettings.getStyleInit();
let _json_test = StyleSettings.getStyleTest();

let _json_state_init = _json_init.method;
let _json_state_test = _json_test.method;

export default function MethodReducer(state = {method:_json_state_init, sub:_json_state_test}, action) {
    switch (action.type) {
        case _json_init.value:
            return state = {method:_json_state_init, sub:_json_state_test} ;
        case _json_test.value:
            return state = {method:_json_state_test, sub:_json_state_init} ;
        default:
            return state ;
    }
}