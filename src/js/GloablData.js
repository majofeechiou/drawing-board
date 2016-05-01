'use strict';

const IMAGE_OBJECT = new Image();

let sessionStorage = window.sessionStorage;

export default class GloablData {
    static getFrom(){
        return sessionStorage.from ;
    }

    static setFrom( str ){
        sessionStorage.from = str || '' ;
    }

    static getNowImageData(){
        return this.now_image_data || {} ;
    }

    static setNowImageData( json ){
        this.now_image_data = json || {} ;
    }

    static getImageObject(){
        return IMAGE_OBJECT ;
    }

    static setImageObjectSrc( str_src, callback ){
        IMAGE_OBJECT.src = str_src || '' ;
        if( callback && (callback instanceof Function === true) ){
            callback();
        }
    }

    static getImageObjectSrc(){
        return IMAGE_OBJECT.src || '' ;
    }
};
