'use strict';

let sessionStorage = window.sessionStorage;

export default class GloablData {
    static setFrom( str ){
        sessionStorage.from = str || '' ;
    }
    static getFrom(){
        return sessionStorage.from ;
    }
};
