// 用input抓原始圖片資料
// 用canvas修改圖片資料
// 預覽圖（固定某大小做為預覽圖）
// 送給php產生圖檔，以進一步存下新的圖檔

import PictureDraw from "./picture-draw";
import MethodSection from "./methodSection";
import Utils from "./utils";
import Emitter from 'component-emitter';

(function body () {

    let emitter = new Emitter();

    let _json_tools = {
        emitter: emitter
    };

    let methodSection = new MethodSection( Utils.createUniqueId(), _json_tools );
    methodSection.create();

    // ** ** ** ** ** ** ** ** ** ** ** ** ** ** ** ** ** ** ** ** ** ** ** ** ** ** ** **

	let _obj_main = document.querySelectorAll('[data-majo="picture-filter"]');
	
	let pictureDraw = new PictureDraw( _obj_main[0], Utils.createUniqueId(), _json_tools );

 //    new PictureDraw( _obj_main[1], Utils.createUniqueId(), _json_tools ); 
	// new PictureDraw( _obj_main[2], Utils.createUniqueId(), _json_tools ); 

})();