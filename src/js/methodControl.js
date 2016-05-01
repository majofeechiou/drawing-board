'use strict';

/* *** 這部份用 ReactJs + redux 做 *** */

import Utils from './Utils';
import React from 'react';
import ReactDOM from 'react-dom';
import Settings from './Settings';
import ReactSetting from './../../lib/react-group/js/Setting';
import GloablTools from './GloablTools';
import MethodControlDot from './MethodControlDot';
import MethodControlAlpha from './MethodControlAlpha';
import MethodControlSaturate from './MethodControlSaturate';
import MethodControlContrast from './MethodControlContrast';
import MethodControlInvert from './MethodControlInvert';
import MethodSettings from './MethodSettings';

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
        let _scope = this;
        let _json_control = {};

        if( this.props.outputResult.method===Settings.METHOD_DOT ){
            _json_control = {
                frequency: 20,
                minSize: 2,
                maxSize: 18,
                minAlpha: 100,
                maxAlpha: 100,
                color: '#990000', // #hex
                shape: MethodSettings.getAllShape()[0]
            };
            return (
                <div className={_scope.props.className}>
                    <MethodControlDot
                        methodStore={this.props.methodStore}
                        control={_json_control} />
                </div>
            );
        }else if( this.props.outputResult.method===Settings.METHOD_ALPHA ){
            _json_control = {
                range: 100
            };
            return (
                <div className={_scope.props.className}>
                    <MethodControlAlpha
                        methodStore={this.props.methodStore}
                        control={_json_control} />
                </div>
            );
        }else if( this.props.outputResult.method===Settings.METHOD_SATURATE ){
            _json_control = {
                range: 0
            };
            return (
                <div className={_scope.props.className}>
                    <MethodControlSaturate
                        methodStore={this.props.methodStore}
                        control={_json_control} />
                </div>
            );
        }else if( this.props.outputResult.method===Settings.METHOD_CONTRAST ){
            _json_control = {
                range: 0
            };
            return (
                <div className={_scope.props.className}>
                    <MethodControlContrast
                        methodStore={this.props.methodStore}
                        control={_json_control} />
                </div>
            );
        }else if( this.props.outputResult.method===Settings.METHOD_INVERT ){
            _json_control = {};
            return (
                <div className={_scope.props.className}>
                    <MethodControlInvert
                        methodStore={this.props.methodStore}
                        control={_json_control} />
                </div>
            );
        }else{
            return (
                <div className={_scope.props.className}>
                    <div>else</div>
                </div>
            );
        }
    }

};

MethodControl.propTypes = {
    outputResult: React.PropTypes.object.isRequired,
    methodStore: React.PropTypes.object.isRequired,
    className: React.PropTypes.string
},
MethodControl.defaultProps = {
    outputResult: {},
    methodStore: {},
    className: ''
};