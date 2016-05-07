'use strict';

/* *** 這部份用 ReactJs + redux 做 *** */

import React from 'react';
import GloablTools from './GloablTools';
import Extend from 'Extend';
import Settings from './Settings';
import GloablData from './GloablData';

export default class MethodControlBlur extends React.Component {
    constructor(props) {
        super(props);

        this.arrangeProps( props );

        this.handleChangeRange = this.handleChangeRange.bind(this);
        this.submitAction = this.submitAction.bind(this);
        this.prevewAction = this.prevewAction.bind(this);
        this.listenPreviewImageChange = this.listenPreviewImageChange.bind(this);
        
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
        return Settings.METHOD_BLUR;
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
                    range: (this.refs && this.refs.range)? Number(this.refs.range.value) : Number(this.props.control.range) 
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
                }
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

    handleChangeRange(e) {
        let _json_new = Extend.deep( this.state, {
            control: {
                range: Number(this.refs.range.value)
            }
        } );
        this.setState( _json_new );
    }

    render(){
        let _scope = this;
        let _json_now_image = GloablData.getNowImageData() ;
        let _str_img_src = ( this.state && this.state.imgObj )? this.state.imgObj.src : '' ;
        return (
            <div className="pkg-control">
                <If condition={ _str_img_src && (typeof _str_img_src === 'string') && _str_img_src!=='' }>
                    <div className="pkg-control-right pkg-conpreview">
                        <img src={_str_img_src} className="pkg-conpreview-image" />
                    </div>
                </If>
                <div className="pkg-control-left">
                    <div>
                        <input
                            type="range"
                            ref="range"
                            step="1"
                            min="0"
                            max="180"
                            value={this.state.control.range}
                            onChange={this.handleChangeRange} /> {this.state.control.range} / 180
                    </div>
                    <div>
                        <If condition={ _json_now_image && (typeof _json_now_image.origin_data === 'string') && _json_now_image.origin_data!=='' }>
                            <button onClick={_scope.prevewAction}>預覽</button>
                        </If>
                        <button onClick={_scope.submitAction}>確定</button>
                    </div>
                </div>
            </div>
        );
    }

};

MethodControlBlur.propTypes = {
    control: React.PropTypes.object,
},
MethodControlBlur.defaultProps = {
    control: {},
};