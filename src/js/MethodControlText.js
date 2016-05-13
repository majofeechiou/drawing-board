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
import MethodActions from './MethodActions';
import ReactGroupSetting from './../../lib/react-group/js/Setting';

export default class MethodControlText extends React.Component {
    constructor(props) {
        super(props);

        let _scope = this;

        _scope.createAllPos();
        _scope.createAllTextStyle();

        _scope.arrangeProps( props );

        _scope.handleChange = _scope.handleChange.bind(_scope);
        _scope.handleChangePos = _scope.handleChangePos.bind(_scope);
        _scope.handleChangeTextStyle = _scope.handleChangeTextStyle.bind(_scope);
        _scope.submitAction = _scope.submitAction.bind(_scope);
        _scope.prevewAction = _scope.prevewAction.bind(_scope);
        _scope.listenPreviewImageChange = _scope.listenPreviewImageChange.bind(_scope);
        _scope.showTextColorPicker = _scope.showTextColorPicker.bind(_scope);
        _scope.showBorderColorPicker = _scope.showBorderColorPicker.bind(_scope);
        _scope.textColorPickAction = _scope.textColorPickAction.bind(_scope);
        _scope.borderColorPickAction = _scope.borderColorPickAction.bind(_scope);
        _scope.closeMethod = _scope.closeMethod.bind(_scope);

        
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
                    style: this.state.control.style || this.props.control.style, 
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

    handleChangeTextStyle( bln_change, json_return ){
        let _scope = this ;
        if( bln_change===true ){
            let _json_new = _scope.arrangeState( {control: {style: json_return.result}} );
            _scope.setState( _json_new );
        }
    }

    handleChange() {
        let _json_new = this.arrangeState();
        this.setState( _json_new );
        this.render();
    }

    getPosSelectKey(){
        return ['pos'];
    }
    getPosShowKey(){
        return ['pos_name'];
    }

    getTextSelectKey(){
        return ['style'];
    }
    getTextShowKey(){
        return ['style_name'];
    }

    createAllPos(){
        let _sary = (MethodSettings.getAllPos()).map(function(json_item){
            json_item.key = Utils.createUniqueId();
            return json_item;
        });
        this.all_pos = _sary;
    }

    createAllTextStyle(){
        let _sary = (MethodSettings.getAllTextStyle()).map(function(json_item){
            json_item.key = Utils.createUniqueId();
            return json_item;
        });
        this.all_text_type = _sary;
    }

    getAllPos(){
        return this.all_pos;
    }

    getAllTextStyle(){
        return this.all_text_type;
    }

    textColorPickAction( str_color, json ){
        json = json || {} ;
        let _json_state = this.arrangeState({control:{textColor:str_color}, showTextColorPicker:json.show});
        this.setState( _json_state );
    }

    borderColorPickAction( str_color, json ){
        json = json || {} ;
        let _json_state = this.arrangeState({control:{borderColor:str_color}, showBorderColorPicker:json.show});
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

    closeMethod(){
        GloablTools.Emitter().emit('method.setting.close.asked');
    }

    render(){
        let _scope = this;
        let _json_sub_store = this.props.methodStore.getState().sub;
        let _str_img_src = ( this.state && this.state.imgObj )? this.state.imgObj.src : '' ;

        let _str_textcolor_origin = _scope.state.control.textColor;
        let _str_textcolor_pair = Utils.getPairColor(_str_textcolor_origin);
        let _str_bordercolor_origin = _scope.state.control.borderColor;
        let _str_bordercolor_pair = Utils.getPairColor(_str_bordercolor_origin);

        return (
            <div className="pkg-control">
                <div className="pkg-control-left">
                    輸入文字：<input type="text" name="text" placeholder="請輸入文字" ref="text" value={this.state.control.text} onChange={this.handleChange} />
                    <br />

                    文字大小：<input type="range" name="size" min="9" max="80" step="1" ref="size" value={this.state.control.size} onChange={this.handleChange} />{this.state.control.size}px
                    <br />

                    <div>
                        文字樣式：
                        <ReactGroup 
                            onChange={_scope.handleChangeTextStyle}
                            outputFormat="string"
                            name="method_option"
                            selectKey={_scope.getTextSelectKey()}
                            inputOption={_scope.getAllTextStyle()}
                            outputResult={_scope.state.control.style}
                            showKey={_scope.getTextShowKey()}
                            between="~"
                            display={ReactGroupSetting.DISPLAY_INBLOCK}
                            padding={_json_sub_store.padding}
                            fillet={_json_sub_store.fillet}
                            listStyle={_json_sub_store.listStyle}
                            listPosition={_json_sub_store.listPosition}
                            iconPosition={_json_sub_store.iconPosition}
                            styleName={_json_sub_store.styleName}
                            offBack={_json_sub_store.offBack}
                            styleBorder={_json_sub_store.styleBorder}
                            styleIcon={_json_sub_store.styleIcon}
                            styleIconBack={_json_sub_store.styleIconBack}
                            styleList={_json_sub_store.styleList} />
                    </div>

                    <div>
                        文字顏色：
                        <span onClick={()=>{_scope.showTextColorPicker(true);}}
                            className="ui-colortag ui-hover"
                            style={{background:_str_textcolor_origin, color:_str_textcolor_pair}}>
                            {_str_textcolor_origin} - {JSON.stringify(_scope.state.showTextColorPicker)}
                        </span>
                    </div>

                    <div>
                        文字外框色：
                        <span onClick={()=>{_scope.showBorderColorPicker(true);}}
                            className="ui-colortag ui-hover"
                            style={{background:_str_bordercolor_origin, color:_str_bordercolor_pair}}>
                            {_str_bordercolor_origin} - {JSON.stringify(_scope.state.showBorderColorPicker)}
                        </span>
                    </div>

                    <div>
                        文字位置：
                        <div className="pkg-textpos">
                            <For each="json_item" of={ _scope.getAllPos() }>
                                <div className="pkg-textpos-item" key={json_item.key}>
                                    <ReactGroup 
                                        className="pkg-textpos-item-btn"
                                        onChange={_scope.handleChangePos}
                                        outputFormat="string"
                                        name="method_option"
                                        selectKey={_scope.getPosSelectKey()}
                                        inputOption={[json_item]}
                                        outputResult={_scope.state.control.pos}
                                        showKey={_scope.getPosShowKey()}
                                        between="~"
                                        display={ReactGroupSetting.DISPLAY_INBLOCK}
                                        padding={_json_sub_store.padding}
                                        fillet={_json_sub_store.fillet}
                                        listPosition={_json_sub_store.listPosition}
                                        iconPosition={_json_sub_store.iconPosition}
                                        styleName={_json_sub_store.styleName}
                                        offBack={_json_sub_store.offBack}
                                        styleBorder={_json_sub_store.styleBorder}
                                        styleIcon={_json_sub_store.styleIcon}
                                        styleIconBack={_json_sub_store.styleIconBack}
                                        styleList={_json_sub_store.styleList} />
                                </div>
                            </For>
                        </div>
                    </div>
                </div>
                <If condition={ _str_img_src && (typeof _str_img_src === 'string') && _str_img_src!=='' }>
                    <div className="pkg-control-right pkg-conpreview">
                        <img src={_str_img_src} className="pkg-conpreview-image" />
                    </div>
                </If>
                <MethodActions 
                    prevewAction={_scope.prevewAction}
                    submitAction={_scope.submitAction}
                    className='pkg-control-bottom' />

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

/*
<ReactGroup 
    onChange={_scope.handleChangePos}
    outputFormat="string"
    name="method_option"
    selectKey={_scope.getPosSelectKey()}
    inputOption={ _scope.getAllPos() }
    outputResult={_scope.state.control.pos}
    showKey={_scope.getPosShowKey()}
    between="~"
    display={ReactGroupSetting.DISPLAY_BLOCK}
    padding={_json_sub_store.padding}
    fillet={_json_sub_store.fillet}
    listPosition={_json_sub_store.listPosition}
    iconPosition={_json_sub_store.iconPosition}
    iconShow={_json_sub_store.iconShow}
    styleName={_json_sub_store.styleName}
    offBack={_json_sub_store.offBack}
    styleBorder={_json_sub_store.styleBorder}
    styleIcon={_json_sub_store.styleIcon}
    styleIconBack={_json_sub_store.styleIconBack}
    styleList={_json_sub_store.styleList}
    composition={ReactGroupSetting.COMPOSITION_THIRD} />
*/

MethodControlText.propTypes = {
    control: React.PropTypes.object,
},
MethodControlText.defaultProps = {
    control: {},
};