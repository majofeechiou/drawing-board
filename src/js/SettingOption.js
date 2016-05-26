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
import Utils from './Utils';
    // import GloablData from './GloablData';
import Settings from './Settings';
import StyleSettings from './StyleSettings';
import ReactGroup from 'ReactGroup';
import ReactGroupSetting from './../../lib/react-group/js/Setting';

// export default class SettingOption extends GlobalConst {
export default class SettingOption extends React.Component {
    constructor(){
        super();

        this.handleChange = this.handleChange.bind(this);

        this.default();

        this.output_result = this.getInputoption()[0][this.getSelectKey()[0]] ;

    }

    getSelectKey(){
        return ['value'];
    }

    getInputoption(){
        let _sary = StyleSettings.getAllStyle();
        console.log('_sary :::: ', _sary);
        return _sary;
    }

    getOutputResult(){
        return this.output_result;
    }

    setOutputResult( str ){
        this.output_result = str || '' ;
    }

    getShowKey(){
        return ['name'];
    }

    handleChange( bln_change, json_return ){
        if( bln_change===true ){
            this.setOutputResult( json_return.result );
            // // this.render();
        }
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
        // let json_item = this.getInputoption()[0].method;
        // ReactDOM.render(
        return (
            <div>
                <For each="json_item" of={ _scope.getInputoption() }>
                    <ReactGroup 
                        onChange={this.handleChange}
                        outputFormat="string"
                        name="style_option"
                        selectKey={this.getSelectKey()}
                        inputOption={[json_item]}
                        outputResult={this.getOutputResult()}
                        showKey={this.getShowKey()}
                        between="~"
                        display={ReactGroupSetting.DISPLAY_BLOCK}
                        padding={json_item.method.padding}
                        fillet={json_item.method.fillet}
                        listStyle={json_item.method.listStyle}
                        listPosition={json_item.method.listPosition}
                        iconPosition={json_item.method.iconPosition}
                        iconShow={json_item.method.iconShow}
                        styleName={json_item.method.styleName}
                        composition={ReactGroupSetting.COMPOSITION_WHOLE}
                        offBack={json_item.method.offBack}
                        styleBorder={json_item.method.styleBorder}
                        styleIcon={json_item.method.styleIcon}
                        styleIconBack={json_item.method.styleIconBack}
                        styleList={json_item.method.styleList} />
                </For>
            </div>
        );
    }

    create(){
        this.render();
    }

};
