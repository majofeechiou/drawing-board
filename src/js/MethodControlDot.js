'use strict';

import React from 'react';
import GloablTools from './GloablTools';
import Extend from 'Extend';
import Settings from './Settings';
import GloablData from './GloablData';
import ColorPickerCpt from './ColorPickerCpt';
import MethodSettings from './MethodSettings';
import ReactGroup from 'ReactGroup';
import Utils from './Utils';
import ReactGroupSetting from './../../lib/react-group/js/Setting';
import MethodActions from './MethodActions';

// http://jslog.com/react-color-picker/
// https://www.npmjs.com/package/react-color-picker
// https://www.npmjs.com/package/color-picker

export default class MethodControlDot extends React.Component {
    constructor(props) {
        super(props);

        let _scope = this;

        _scope.arrangeProps( props );

        _scope.createInputoption();

        _scope.handleChangeRange = _scope.handleChangeRange.bind(_scope);
        _scope.handleChangeShape = _scope.handleChangeShape.bind(_scope);
        _scope.prevewAction = _scope.prevewAction.bind(_scope);
        _scope.submitAction = _scope.submitAction.bind(_scope);
        _scope.listenPreviewImageChange = _scope.listenPreviewImageChange.bind(_scope);
        _scope.colorPick = _scope.colorPick.bind(_scope);
        _scope.showColorPicker = _scope.showColorPicker.bind(_scope);

    }

    componentWillMount(){
        let _scope = this;
        GloablTools.Emitter().on('preview.image.object.data.changing', _scope.listenPreviewImageChange );
    }

    componentWillUnmount(){
        let _scope = this;
        GloablTools.Emitter().off('preview.image.object.data.changing', _scope.listenPreviewImageChange );
    }

    componentWillReceiveProps(nextProps){
        this.arrangeProps(nextProps);
    }

