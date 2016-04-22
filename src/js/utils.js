'use strict';

import Md5 from 'md5';

export default class Utils{
    static createNowId = function(){
        return Date.now();
    }
    static createUniqueId = function(){
        return Md5(Math.floor(Math.random()*1000));
    }
	static createMethodId = function(){
		return Date.now()+'-'+Math.floor(Math.random()*100);
	}
};