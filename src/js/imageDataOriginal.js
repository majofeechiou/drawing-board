'use strict';
import Tools from './Tools';
import Settings from './Settings';
import Extend from 'Extend';

// 運算的方式
export default class ImageDataOriginal extends Tools {
    constructor( json_tools ){
        super();

        let _scope = this;

        _scope.setEmitter( json_tools.emitter );
        
        _scope.setObjImage();
        _scope.obj_canvas = document.createElement('canvas');
        _scope.obj_canvas_2d = _scope.getObjCanvas().getContext('2d');

        _scope.objOnloadAction();

    }

    getObjImage(){
        return this.obj_image;
    }

    getObjCanvas(){
        return this.obj_canvas;
    }

    getObjCanvas2d(){
        return this.obj_canvas_2d;
    }

    setObjImage( obj_image ){
        this.obj_image = obj_image || new Image() ;
    }

    /*
       origin_data -> bas64
    */
    setOriginImage( json_data ){
        let _scope = this;
        _scope.origin_data = json_data;
        _scope.getEmitter().emit('init.data.changed', json_data);
    }

    objOnloadAction(){
        let _scope = this;
        _scope.getObjImage().onload = function(){

            _scope.setOriginImageSize( this.width, this.height );

            let _json_data = {
                data: this.src // ,
                // // origin_width: this.width,
                // // origin_height: this.height,
                // setting: {
                //     origin_width: this.width,
                //     origin_height: this.height
                // }
            };

            setTimeout(function() {
                _scope.getEmitter().emit( 'init.data.size.asking', _json_data );
            }, 10);
            
        };
    }

    setOriginImageSize( num_width, num_height ){
        this.origin_image_size = {
            origin_width: num_width,
            origin_height: num_height
        };
    }

    getOriginImageSize(){
        return this.origin_image_size;
    }

    operateImageSize( json_data ){
        let _scope = this ;

        _scope.getObjCanvas2d().clearRect( 0, 0, _scope.getObjCanvas().width, _scope.getObjCanvas().height );

        let _str_output = '';

        // **************** 圖片
        let _json_setting = json_data.setting,
            _str_size = _json_setting.size;

        if( _str_size===Settings.OUTPUT_SIZE_SCALE ){
            let _num_width = Math.floor(_json_setting.origin_width * _json_setting.range / 100);
            let _num_height = Math.floor(_json_setting.origin_height * _json_setting.range / 100);
            _scope.getObjCanvas().width = _num_width ;
            _scope.getObjCanvas().height = _num_height ;
            _scope.getObjCanvas2d().drawImage( _scope.obj_image, 0, 0, _json_setting.origin_width, _json_setting.origin_height, 0, 0, _num_width, _num_height );
            // _scope.getObjImagePreview().src = _scope.getObjCanvas().toDataURL();
            _str_output = _scope.getObjCanvas().toDataURL();

        }else if( _str_size===Settings.OUTPUT_SIZE_CUSTOM ){
            _scope.getObjCanvas().width = _json_setting.width ;
            _scope.getObjCanvas().height = _json_setting.height ;

            let _num_origin_ratio = _json_setting.origin_height / _json_setting.origin_width ;
            let _num_output_ratio = _json_setting.height / _json_setting.width ;

            let _num_outreal_height = _json_setting.width/_json_setting.origin_width*_json_setting.origin_height ;
            let _num_outreal_width = _json_setting.height/_json_setting.origin_height*_json_setting.origin_width ;

            if( _json_setting.custom===Settings.OUTPUT_CUSTOM_COVER ){ // 填滿區域，可能造成圖片放大的失真
                if( _num_origin_ratio>_num_output_ratio ){
                    _scope.baseOnWidth( json_data, _json_setting );
                }else if( _num_origin_ratio<_num_output_ratio ){
                    _scope.baseOnHeight( json_data, _json_setting );
                }else{
                    _scope.baseOnWidthHeight( json_data, _json_setting );
                }
            }else if( _json_setting.custom===Settings.OUTPUT_CUSTOM_CONTAIN ){ // 內容全放入，可能造成空白
                if( _num_origin_ratio>_num_output_ratio ){
                    _scope.baseOnHeight( json_data, _json_setting );
                }else if( _num_origin_ratio<_num_output_ratio ){
                    _scope.baseOnWidth( json_data, _json_setting );
                }else{
                    _scope.baseOnWidthHeight( json_data, _json_setting );
                }
            }else if( _json_setting.custom===Settings.OUTPUT_CUSTOM_FILL ){ // 填滿（不考慮寬高比）
                _scope.baseOnWidthHeight( json_data, _json_setting );
            }else if( _json_setting.custom===Settings.OUTPUT_CUSTOM_CLIP ){ // 裁切
                _scope.baseOnClip( json_data, _json_setting );
            }
            // _scope.getObjImagePreview().src = _scope.getObjCanvas().toDataURL() ;
            _str_output = _scope.getObjCanvas().toDataURL();

        }

        if( _str_output!=='' ){
            let _json_emit = Extend.deep(
                    json_data,
                    { origin_data:_str_output }
                );
            _scope.setOriginImage( _json_emit );
        }

    }

    // 固定輸出的寬度
    baseOnWidth( json_data, json_setting ){
        let _scope = this;
        let _num_outreal_height = json_setting.width/json_setting.origin_width*json_setting.origin_height ;
        _scope.getObjCanvas2d().drawImage( _scope.obj_image, 0, 0, json_setting.origin_width, json_setting.origin_height, 0, json_setting.height/2-(_num_outreal_height/2), json_setting.width, _num_outreal_height );
    }

    // 固定輸出的高度
    baseOnHeight( json_data, json_setting ){
        let _scope = this;
        let _num_outreal_width = json_setting.height/json_setting.origin_height*json_setting.origin_width ;
        _scope.getObjCanvas2d().drawImage( _scope.obj_image, 0, 0, json_setting.origin_width, json_setting.origin_height, json_setting.width/2-(_num_outreal_width/2), 0, _num_outreal_width, json_setting.height );
    }

    // 填滿（不考慮寬高比）
    baseOnWidthHeight( json_data, json_setting ){
        let _scope = this;
        _scope.getObjCanvas2d().drawImage( _scope.obj_image, 0, 0, json_setting.origin_width, json_setting.origin_height, 0, 0, json_setting.width, json_setting.height );
    }

    // 裁切
    baseOnClip( json_data, json_setting ){
        let _scope = this;
        _scope.getObjCanvas2d().drawImage( _scope.obj_image, json_setting.origin_width/2-json_setting.width/2, json_setting.origin_height/2-json_setting.height/2, json_setting.width, json_setting.height, 0, 0, json_setting.width, json_setting.height );
    }

}