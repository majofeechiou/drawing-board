'use strict';

import React from 'react';
import GloablTools from './GloablTools';
import Extend from 'Extend';
import Settings from './Settings';
import GloablData from './GloablData';
import ReactGroup from 'ReactGroup';
import Utils from './Utils';
import MethodSettings from './MethodSettings';
import ColorPickerCpt from './ColorPickerCpt';

export default class MethodControlText extends React.Component {
    constructor(props) {
        super(props);

        let _scope = this;

        _scope.createAllPos();

        _scope.arrangeProps( props );

        _scope.handleChange = _scope.handleChange.bind(_scope);
        _scope.handleChangePos = _scope.handleChangePos.bind(_scope);
        _scope.submitAction = _scope.submitAction.bind(_scope);
        _scope.prevewAction = _scope.prevewAction.bind(_scope);
        _scope.listenPreviewImageChange = _scope.listenPreviewImageChange.bind(_scope);
        _scope.showTextColorPicker = _scope.showTextColorPicker.bind(_scope);
        _scope.showBorderColorPicker = _scope.showBorderColorPicker.bind(_scope);
        _scope.textColorPickAction = _scope.textColorPickAction.bind(_scope);
        _scope.borderColorPickAction = _scope.borderColorPickAction.bind(_scope);

        
    }

    componentWillMount(){
        let _scope = this;
        GloablTools.Emitter().on('preview.image.object.data.changing', _scope.listenPreviewImageChange );
    }

    componentWillUnmount(){
        let _scope = this;
        GloablTools.Emitter().off('preview.image.object.data.changing', _scope.listenPreviewImageChange );
    }

    getComponentMethod(){
        return Settings.METHOD_TEXT;
    }

    componentWillReceiveProps(nextProps){
        this.arrangeProps(nextProps);
    }

    listenPreviewImageChange(){
        let _scope = this;
        let _json_new = _scope.arrangeState({imgObj:{src:GloablData.getImageObjectSrc()}});
        _scope.setState( _json_new );
    }

    arrangeState( json ){
        json = json || {} ;
        let _json_output = Extend.deep( 
            {},
            { control: this.props.control }, 
            this.state, 
            { control: 
                {
                    pos: this.state.control.pos || this.props.control.pos, 
                    text: (this.refs && this.refs.text)? this.refs.text.value : this.props.control.text, 
                    size: (this.refs && this.refs.size)? Number(this.refs.size.value) : Number(this.props.control.size), 
                }
            },
            { imgObj: 
                {
                    src: ( this.state && this.state.imgObj )? this.state.imgObj.src : GloablData.getImageObjectSrc()
                }
            }
        );
        return Extend.deep( _json_output, json );
    }

    getNowImageDataBase64(){
        let _data_now = GloablData.getNowImageData() ;
        return _data_now.data;
    }

    arrangeProps(json_next, callback){
        let _str_base64 = this.getNowImageDataBase64() ;
        if( this.state ){
            this.setState( {
                control: json_next.control,
                imgObj: this.state.imgObj
            } );
        }else{
            this.state = {
                control:json_next.control,
                imgObj: {
                    src: _str_base64 || GloablData.getImageObjectSrc()
                },
                showTextColorPicker: false,
                showBorderColorPicker: false
            };
        }
        if( callback ){
            callback();
        }
    }

    judgeEmpty(){
        let _bln_empty = false;
        let _data_empty = (this.state.control.text).match(/^\s*$/);
        if( (_data_empty instanceof Array === true) && _data_empty.length>0 ){
            _bln_empty = true ;
        }
        return _bln_empty;
    }

    prevewAction(){
        let _scope = this,
            _bln = _scope.judgeEmpty();
        if( _bln===true ){
            alert('Not Empty');
        }else{
            GloablTools.Emitter().emit( 'method.cotroller.previewing', {
                from: GloablData.getFrom(),
                method: _scope.getComponentMethod(),
                control: _scope.state.control
            } );
        }
    }

    submitAction(){
        let _scope = this,
            _bln = _scope.judgeEmpty();
        if( _bln===true ){
            alert('Not Empty');
        }else{
            GloablTools.Emitter().emit( 'method.cotroller.control.asking', {
                from: GloablData.getFrom(),
                method: _scope.getComponentMethod(),
                control: _scope.state.control
            } );
        }
    }

    handleChangePos( bln_change, json_return ){
        let _scope = this ;
        if( bln_change===true ){
            let _json_new = _scope.arrangeState( {control: {pos: json_return.result}} );
            _scope.setState( _json_new );
        }
    }

    handleChange() {
        let _json_new = this.arrangeState();
        this.setState( _json_new );
        this.render();
    }

    getSelectKey(){
        return ['pos'];
    }
    getShowKey(){
        return ['pos_name'];
    }

