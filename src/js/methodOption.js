'use strict';

/* *** 這部份用 ReactJs + redux 做 *** */

import ReactGroup from 'reactGroup';
import React from 'react';
import ReactDOM from 'react-dom';
import Settings from './Settings';
import ReactGroupSetting from './../../lib/react-group/js/Setting';

export default class MethodOption extends React.Component {
    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
        this.arrangeProps( props );

        this._output_result = {...this.getInputoption()[0]};
    }

    getStore(){
        return this.props.methodStore;
    }

    getStoreState(){
        return this.getStore().getState();
    }

    componentWillReceiveProps(nextProps){
        this.arrangeProps(nextProps);
    }

    arrangeProps(json_next){
        this.state = json_next.methodStore.getState();
    }

    getInputoption(){
        return [
            {
                method: Settings.METHOD_SNOW,
                method_name: Settings.METHOD_SNOW_NAME
            },
            {
                method: Settings.METHOD_DOT,
                method_name: Settings.METHOD_DOT_NAME
            },
            {
                method: Settings.METHOD_ALPHA,
                method_name: Settings.METHOD_ALPHA_NAME
            },
            {
                method: Settings.METHOD_GRAY,
                method_name: Settings.METHOD_GRAY_NAME
            },
            {
                method: Settings.METHOD_CONTRAST,
                method_name: Settings.METHOD_CONTRAST_NAME
            }
        ];
    }

    getSelectKey(){
        return ['method'];
    }
    getShowKey(){
        return ['method_name'];
    }
    getOutputResult(){
        return this._output_result;
    }

    setOutputResult( data ){
        this._output_result = data;
    }

    handleChange( bln_change, json_return ){
        if( bln_change===true ){
            this.setOutputResult( json_return.result ); 
            this.render();
        }
    }

    render(){

        let _json_store = this.getStoreState();
        return (
            <ReactGroup 
                onChange={this.handleChange}
                outputFormat="json"
                name="method_option"
                selectKey={this.getSelectKey()}
                inputoption={this.getInputoption()}
                outputResult={this.getOutputResult()}
                showKey={this.getShowKey()}
                between="~"
                display={_json_store.display}
                padding={_json_store.padding}
                fillet={_json_store.fillet}
                listStyle={_json_store.listStyle}
                listPosition={_json_store.listPosition}
                iconPosition={_json_store.iconPosition}
                iconShow={_json_store.iconShow}
                styleName={_json_store.styleName}
                composition={_json_store.composition}
                offBack={_json_store.offBack}
                styleBorder={_json_store.styleBorder}
                styleIcon={_json_store.styleIcon}
                styleIconBack={_json_store.styleIconBack}
                styleList={_json_store.styleList} />
        );
    }

};


MethodOption.propTypes = {
    methodStore: React.PropTypes.object.isRequired
},
MethodOption.defaultProps = {
    methodStore: {}
};