'use strict';

/* *** 這部份用 ReactJs + redux 做 *** */

import React from 'react';
import GloablTools from './GloablTools';
import JsonExtend from 'JsonExtend';
import Settings from './Settings';

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
            this.setState( {setting:json_next.setting} );
        }else{
            this.state = {setting:json_next.setting};
        }
    }

    submitAction(){
        let _scope = this;
        let _num_range = _scope.refs.range.value;
        GloablTools.Emitter().emit( 'method.cotroller.setting.operating', {
            method: _scope.getComponentMethod(),
            setting: {
                range: _num_range
            }
        } );
    }

    handleChangeRange(e) {
        let _json_new = JsonExtend( this.state, {
            setting: {
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
                    value={this.state.setting.range}
                    onChange={this.handleChangeRange} /> {this.state.setting.range} / 100
                <button onClick={_scope.submitAction}>確定</button>
            </div>
        );
    }

};

MethodControlAlpha.propTypes = {
    setting: React.PropTypes.object,
},
MethodControlAlpha.defaultProps = {
    setting: {},
};