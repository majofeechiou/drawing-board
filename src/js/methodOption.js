'use strict';

/* *** 這部份用 ReactJs + redux 做 *** */

import ReactGroup from 'ReactGroup';
import React from 'react';
import ReactDOM from 'react-dom';
import Settings from './Settings';
import MethodSettings from './MethodSettings';
import ReactGroupSetting from './../../lib/react-group/js/Setting';

export default class MethodOption extends React.Component {
    constructor(props) {
        super(props);

        this.state = {};
        this.handleChange = this.handleChange.bind(this);
    }

    getStore(){
        return this.props.methodStore;
    }

    getStoreState(){
        return this.getStore().getState();
    }

    getInputoption(){
        return MethodSettings.getAllMethod();
    }

    getSelectKey(){
        return ['method'];
    }
    getShowKey(){
        return ['method_name'];
    }
    getOutputResult(){
        return this.props.outputResult;
    }

    handleChange( bln_change, json_return ){
        if( bln_change===true ){
            this.props.handleChange(json_return);
        }
    }

    render(){

        let _json_method_store = this.getStoreState().method;
        return (
            <ReactGroup 
                onChange={this.handleChange}
                outputFormat="json"
                name="method_option"
                selectKey={this.getSelectKey()}
                inputOption={this.getInputoption()}
                outputResult={this.getOutputResult()}
                showKey={this.getShowKey()}
                between="~"
                display={_json_method_store.display}
                padding={_json_method_store.padding}
                fillet={_json_method_store.fillet}
                listStyle={_json_method_store.listStyle}
                listPosition={_json_method_store.listPosition}
                iconPosition={_json_method_store.iconPosition}
                iconShow={_json_method_store.iconShow}
                styleName={_json_method_store.styleName}
                composition={_json_method_store.composition}
                offBack={_json_method_store.offBack}
                styleBorder={_json_method_store.styleBorder}
                styleIcon={_json_method_store.styleIcon}
                styleIconBack={_json_method_store.styleIconBack}
                styleList={_json_method_store.styleList} />
        );
    }

};


MethodOption.propTypes = {
    handleChange: React.PropTypes.func.isRequired,
    outputResult: React.PropTypes.object.isRequired,
    methodStore: React.PropTypes.object.isRequired
},
MethodOption.defaultProps = {
    handleChange: ()=>{},
    outputResult: {},
    methodStore: {}
};

// this.arrangeProps( props );

// componentWillReceiveProps(nextProps){
//     this.arrangeProps(nextProps);
// }

// arrangeProps(json_next){
//     this.setState( {methodStore:json_next.methodStore.getState()} );
// }