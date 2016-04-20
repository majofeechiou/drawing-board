'use strict';

import Utils from './Utils';
import Settings from './Settings';
import MethodSettings from './MethodSettings';
import GlobalConst from './GlobalConst';

export default class MainImageFilter extends GlobalConst {

	constructor( obj, json_tools ){
		super();

		this.setEmitter( json_tools.emitter );
		this.setModuleId( Utils.createUniqueId() );

		this.setOutputImageSetting( this.getInitOutputImageScale() );
		// this.setOutputImageSetting( this.getInitOutputImageCustom() );

		this.defaultAction( obj );

	}

	setModuleId( str ){
		this.module_id = str;
	}

	setEmitter(object){
		this.emitter = object ;
	}
	
	setOutputImageSetting( json ){
		this.output_image_setting = json || {} ;
	}

	getInitOutputImageScale(){
		return Settings.getInitOutputImageScale();
	}
	getInitOutputImageCustom(){
		return Settings.getInitOutputImageCustom();
	}

	getOutputImageSetting(){
		return this.output_image_setting || {} ;
	}

	getEmitter(){
		return this.emitter ;
	}

	getModuleId(){
		return this.module_id ;
	}

	// 得到用來產生版形的區塊
	getMainSection(){
		return this.getGlobalConst(this).MAIN_SECTION;
	}

	// 在預覽產生前，把這東西元件設定src
	getObjImagePreview(){
		return this.getGlobalConst(this).OBJ_IMAGE_PREVIEW;
	}

	// 效果選項的元件
	getObjMethodSelect(){
		return this.getGlobalConst(this).OBJ_METHOD_SELECT;
	}

	// 選出來什麼效果選項的元件
	getObjMethodResult(){
		return this.getGlobalConst(this).OBJ_METHOD_RESULT;
	}

	// 原圖預覽圖片
	getObjOriginImage(){
		return this.getGlobalConst(this).OBJ_ORIGIN_IMAGE;
	}

	// 得到上傳圖片的按鈕
	getObjUpload(){
		return this.getGlobalConst(this).OBJ_UPLOAD;
	}

	// 確定圖片的size設定
	getObjsSizeSubmit(){
		return this.getGlobalConst(this).OBJ_SIZE_SUBMIT;
	}

	// 哪種圖片的大小設定 - scale
	getObjsSizeScaleRadio(){
		return this.getGlobalConst(this).OBJ_SIZE_SCALE_RADIO;
	}

	// 哪種圖片的大小設定 - custom
	getObjsSizeCustomRadio(){
		return this.getGlobalConst(this).OBJ_SIZE_CUSTOM_RADIO;
	}

	// 哪種圖片的大小設定 - custom
	getObjsSizeRange(){
		return this.getGlobalConst(this).OBJ_SCALE_RANGE;
	}

	// 哪種圖片的大小設定 - custom - 多少%的顯非
	getObjsSizeRangesShow(){
		return this.getGlobalConst(this).OBJ_SCALE_RANGE_SHOW;
	}

	// 自訂寬度
	getObjsSizeCustomWidth(){
		return this.getGlobalConst(this).OBJ_SIZE_CUSTOM_WIDTH;
	}

	// 自訂高度
	getObjsSizeCustomHeight(){
		return this.getGlobalConst(this).OBJ_SIZE_CUSTOM_HEIGHT;
	}

	// 原圖預覽圖片
	returnOriginImageSection(){
		let _obj_image_section = document.createElement('div');
		let _obj_origin_image 	= document.createElement('img');
		this.addGlobalConst( this, 'OBJ_ORIGIN_IMAGE', _obj_origin_image );
		_obj_image_section.appendChild(_obj_origin_image);
		return _obj_image_section;
	}

	// 上傳檔案
	returnUploadSection(){
		let _obj_upload_section 	= document.createElement('div');
		let _obj_upload 	= document.createElement('input');
		_obj_upload.type	= "file";
		this.uploadAction.call( _obj_upload, this );
		this.addGlobalConst( this, 'OBJ_UPLOAD', _obj_upload );
		_obj_upload_section.appendChild(_obj_upload);
		return _obj_upload_section;
	}
	
	// 預覽圖片
	returnCanvasSection(){
		let _obj_canvas_section = document.createElement('div');
		let _obj_canvas_preview = new Image();
		
		this.addGlobalConst( this, 'OBJ_IMAGE_PREVIEW', _obj_canvas_preview );

		_obj_canvas_section.appendChild( _obj_canvas_preview );

		return _obj_canvas_section;
	}

