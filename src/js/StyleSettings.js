'use strict';

import Settings from './Settings';
import ReactGroupSetting from './../../lib/react-group/js/Setting';

export default class StyleSettings {

	static getAllStyle(){
		return [
			this.getStyleLuxuryA(),
			this.getStyleLuxuryB()
		];
	}

	static getStyleLuxuryA(){
		return {
			name: '豪華樣版 A',
			value: Settings.METHOD_LOOKS_LUXURY_A,
			method: {
			    display: ReactGroupSetting.DISPLAY_INBLOCK,
			    padding: ReactGroupSetting.PADDING_BASE,
			    fillet: ReactGroupSetting.FILLET_BASE,
			    listStyle: ReactGroupSetting.LIST_STYLE_CIRCLE,
			    listPosition: ReactGroupSetting.LIST_POSITION_INNER,
			    iconPosition: ReactGroupSetting.ICON_POSTION_LEFT,
			    iconShow: [ReactGroupSetting.ICON_SHOW_EMPTY_HEART, ReactGroupSetting.ICON_SHOW_HEART],
			    styleName: ReactGroupSetting.STYLE_NAME_LUXURY,
			    composition: ReactGroupSetting.COMPOSITION_TINY,
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
			name: '豪華樣版 B',
			value: Settings.METHOD_LOOKS_LUXURY_B,
			method: {
			    display: ReactGroupSetting.DISPLAY_INBLOCK,
			    padding: ReactGroupSetting.PADDING_TINY,
			    fillet: ReactGroupSetting.FILLET_BASE,
			    listStyle: ReactGroupSetting.LIST_STYLE_CIRCLE,
			    listPosition: ReactGroupSetting.LIST_POSITION_OUTER,
			    iconPosition: ReactGroupSetting.ICON_POSTION_LEFT,
			    iconShow: [ReactGroupSetting.ICON_SHOW_EMPTY_HEART, ReactGroupSetting.ICON_SHOW_HEART],
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