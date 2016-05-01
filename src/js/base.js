// 用input抓原始圖片資料
// 用canvas修改圖片資料
// 預覽圖（固定某大小做為預覽圖）
// 送給php產生圖檔，以進一步存下新的圖檔

import PictureDraw from "./PictureDraw";
import MethodSection from "./MethodSection";
import Utils from "./Utils";

(function body () {

    let methodSection = new MethodSection( Utils.createUniqueId() );
    methodSection.create();

    // ** ** ** ** ** ** ** ** ** ** ** ** ** ** ** ** ** ** ** ** ** ** ** ** ** ** ** **

	let _obj_main = document.querySelectorAll('[data-majo="picture-filter"]');
	
	let pictureDraw = new PictureDraw( _obj_main[0], Utils.createUniqueId() );

 //    new PictureDraw( _obj_main[1], Utils.createUniqueId() ); 
	// new PictureDraw( _obj_main[2], Utils.createUniqueId() ); 

})();