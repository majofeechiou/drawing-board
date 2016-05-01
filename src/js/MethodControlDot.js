'use strict';

/* *** 這部份用 ReactJs + redux 做 *** */

import React from 'react';
import GloablTools from './GloablTools';
import Extend from 'Extend';
import Settings from './Settings';
import GloablData from './GloablData';
import ColorPicker from 'react-color-picker';
import MethodSettings from './MethodSettings';
import ReactGroup from 'ReactGroup';

// http://jslog.com/react-color-picker/
// https://www.npmjs.com/package/react-color-picker
// https://www.npmjs.com/package/color-picker

export default class MethodControlDot extends React.Component {
    constructor(props) {
        super(props);

        let _scope = this;

        _scope.arrangeProps( props );

        _scope.handleChangeRange = _scope.handleChangeRange.bind(_scope);
        _scope.handleChangeShape = _scope.handleChangeShape.bind(_scope);
        _scope.prevewAction = _scope.prevewAction.bind(_scope);
        _scope.submitAction = _scope.submitAction.bind(_scope);
        _scope.colorPick = _scope.colorPick.bind(_scope);

        GloablTools.Emitter().on('preview.image.object.data.changing',function() {
            console.log('%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%');
            let _json_new = _scope.arrangeState();
            _scope.setState( _json_new );
            // setTimeout(function(){
            //     _scope.render();
            // },200);
        });

    }

    componentWillReceiveProps(nextProps){
        this.arrangeProps(nextProps);
    }

    getComponentMethod(){
        return Settings.METHOD_DOT;
    }

    arrangeState(){
        return Extend.deep( 
            {},
            { control: this.props.control }, 
            this.state, 
            { control: 
                {
                    frequency: this.refs.frequency.value,
                    minSize: this.refs.minSize.value,
                    maxSize: this.refs.maxSize.value,
                    minAlpha: this.refs.minAlpha.value,
                    maxAlpha: this.refs.maxAlpha.value,
                }
            },
            { imgObj: 
                {
                    src: GloablData.getImageObjectSrc()
                }
            }
        );
    }

    arrangeProps(json_next, callback){//+++++++++++++++++++++++++++++++
        if( this.state ){
            this.setState( {control:json_next.control} );
        }else{
            this.state = {control:json_next.control};
        }
        if( callback ){
            callback();
        }
    }

    prevewAction(){
        let _scope = this;
        GloablTools.Emitter().emit( 'method.cotroller.previewing', {
            from: GloablData.getFrom(),
            method: _scope.getComponentMethod(),
            control: _scope.state.control
        } );
    }

    submitAction(){
        let _scope = this;
        GloablTools.Emitter().emit( 'method.cotroller.control.asking', {
            from: GloablData.getFrom(),
            method: _scope.getComponentMethod(),
            control: _scope.state.control
        } );
    }

    handleChangeRange() {
        let _json_new = this.arrangeState();
        this.setState( _json_new );
    }

    handleChangeShape( bln_change, json_return ) {
        let _scope = this ;
        let _json_new = _scope.arrangeState();
        _scope.setState( _json_new );

    }

    getInputoption(){
        return MethodSettings.getAllShape();
    }
    getSelectKey(){
        return ['shape','shape_name'];
    }
    getShowKey(){
        return ['shape_name'];
    }

    colorPick( str_color ){
        let _json_state = this.arrangeState();
        _json_state.control.color = str_color ;
        this.setState( _json_state );
    }

    render(){
        console.log('+++++++render+++++++++++++++++');
        let _scope = this;
        let _json_sub_store = this.props.methodStore.getState().sub;
        let _json_now_image = GloablData.getNowImageData() ;
        let _json_style = {
            float: 'right',
            width: '40%'
        };
        let _str_img_src = ( this.state && this.state.imgObj )? this.state.imgObj.src : '' ;

        return (
            <div>
                <ReactGroup 
                    onChange={this.handleChangeShape}
                    outputFormat="json"
                    name="method_option"
                    selectKey={this.getSelectKey()}
                    inputOption={this.getInputoption()}
                    outputResult={this.state.control.shape}
                    showKey={this.getShowKey()}
                    between="~"
                    display={_json_sub_store.display}
                    padding={_json_sub_store.padding}
                    fillet={_json_sub_store.fillet}
                    listStyle={_json_sub_store.listStyle}
                    listPosition={_json_sub_store.listPosition}
                    iconPosition={_json_sub_store.iconPosition}
                    iconShow={_json_sub_store.iconShow}
                    styleName={_json_sub_store.styleName}
                    composition={_json_sub_store.composition}
                    offBack={_json_sub_store.offBack}
                    styleBorder={_json_sub_store.styleBorder}
                    styleIcon={_json_sub_store.styleIcon}
                    styleIconBack={_json_sub_store.styleIconBack}
                    styleList={_json_sub_store.styleList} />

                <img src={_str_img_src} style={_json_style} />
                
                <div style={{marginTop: '15px', marginBottom: '5px'}}>
                    <span style={{display: 'inline-block',background: this.state.control.color, padding: '5px', color: 'white'}}>
                        {this.state.control.color}
                    </span>
                </div>
                <ColorPicker 
                    value={this.state.control.color} 
                    onDrag={this.colorPick} />

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
                        max="200"
                        value={this.state.control.maxSize}
                        onChange={this.handleChangeRange} /> {this.state.control.maxSize} / 200
                </div>
                <div>
                    透明度 ： 
                    <input
                        type="range"
                        ref="minAlpha"
                        step="1"
                        min="1"
                        max={this.state.control.maxAlpha}
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
                <If condition={ _json_now_image && (typeof _json_now_image.origin_data === 'string') && _json_now_image.origin_data!=='' }>
                    <button onClick={_scope.prevewAction}>預覽</button>
                </If>
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