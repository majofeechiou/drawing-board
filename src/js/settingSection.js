'use strict';

/* *** 這部份用 ReactJs + redux + nativeJS 做 *** */

import React from 'react';
import ReactDOM from 'react-dom';
import GlobalConst from './GlobalConst';
// import GloablTools from './GloablTools';
    // import { createStore } from 'redux'
    // import MethodReact from './MethodReact';
    // import MethodReducer from './MethodReducer';
import Extend from 'Extend';
    // import GloablData from './GloablData';
import Settings from './Settings';
import StyleSettings from './StyleSettings';
import ReactGroup from 'ReactGroup';
import ReactGroupSetting from './../../lib/react-group/js/Setting';

const OBJ_SETTING_STYLE = document.getElementById("setting-style");

export default class SettingSection extends GlobalConst {
    constructor(){
        super();

        this.default();

        this.output_result = '' ;

    }

    getSelectKey(){
        return ['value'];
    }

    getInputoption(){
        let _sary = StyleSettings.getAllStyle();
        console.log( '_sary :: ', _sary );
        return _sary;
    }

    getOutputResult(){
        return this.output_result;
    }

    getShowKey(){
        return ['name'];
    }

    default(){
        let _scope = this;

        // GloablTools.Emitter().on('method.setting.open.asked', function(){
        //     let _json_emit = arguments[0];
        //     let _json_setting = arguments[1];
        //     GloablTools.Emitter().emit('step.image.new.loading', _json_emit);

        //     let _str_cn_base = _scope.getMethodBaseClassName();
        //     OBJ_SETTING_STYLE.className = _str_cn_base+' '+METHOD_POPUP_OPEN_CLASSNAME;
        //     GloablTools.Emitter().emit('method.setting.opening');

        //     GloablData.setSizeSetting( _json_setting );
        // });

    }

    render(){
        let _scope = this;
        let _json_style = this.getInputoption()[0].method;
        // ReactDOM.render(
        //     <MethodReact />, 
        //         OBJ_SETTING_STYLE
        // );
        ReactDOM.render(
            <ReactGroup 
                onChange={this.handleChange}
                outputFormat="string"
                name="style_option"
                selectKey={this.getSelectKey()}
                inputOption={this.getInputoption()}
                outputResult={this.getOutputResult()}
                showKey={this.getShowKey()}
                between="~"
                display={ReactGroupSetting.DISPLAY_BLOCK}
                padding={_json_style.padding}
                fillet={_json_style.fillet}
                listStyle={_json_style.listStyle}
                listPosition={_json_style.listPosition}
                iconPosition={_json_style.iconPosition}
                iconShow={_json_style.iconShow}
                styleName={_json_style.styleName}
                composition={ReactGroupSetting.COMPOSITION_WHOLE}
                offBack={_json_style.offBack}
                styleBorder={_json_style.styleBorder}
                styleIcon={_json_style.styleIcon}
                styleIconBack={_json_style.styleIconBack}
                styleList={_json_style.styleList} />, 
                OBJ_SETTING_STYLE
        );
    }

    create(){
        this.render();
    }

};