	// 新增效果
	returnMethodSection(){
		let _obj_method_section = document.createElement('div');

		// 選出了哪些效果
		let _obj_method_result = document.createElement('span');
		_obj_method_section.appendChild(_obj_method_result);

		// 下拉式選單
		let _obj_method_select = document.createElement('select');
		_obj_method_select.name = 'method';
		let _sary_option = MethodSettings.getAllMethod();
		let _str_method_select = '';
		_str_method_select += '<option value="">---請選擇---</option>';
		for( let i=0; i<_sary_option.length; i++ ){
			_str_method_select += '<option value="'+_sary_option[i].method+'">'+_sary_option[i].method_name+'</option>';
		}
		_obj_method_select.insertAdjacentHTML('afterbegin',_str_method_select);

		// 新增按鈕
		let _obj_method_button = document.createElement('button');
		_obj_method_button.innerText = '新增效果';
		this.methodAddBtnAction.call( _obj_method_button, this );
		_obj_method_section.appendChild(_obj_method_select);
		_obj_method_section.appendChild(_obj_method_button);

		this.addGlobalConst( this, 'OBJ_METHOD_SECTION', _obj_method_section );
		this.addGlobalConst( this, 'OBJ_METHOD_RESULT', _obj_method_result );
		this.addGlobalConst( this, 'OBJ_METHOD_SELECT', _obj_method_select );
		return _obj_method_section;
	}