    createAllPos(){
        let _sary = (MethodSettings.getAllPos()).map(function(json_item){
            json_item.key = Utils.createUniqueId();
            return json_item;
        });
        this.all_pos = _sary;
    }

    getAllPos(){
        return this.all_pos;
    }

    textColorPickAction( str_color ){
        let _json_state = this.arrangeState({control:{textColor:str_color}});
        this.setState( _json_state );
    }

    borderColorPickAction( str_color ){
        let _json_state = this.arrangeState({control:{borderColor:str_color}});
        this.setState( _json_state );
    }

    showTextColorPicker( bln ){
        let _json_state = this.arrangeState({showTextColorPicker:!!bln});
        this.setState( _json_state );
    }

    showBorderColorPicker( bln ){
        let _json_state = this.arrangeState({showBorderColorPicker:!!bln});
        this.setState( _json_state );
    }

    render(){
        let _scope = this;
        let _json_sub_store = this.props.methodStore.getState().sub;
        let _json_now_image = GloablData.getNowImageData() ;
        let _str_img_src = ( this.state && this.state.imgObj )? this.state.imgObj.src : '' ;
        return (
            <div className="pkg-control">
                <div className="pkg-control-left">
                    輸入文字：<input type="text" name="text" placeholder="請輸入文字" ref="text" value={this.state.control.text} onChange={this.handleChange} />
                    <br />

                    文字大小：<input type="range" name="size" min="9" max="80" step="1" ref="size" value={this.state.control.size} onChange={this.handleChange} />{this.state.control.size}px
                    <br />

                    <div>
                        文字顏色：
                        <span onClick={()=>{_scope.showTextColorPicker(true);}}
                            style={{display: 'inline-block',background: _scope.state.control.textColor, padding: '5px', color: 'white'}}>
                            {_scope.state.control.textColor} - {JSON.stringify(_scope.state.showTextColorPicker)}
                        </span>
                    </div>

                    <div>
                        文字外框色：
                        <span onClick={()=>{_scope.showBorderColorPicker(true);}}
                            style={{display: 'inline-block',background: _scope.state.control.borderColor, padding: '5px', color: 'white'}}>
                            {_scope.state.control.borderColor} - {JSON.stringify(_scope.state.showBorderColorPicker)}
                        </span>
                    </div>

                    <div>
                        文字位置（水平 / 垂直）：
                        <br />
                        <For each="json_item" of={ _scope.getAllPos() }>
                            <ReactGroup 
                                onChange={_scope.handleChangePos}
                                outputFormat="string"
                                name="method_option"
                                selectKey={_scope.getSelectKey()}
                                inputOption={[json_item]}
                                outputResult={_scope.state.control.pos}
                                showKey={_scope.getShowKey()}
                                between="~"
                                display="inline-block"
                                padding={_json_sub_store.padding}
                                fillet={_json_sub_store.fillet}
                                listStyle={_json_sub_store.listStyle}
                                listPosition={_json_sub_store.listPosition}
                                iconPosition={_json_sub_store.iconPosition}
                                iconShow={_json_sub_store.iconShow}
                                styleName={_json_sub_store.styleName}
                                offBack={_json_sub_store.offBack}
                                styleBorder={_json_sub_store.styleBorder}
                                styleIcon={_json_sub_store.styleIcon}
                                styleIconBack={_json_sub_store.styleIconBack}
                                styleList={_json_sub_store.styleList}
                                key={json_item.key} />
                        </For>
                    </div>
                </div>
                <If condition={ _str_img_src && (typeof _str_img_src === 'string') && _str_img_src!=='' }>
                    <div className="pkg-control-right pkg-conpreview">
                        <img src={_str_img_src} className="pkg-conpreview-image" />
                    </div>
                </If>
                <div className="pkg-control-bottom">
                    <If condition={ _json_now_image && (typeof _json_now_image.origin_data === 'string') && _json_now_image.origin_data!=='' }>
                        <button onClick={_scope.prevewAction}>預覽</button>
                    </If>
                    <button onClick={_scope.submitAction}>確定</button>
                </div>

                <ColorPickerCpt 
                    color={_scope.state.control.textColor} 
                    onChange={_scope.textColorPickAction}
                    onShowChanged={(bln)=>{_scope.showTextColorPicker(bln);}}
                    show={_scope.state.showTextColorPicker} />
                <ColorPickerCpt 
                    color={_scope.state.control.borderColor} 
                    onChange={_scope.borderColorPickAction}
                    onShowChanged={(bln)=>{_scope.showBorderColorPicker(bln);}}
                    show={_scope.state.showBorderColorPicker} />

            </div>
        );
    }

}; 

MethodControlText.propTypes = {
    control: React.PropTypes.object,
},
MethodControlText.defaultProps = {
    control: {},
};