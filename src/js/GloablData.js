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

    static setNowImageData( json ){
        this.now_image_data = json || {} ;
        window.now_image_data = this.now_image_data;
    }

    static setPreviewImageInfo( json, callback ){
        this.preview_image_info = json || {} ;
        window.preview_image_info = this.preview_image_info;
        if( callback && (callback instanceof Function === true) ){
            callback();
        }
    }

    static getPreviewImageInfo(){
        return this.preview_image_info || {} ;
    }

                        // static setImageObjectSrc( str_src, callback ){
                        //     this.preview_image_info.data = str_src || '' ;
                        //     if( callback && (callback instanceof Function === true) ){
                        //         callback();
                        //     }
                        // }

    static getImageObjectSrc(){
        return this.preview_image_info.data || '' ;
    }


};
