'use strict';

import StyleSettings from './StyleSettings';

const ALL_STYLE = StyleSettings.getAllStyle();
const STYLE_INDEX = Math.floor(Math.random()*ALL_STYLE.length);

export default class StyleSettingStaic {
    static STYLE_INDEX = STYLE_INDEX ;
    static getInitStyle(){
        let _json_style = ALL_STYLE[ STYLE_INDEX ];
        // _json_style.initIndex = STYLE_INDEX ;
        return _json_style ;
    }

}