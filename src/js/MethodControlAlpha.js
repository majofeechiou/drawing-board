'use strict';

/* *** 這部份用 ReactJs + redux 做 *** */

import React from 'react';
import GloablTools from './GloablTools';
import Extend from 'Extend';
import Settings from './Settings';
import GloablData from './GloablData';

export default class MethodControlAlpha extends React.Component {
    constructor(props) {
        super(props);

        this.arrangeProps( props );

        this.handleChangeRange = this.handleChangeRange.bind(this);
        this.submitAction = this.submitAction.bind(this);

    }

    getComponentMethod(){
        return Settings.METHOD_ALPHA;
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

    handleChangeRange(e) {
        let _json_new = Extend.deep( this.state, {
            control: {
                range: e.target.value
            }
        } );
        this.setState( _json_new );
    }

    render(){
        let _scope = this;
        return (
            <div>
                <input
                    type="range"
                    ref="range"
                    step="1"
                    min="0"
                    max="100"
                    value={this.state.control.range}
                    onChange={this.handleChangeRange} /> {this.state.control.range} / 100
                <button onClick={_scope.submitAction}>確定</button>
            </div>
        );
    }

};

MethodControlAlpha.propTypes = {
    control: React.PropTypes.object,
},
MethodControlAlpha.defaultProps = {
    control: {},
};