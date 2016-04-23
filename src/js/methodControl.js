'use strict';

/* *** 這部份用 ReactJs + redux 做 *** */

import Utils from './Utils';
import React from 'react';
import ReactDOM from 'react-dom';
import Settings from './Settings';
import ReactSetting from './../../lib/react-group/js/Setting';
import GloablTools from './GloablTools';
import MethodControlAlpha from './MethodControlAlpha';

export default class MethodControl extends React.Component {
    constructor(props) {
        super(props);

        // this.setComponentId( Utils.createUniqueId() );

        this.arrangeProps( props );

    }

    componentWillReceiveProps(nextProps){
        this.arrangeProps(nextProps);
    }

    // getComponentId(){
    //     return this.component_id;
    // }

    // setComponentId( data ){
    //     this.component_id = data;
    // }

    arrangeProps(json_next){
        if( this.state ){
            // this.setState( {methodStore:json_next.methodStore.getState()} );
            this.setState( {} );
        }else{
            // this.state = {methodStore:json_next.methodStore.getState()};
            this.state = {};
        }
    }

    render(){
        console.log('MethodControl -- render');

        let _scope = this;

        if( this.props.outputResult.method===Settings.METHOD_SNOW ){
            return (
                <div>snow</div>
            );
        }else if( this.props.outputResult.method===Settings.METHOD_DOT ){
            return (
                <div>dot</div>
            );
        }else if( this.props.outputResult.method===Settings.METHOD_ALPHA ){
            let _json_control = {
                range: 100
            };
            return (
                <MethodControlAlpha
                    methodStore={this.props.methodStore}
                    control={_json_control} />
            );
        }else if( this.props.outputResult.method===Settings.METHOD_GRAY ){
            return (
                <div>gray</div>
            );
        }else if( this.props.outputResult.method===Settings.METHOD_CONTRAST ){
            return (
                <div>contrast</div>
            );
        }else{
            return (
                <div>else</div>
            );
        }
        // return (
        //     <div>
        //         <div>123</div>
        //         <If cond={ this.props.outputResult.method===Settings.METHOD_SNOW }>
        //             snow
        //         </If>
        //         <ReactCond>
        //             { this.props.outputResult.method===Settings.METHOD_SNOW } ssss
        //             { this.props.outputResult.method!==Settings.METHOD_SNOW } not
        //         </ReactCond>
        //     </div>
        // );
    }

};

MethodControl.propTypes = {
    outputResult: React.PropTypes.object.isRequired,
    methodStore: React.PropTypes.object.isRequired
},
MethodControl.defaultProps = {
    outputResult: {},
    methodStore: {}
};