	// 輸出圖片尺寸
	returnSizeSection(){
		let _obj_size_section = document.createElement('div');
		_obj_size_section.innerText = '圖片輸出尺寸';

		let _obj_scale_section = document.createElement('div');
		let _obj_custom_section = document.createElement('div');

		// 圖片尺寸 - 原圖等比縮放 - radio
		let _obj_size_scale = document.createElement('input');
		_obj_size_scale.type = 'radio';
		_obj_size_scale.name = 'size_'+this.getModuleId();
		_obj_size_scale.value = 'scale';
		_obj_size_scale.checked = (this.getOutputImageSetting().size === Settings.OUTPUT_SIZE_SCALE);
		this.addGlobalConst( this, 'OBJ_SIZE_SCALE_RADIO', _obj_size_scale );
		// 圖片尺寸 - 原圖等比縮放 - label
		let _obj_label_scale = document.createElement('label');
		_obj_label_scale.appendChild(_obj_size_scale);
		_obj_label_scale.insertAdjacentHTML('beforeend','原圖等比縮放');
		// 圖片尺寸 - 自訂尺寸 - input
		let _obj_scale_range = document.createElement('input');
		_obj_scale_range.type = 'range';
		_obj_scale_range.name = 'range_'+this.getModuleId();
		_obj_scale_range.value = this.getInitOutputImageScale().range;
		_obj_scale_range.min = 1;
		_obj_scale_range.max = 200;
		this.addGlobalConst( this, 'OBJ_SCALE_RANGE', _obj_scale_range );
		let _obj_scale_range_show = document.createElement('span');
		this.addGlobalConst( this, 'OBJ_SCALE_RANGE_SHOW', _obj_scale_range_show );

		_obj_scale_section.appendChild( _obj_label_scale );
		_obj_scale_section.appendChild( _obj_scale_range );
		_obj_scale_section.appendChild( _obj_scale_range_show );

		// 圖片尺寸 - 自訂尺寸 - radio
		let _obj_size_custom = document.createElement('input');
		_obj_size_custom.type = 'radio';
		_obj_size_custom.name = 'size_'+this.getModuleId();
		_obj_size_custom.value = 'custom';
		_obj_size_custom.checked = (this.getOutputImageSetting().size === Settings.OUTPUT_SIZE_CUSTOM);
		this.addGlobalConst( this, 'OBJ_SIZE_CUSTOM_RADIO', _obj_size_custom );
		// 圖片尺寸 - 自訂尺寸 - label
		let _obj_label_custom = document.createElement('label');
		_obj_label_custom.appendChild(_obj_size_custom);
		_obj_label_custom.insertAdjacentHTML('beforeend','自訂尺寸');
		let _obj_custom_width = document.createElement('input');
		_obj_custom_width.type = 'number';
		_obj_custom_width.name = 'custom_width_'+this.getModuleId();
		_obj_custom_width.min = 10;
		_obj_custom_width.max = 3000;
		_obj_custom_width.value = this.getInitOutputImageCustom().width;
		this.addGlobalConst( this, 'OBJ_SIZE_CUSTOM_WIDTH', _obj_custom_width );
		let _obj_custom_height = document.createElement('input');
		_obj_custom_height.type = 'number';
		_obj_custom_height.name = 'custom_height_'+this.getModuleId();
		_obj_custom_height.min = 10;
		_obj_custom_height.max = 3000;
		_obj_custom_height.value = this.getInitOutputImageCustom().height;
		this.addGlobalConst( this, 'OBJ_SIZE_CUSTOM_HEIGHT', _obj_custom_height );
		// 圖片尺寸 - 自訂尺寸 - cover - radio
		let _obj_size_custom_cover = document.createElement('input');
		_obj_size_custom_cover.type = 'radio';
		_obj_size_custom_cover.name = 'custom_'+this.getModuleId();
		_obj_size_custom_cover.value = 'cover';
		_obj_size_custom_cover.checked = (this.getInitOutputImageCustom().custom === Settings.OUTPUT_CUSTOM_COVER);
		this.addGlobalConst( this, 'OBJ_SIZE_CUSTOM_COVER', _obj_size_custom_cover );
		// 圖片尺寸 - 自訂尺寸 - cover - label
		let _obj_label_custom_cover = document.createElement('label');
		_obj_label_custom_cover.appendChild(_obj_size_custom_cover);
		_obj_label_custom_cover.insertAdjacentHTML('beforeend','COVER');
		// 圖片尺寸 - 自訂尺寸 - contain - radio
		let _obj_size_custom_contain = document.createElement('input');
		_obj_size_custom_contain.type = 'radio';
		_obj_size_custom_contain.name = 'custom_'+this.getModuleId();
		_obj_size_custom_contain.value = 'contain';
		_obj_size_custom_contain.checked = (this.getInitOutputImageCustom().custom === Settings.OUTPUT_CUSTOM_CONTAIN);
		this.addGlobalConst( this, 'OBJ_SIZE_CUSTOM_CONTAIN', _obj_size_custom_contain );
		// 圖片尺寸 - 自訂尺寸 - contain - label
		let _obj_label_custom_contain = document.createElement('label');
		_obj_label_custom_contain.appendChild(_obj_size_custom_contain);
		_obj_label_custom_contain.insertAdjacentHTML('beforeend','CONTAIN');
		// 圖片尺寸 - 自訂尺寸 - fill - radio
		let _obj_size_custom_fill = document.createElement('input');
		_obj_size_custom_fill.type = 'radio';
		_obj_size_custom_fill.name = 'custom_'+this.getModuleId();
		_obj_size_custom_fill.value = 'fill';
		_obj_size_custom_fill.checked = (this.getInitOutputImageCustom().custom === Settings.OUTPUT_CUSTOM_FILL);
		this.addGlobalConst( this, 'OBJ_SIZE_CUSTOM_FILL', _obj_size_custom_fill );
		// 圖片尺寸 - 自訂尺寸 - fill - label
		let _obj_label_custom_fill = document.createElement('label');
		_obj_label_custom_fill.appendChild(_obj_size_custom_fill);
		_obj_label_custom_fill.insertAdjacentHTML('beforeend','FILL');
		// 圖片尺寸 - 自訂尺寸 - clip - radio
		let _obj_size_custom_clip = document.createElement('input');
		_obj_size_custom_clip.type = 'radio';
		_obj_size_custom_clip.name = 'custom_'+this.getModuleId();
		_obj_size_custom_clip.value = 'clip';
		_obj_size_custom_clip.checked = (this.getInitOutputImageCustom().custom === Settings.OUTPUT_CUSTOM_CLIP);
		this.addGlobalConst( this, 'OBJ_SIZE_CUSTOM_CLIP', _obj_size_custom_clip );
		// 圖片尺寸 - 自訂尺寸 - clip - label
		let _obj_label_custom_clip = document.createElement('label');
		_obj_label_custom_clip.appendChild(_obj_size_custom_clip);
		_obj_label_custom_clip.insertAdjacentHTML('beforeend','CLIP');

		_obj_custom_section.appendChild( _obj_label_custom );
		_obj_custom_section.insertAdjacentHTML('beforeend','寬');
		_obj_custom_section.appendChild( _obj_custom_width );
		_obj_custom_section.insertAdjacentHTML('beforeend','高');
		_obj_custom_section.appendChild( _obj_custom_height );
		_obj_custom_section.appendChild( _obj_label_custom_cover );
		_obj_custom_section.appendChild( _obj_label_custom_contain );
		_obj_custom_section.appendChild( _obj_label_custom_fill );
		_obj_custom_section.appendChild( _obj_label_custom_clip );

		// 圖片尺寸 - 自訂尺寸 - radio
		let _obj_size_submit = document.createElement('button');
		_obj_size_submit.innerText = '確定';
		this.addGlobalConst( this, 'OBJ_SIZE_SUBMIT', _obj_size_submit );

		_obj_size_section.appendChild( _obj_scale_section );
		_obj_size_section.appendChild( _obj_custom_section );
		_obj_size_section.appendChild( _obj_size_submit );
		return _obj_size_section;

	}

