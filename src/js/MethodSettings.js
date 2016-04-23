'use strict';

import Settings from './Settings';

export default class MethodSettings {

	static getAllMethod(){
		return [
			{
			    method: Settings.METHOD_ALPHA,
			    method_name: Settings.METHOD_ALPHA_NAME
			},
			{
			    method: Settings.METHOD_SNOW,
			    method_name: Settings.METHOD_SNOW_NAME
			},
			{
			    method: Settings.METHOD_DOT,
			    method_name: Settings.METHOD_DOT_NAME
			},
			{
			    method: Settings.METHOD_SATURATE,
			    method_name: Settings.METHOD_SATURATE_NAME
			},
			{
			    method: Settings.METHOD_CONTRAST,
			    method_name: Settings.METHOD_CONTRAST_NAME
			}
		];
	}

};