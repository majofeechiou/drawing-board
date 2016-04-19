'use strict';

/* *** 這部份用 ReactJs + redux 做 *** */

import MethodOption from './MethodOption';
import MethodControl from './MethodControl';
import React from 'react';
import ReactDOM from 'react-dom';
import Settings from './Settings';
import MethodSettings from './MethodSettings';

export default class MethodReact extends React.Component {

    constructor( props ){
        super( props );
        this.arrangeProps( props );
        this.state = {tt:123};

        this._output_result = {...MethodSettings.getAllMethod()[0]};
    }

    componentWillReceiveProps(nextProps){
        this.arrangeProps(nextProps);
    }

    getOutputResult(){
        return this._output_result;
    }
    setOutputResult( data ){
        this._output_result = data;
    }

    arrangeProps({...json_next}){
        this.state = json_next;
    }

    render(){
        return (
            <div>
                <MethodOption 
                    outputResult={ this.getOutputResult() }
                    methodStore={ this.props.methodStore } />
                <MethodControl 
                    methodStore={ this.props.methodStore } />
            </div>
        );
    }

};


MethodReact.propTypes = {
    methodStore: React.PropTypes.object.isRequired
},
MethodReact.defaultProps = {
    methodStore: {}
};