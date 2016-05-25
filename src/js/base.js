// 用input抓原始圖片資料
// 用canvas修改圖片資料
// 預覽圖（固定某大小做為預覽圖）
// 送給php產生圖檔，以進一步存下新的圖檔

import PictureDraw from "./PictureDraw";
import MethodSection from "./MethodSection";
import SettingSection from "./SettingSection";
import Utils from "./Utils";
import SVGInjector from "svg-injector";

(function body () {

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

})();