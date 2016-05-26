'use strict';

export default class Settings {

	// static METHOD_SNOW = 'SNOW';
	// static METHOD_SNOW_NAME = '雪花';

	static METHOD_TEXT = 'TEXT';
	static METHOD_TEXT_NAME = '文字';

	static METHOD_DOT = 'DOT';
	static METHOD_DOT_NAME = '雜點';

	static METHOD_ALPHA = 'ALPHA';
	static METHOD_ALPHA_NAME = '透明';

	static METHOD_SATURATE = 'SATURATE';
	static METHOD_SATURATE_NAME = '彩度';

	static METHOD_BRIGHTNESS = 'BRIGHTNESS';
	static METHOD_BRIGHTNESS_NAME = '亮度';

	static METHOD_CONTRAST = 'CONTRAST';
	static METHOD_CONTRAST_NAME = '對比';

	static METHOD_SATURATE = 'SATURATE';
	static METHOD_SATURATE_NAME = '彩度';

	static METHOD_HUE_ROTATE = 'HUE_ROTATE';
	static METHOD_HUE_ROTATE_NAME = '色相轉換';

	static METHOD_INVERT = 'INVERT';
	static METHOD_INVERT_NAME = '負片';

	static METHOD_SEPIA = 'SEPIA';
	static METHOD_SEPIA_NAME = '復古';

	static METHOD_BLUR = 'BLUR';
	static METHOD_BLUR_NAME = '模糊';

	// ** ** ** ** ** ** ** ** ** ** ** ** ** ** ** ** **

	static OUTPUT_SIZE_SCALE = 'scale';
	static OUTPUT_SIZE_CUSTOM = 'custom';

	static OUTPUT_CUSTOM_COVER = 'cover';
	static OUTPUT_CUSTOM_CONTAIN = 'contain';
	static OUTPUT_CUSTOM_FILL = 'fill';
	static OUTPUT_CUSTOM_CLIP = 'clip';

	// ** ** ** ** ** ** ** ** ** ** ** ** ** ** ** ** **

	static SHAPE_CIRCLE = 'circle';
	static SHAPE_CIRCLE_NAME = '圓形';

	static SHAPE_RECT = 'rect';
	static SHAPE_RECT_NAME = '方形';

	static SHAPE_RECT2 = 'rect2';
	static SHAPE_RECT2_NAME = '方形2';

	static SHAPE_RHOMBUS = 'rhombus';
	static SHAPE_RHOMBUS_NAME = '菱形';

	static SHAPE_STAR = 'star';
	static SHAPE_STAR_NAME = '星星';

	static SHAPE_HEART = 'heart';
	static SHAPE_HEART_NAME = '心形';

	// ** ** ** ** ** ** ** ** ** ** ** ** ** ** ** ** **

	static COMPUTE_TIMING_PREVIEW = 'preview';
	static COMPUTE_TIMING_RESULT = 'result'; // 畫面下方用來作為真的送出結果用的地方

	// ** ** ** ** ** ** ** ** ** ** ** ** ** ** ** ** **

	static POS_CENTER = 'center';
	static POS_LEFT = 'left';
	static POS_RIGHT = 'right';
	static POS_TOP = 'top';
	static POS_BOTTOM = 'bottom';

	// ** ** ** ** ** ** ** ** ** ** ** ** ** ** ** ** **

	static IMAGE_DATA_FROM_LAST = 'last';

	// ** ** ** ** ** ** ** ** ** ** ** ** ** ** ** ** **

	static TEXT_STYLE_SOLID = 'solid';
	static TEXT_STYLE_SOLID_NAME = '實心字';

	static TEXT_STYLE_HOLLOW = 'hollow';
	static TEXT_STYLE_HOLLOW_NAME = '空心字';

	static TEXT_STYLE_BOTH = 'both';
	static TEXT_STYLE_BOTH_NAME = '實心加邊框';

	// ** ** ** ** ** ** ** ** ** ** ** ** ** ** ** ** **

	static METHOD_LOOKS_LUXURY_A = 'METHOD_LOOKS_LUXURY_A';
	static METHOD_LOOKS_LUXURY_B = 'METHOD_LOOKS_LUXURY_B';

	// ** ** ** ** ** ** ** ** ** ** ** ** ** ** ** ** **
	// ** ** ** ** ** ** ** ** ** ** ** ** ** ** ** ** **

	static getConstNameByEn( str ){
		if( (typeof str === 'string') && (str!=='') ){
			return Settings['METHOD_'+str+'_NAME'];
		}
	}

	static getInitOutputImageScale(){
		return {
			size: this.OUTPUT_SIZE_SCALE,
			range: 100
		};
	}
	static getInitOutputImageCustom(){
		return {
			size: this.OUTPUT_SIZE_CUSTOM,
			width: 500,
			height: 300,
			custom: this.OUTPUT_CUSTOM_COVER
			// custom: this.OUTPUT_CUSTOM_CONTAIN
			// custom: this.OUTPUT_CUSTOM_FILL
			// custom: this.OUTPUT_CUSTOM_CLIP
		};
	}

};