'use strict';

/* *** 這部份用 ReactJs + redux + nativeJS 做 *** */

import React from 'react';
import ReactDOM from 'react-dom';
import GlobalConst from './GlobalConst';
import SettingOption from './SettingOption';

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
