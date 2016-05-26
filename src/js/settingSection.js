'use strict';

/* *** 這部份用 ReactJs + redux + nativeJS 做 *** */

import React from 'react';
import ReactDOM from 'react-dom';
import GlobalConst from './GlobalConst';
// import GloablTools from './GloablTools';
    // import { createStore } from 'redux'
    // import MethodReact from './MethodReact';
    // import MethodReducer from './MethodReducer';
// import Extend from 'Extend';
    // import GloablData from './GloablData';
// import Settings from './Settings';
// import StyleSettings from './StyleSettings';
import SettingOption from './SettingOption';
// import ReactGroup from 'ReactGroup';
// import ReactGroupSetting from './../../lib/react-group/js/Setting';

const OBJ_SETTING_STYLE = document.getElementById("setting-style");

export default class SettingSection extends GlobalConst {
    constructor(){
        super();
    }

    render(){
        ReactDOM.render(
            <SettingOption />, 
                OBJ_SETTING_STYLE
        );
    }

    create(){
        this.render();
    }

};
