'use strict';

import Md5 from 'md5';

export default class Utils{
    static createNowId = function(){
        return Date.now();
    }
    static createUniqueId = function(){
        return Md5(Math.floor(Math.random()*100))+Math.floor(Math.random()*1000);
    }
	static createMethodId = function(){
		return Date.now()+'-'+Math.floor(Math.random()*100);
	}
    static addClassName = function( obj, data ){
        let _ary_origin = obj.className.split(/\s+/),
            _ary_add;
        if( typeof data === 'string' ){
            _ary_add = data.split(/\s+/) ;
        }else if( data instanceof Array === true ){
            _ary_add = data ;
        }

        if( (_ary_add instanceof Array === true) && _ary_add.length>0 ){
            obj.className = ( ( _ary_origin.concat(_ary_add) ).join(' ') ).replace(/\s{2,}/, ' ').replace(/(^\s)|(\s$)/mg,'');
        }
    }
};