	// 用dom去產生頁面上的排版
	makeTempate(){

		let _scope = this;

		let _obj_main = this.getMainSection();

		if( _obj_main!==undefined ){

			// 上傳檔案
			let _obj_upload_section = this.returnUploadSection();

			// 預覽圖片
			let _obj_canvas_section = this.returnCanvasSection();

			// 輸出圖片尺寸
			let _obj_size_section = this.returnSizeSection();

			// 新增效果
			let _obj_method_section = this.returnMethodSection();

			// 原圖預覽圖片
			let _obj_origin_image_section = this.returnOriginImageSection();

			_obj_main.appendChild(_obj_size_section);
			_obj_main.appendChild(_obj_upload_section);
			_obj_main.appendChild(_obj_method_section);
			_obj_main.appendChild(_obj_origin_image_section);
			_obj_main.appendChild(_obj_canvas_section);

			_scope.judgeOutputImageSetting.call( _scope.getObjsSizeSubmit(), _scope );
			_scope.listenRangeChange.call( _scope.getObjsSizeRange(), _scope );
			_scope.getRangeShowText();

		}

	}

	judgeOutputImageSetting( scope_calss ){
		let _obj_self = this;
		_obj_self.onclick = function( e ){
			let _obj_scale_radio = scope_calss.getObjsSizeScaleRadio(),
				_obj_custom_radio = scope_calss.getObjsSizeCustomRadio();
			let _str_size 	= ( _obj_scale_radio.checked === true )? _obj_scale_radio.value : (
							  ( _obj_custom_radio.checked === true )? _obj_custom_radio.value : '' ) ;
			let _json_setting = {
				size: _str_size
			};

			if( _str_size === Settings.OUTPUT_SIZE_SCALE ){
				_json_setting.range = scope_calss.getObjsSizeRange().value;
			}else if( _str_size === Settings.OUTPUT_SIZE_CUSTOM ){
				_json_setting.width = scope_calss.getObjsSizeCustomWidth().value;
				_json_setting.height = scope_calss.getObjsSizeCustomHeight().value;
				_json_setting.custom = document.querySelectorAll('[name="custom_'+scope_calss.getModuleId()+'"]:checked')[0].value || '' ;
			}
			scope_calss.setOutputImageSetting( _json_setting );
			
		};
	}

	uploadAction( scope_calss ){
		let _obj_self = this;
		_obj_self.onchange = function( e ){ // 從頭更換圖片
			let windowURL = window.URL || window.webkitURL;
			let _str_image_data = windowURL.createObjectURL(this.files[0]);
			// scope_calss.setImageInitData( _str_image_data );

			scope_calss.getEmitter().emit('origin.data.changed', {
				origin_data: _str_image_data,
				setting: scope_calss.getOutputImageSetting()
			});

		}
	}

	// 新增效果的按鈕
	methodAddBtnAction( scope_calss ){
		let _obj_self = this;
		_obj_self.onclick = function( e ){
			let _str_method_value = scope_calss.getObjMethodSelect().value;
			if( _str_method_value!=='' ){
				scope_calss.getEmitter().emit('step.method.pushing',{
					method: _str_method_value
				});
			}else{
				console.log( '不應為空!!' );
			}
		}
	}

	// 刪除效果的按鈕
	methodDeleteBtnAction( scope_calss ){
		let _obj_self = this;
		_obj_self.onclick = function( e ){
			// 先直接發出刪除methodid的事件，之後再來擴充
			scope_calss.getEmitter().emit('step.method.splicing',{
				method: _obj_self.data.method,
				method_id: _obj_self.data.method_id,
				method_btn:this
			});
		}
	}

	listenRangeChange( scope_calss ){
		let _obj_self = this;
		_obj_self.onchange = function( e ){
			scope_calss.getRangeShowText();
		}
	}

	getRangeShowText(){
		let _scope = this;
		_scope.getObjsSizeRangesShow().innerText = _scope.getObjsSizeRange().value+'%';
	}

	defaultAction( obj ){
		let _scope = this;
		_scope.initGlobalConst(this);

		if( obj.nodeType>=1 ){
			_scope.addGlobalConst( this, 'MAIN_SECTION', obj );
			_scope.makeTempate();
		}

	}

};