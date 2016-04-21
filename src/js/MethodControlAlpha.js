'use strict';

/* *** 這部份用 ReactJs + redux 做 *** */

import React from 'react';
import GloablTools from './GloablTools';

export default class MethodControlAlpha extends React.Component {
    constructor(props) {
        super(props);

        this.arrangeProps( props );

        this.tt = this.tt.bind(this);
    }

    componentWillReceiveProps(nextProps){
        this.arrangeProps(nextProps);
    }

    arrangeProps(json_next){
        if( this.state ){
            this.setState( {methodStore:json_next.methodStore.getState()} );
        }else{
            this.state = {methodStore:json_next.methodStore.getState()};
        }
    }

    tt(){
        GloablTools.Emitter().emit( 'method.cotroller.setting.operating', {
            method: this.props.outputResult.method,
            setting: {
                range: document.querySelectorAll('[name="alpha"]')[0].value
            }
        } );
    }

    render(){
        let _scope = this;
        return (
            <div>
                alpha
                <input type="range" name="alpha" step="1" min="0" max="100"  /> / 100
                <button onClick={_scope.tt}>確定</button>
            </div>
        );
    }

};




MethodControl.propTypes = {
    setting: React.PropTypes.object,
    submitAction: React.PropTypes.func
},
MethodControl.defaultProps = {
    setting: {},
    submitAction: {}
};