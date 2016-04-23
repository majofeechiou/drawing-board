'use strict';

import Settings from './Settings';
import ReactGroupSetting from './../../lib/react-group/js/Setting';

let _json_state_init = {
    display: ReactGroupSetting.DISPLAY_INBLOCK,
    padding: ReactGroupSetting.PADDING_BASE,
    fillet: ReactGroupSetting.FILLET_BASE,
    listStyle: ReactGroupSetting.LIST_STYLE_CIRCLE,
    listPosition: ReactGroupSetting.LIST_POSITION_INNER,
    iconPosition: ReactGroupSetting.ICON_POSTION_LEFT,
    iconShow: [ReactGroupSetting.ICON_SHOW_EMPTY_HEART, ReactGroupSetting.ICON_SHOW_HEART],
    styleName: ReactGroupSetting.STYLE_NAME_LUXURY,
    composition: ReactGroupSetting.COMPOSITION_TINY,
    offBack: false,
    styleBorder: true,
    styleIcon: true,
    styleIconBack: true,
    styleList: true
};
let _json_state_test = {
    display: ReactGroupSetting.DISPLAY_INBLOCK,
    padding: ReactGroupSetting.PADDING_TINY,
    fillet: ReactGroupSetting.FILLET_BASE,
    listStyle: ReactGroupSetting.LIST_STYLE_CIRCLE,
    listPosition: ReactGroupSetting.LIST_POSITION_INNER,
    iconPosition: ReactGroupSetting.ICON_POSTION_LEFT,
    iconShow: [ReactGroupSetting.ICON_SHOW_EMPTY_HEART, ReactGroupSetting.ICON_SHOW_HEART],
    styleName: ReactGroupSetting.STYLE_NAME_LUXURY,
    composition: ReactGroupSetting.COMPOSITION_TINY,
    offBack: true,
    styleBorder: true,
    styleIcon: true,
    styleIconBack: true,
    styleList: true
};

export default function MethodReducer(state = _json_state_init, action) {
    switch (action.type) {
        case 'METHOD_LOOKS_INIT':
            return state = _json_state_init ;
        case 'METHOD_LOOKS_TEST':
            return state = _json_state_test ;
        default:
            return state ;
    }
}