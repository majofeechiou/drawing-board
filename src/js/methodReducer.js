'use strict';

import Settings from './Settings';
import StyleSettings from './StyleSettings';
import ReactGroupSetting from './../../lib/react-group/js/Setting';

let _sary_all_style = StyleSettings.getAllStyle();

let _json_init = _sary_all_style[0];

export default function MethodReducer(state = {method:_json_init.method, sub:_json_init.subMethod}, action) {
    _sary_all_style.forEach(function({value, method, subMethod}){
        if( action.type===value ){
            state = { method, sub:subMethod } ;
            return state;
        }
    });

    return state ;

}