'use strict';

import Settings from './Settings';
import ReactGroupSetting from './../../lib/react-group/js/Setting';
import Extend from 'Extend';

// // 色彩風格
// static STYLE_NAME_RESURGENCE = 'resurgence'; // 死灰復燃
// static STYLE_NAME_SPRING = 'spring'; // 春天
// static STYLE_NAME_WINE = 'wine'; // 紅酒
// static STYLE_NAME_BLUESKY = 'bluesky'; // 藍天
// static STYLE_NAME_LOVELY = 'lovely'; // 可愛
// static STYLE_NAME_LUXURY = 'luxury'; // 華貴
// static STYLE_NAME_FANTASY = 'fantasy'; // 奇幻
// static STYLE_NAME_RIGID = 'rigid'; // 鋼硬
// static STYLE_NAME_WATERSIDE = 'waterside'; // 水畔

export default class StyleSettings {

	static getAllStyle(){
		return [
			// Extend.exterior( {}, this.getStyleResurgenceA(), this.returnSub( this.getStyleResurgenceB(), {padding: ReactGroupSetting.PADDING_TINY} ) ),
			// Extend.exterior( {}, this.getStyleResurgenceB(), this.returnSub( this.getStyleResurgenceA(), {padding: ReactGroupSetting.PADDING_TINY} ) ),
			// Extend.exterior( {}, this.getStyleResurgenceC(), this.returnSub( this.getStyleResurgenceA(), {padding: ReactGroupSetting.PADDING_TINY} ) ),
			
			// Extend.exterior( {}, this.getStyleSpringA(), this.returnSub( this.getStyleSpringC(), {padding: ReactGroupSetting.PADDING_TINY} ) ),
			// Extend.exterior( {}, this.getStyleSpringB(), this.returnSub( this.getStyleSpringA(), {padding: ReactGroupSetting.PADDING_TINY} ) ),
			// Extend.exterior( {}, this.getStyleSpringC(), this.returnSub( this.getStyleSpringB(), {padding: ReactGroupSetting.PADDING_TINY} ) ),

			// Extend.exterior( {}, this.getStyleWineA(), this.returnSub( this.getStyleWineC(), {padding: ReactGroupSetting.PADDING_TINY} ) ),
			// Extend.exterior( {}, this.getStyleWineB(), this.returnSub( this.getStyleWineA(), {padding: ReactGroupSetting.PADDING_TINY} ) ),
			// Extend.exterior( {}, this.getStyleWineC(), this.returnSub( this.getStyleWineB(), {padding: ReactGroupSetting.PADDING_TINY} ) ),

			// Extend.exterior( {}, this.getStyleBlueskyA(), this.returnSub( this.getStyleBlueskyC(), {padding: ReactGroupSetting.PADDING_TINY} ) ),
			// Extend.exterior( {}, this.getStyleBlueskyB(), this.returnSub( this.getStyleBlueskyA(), {padding: ReactGroupSetting.PADDING_TINY} ) ),
			// Extend.exterior( {}, this.getStyleBlueskyC(), this.returnSub( this.getStyleBlueskyB(), {padding: ReactGroupSetting.PADDING_TINY} ) ),

			Extend.exterior( {}, this.getStyleLovelyA(), this.returnSub( this.getStyleLovelyC(), {padding: ReactGroupSetting.PADDING_TINY} ) ),
			Extend.exterior( {}, this.getStyleLovelyB(), this.returnSub( this.getStyleLovelyA(), {padding: ReactGroupSetting.PADDING_TINY} ) ),
			Extend.exterior( {}, this.getStyleLovelyC(), this.returnSub( this.getStyleLovelyB(), {padding: ReactGroupSetting.PADDING_TINY} ) ),

			Extend.exterior( {}, this.getStyleLuxuryA(), this.returnSub( this.getStyleLuxuryC(), {padding: ReactGroupSetting.PADDING_TINY} ) ),
			Extend.exterior( {}, this.getStyleLuxuryB(), this.returnSub( this.getStyleLuxuryA(), {padding: ReactGroupSetting.PADDING_TINY} ) ),
			Extend.exterior( {}, this.getStyleLuxuryC(), this.returnSub( this.getStyleLuxuryB(), {padding: ReactGroupSetting.PADDING_TINY} ) ),

			Extend.exterior( {}, this.getStyleFantasyA(), this.returnSub( this.getStyleFantasyC(), {padding: ReactGroupSetting.PADDING_TINY} ) ),
			Extend.exterior( {}, this.getStyleFantasyB(), this.returnSub( this.getStyleFantasyA(), {padding: ReactGroupSetting.PADDING_TINY} ) ),
			Extend.exterior( {}, this.getStyleFantasyC(), this.returnSub( this.getStyleFantasyB(), {padding: ReactGroupSetting.PADDING_TINY} ) ),

			Extend.exterior( {}, this.getStyleRigidA(), this.returnSub( this.getStyleRigidC(), {padding: ReactGroupSetting.PADDING_TINY} ) ),
			Extend.exterior( {}, this.getStyleRigidB(), this.returnSub( this.getStyleRigidA(), {padding: ReactGroupSetting.PADDING_TINY} ) ),
			Extend.exterior( {}, this.getStyleRigidC(), this.returnSub( this.getStyleRigidB(), {padding: ReactGroupSetting.PADDING_TINY} ) ),

			Extend.exterior( {}, this.getStyleWatersideA(), this.returnSub( this.getStyleWatersideC(), {padding: ReactGroupSetting.PADDING_TINY} ) ),
			Extend.exterior( {}, this.getStyleWatersideB(), this.returnSub( this.getStyleWatersideA(), {padding: ReactGroupSetting.PADDING_TINY} ) ),
			Extend.exterior( {}, this.getStyleWatersideC(), this.returnSub( this.getStyleWatersideB(), {padding: ReactGroupSetting.PADDING_TINY} ) ),
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
			name: 'Resurgence A',
			value: Settings.METHOD_LOOKS_RESURGENCE_A,
			method: {
				display: ReactGroupSetting.DISPLAY_BLOCK,
				padding: ReactGroupSetting.PADDING_SMALL,
				fillet: ReactGroupSetting.FILLET_BASE,
				// listStyle: ReactGroupSetting.LIST_STYLE_CIRCLE,
				listPosition: ReactGroupSetting.LIST_POSITION_OUTER,
				iconPosition: ReactGroupSetting.ICON_POSTION_TOP,
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
			name: 'Resurgence B',
			value: Settings.METHOD_LOOKS_RESURGENCE_B,
			method: {
				display: ReactGroupSetting.DISPLAY_BLOCK,
				padding: ReactGroupSetting.PADDING_TINY,
				fillet: ReactGroupSetting.FILLET_CIRCLE,
				listStyle: ReactGroupSetting.LIST_STYLE_LOWER_GREEK,
				listPosition: ReactGroupSetting.LIST_POSITION_INNER,
				iconPosition: ReactGroupSetting.ICON_POSTION_LEFT,
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
			name: 'Resurgence C',
			value: Settings.METHOD_LOOKS_RESURGENCE_C,
			method: {
			    display: ReactGroupSetting.DISPLAY_BLOCK,
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
			name: 'Spring A',
			value: Settings.METHOD_LOOKS_SPRING_A,
			method: {
			    display: ReactGroupSetting.DISPLAY_BLOCK,
			    padding: ReactGroupSetting.PADDING_MIDDLE,
			    fillet: ReactGroupSetting.FILLET_CIRCLE,
			    // listStyle: ReactGroupSetting.LIST_STYLE_CIRCLE,
			    listPosition: ReactGroupSetting.LIST_POSITION_OUTER,
			    iconPosition: ReactGroupSetting.ICON_POSTION_RIGHT,
			    iconShow: [ReactGroupSetting.ICON_SHOW_LINE, ReactGroupSetting.ICON_SHOW_HEART],
			    styleName: ReactGroupSetting.STYLE_NAME_SPRING,
			    composition: ReactGroupSetting.COMPOSITION_TINY,
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
			name: 'Spring B',
			value: Settings.METHOD_LOOKS_SPRING_B,
			method: {
			    display: ReactGroupSetting.DISPLAY_BLOCK,
			    padding: ReactGroupSetting.PADDING_SMALL,
			    fillet: ReactGroupSetting.FILLET_NONE,
			    listStyle: ReactGroupSetting.LIST_STYLE_LOWER_GREEK,
			    listPosition: ReactGroupSetting.LIST_POSITION_INNER,
			    iconPosition: ReactGroupSetting.ICON_POSTION_TOP,
			    iconShow: [ReactGroupSetting.ICON_SHOW_CLOSE, ReactGroupSetting.ICON_SHOW_CHECKED],
			    styleName: ReactGroupSetting.STYLE_NAME_SPRING,
			    composition: ReactGroupSetting.COMPOSITION_MIDDLE,
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
			name: 'Spring C',
			value: Settings.METHOD_LOOKS_SPRING_C,
			method: {
			    display: ReactGroupSetting.DISPLAY_BLOCK,
			    padding: ReactGroupSetting.PADDING_SMALL,
			    fillet: ReactGroupSetting.FILLET_BASE,
			    listStyle: ReactGroupSetting.LIST_STYLE_DECIMAL,
			    listPosition: ReactGroupSetting.LIST_POSITION_INNER,
			    iconPosition: ReactGroupSetting.ICON_POSTION_RIGHT,
			    iconShow: [ReactGroupSetting.ICON_SHOW_EMPTY_HEART],
			    styleName: ReactGroupSetting.STYLE_NAME_SPRING,
			    composition: ReactGroupSetting.COMPOSITION_MIDDLEEM,
			    offBack: true,
			    styleBorder: true,
			    styleIcon: true,
			    styleIconBack: false,
			    styleList: true
			}
		};
	}

	// ...................

	static getStyleWineA(){
		return {
			name: 'Wine A',
			value: Settings.METHOD_LOOKS_WINE_A,
			method: {
			    display: ReactGroupSetting.DISPLAY_BLOCK,
			    padding: ReactGroupSetting.PADDING_MIDDLE,
			    fillet: ReactGroupSetting.FILLET_CIRCLE,
			    // listStyle: ReactGroupSetting.LIST_STYLE_CIRCLE,
			    listPosition: ReactGroupSetting.LIST_POSITION_OUTER,
			    iconPosition: ReactGroupSetting.ICON_POSTION_TOP,
			    iconShow: [ReactGroupSetting.ICON_SHOW_EMPTY_STAR, ReactGroupSetting.ICON_SHOW_STAR],
			    styleName: ReactGroupSetting.STYLE_NAME_WINE,
			    composition: ReactGroupSetting.COMPOSITION_SMALL,
			    offBack: false,
			    styleBorder: true,
			    styleIcon: true,
			    styleIconBack: true,
			    styleList: true
		    }
		};
	}

	static getStyleWineB(){
		return {
			name: 'Wine B',
			value: Settings.METHOD_LOOKS_WINE_B,
			method: {
			    display: ReactGroupSetting.DISPLAY_BLOCK,
			    padding: ReactGroupSetting.PADDING_SMALL,
			    fillet: ReactGroupSetting.FILLET_TINY,
			    // listStyle: ReactGroupSetting.LIST_STYLE_LOWER_GREEK,
			    listPosition: ReactGroupSetting.LIST_POSITION_INNER,
			    iconPosition: ReactGroupSetting.ICON_POSTION_BOTTOM,
			    iconShow: [ReactGroupSetting.ICON_SHOW_LINE, ReactGroupSetting.ICON_SHOW_EMPTY_CIRCLE],
			    styleName: ReactGroupSetting.STYLE_NAME_WINE,
			    composition: ReactGroupSetting.COMPOSITION_MIDDLE,
			    offBack: false,
			    styleBorder: false,
			    styleIcon: false,
			    styleIconBack: false,
			    styleList: false
			}
		};
	}

	static getStyleWineC(){
		return {
			name: 'Wine C',
			value: Settings.METHOD_LOOKS_WINE_C,
			method: {
			    display: ReactGroupSetting.DISPLAY_BLOCK,
			    padding: ReactGroupSetting.PADDING_SMALL,
			    fillet: ReactGroupSetting.FILLET_NONE,
			    listStyle: ReactGroupSetting.LIST_STYLE_DECIMAL,
			    listPosition: ReactGroupSetting.LIST_POSITION_INNER,
			    iconPosition: ReactGroupSetting.ICON_POSTION_LEFT,
			    iconShow: [ReactGroupSetting.ICON_SHOW_EMPTY_SQUARE, ReactGroupSetting.ICON_SHOW_SQUARE],
			    styleName: ReactGroupSetting.STYLE_NAME_WINE,
			    composition: ReactGroupSetting.COMPOSITION_BASE,
			    offBack: true,
			    styleBorder: true,
			    styleIcon: true,
			    styleIconBack: false,
			    styleList: true
			}
		};
	}

	// ...................

	static getStyleBlueskyA(){
		return {
			name: 'Blue Sky A',
			value: Settings.METHOD_LOOKS_BLUESKY_A,
			method: {
			    display: ReactGroupSetting.DISPLAY_BLOCK,
			    padding: ReactGroupSetting.PADDING_MIDDLE,
			    fillet: ReactGroupSetting.FILLET_CIRCLE,
			    listStyle: ReactGroupSetting.LIST_STYLE_DECIMAL,
			    listPosition: ReactGroupSetting.LIST_POSITION_INNER,
			    iconPosition: ReactGroupSetting.ICON_POSTION_LEFT,
			    iconShow: [ReactGroupSetting.ICON_SHOW_CLOSE, ReactGroupSetting.ICON_SHOW_CHECKED],
			    styleName: ReactGroupSetting.STYLE_NAME_BLUESKY,
			    composition: ReactGroupSetting.COMPOSITION_TINYEM,
			    offBack: false,
			    styleBorder: true,
			    styleIcon: true,
			    styleIconBack: true,
			    styleList: true
		    }
		};
	}

	static getStyleBlueskyB(){
		return {
			name: 'Blue Sky B',
			value: Settings.METHOD_LOOKS_BLUESKY_B,
			method: {
			    display: ReactGroupSetting.DISPLAY_BLOCK,
			    padding: ReactGroupSetting.PADDING_SMALL,
			    fillet: ReactGroupSetting.FILLET_NONE,
			    listStyle: ReactGroupSetting.LIST_STYLE_UPPER_ROMAN,
			    listPosition: ReactGroupSetting.LIST_POSITION_INNER,
			    iconPosition: ReactGroupSetting.ICON_POSTION_LEFT,
			    iconShow: [ReactGroupSetting.ICON_SHOW_EMPTY_SQUARE, ReactGroupSetting.ICON_SHOW_SQUARE],
			    styleName: ReactGroupSetting.STYLE_NAME_BLUESKY,
			    composition: ReactGroupSetting.COMPOSITION_BASE,
			    offBack: false,
			    styleBorder: false,
			    styleIcon: true,
			    styleIconBack: false,
			    styleList: true
			}
		};
	}

	static getStyleBlueskyC(){
		return {
			name: 'Blue Sky C',
			value: Settings.METHOD_LOOKS_BLUESKY_C,
			method: {
			    display: ReactGroupSetting.DISPLAY_BLOCK,
			    padding: ReactGroupSetting.PADDING_SMALL,
			    fillet: ReactGroupSetting.FILLET_TINY,
			    listStyle: ReactGroupSetting.LIST_STYLE_UPPER_LATIN,
			    listPosition: ReactGroupSetting.LIST_POSITION_OUTER,
			    iconPosition: ReactGroupSetting.ICON_POSTION_BOTTOM,
			    iconShow: [ReactGroupSetting.ICON_SHOW_LINE, ReactGroupSetting.ICON_SHOW_EMPTY_CIRCLE],
			    styleName: ReactGroupSetting.STYLE_NAME_BLUESKY,
			    composition: ReactGroupSetting.COMPOSITION_BASEEM,
			    offBack: true,
			    styleBorder: true,
			    styleIcon: false,
			    styleIconBack: true,
			    styleList: true
			}
		};
	}

	// ...................

	static getStyleLovelyA(){
		return {
			name: 'Lovely A',
			value: Settings.METHOD_LOOKS_LOVELY_A,
			method: {
			    display: ReactGroupSetting.DISPLAY_BLOCK,
			    padding: ReactGroupSetting.PADDING_MIDDLE,
			    fillet: ReactGroupSetting.FILLET_CIRCLE,
			    listStyle: ReactGroupSetting.LIST_STYLE_DECIMAL,
			    listPosition: ReactGroupSetting.LIST_POSITION_OUTER,
			    iconPosition: ReactGroupSetting.ICON_POSTION_RIGHT,
			    iconShow: [ReactGroupSetting.ICON_SHOW_EMPTY_HEART, ReactGroupSetting.ICON_SHOW_HEART],
			    styleName: ReactGroupSetting.STYLE_NAME_LOVELY,
			    composition: ReactGroupSetting.COMPOSITION_TINYEM,
				offBack: false,
				styleBorder: true,
				styleIcon: true,
				styleIconBack: true,
				styleList: true
		    }
		};
	}

	static getStyleLovelyB(){
		return {
			name: 'Lovely B',
			value: Settings.METHOD_LOOKS_LOVELY_B,
			method: {
			    display: ReactGroupSetting.DISPLAY_BLOCK,
			    padding: ReactGroupSetting.PADDING_SMALL,
			    fillet: ReactGroupSetting.FILLET_NONE,
			    listStyle: ReactGroupSetting.LIST_STYLE_UPPER_ROMAN,
			    listPosition: ReactGroupSetting.LIST_POSITION_INNER,
			    iconPosition: ReactGroupSetting.ICON_POSTION_LEFT,
			    iconShow: [ReactGroupSetting.ICON_SHOW_EMPTY_CIRCLE, ReactGroupSetting.ICON_SHOW_CIRCLE],
			    styleName: ReactGroupSetting.STYLE_NAME_LOVELY,
			    composition: ReactGroupSetting.COMPOSITION_BASE,
				offBack: false,
				styleBorder: false,
				styleIcon: true,
				styleIconBack: false,
				styleList: false
			}
		};
	}

	static getStyleLovelyC(){
		return {
			name: 'Lovely C',
			value: Settings.METHOD_LOOKS_LOVELY_C,
			method: {
			    display: ReactGroupSetting.DISPLAY_BLOCK,
			    padding: ReactGroupSetting.PADDING_SMALL,
			    fillet: ReactGroupSetting.FILLET_CIRCLE,
			    listStyle: ReactGroupSetting.LIST_STYLE_UPPER_LATIN,
			    listPosition: ReactGroupSetting.LIST_POSITION_OUTER,
			    iconPosition: ReactGroupSetting.ICON_POSTION_BOTTOM,
			    iconShow: [ReactGroupSetting.ICON_SHOW_LINE, ReactGroupSetting.ICON_SHOW_CHECKED],
			    styleName: ReactGroupSetting.STYLE_NAME_LOVELY,
			    composition: ReactGroupSetting.COMPOSITION_BASEEM,
			    offBack: true,
			    styleBorder: true,
			    styleIcon: false,
			    styleIconBack: true,
			    styleList: true
			}
		};
	}

	// ...................

	static getStyleLuxuryA(){
		return {
			name: 'Luxury A',
			value: Settings.METHOD_LOOKS_LUXURY_A,
			method: {
			    display: ReactGroupSetting.DISPLAY_BLOCK,
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
			name: 'Luxury B',
			value: Settings.METHOD_LOOKS_LUXURY_B,
			method: {
			    display: ReactGroupSetting.DISPLAY_BLOCK,
			    padding: ReactGroupSetting.PADDING_TINY,
			    fillet: ReactGroupSetting.FILLET_NONE,
			    // listStyle: ReactGroupSetting.LIST_STYLE_CIRCLE,
			    listPosition: ReactGroupSetting.LIST_POSITION_OUTER,
			    iconPosition: ReactGroupSetting.ICON_POSTION_RIGHT,
			    iconShow: [ReactGroupSetting.ICON_SHOW_EMPTY_SQUARE, ReactGroupSetting.ICON_SHOW_CHECKED],
			    styleName: ReactGroupSetting.STYLE_NAME_LUXURY,
			    composition: ReactGroupSetting.COMPOSITION_TINY,
			    offBack: false,
			    styleBorder: false,
			    styleIcon: false,
			    styleIconBack: false,
			    styleList: true
			}
		};
	}

	static getStyleLuxuryC(){
		return {
			name: 'Luxury C',
			value: Settings.METHOD_LOOKS_LUXURY_C,
			method: {
			    display: ReactGroupSetting.DISPLAY_BLOCK,
			    padding: ReactGroupSetting.PADDING_MIDDLE,
			    fillet: ReactGroupSetting.FILLET_NONE,
			    // listStyle: ReactGroupSetting.LIST_STYLE_CIRCLE,
			    listPosition: ReactGroupSetting.LIST_POSITION_OUTER,
			    iconPosition: ReactGroupSetting.ICON_POSTION_TOP,
			    iconShow: [ReactGroupSetting.ICON_SHOW_EMPTY_CIRCLE, ReactGroupSetting.ICON_SHOW_EMPTY_CIRCLE],
			    styleName: ReactGroupSetting.STYLE_NAME_LUXURY,
			    composition: ReactGroupSetting.COMPOSITION_TINYPERCENT,
			    offBack: true,
			    styleBorder: true,
			    styleIcon: true,
			    styleIconBack: true,
			    styleList: false
			}
		};
	}

	// ...................

	static getStyleFantasyA(){
		return {
			name: 'Fantasy A',
			value: Settings.METHOD_LOOKS_FANTASY_A,
			method: {
			    display: ReactGroupSetting.DISPLAY_BLOCK,
			    padding: ReactGroupSetting.PADDING_BASE,
			    fillet: ReactGroupSetting.FILLET_BASE,
			    listStyle: ReactGroupSetting.LIST_STYLE_UPPER_ROMAN,
			    listPosition: ReactGroupSetting.LIST_POSITION_INNER,
			    iconPosition: ReactGroupSetting.ICON_POSTION_LEFT,
			    iconShow: [ReactGroupSetting.ICON_SHOW_RHOMBUS],
			    styleName: ReactGroupSetting.STYLE_NAME_FANTASY,
			    composition: ReactGroupSetting.COMPOSITION_SMALL,
			    offBack: false,
			    styleBorder: true,
			    styleIcon: true,
			    styleIconBack: true,
			    styleList: true
		    }
		};
	}

	static getStyleFantasyB(){
		return {
			name: 'Fantasy B',
			value: Settings.METHOD_LOOKS_FANTASY_B,
			method: {
			    display: ReactGroupSetting.DISPLAY_BLOCK,
			    padding: ReactGroupSetting.PADDING_TINY,
			    fillet: ReactGroupSetting.FILLET_CIRCLE,
			    listStyle: ReactGroupSetting.LIST_STYLE_UPPER_ROMAN,
			    listPosition: ReactGroupSetting.LIST_POSITION_OUTER,
			    iconPosition: ReactGroupSetting.ICON_POSTION_RIGHT,
			    iconShow: [ReactGroupSetting.ICON_SHOW_LINE, ReactGroupSetting.ICON_SHOW_RHOMBUS],
			    styleName: ReactGroupSetting.STYLE_NAME_FANTASY,
			    composition: ReactGroupSetting.COMPOSITION_TINY,
			    offBack: false,
			    styleBorder: false,
			    styleIcon: true,
			    styleIconBack: false,
			    styleList: true
			}
		};
	}

	static getStyleFantasyC(){
		return {
			name: 'Fantasy C',
			value: Settings.METHOD_LOOKS_FANTASY_C,
			method: {
			    display: ReactGroupSetting.DISPLAY_BLOCK,
			    padding: ReactGroupSetting.PADDING_MIDDLE,
			    fillet: ReactGroupSetting.FILLET_BASE,
			    // listStyle: ReactGroupSetting.LIST_STYLE_DISC,
			    listPosition: ReactGroupSetting.LIST_POSITION_OUTER,
			    iconPosition: ReactGroupSetting.ICON_POSTION_TOP,
			    iconShow: [ReactGroupSetting.ICON_SHOW_EMPTY_STAR, ReactGroupSetting.ICON_SHOW_STAR],
			    styleName: ReactGroupSetting.STYLE_NAME_FANTASY,
			    composition: ReactGroupSetting.COMPOSITION_TINYPERCENT,
			    offBack: true,
			    styleBorder: true,
			    styleIcon: true,
			    styleIconBack: true,
			    styleList: false
			}
		};
	}

	// ...................

	static getStyleRigidA(){
		return {
			name: 'Rigid A',
			value: Settings.METHOD_LOOKS_RIGID_A,
			method: {
			    display: ReactGroupSetting.DISPLAY_BLOCK,
			    padding: ReactGroupSetting.PADDING_BASE,
			    fillet: ReactGroupSetting.FILLET_CIRCLE,
			    // listStyle: ReactGroupSetting.LIST_STYLE_UPPER_ROMAN,
			    listPosition: ReactGroupSetting.LIST_POSITION_INNER,
			    iconPosition: ReactGroupSetting.ICON_POSTION_TOP,
			    iconShow: [ReactGroupSetting.ICON_SHOW_EMPTY_STAR],
			    styleName: ReactGroupSetting.STYLE_NAME_RIGID,
			    composition: ReactGroupSetting.COMPOSITION_TINY,
			    offBack: false,
			    styleBorder: true,
			    styleIcon: true,
			    styleIconBack: true,
			    styleList: true
		    }
		};
	}

	static getStyleRigidB(){
		return {
			name: 'Rigid B',
			value: Settings.METHOD_LOOKS_RIGID_B,
			method: {
			    display: ReactGroupSetting.DISPLAY_BLOCK,
			    padding: ReactGroupSetting.PADDING_TINY,
			    fillet: ReactGroupSetting.FILLET_BASE,
			    // listStyle: ReactGroupSetting.LIST_STYLE_UPPER_ROMAN,
			    listPosition: ReactGroupSetting.LIST_POSITION_INNER,
			    iconPosition: ReactGroupSetting.ICON_POSTION_BOTTOM,
			    iconShow: [ReactGroupSetting.ICON_SHOW_CLOSE, ReactGroupSetting.ICON_SHOW_CHECKED],
			    styleName: ReactGroupSetting.STYLE_NAME_RIGID,
			    composition: ReactGroupSetting.COMPOSITION_TINYPERCENT,
			    offBack: false,
			    styleBorder: false,
			    styleIcon: false,
			    styleIconBack: false,
			    styleList: true
			}
		};
	}

	static getStyleRigidC(){
		return {
			name: 'Rigid C',
			value: Settings.METHOD_LOOKS_RIGID_C,
			method: {
			    display: ReactGroupSetting.DISPLAY_BLOCK,
			    padding: ReactGroupSetting.PADDING_MIDDLE,
			    fillet: ReactGroupSetting.FILLET_NONE,
			    // listStyle: ReactGroupSetting.LIST_STYLE_DISC,
			    listPosition: ReactGroupSetting.LIST_POSITION_OUTER,
			    iconPosition: ReactGroupSetting.ICON_POSTION_RIGHT,
			    iconShow: [ReactGroupSetting.ICON_SHOW_CHECKED],
			    styleName: ReactGroupSetting.STYLE_NAME_RIGID,
			    composition: ReactGroupSetting.COMPOSITION_BASEEM,
			    offBack: true,
			    styleBorder: true,
			    styleIcon: true,
			    styleIconBack: true,
			    styleList: false
			}
		};
	}

	// ...................

	static getStyleWatersideA(){
		return {
			name: 'Water Side A',
			value: Settings.METHOD_LOOKS_WATERSIDE_A,
			method: {
			    display: ReactGroupSetting.DISPLAY_BLOCK,
			    padding: ReactGroupSetting.PADDING_BASE,
			    fillet: ReactGroupSetting.FILLET_TINY,
			    // listStyle: ReactGroupSetting.LIST_STYLE_UPPER_ROMAN,
			    listPosition: ReactGroupSetting.LIST_POSITION_INNER,
			    iconPosition: ReactGroupSetting.ICON_POSTION_LEFT,
			    iconShow: [ReactGroupSetting.ICON_SHOW_EMPTY_HEART, ReactGroupSetting.ICON_SHOW_HEART],
			    styleName: ReactGroupSetting.STYLE_NAME_WATERSIDE,
			    composition: ReactGroupSetting.COMPOSITION_TINY,
			    offBack: false,
			    styleBorder: true,
			    styleIcon: true,
			    styleIconBack: true,
			    styleList: true
		    }
		};
	}

	static getStyleWatersideB(){
		return {
			name: 'Water Side B',
			value: Settings.METHOD_LOOKS_WATERSIDE_B,
			method: {
			    display: ReactGroupSetting.DISPLAY_BLOCK,
			    padding: ReactGroupSetting.PADDING_SMALL,
			    fillet: ReactGroupSetting.FILLET_BASE,
			    listStyle: ReactGroupSetting.LIST_STYLE_UPPER_ROMAN,
			    listPosition: ReactGroupSetting.LIST_POSITION_INNER,
			    iconPosition: ReactGroupSetting.ICON_POSTION_TOP,
			    iconShow: [ReactGroupSetting.ICON_SHOW_EMPTY_CIRCLE, ReactGroupSetting.ICON_SHOW_CIRCLE],
			    styleName: ReactGroupSetting.STYLE_NAME_WATERSIDE,
			    composition: ReactGroupSetting.COMPOSITION_TINYPERCENT,
			    offBack: false,
			    styleBorder: false,
			    styleIcon: true,
			    styleIconBack: false,
			    styleList: false
			}
		};
	}

	static getStyleWatersideC(){
		return {
			name: 'Water Side C',
			value: Settings.METHOD_LOOKS_WATERSIDE_C,
			method: {
			    display: ReactGroupSetting.DISPLAY_BLOCK,
			    padding: ReactGroupSetting.PADDING_LITTLE,
			    fillet: ReactGroupSetting.FILLET_CIRCLE,
			    // listStyle: ReactGroupSetting.LIST_STYLE_DISC,
			    listPosition: ReactGroupSetting.LIST_POSITION_OUTER,
			    iconPosition: ReactGroupSetting.ICON_POSTION_RIGHT,
			    iconShow: [ReactGroupSetting.ICON_SHOW_EMPTY_STAR, ReactGroupSetting.ICON_SHOW_STAR],
			    styleName: ReactGroupSetting.STYLE_NAME_WATERSIDE,
			    composition: ReactGroupSetting.COMPOSITION_SMALL,
			    offBack: true,
			    styleBorder: true,
			    styleIcon: false,
			    styleIconBack: true,
			    styleList: false
			}
		};
	}
};