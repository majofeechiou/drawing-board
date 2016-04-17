'use strict';

import ReactGroup from "react-group";
import React from 'react';
import ReactDOM from 'react-dom';
import Settings from './Settings';
import GlobalConst from './globalConst';
import ReactSetting from './../../lib/react-group/js/Setting';

export default class MethodSection extends GlobalConst {
    constructor( str_id, json_tools ){
        super();

        this.addGlobalConst( this, 'globalId', str_id );
        this.addGlobalConst( this, 'globalEmitter', json_tools.emitter );

        this.handleChange = this.handleChange.bind(this);
    }

    _sary_options = [
        {
            method: Settings.METHOD_SNOW,
            text: Settings.METHOD_SNOW_NAME
        },
        {
            method: Settings.METHOD_DOT,
            text: Settings.METHOD_DOT_NAME
        },
        {
            method: Settings.METHOD_ALPHA,
            text: Settings.METHOD_ALPHA_NAME
        },
        {
            method: Settings.METHOD_GRAY,
            text: Settings.METHOD_GRAY_NAME
        },
        {
            method: Settings.METHOD_CONTRAST,
            text: Settings.METHOD_CONTRAST_NAME
        }
    ];

    _ary_selectkey = ['method'];
    _data_checked = {method: Settings.METHOD_SNOW};

    _ary_showkey = ['text','method'];

    _bln_iconback = true;

    _str_style = ReactSetting.STYLE_NAME_LUXURY;

    _bln_offBack_01 = false;
    _bln_offBack_02 = true;

    _str_composition = ReactSetting.COMPOSITION_TINY;

    handleChange( bln_change, json_return ){
        if( bln_change===true ){
            this._data_checked = json_return.result;
            this.render();
        }
    }

    render(){
        ReactDOM.render(
            <ReactGroup 
                onChange={this.handleChange}
                outputFormat="json"
                name="name1"
                selectKey={this._ary_selectkey}
                inputoption={this._sary_options}
                outputResult={this._data_checked}
                showKey={this._ary_showkey}
                between="~"
                display={ReactSetting.DISPLAY_INBLOCK}
                padding={ReactSetting.PADDING_BASE}
                fillet={ReactSetting.FILLET_BASE}
                listStyle={ReactSetting.LIST_STYLE_CIRCLE}
                listPosition={ReactSetting.LIST_POSITION_INNER}
                iconPosition={ReactSetting.ICON_POSTION_LEFT}
                iconShow={[ReactSetting.ICON_SHOW_EMPTY_HEART, ReactSetting.ICON_SHOW_HEART]}
                styleName={this._str_style}
                composition={this._str_composition}
                offBack={this._bln_offBack_01}
                styleBorder={true}
                styleIcon={true}
                styleIconBack={this._bln_iconback}
                styleList={true} />, 
            document.getElementById("method-popup")
        );
    }

    create(){
        this.render();
    }

};

