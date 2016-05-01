'use strict';

/* *** 這部份用 ReactJs + redux 做 *** */

import MethodOption from './MethodOption';
import MethodControl from './MethodControl';
import React from 'react';
import ReactDOM from 'react-dom';
import Settings from './Settings';
import MethodSettings from './MethodSettings';
import GloablData from './GloablData';
import GloablTools from './GloablTools';

export default class MethodReact extends React.Component {

    constructor( props ){
        super( props );

        this.arrangeStates( props );

        this.handleChange = this.handleChange.bind(this);
        this.closeMethod = this.closeMethod.bind(this);

        this.default();

        // setTimeout(function(){
        //     props.methodStore.dispatch({type:'METHOD_LOOKS_TEST'});
        //     setTimeout(function(){
        //         props.methodStore.dispatch({type:'METHOD_LOOKS_INIT'});
        //     },2000);
        // },2000);

    }

    default(){
        let _scope = this ;
        GloablTools.Emitter().on('method.setting.opening', function(){
            let _str_from = GloablData.getFrom();
            _scope.arrangeStates( _scope.getDefaultMethod() );
        });
    }


    defaultMethod = {...MethodSettings.getAllMethod()[0]};

    getDefaultMethod(){
        return this.defaultMethod;
    }

    getOutputResult(){
        return this.state.outputResult;
    }

    arrangeStates(json_next){
        let _json = {};
        _json.outputResult = json_next.outputResult || this.getDefaultMethod();
        if( this.state ){
            this.setState( _json );
        }else{
            this.state = _json;
        }
    }

    closeMethod(){
        GloablTools.Emitter().emit('method.setting.close.asked');
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
        let _str_cn = 'pkg-method-content';
        let _str_cn_options = 'pkg-method-content-options pkg-method-wrap';
        let _str_cn_close = 'pkg-method-content-close';
        let _str_cn_control = 'pkg-method-content-control pkg-method-wrap';
        return (
            <div className={_str_cn}>
                <MethodOption 
                    className={_str_cn_options}
                    handleChange={ this.handleChange }
                    outputResult={ _json_result }
                    methodStore={ this.props.methodStore } />
                <button 
                    className={_str_cn_close} 
                    onClick={ this.closeMethod }>X</button>
                <MethodControl 
                    className={_str_cn_control}
                    outputResult={ _json_result }
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