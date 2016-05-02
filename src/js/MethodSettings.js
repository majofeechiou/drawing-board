'use strict';

import Settings from './Settings';

export default class MethodSettings {

	static getAllMethod(){
		return [
			{
			    method: Settings.METHOD_SATURATE,
			    method_name: Settings.METHOD_SATURATE_NAME
			},
			{
			    method: Settings.METHOD_CONTRAST,
			    method_name: Settings.METHOD_CONTRAST_NAME
			},
			{
			    method: Settings.METHOD_ALPHA,
			    method_name: Settings.METHOD_ALPHA_NAME
			},
			{
			    method: Settings.METHOD_INVERT,
			    method_name: Settings.METHOD_INVERT_NAME
			},
			{
			    method: Settings.METHOD_DOT,
			    method_name: Settings.METHOD_DOT_NAME
			}
		];
	}

	static getAllShape(){
		return [
			{
			    shape: Settings.SHAPE_CIRCLE,
			    shape_name: Settings.SHAPE_CIRCLE_NAME
			},
			{
			    shape: Settings.SHAPE_RECT,
			    shape_name: Settings.SHAPE_RECT_NAME
			}
		];
	}

};