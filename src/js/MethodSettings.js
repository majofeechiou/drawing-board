'use strict';

import Settings from './Settings';
import ReactGroupSetting from './../../lib/react-group/js/Setting';

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
			    shape_name: Settings.SHAPE_CIRCLE_NAME,
			    icon: ReactGroupSetting.ICON_SHOW_CIRCLE
			},
			{
			    shape: Settings.SHAPE_RECT,
			    shape_name: Settings.SHAPE_RECT_NAME,
			    icon: ReactGroupSetting.ICON_SHOW_SQUARE
			},
			// {
			//     shape: Settings.SHAPE_RECT2,
			//     shape_name: Settings.SHAPE_RECT2_NAME
			// },
			{
			    shape: Settings.SHAPE_RHOMBUS,
			    shape_name: Settings.SHAPE_RHOMBUS_NAME,
			    icon: ReactGroupSetting.ICON_SHOW_RHOMBUS
			},
			{
			    shape: Settings.SHAPE_STAR,
			    shape_name: Settings.SHAPE_STAR_NAME,
			    icon: ReactGroupSetting.ICON_SHOW_STAR
			},
			// {
			//     shape: Settings.SHAPE_HEART,
			//     shape_name: Settings.SHAPE_HEART_NAME
			// }
		];
	}


	// static ICON_SHOW_HEART = 'heart'; // 實的愛心
	// static ICON_SHOW_EMPTY_HEART = 'empty-heart'; // 空的愛心
	// static ICON_SHOW_CHECKED = 'checked'; // 純勾勾
	// static ICON_SHOW_SQUARE_CHECKED = 'square-checked'; // 方框中有勾勾
	// static ICON_SHOW_SQUARE = 'square'; // 純方形
	// static ICON_SHOW_CLOSE = 'close'; // 純叉叉
	// static ICON_SHOW_LINE = 'line'; // 純橫線
	// static ICON_SHOW_EMPTY_SQUARE = 'empty-square'; // 純方框
	// static ICON_SHOW_RHOMBUS = 'rhombus'; // 菱形
	// static ICON_SHOW_STAR = 'star'; // 星形
	// static ICON_SHOW_EMPTY_STAR = 'empty-star'; // 星形
	// static ICON_SHOW_CIRCLE = 'circle'; // 圓形
	// static ICON_SHOW_EMPTY_CIRCLE = 'empty-circle'; // 空心圓形

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

	static getAllTextStyle(){
		return [
			{
				style: Settings.TEXT_STYLE_SOLID,
				style_name: Settings.TEXT_STYLE_SOLID_NAME
			},
			{
				style: Settings.TEXT_STYLE_HOLLOW,
				style_name: Settings.TEXT_STYLE_HOLLOW_NAME
			},
			{
				style: Settings.TEXT_STYLE_BOTH,
				style_name: Settings.TEXT_STYLE_BOTH_NAME
			}
		];
	}

};