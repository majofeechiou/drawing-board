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
        window.now_image_data = this.now_image_data;
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
    static setPreviewImageSetting( json, callback ){
        json = json || {} ;
        this.preview_image_setting = {
            control: json.control,
            created: json.created,
            method: json.method,
            from: json.from
        } ;
        if( callback && (callback instanceof Function === true) ){
            callback();
        }
    }


};
