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

        this.handleChange = this.handleChange.bind(this);

        setTimeout(function(){
            props.methodStore.dispatch({type:'METHOD_LOOKS_TEST'});
            setTimeout(function(){
                props.methodStore.dispatch({type:'METHOD_LOOKS_INIT'});
            },5000);
        },5000);

    }

    // componentWillReceiveProps(nextProps){
    //     this.arrangeProps(nextProps);
    // }

    // componentWillUpdate( nextProps, nextState ){
    //     this.render( nextProps, nextState );
    // }

    getOutputResult(){
        return this.state.outputResult;
    }
    // setOutputResult( data ){
    //     this.state.outputResult = data;
    // }

    arrangeProps(json_next){
        let _json = json_next.methodStore.getState();
        _json.outputResult = json_next.outputResult || {...MethodSettings.getAllMethod()[0]};
        this.state = _json;
    }

    handleChange({...json_return}){
        let _json = {...this.state};
        _json.outputResult = json_return.result;
        this.setState( _json );

    }

    render( nextProps, nextState ){
        nextProps = nextProps || {} ;
        nextState = nextState || {} ;
        let _json_result = nextState.outputResult || this.getOutputResult() ;
        let _json_method = nextProps.methodStore || this.props.methodStore ;
        return (
            <div>
                <div>{_json_result.method}</div>
                <MethodOption 
                    handleChange={ this.handleChange }
                    outputResult={ _json_result }
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