    getComponentMethod(){
        return Settings.METHOD_DOT;
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
                    frequency: (this.refs && this.refs.frequency)? Number(this.refs.frequency.value) : Number(this.props.control.frequency) ,
                    minSize: (this.refs && this.refs.minSize )? Number(this.refs.minSize.value) : Number(this.props.control.minSize) ,
                    maxSize: (this.refs && this.refs.maxSize )? Number(this.refs.maxSize.value) : Number(this.props.control.maxSize) ,
                    minAlpha: (this.refs && this.refs.minAlpha )? Number(this.refs.minAlpha.value) : Number(this.props.control.minAlpha) ,
                    maxAlpha: (this.refs && this.refs.maxAlpha )? Number(this.refs.maxAlpha.value) : Number(this.props.control.minAlpha) ,
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
                showColorPicker: false
            };
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
        this.render();
    }

    handleChangeShape( bln_change, json_return ) {
        let _scope = this ;
        if( bln_change===true ){
            let _json_new = _scope.arrangeState( {control: {shape: json_return.result}} );
            _scope.setState( _json_new );
        }

    }

    createInputoption(){
        // this.input_option = MethodSettings.getAllShape();
        let _sary = (MethodSettings.getAllShape()).map(function(json_item){
            json_item.key = Utils.createUniqueId();
            return json_item;
        });
        this.input_option = _sary;
    }
    getInputoption(){
        return this.input_option;
    }
    getSelectKey(){
        return ['shape','shape_name'];
    }
    getShowKey(){
        return ['shape_name'];
    }

    colorPick( str_color, json ){
        json = json || {} ;
        let _json_state = this.arrangeState();
        _json_state.control.color = str_color ;
        _json_state.showColorPicker = json.show ;
        this.setState( _json_state );
    }

    showColorPicker(bln){
        this.setState(Extend.deep(
            {},
            this.state,
            {showColorPicker: !!bln}
        ));
    }

    render(){
        let _scope = this;
        let _json_sub_store = this.props.methodStore.getState().sub;
        let _str_img_src = ( this.state && this.state.imgObj )? this.state.imgObj.src : '' ;
        let _str_color_origin = _scope.state.control.color;
        let _str_color_pair = Utils.getPairColor(_str_color_origin);

        return (
            <div className="pkg-control">
                <div className="pkg-control-center">
                    <For each="json_item" of={ _scope.getInputoption() }>
                        <ReactGroup 
                            onChange={_scope.handleChangeShape}
                            outputFormat="json"
                            name="method_option"
                            selectKey={_scope.getSelectKey()}
                            inputOption={[json_item]}
                            outputResult={_scope.state.control.shape}
                            showKey={_scope.getShowKey()}
                            between="~"
                            display={ReactGroupSetting.DISPLAY_INBLOCK}
                            padding={_json_sub_store.padding}
                            fillet={_json_sub_store.fillet}
                            listPosition={_json_sub_store.listPosition}
                            iconPosition={_json_sub_store.iconPosition}
                            iconShow={[json_item.icon]}
                            styleName={_json_sub_store.styleName}
                            composition={_json_sub_store.composition}
                            offBack={_json_sub_store.offBack}
                            styleBorder={_json_sub_store.styleBorder}
                            styleIcon={_json_sub_store.styleIcon}
                            styleIconBack={_json_sub_store.styleIconBack}
                            styleList={_json_sub_store.styleList}
                            key={json_item.key} />
                    </For>
                </div>
                <If condition={ _str_img_src && (typeof _str_img_src === 'string') && _str_img_src!=='' }>
                    <div className="pkg-control-right pkg-conpreview">
                        <img src={_str_img_src} className="pkg-conpreview-image" />
                    </div>
                </If>
                <div className="pkg-control-left">
                    <div>
                        顏色 ： 
                        <span onClick={()=>{_scope.showColorPicker(true);}}
                            className="ui-colortag ui-hover"
                            style={{background: _str_color_origin, color: _str_color_pair}}>
                            {_scope.state.control.color} - {JSON.stringify(_scope.state.showColorPicker)}
                        </span>
                    </div>
                    <div>
                        頻率 ： 
                        <input
                            type="range"
                            ref="frequency"
                            step="1"
                            min="1"
                            max="100"
                            value={_scope.state.control.frequency}
                            onChange={_scope.handleChangeRange} /> {_scope.state.control.frequency} / 100
                    </div>
                    <div>
                        大小 ： 
                        <input
                            type="range"
                            ref="minSize"
                            step="1"
                            min="1"
                            max={_scope.state.control.maxSize}
                            value={_scope.state.control.minSize}
                            onChange={_scope.handleChangeRange} /> {_scope.state.control.minSize} / {_scope.state.control.maxSize}
                        <input
                            type="range"
                            ref="maxSize"
                            step="1"
                            min={_scope.state.control.minSize}
                            max="200"
                            value={_scope.state.control.maxSize}
                            onChange={_scope.handleChangeRange} /> {_scope.state.control.maxSize} / 200
                    </div>
                    <div>
                        透明度 ： 
                        <input
                            type="range"
                            ref="minAlpha"
                            step="1"
                            min="1"
                            max={_scope.state.control.maxAlpha}
                            value={_scope.state.control.minAlpha}
                            onChange={_scope.handleChangeRange} /> {_scope.state.control.minAlpha} / {_scope.state.control.maxAlpha}
                        <input
                            type="range"
                            ref="maxAlpha"
                            step="1"
                            min={_scope.state.control.minAlpha}
                            max="100"
                            value={_scope.state.control.maxAlpha}
                            onChange={_scope.handleChangeRange} /> {_scope.state.control.maxAlpha} / 100
                    </div>
                </div>
                <MethodActions 
                    prevewAction={_scope.prevewAction}
                    submitAction={_scope.submitAction}
                    className='pkg-control-bottom' />

                <ColorPickerCpt 
                    color={_scope.state.control.color} 
                    onChange={_scope.colorPick}
                    onShowChanged={(bln)=>{_scope.showColorPicker(bln);}}
                    show={_scope.state.showColorPicker} />
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