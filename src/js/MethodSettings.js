'use strict';

import Settings from './Settings';

export default class MethodSettings {

	static getAllMethod(){
		return [
			{
			    method: Settings.METHOD_TEXT,
			    method_name: Settings.METHOD_TEXT_NAME
			},
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
			    method: Settings.METHOD_BLUR,
			    method_name: Settings.METHOD_BLUR_NAME
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
			},
			{
			    shape: Settings.SHAPE_RECT2,
			    shape_name: Settings.SHAPE_RECT2_NAME
			},
			{
			    shape: Settings.SHAPE_RHOMBUS,
			    shape_name: Settings.SHAPE_RHOMBUS_NAME
			},
			{
			    shape: Settings.SHAPE_STAR,
			    shape_name: Settings.SHAPE_STAR_NAME
			},
			// {
			//     shape: Settings.SHAPE_HEART,
			//     shape_name: Settings.SHAPE_HEART_NAME
			// }
		];
	}

	static getAllPos(){
		return [
			{
				pos: Settings.POS_LEFT+' '+Settings.POS_TOP,
				pos_name: '左上'
			},
		    {
		    	pos: Settings.POS_CENTER+' '+Settings.POS_TOP,
				pos_name: '中上'
			},
		    {
		    	pos: Settings.POS_RIGHT+' '+Settings.POS_TOP,
				pos_name: '右上'
			},
		    {
		    	pos: Settings.POS_LEFT+' '+Settings.POS_CENTER,
				pos_name: '左中'
			},
		    {
		    	pos: Settings.POS_CENTER+' '+Settings.POS_CENTER,
				pos_name: '正中'
			},
		    {
		    	pos: Settings.POS_RIGHT+' '+Settings.POS_CENTER,
				pos_name: '右中'
			},
		    {
		    	pos: Settings.POS_LEFT+' '+Settings.POS_BOTTOM,
				pos_name: '左下'
			},
		    {
		    	pos: Settings.POS_CENTER+' '+Settings.POS_BOTTOM,
				pos_name: '中下'
			},
		    {
		    	pos: Settings.POS_RIGHT+' '+Settings.POS_BOTTOM,
				pos_name: '右下'
			}
		];
	}

};