'use strict';

import Settings from './Settings';
import ReactGroupSetting from './../../lib/react-group/js/Setting';

let _json_init_state = {
    outputResult:{
        method:Settings.METHOD_SNOW // 這還有需要放這兒嗎
    },

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
}

export default function MethodReducer(state = _json_init_state, action) {
    switch (action.type) {
        case 'METHOD_CHANGED':
            return state.outputResult.method = 123 ;
        default:
            return state ;
    }
}