'use strict';

import Settings from './Settings';
import ReactGroupSetting from './../../lib/react-group/js/Setting';
import Extend from 'Extend';

export default class StyleSettings {

	static getAllStyle(){
		return [
			Extend.exterior( {}, this.getStyleResurgenceA(), this.returnSub( this.getStyleResurgenceB(), {padding: ReactGroupSetting.PADDING_TINY} ) ),
			Extend.exterior( {}, this.getStyleResurgenceB(), this.returnSub( this.getStyleResurgenceA(), {padding: ReactGroupSetting.PADDING_TINY} ) ),
			Extend.exterior( {}, this.getStyleResurgenceC(), this.returnSub( this.getStyleResurgenceA(), {padding: ReactGroupSetting.PADDING_TINY} ) ),
			Extend.exterior( {}, this.getStyleSpringA(), this.returnSub( this.getStyleSpringC(), {padding: ReactGroupSetting.PADDING_TINY} ) ),
			Extend.exterior( {}, this.getStyleSpringB(), this.returnSub( this.getStyleSpringA(), {padding: ReactGroupSetting.PADDING_TINY} ) ),
			Extend.exterior( {}, this.getStyleSpringC(), this.returnSub( this.getStyleSpringB(), {padding: ReactGroupSetting.PADDING_TINY} ) ),
			Extend.exterior( {}, this.getStyleLuxuryA(), this.returnSub( this.getStyleLuxuryC(), {padding: ReactGroupSetting.PADDING_TINY} ) ),
			Extend.exterior( {}, this.getStyleLuxuryB(), this.returnSub( this.getStyleLuxuryA(), {padding: ReactGroupSetting.PADDING_TINY} ) ),
			Extend.exterior( {}, this.getStyleLuxuryC(), this.returnSub( this.getStyleLuxuryB(), {padding: ReactGroupSetting.PADDING_TINY} ) ),
		];
	}

	static returnSub( {method, value}, {...json_sub} ){
		return {
			subValue: value,
			subMethod: Extend.deep( {}, method, json_sub )
		};
	}

	// ...................

	static getStyleResurgenceA(){
		return {
			name: '死灰復燃 A',
			value: Settings.METHOD_LOOKS_RESURGENCE_A,
			method: {
			    display: ReactGroupSetting.DISPLAY_INBLOCK,
			    padding: ReactGroupSetting.PADDING_SMALL,
			    fillet: ReactGroupSetting.FILLET_CIRCLE,
			    // listStyle: ReactGroupSetting.LIST_STYLE_CIRCLE,
			    listPosition: ReactGroupSetting.LIST_POSITION_OUTER,
			    iconPosition: ReactGroupSetting.ICON_POSTION_LEFT,
			    iconShow: [ReactGroupSetting.ICON_SHOW_EMPTY_SQUARE, ReactGroupSetting.ICON_SHOW_SQUARE],
			    styleName: ReactGroupSetting.STYLE_NAME_RESURGENCE,
			    composition: ReactGroupSetting.COMPOSITION_TINYEM,
			    offBack: false,
			    styleBorder: true,
			    styleIcon: true,
			    styleIconBack: true,
			    styleList: true
		    }
		};
	}

	static getStyleResurgenceB(){
		return {
			name: '死灰復燃 B',
			value: Settings.METHOD_LOOKS_RESURGENCE_B,
			method: {
			    display: ReactGroupSetting.DISPLAY_INBLOCK,
			    padding: ReactGroupSetting.PADDING_TINY,
			    fillet: ReactGroupSetting.FILLET_NONE,
			    listStyle: ReactGroupSetting.LIST_STYLE_LOWER_GREEK,
			    listPosition: ReactGroupSetting.LIST_POSITION_INNER,
			    iconPosition: ReactGroupSetting.ICON_POSTION_TOP,
			    iconShow: [ReactGroupSetting.ICON_SHOW_STAR],
			    styleName: ReactGroupSetting.STYLE_NAME_RESURGENCE,
			    composition: ReactGroupSetting.COMPOSITION_BASEEM,
			    offBack: false,
			    styleBorder: false,
			    styleIcon: true,
			    styleIconBack: false,
			    styleList: false
			}
		};
	}

