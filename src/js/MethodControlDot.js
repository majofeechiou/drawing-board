'use strict';

/* *** 這部份用 ReactJs + redux 做 *** */

import React from 'react';
import GloablTools from './GloablTools';
import Extend from 'Extend';
import Settings from './Settings';
import GloablData from './GloablData';
import ColorPicker from './ColorPicker';

export default class MethodControlDot extends React.Component {
    constructor(props) {
        super(props);

        this.setAllColor();
        this.arrangeProps( props );

        this.handleChangeRange = this.handleChangeRange.bind(this);
        this.submitAction = this.submitAction.bind(this);
        this.colorPick = this.colorPick.bind(this);
    }

    getComponentMethod(){
        return Settings.METHOD_DOT;
    }

    arrangeState(){
        return Extend.deep( 
            {},
            { control: this.props.control }, 
            this.state, 
            { control: {
                frequency: this.refs.frequency.value,
                minSize: this.refs.minSize.value,
                maxSize: this.refs.maxSize.value,
                minAlpha: this.refs.minAlpha.value,
                maxAlpha: this.refs.maxAlpha.value
            }
        } );
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
        GloablTools.Emitter().emit( 'method.cotroller.control.operating', {
            from: GloablData.getFrom(),
            method: _scope.getComponentMethod(),
            control: _scope.state.control
        } );
    }

    handleChangeRange() {
        let _json_new = this.arrangeState({});
        this.setState( _json_new );
    }

    setAllColor(){
        let _scope = this;
        let _ary_hex = ['0', '3', '6', '9', 'c', 'f'];
        this.all_color = [];

        for( let r=0; r<_ary_hex.length; r++ ){
            for( let g=0; g<_ary_hex.length; g++ ){
                for( let b=0; b<_ary_hex.length; b++ ){
                    this.all_color.push('#'+_ary_hex[r]+_ary_hex[g]+_ary_hex[b]) ;
                }
            }
        }
    }

    getAllColor(){
        return this.all_color ;
    }

    colorPick( str_bg ){
        let _scope = this ;
        let _json_state = this.arrangeState();
        _json_state.control.color = str_bg;
        console.log('_json_state :: ', _json_state);
        this.setState( _json_state );
        setTimeout(function(){
            console.log('_scope.state :: ', _scope.state);
        },200);
    }

    render(){
        let _scope = this;
        let _ary_hex_all = this.getAllColor();
        let _num_oneline = 6;
        let _json_style = {
            display: 'block',
            clear: 'both',
            height: 0,
            overflow: 'hidden',
            position: 'relative'
        };

        return (
            <div>
                <div>{this.state.control.color}</div>
                <div>
                    <For each="str_item" of={ _ary_hex_all }>
                        <ColorPicker color={str_item} oneLine={_num_oneline} whenClick={this.colorPick} />
                    </For>
                    <div style={_json_style}></div>
                </div>
                <div>
                    頻率 ： 
                    <input
                        type="range"
                        ref="frequency"
                        step="1"
                        min="1"
                        max="100"
                        value={this.state.control.frequency}
                        onChange={this.handleChangeRange} /> {this.state.control.frequency} / 100
                </div>
                <div>
                    大小 ： 
                    <input
                        type="range"
                        ref="minSize"
                        step="1"
                        min="1"
                        max={this.state.control.maxSize}
                        value={this.state.control.minSize}
                        onChange={this.handleChangeRange} /> {this.state.control.minSize} / {this.state.control.maxSize}
                    <input
                        type="range"
                        ref="maxSize"
                        step="1"
                        min={this.state.control.minSize}
                        max="20"
                        value={this.state.control.maxSize}
                        onChange={this.handleChangeRange} /> {this.state.control.maxSize} / 20
                </div>
                <div>
                    透明度 ： 
                    <input
                        type="range"
                        ref="minAlpha"
                        step="1"
                        min="1"
                        max={this.state.control.maxSize}
                        value={this.state.control.minAlpha}
                        onChange={this.handleChangeRange} /> {this.state.control.minAlpha} / {this.state.control.maxAlpha}
                    <input
                        type="range"
                        ref="maxAlpha"
                        step="1"
                        min={this.state.control.minAlpha}
                        max="100"
                        value={this.state.control.maxAlpha}
                        onChange={this.handleChangeRange} /> {this.state.control.maxAlpha} / 100
                </div>
                <button onClick={_scope.submitAction}>確定</button>
            </div>
        );
    }

};

MethodControlDot.propTypes = {
    control: React.PropTypes.object,
},
MethodControlDot.defaultProps = {
    control: {},
};