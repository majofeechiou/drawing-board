// 用input抓原始圖片資料
// 用canvas修改圖片資料
// 預覽圖（固定某大小做為預覽圖）
// 送給php產生圖檔，以進一步存下新的圖檔

import PictureDraw from "./PictureDraw";
import MethodSection from "./MethodSection";
import SettingSection from "./SettingSection";
import StyleSettings from './StyleSettings';
import Utils from "./Utils";
import SVGInjector from "svg-injector";
import GloablTools from './GloablTools';

const OBJ_BODY = document.getElementById('body');
const OBJ_SETTING_SECTION = document.getElementById("setting-section");
const OBJ_SETTING_BTN = document.getElementById("setting-btn");

(function body (dataLayer, ga) {

    OBJ_BODY.className = OBJ_BODY.className+' '+Utils.getPageStyleClassNameSub( StyleSettings.getAllStyle()[0].value );

    OBJ_SETTING_BTN.onclick = function(){
        OBJ_SETTING_SECTION.className = (OBJ_SETTING_SECTION.className.indexOf('pkg-setting_open')>=0 )? OBJ_SETTING_SECTION.className.replace(/\s*pkg-setting_open\s*/gm,'') : OBJ_SETTING_SECTION.className+' pkg-setting_open';
    }

    let methodSection = new MethodSection( Utils.createUniqueId() );
    methodSection.create();

    let settingSection = new SettingSection();
    settingSection.create();

    // ** ** ** ** ** ** ** ** ** ** ** ** ** ** ** ** ** ** ** ** ** ** ** ** ** ** ** **

	let _obj_main = document.querySelectorAll('[data-majo="picture-filter"]');
	
	let pictureDraw = new PictureDraw( _obj_main[0], Utils.createUniqueId() );

 //    new PictureDraw( _obj_main[1], Utils.createUniqueId() ); 
	// new PictureDraw( _obj_main[2], Utils.createUniqueId() ); 

    setTimeout(function(){
        let mySVGsToInject = document.querySelectorAll('img.svg-inject');

        // Do the injection
        SVGInjector(mySVGsToInject);
    },2000);

    // ** ** ** ** ** ** ** ** ** ** ** ** ** ** ** ** ** ** ** ** ** ** ** ** ** ** ** **

    ga('create', 'UA-78736944-1', 'auto');

    GloablTools.Emitter().on('ga.event', function(){
        let _json_data = arguments[0];
        ga('send', {
            hitType: 'event',
            eventCategory: _json_data.eventCategory,
            eventAction: _json_data.eventAction,
            eventLabel: _json_data.eventLabel
        });
    });

})(dataLayer, ga);