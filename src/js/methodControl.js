'use strict';

/* *** 這部份用 ReactJs + redux 做 *** */

import ReactGroup from 'ReactGroup';
import React from 'react';
import ReactDOM from 'react-dom';
import Settings from './Settings';
import ReactSetting from './../../lib/react-group/js/Setting';

export default class MethodControl extends React.Component {
    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
        this.arrangeProps( props );
    }

    componentWillReceiveProps(nextProps){
        this.arrangeProps(nextProps);
    }

    arrangeProps(json_next){
        this.state = json_next.methodStore.getState();
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
            this.state.outputResult = json_return.result;
            this.render();
        }
    }

    render(){
        return (
            <ReactGroup 
                onChange={this.handleChange}
                outputFormat="json"
                name="method_option"
                selectKey={this._ary_selectkey}
                inputoption={this._sary_options}
                outputResult={this._data_checked}
                outputResult2={this.state.outputResult}
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
                styleList={true} />
        );
    }

};


MethodControl.propTypes = {
    methodStore: React.PropTypes.object.isRequired
},
MethodControl.defaultProps = {
    methodStore: {}
};