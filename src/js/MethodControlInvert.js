'use strict';

/* *** 這部份用 ReactJs + redux 做 *** */

import React from 'react';
import GloablTools from './GloablTools';
import Extend from 'Extend';
import Settings from './Settings';
import GloablData from './GloablData';

export default class MethodControlInvert extends React.Component {
    constructor(props) {
        super(props);

        this.arrangeProps( props );

        this.submitAction = this.submitAction.bind(this);
    }

    getComponentMethod(){
        return Settings.METHOD_INVERT;
    }

    componentWillReceiveProps(nextProps){
        this.arrangeProps(nextProps);
    }

    arrangeProps(json_next){
        if( this.state ){
            this.setState( {control:json_next.control} );
        }else{
            this.state = {control:json_next.control};
        }
    }

    submitAction(){
        let _scope = this;
        GloablTools.Emitter().emit( 'method.cotroller.control.asking', {
            from: GloablData.getFrom(),
            method: _scope.getComponentMethod(),
            control: _scope.state.control
        } );
    }

    render(){
        let _scope = this;
        return (
            <div>
                <button onClick={_scope.submitAction}>確定</button>
            </div>
        );
    }

};

MethodControlInvert.propTypes = {
    control: React.PropTypes.object,
},
MethodControlInvert.defaultProps = {
    control: {},
};