	static getStyleResurgenceC(){
		return {
			name: '死灰復燃 C',
			value: Settings.METHOD_LOOKS_RESURGENCE_C,
			method: {
			    display: ReactGroupSetting.DISPLAY_INBLOCK,
			    padding: ReactGroupSetting.PADDING_TINY,
			    fillet: ReactGroupSetting.FILLET_NONE,
			    listStyle: ReactGroupSetting.LIST_STYLE_DECIMAL,
			    listPosition: ReactGroupSetting.LIST_POSITION_INNER,
			    iconPosition: ReactGroupSetting.ICON_POSTION_BOTTOM,
			    iconShow: [ReactGroupSetting.ICON_SHOW_STAR],
			    styleName: ReactGroupSetting.STYLE_NAME_RESURGENCE,
			    composition: ReactGroupSetting.COMPOSITION_BASE,
			    offBack: true,
			    styleBorder: true,
			    styleIcon: false,
			    styleIconBack: true,
			    styleList: true
			}
		};
	}

	// ...................

	static getStyleSpringA(){
		return {
			name: '春天 A',
			value: Settings.METHOD_LOOKS_SPRING_A,
			method: {
			    display: ReactGroupSetting.DISPLAY_INBLOCK,
			    padding: ReactGroupSetting.PADDING_MIDDLE,
			    fillet: ReactGroupSetting.FILLET_CIRCLE,
			    // listStyle: ReactGroupSetting.LIST_STYLE_CIRCLE,
			    listPosition: ReactGroupSetting.LIST_POSITION_OUTER,
			    iconPosition: ReactGroupSetting.ICON_POSTION_RIGHT,
			    iconShow: [ReactGroupSetting.ICON_SHOW_LINE, ReactGroupSetting.ICON_SHOW_HEART],
			    styleName: ReactGroupSetting.STYLE_NAME_SPRING,
			    composition: ReactGroupSetting.COMPOSITION_TINYEM,
			    offBack: false,
			    styleBorder: true,
			    styleIcon: true,
			    styleIconBack: true,
			    styleList: true
		    }
		};
	}

	static getStyleSpringB(){
		return {
			name: '春天 B',
			value: Settings.METHOD_LOOKS_SPRING_B,
			method: {
			    display: ReactGroupSetting.DISPLAY_INBLOCK,
			    padding: ReactGroupSetting.PADDING_SMALL,
			    fillet: ReactGroupSetting.FILLET_NONE,
			    // listStyle: ReactGroupSetting.LIST_STYLE_LOWER_GREEK,
			    listPosition: ReactGroupSetting.LIST_POSITION_INNER,
			    iconPosition: ReactGroupSetting.ICON_POSTION_BOTTOM,
			    iconShow: [ReactGroupSetting.ICON_SHOW_EMPTY_CIRCLE, ReactGroupSetting.ICON_SHOW_CHECKED],
			    styleName: ReactGroupSetting.STYLE_NAME_SPRING,
			    composition: ReactGroupSetting.COMPOSITION_BASEEM,
			    offBack: false,
			    styleBorder: false,
			    styleIcon: false,
			    styleIconBack: false,
			    styleList: false
			}
		};
	}

