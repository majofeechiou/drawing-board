'use strict';

/* *** 這部份用 ReactJs + redux + nativeJS 做 *** */

import React from 'react';
import ReactDOM from 'react-dom';
import GlobalConst from './GlobalConst';
import SettingOption from './SettingOption';
import StyleSettingStaic from './StyleSettingStaic';

const OBJ_SETTING_STYLE   = document.getElementById("setting-style");

export default class SettingSection extends GlobalConst {
    constructor(json){
        super();
        // this.setInitData(json); // 目前基本上只有在頁面初始化時用到
    }

    // setInitData(json){
    //     this.init_data = json ;
    // }

    // getInitData(){
    //     return this.init_data ;
    // }

    render(){
        // let _json_init = this.getInitData();
        let _json_init = StyleSettingStaic.getInitStyle();
        ReactDOM.render(
            <SettingOption 
                method={_json_init.value} />, 
                OBJ_SETTING_STYLE
        );
    }

    create(){
        this.render();
    }

};
