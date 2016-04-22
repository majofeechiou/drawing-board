'use strict';

let sessionStorage = window.sessionStorage;

export default class GloablData {
    static getFrom(){
        return sessionStorage.from ;
    }
    // static getStepMethod(){
    //     return sessionStorage.stepMethod || [] ;
    // }
    // static getInitStepMethod(){
    //     return sessionStorage.initStepMethod || [] ;
    // }
    // static getOtherStepMethod(){
    //     return sessionStorage.otherStepMethod || [] ;
    // }

    static setFrom( str ){
        sessionStorage.from = str || '' ;
    }
    // static setStepMethod( sary ){
    //     sessionStorage.stepMethod = sary || [] ;
    // }
    // static setInitStepMethod( sary ){
    //     sessionStorage.initStepMethod = sary || [] ;
    // }
    // static setOtherStepMethod( sary ){
    //     sessionStorage.otherStepMethod = sary || [] ;
    // }

    // static pushStepMethod( json, callback ){
    //     if( typeof sessionStorage.stepMethod !== 'array' ){
    //         sessionStorage.stepMethod = [] ;
    //     }
    //     console.log('sessionStorage.stepMethod :: ', sessionStorage.stepMethod );
    //     sessionStorage.stepMethod.push(json) ;
    //     if( callback && callback instanceof Function ){
    //         callback();
    //     }
    // }
    // static spliceStepMethod( num_index, num_delete, callback ){
    //     if( typeof sessionStorage.stepMethod !== 'array' ){
    //         sessionStorage.stepMethod = [] ;
    //     }
    //     sessionStorage.stepMethod.splice( num_index, num_delete ) ;
    //     if( callback && callback instanceof Function ){
    //         callback();
    //     }
    // }
};
