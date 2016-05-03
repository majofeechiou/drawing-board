'use strict';

let sessionStorage = window.sessionStorage;

export default class GloablData {
    static getFrom(){
        return sessionStorage.from ;
    }

    static setFrom( str ){
        sessionStorage.from = str || '' ;
    }

    // ** ** ** ** ** ** ** ** ** ** ** ** ** ** **

    static getNowImageData(){
        return this.now_image_data || {} ;
    }

    static getPreviewImageInfo(){
        return this.preview_image_info || {} ;
    }

    static getImageObjectSrc(){
        return (this.preview_image_info)? (this.preview_image_info.data || '') : '' ;
    }

    // 為了預覽所做的設定
    static getPreviewImageSetting(){
        return this.preview_image_setting || {} ;
    }

    static setNowImageData( json ){
        this.now_image_data = json || {} ;
    }

    // 預覽產生出來的結果
    static setPreviewImageInfo( json, callback ){
        this.preview_image_info = json || {} ;
        window.preview_image_info = this.preview_image_info;
        if( callback && (callback instanceof Function === true) ){
            callback();
        }
    }

    // 為了預覽所做的設定
    /* this.preview_image_setting 範例
        control
        created
        data
        from
        method
        method_id
        origin_data
    */
    static setPreviewImageSetting( json, callback ){
        json = json || {} ;
        let _json_save = json;

        _json_save.data = null;
        delete _json_save.data ;
        _json_save.origin_data = null;
        delete _json_save.origin_data ;
        _json_save.method_id = null;
        delete _json_save.method_id ;

        this.preview_image_setting = _json_save ;

        if( callback && (callback instanceof Function === true) ){
            callback();
        }
    }

    // ** ** ** ** ** ** ** ** ** ** ** ** ** ** **

    static getSizeSetting(){
        return this.size_setting ;
    }

    static setSizeSetting( json ){
        this.size_setting = json || {} ;
    }

    // ** ** ** ** ** ** ** ** ** ** ** ** ** ** **


};
