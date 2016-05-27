'use strict';

import Settings from './Settings';
import StyleSettings from './StyleSettings';
import ReactGroupSetting from './../../lib/react-group/js/Setting';

let _sary_all_style = StyleSettings.getAllStyle();

let _json_init = _sary_all_style[0];

    let _json_luxury_a = StyleSettings.getStyleLuxuryA();
    let _json_luxury_b = StyleSettings.getStyleLuxuryB();

    let _json_state_init = _json_luxury_a.method;
    let _json_state_test = _json_luxury_b.method;

export default function MethodReducer(state = {method:_json_init.method, sub:_json_init.subMethod}, action) {
    console.log('_sary_all_style :: ', _sary_all_style);
    console.log('_json_init :: ', _json_init);
        switch (action.type) {
            case _json_luxury_a.value:
                return state = {method:_json_state_init, sub:_json_state_test} ;
            case _json_luxury_b.value:
                return state = {method:_json_state_test, sub:_json_state_init} ;
            default:
                return state ;
        }
}