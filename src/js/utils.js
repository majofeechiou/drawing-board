'use strict';

import Md5 from 'md5';
import Color from 'color'; // https://www.npmjs.com/package/color
import RgbHex from 'rgb-hex'; // https://www.npmjs.com/package/rgb-hex

export default class Utils{
    static createNowId(){
        return Date.now();
    }
    static createUniqueId(){
        return Md5(Math.floor(Math.random()*100))+Math.floor(Math.random()*1000);
    }
	static createMethodId(){
		return Date.now()+'-'+Math.floor(Math.random()*100);
	}
    static addClassName( obj, data ){
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
    static getPairColor( str_color_origin ){
        str_color_origin = str_color_origin || '#fff' ;
        let _json_origin = Color(str_color_origin);
        let _num_origin_light = _json_origin.values.hsl[2] ;
        let _json_output = {};
        if( _num_origin_light>45 ){
            _json_output = Color(str_color_origin).darken(0.6);
        }else if( _num_origin_light<=45 && _num_origin_light>20 ){
            _json_output = Color(str_color_origin).lighten(0.8);
        }else{
            _json_output = Color(str_color_origin).negate().rotate(-150);
        }
        // let _json_output = Color(str_color_origin).negate().rotate(-90);
        let _ary_output = _json_output.values.rgb;
        let _str_output = '#'+RgbHex(_ary_output[0], _ary_output[1], _ary_output[2]);
        return _str_output ;
    }
};