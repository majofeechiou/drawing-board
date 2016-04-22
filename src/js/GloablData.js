'use strict';

let sessionStorage = window.sessionStorage;

export default class GloablData {
    static setFrom( str ){
        sessionStorage.from = str || '' ;
    }
    static setStepMethod( sary ){
        sessionStorage.stepMethod = sary || [] ;
    }
    static setInitStepMethod( sary ){
        sessionStorage.initStepMethod = sary || [] ;
    }
    static getFrom(){
        return sessionStorage.from ;
    }
    static getStepMethod(){
        return sessionStorage.stepMethod ;
    }
    static getInitStepMethod(){
        return sessionStorage.initStepMethod ;
    }
};