	static getStyleSpringC(){
		return {
			name: '春天 C',
			value: Settings.METHOD_LOOKS_SPRING_C,
			method: {
			    display: ReactGroupSetting.DISPLAY_INBLOCK,
			    padding: ReactGroupSetting.PADDING_SMALL,
			    fillet: ReactGroupSetting.FILLET_NONE,
			    listStyle: ReactGroupSetting.LIST_STYLE_DECIMAL,
			    listPosition: ReactGroupSetting.LIST_POSITION_INNER,
			    iconPosition: ReactGroupSetting.ICON_POSTION_LEFT,
			    iconShow: [ReactGroupSetting.ICON_SHOW_EMPTY_HEART],
			    styleName: ReactGroupSetting.STYLE_NAME_SPRING,
			    composition: ReactGroupSetting.COMPOSITION_BASE,
			    offBack: false,
			    styleBorder: true,
			    styleIcon: true,
			    styleIconBack: false,
			    styleList: true
			}
		};
	}

	// ...................

	static getStyleLuxuryA(){
		return {
			name: '華貴樣版 A',
			value: Settings.METHOD_LOOKS_LUXURY_A,
			method: {
			    display: ReactGroupSetting.DISPLAY_INBLOCK,
			    padding: ReactGroupSetting.PADDING_BASE,
			    fillet: ReactGroupSetting.FILLET_BASE,
			    listStyle: ReactGroupSetting.LIST_STYLE_UPPER_LATIN,
			    listPosition: ReactGroupSetting.LIST_POSITION_INNER,
			    iconPosition: ReactGroupSetting.ICON_POSTION_LEFT,
			    iconShow: [ReactGroupSetting.ICON_SHOW_EMPTY_HEART, ReactGroupSetting.ICON_SHOW_HEART],
			    styleName: ReactGroupSetting.STYLE_NAME_LUXURY,
			    composition: ReactGroupSetting.COMPOSITION_SMALL,
			    offBack: false,
			    styleBorder: true,
			    styleIcon: true,
			    styleIconBack: true,
			    styleList: true
		    }
		};
	}

	static getStyleLuxuryB(){
		return {
			name: '華貴樣版 B',
			value: Settings.METHOD_LOOKS_LUXURY_B,
			method: {
			    display: ReactGroupSetting.DISPLAY_INBLOCK,
			    padding: ReactGroupSetting.PADDING_MIDDLE,
			    fillet: ReactGroupSetting.FILLET_BASE,
			    listStyle: ReactGroupSetting.LIST_STYLE_CIRCLE,
			    listPosition: ReactGroupSetting.LIST_POSITION_OUTER,
			    iconPosition: ReactGroupSetting.ICON_POSTION_LEFT,
			    iconShow: [ReactGroupSetting.ICON_SHOW_EMPTY_HEART, ReactGroupSetting.ICON_SHOW_HEART],
			    styleName: ReactGroupSetting.STYLE_NAME_LUXURY,
			    composition: ReactGroupSetting.COMPOSITION_TINYPERCENT,
			    offBack: true,
			    styleBorder: true,
			    styleIcon: false,
			    styleIconBack: true,
			    styleList: false
			}
		};
	}

	static getStyleLuxuryC(){
		return {
			name: '華貴樣版 C',
			value: Settings.METHOD_LOOKS_LUXURY_C,
			method: {
			    display: ReactGroupSetting.DISPLAY_INBLOCK,
			    padding: ReactGroupSetting.PADDING_TINY,
			    fillet: ReactGroupSetting.FILLET_NONE,
			    // listStyle: ReactGroupSetting.LIST_STYLE_CIRCLE,
			    listPosition: ReactGroupSetting.LIST_POSITION_OUTER,
			    iconPosition: ReactGroupSetting.ICON_POSTION_RIGHT,
			    iconShow: [ReactGroupSetting.ICON_SHOW_SQUARE, ReactGroupSetting.ICON_SHOW_RHOMBUS],
			    styleName: ReactGroupSetting.STYLE_NAME_LUXURY,
			    composition: ReactGroupSetting.COMPOSITION_TINY,
			    offBack: true,
			    styleBorder: true,
			    styleIcon: true,
			    styleIconBack: true,
			    styleList: true
			}
		};
	}
};