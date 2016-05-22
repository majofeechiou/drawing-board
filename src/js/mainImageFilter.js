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

		this.addGlobalConst( this, 'CLASSNAME_WORKSPACE_TOOLS', 'pkg-workspace-tools' );
		this.addGlobalConst( this, 'CLASSNAME_WORKSPACE_TOOLS_SIZE', 'pkg-workspace-tools_size' );
		this.addGlobalConst( this, 'CLASSNAME_WORKSPACE_TOOLS_UPLOAD', 'pkg-workspace-tools_upload' );
		this.addGlobalConst( this, 'CLASSNAME_WORKSPACE_TOOLS_ACTION', 'pkg-workspace-tools_action' );

		this.addGlobalConst( this, 'WORKSPACE_TOOLS_ON_SIZE', 'size' );
		this.addGlobalConst( this, 'WORKSPACE_TOOLS_ON_UPLOAD', 'upload' );
		this.addGlobalConst( this, 'WORKSPACE_TOOLS_ON_ACTION', 'action' );

		this.defaultAction( obj );

	}

	setModuleId( str ){
		this.module_id = str;
	}

	setEmitter(object){
		this.emitter = object ;
	}
	
	// 這些是設定圖片大小時會用到的設定
	// 也就是 Setting中的getInitOutputImageScale和getInitOutputImageCustom這樣的東西
	setOutputImageSetting( json, callback ){
		this.output_image_setting = json || {} ;
		if( callback && (callback instanceof Function === true) ){
			callback();
		}
	}

	// 從外部入時，是怎樣就是怎樣，絕無任何修改
	setSourceImage( json ){
		json = json || {};
		this.source_image = {
			files: json.files,
			base64: json.base64
		};
		window.source_image = this.source_image;
	}

	// 從外部入時，是怎樣就是怎樣，絕無任何修改
	getSourceImage(){
		return this.source_image || {};
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

	// 選出來什麼效果選項的元件
	getObjMethodResult(){
		return this.getGlobalConst(this).OBJ_METHOD_RESULT;
	}

	// 得到上傳圖片的按鈕
	getObjToolsSection(){
		return this.getGlobalConst(this).OBJ_TOOLS_SECTION;
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

	// 返回圖片的size設定
	getObjBackSubmit(){
		return this.getGlobalConst(this).OBJ_BACK_SUBMIT;
	}

	setToolsSectionClassName( str_on ){
		let _scope = this;

		let _str_reg_size = new RegExp( _scope.getGlobalConst(_scope).CLASSNAME_WORKSPACE_TOOLS_SIZE, 'gim' );
		let _str_reg_upload = new RegExp( _scope.getGlobalConst(_scope).CLASSNAME_WORKSPACE_TOOLS_UPLOAD, 'gim' );
		let _str_reg_action = new RegExp( _scope.getGlobalConst(_scope).CLASSNAME_WORKSPACE_TOOLS_ACTION, 'gim' );

		switch( str_on ){
			case _scope.getGlobalConst(_scope).WORKSPACE_TOOLS_ON_SIZE:
				_scope.getObjToolsSection().className = _scope.getObjToolsSection().className.replace( _str_reg_upload, '' ).replace( _str_reg_action, '' )+' '+_scope.getGlobalConst(_scope).CLASSNAME_WORKSPACE_TOOLS_SIZE;
				break;
			case _scope.getGlobalConst(_scope).WORKSPACE_TOOLS_ON_UPLOAD:
				_scope.getObjToolsSection().className = _scope.getObjToolsSection().className.replace( _str_reg_size, '' ).replace( _str_reg_action, '' )+' '+_scope.getGlobalConst(_scope).CLASSNAME_WORKSPACE_TOOLS_UPLOAD;
				break;
			case _scope.getGlobalConst(_scope).WORKSPACE_TOOLS_ON_ACTION:
				_scope.getObjToolsSection().className = _scope.getObjToolsSection().className.replace( _str_reg_size, '' ).replace( _str_reg_upload, '' )+' '+_scope.getGlobalConst(_scope).CLASSNAME_WORKSPACE_TOOLS_ACTION;
				break;
		}
		
	}

	// 原圖預覽圖片
	returnOriginImageSection(){
		let _obj_origin_image 	= document.createElement('img');
		this.addGlobalConst( this, 'OBJ_ORIGIN_IMAGE', _obj_origin_image );
		return _obj_origin_image;
	}

	// 工具 - 上傳檔案
	returnUploadSection(){
		let _obj_upload_section 	= document.createElement('div');
		_obj_upload_section.className = 'pkg-upload';

		let _obj_upload_section_inner 	= document.createElement('div');
		_obj_upload_section_inner.className = 'pkg-upload-inner';
		_obj_upload_section.appendChild(_obj_upload_section_inner);

		let _obj_upload 	= document.createElement('input');
		_obj_upload.className = 'pkg-upload-inner-input';
		_obj_upload.type	= "file";
		this.uploadAction.call( _obj_upload, this );
		this.addGlobalConst( this, 'OBJ_UPLOAD', _obj_upload );
		_obj_upload_section_inner.appendChild(_obj_upload);

		// 原圖預覽圖片
		let _obj_origin_image_section = this.returnOriginImageSection();
		_obj_origin_image_section.className = 'pkg-upload-inner-origin';
		_obj_origin_image_section.src = './img/svg.svg#img-upload';
		// _obj_origin_image_section.src = './img/svg.svg';
		// _obj_origin_image_section.setAttribute('data-src','./img/svg.svg');
		_obj_upload_section_inner.appendChild(_obj_origin_image_section);

		return _obj_upload_section;
	}
	
	// 預覽圖片
	returnPreviewSection(){
		let _obj_preview_section = document.createElement('div');
		_obj_preview_section.className = 'pkg-preview';

		let _obj_preview_image = new Image();
		_obj_preview_image.className = 'pkg-preview-image';
		
		this.addGlobalConst( this, 'OBJ_IMAGE_PREVIEW', _obj_preview_image );

		_obj_preview_section.appendChild( _obj_preview_image );

		return _obj_preview_section;
	}

	// 新增按鈕、下載按鈕
	returnToolsSection(){
		let _obj_section = document.createElement('div');

		// 新增按鈕
		let _obj_add_button = document.createElement('button');
		_obj_add_button.className = 'pkg-action-tools-button pkg-action-tools-button_add ui-toolsbtn';
		// _obj_add_button.innerText = '新增效果';
		this.methodAddBtnActive.call( _obj_add_button, this );
		_obj_section.appendChild(_obj_add_button);
		// this.addGlobalConst( this, 'OBJ_METHOD_ADD_BUTTON', _obj_add_button );

		// 下載按鈕
		let _obj_download_button = document.createElement('button');
		_obj_download_button.className = 'pkg-action-tools-button pkg-action-tools-button_download ui-toolsbtn';
		// _obj_download_button.innerText = '下載圖片';
		this.downloadBtnActive.call( _obj_download_button, this );
		_obj_section.appendChild(_obj_download_button);
		// this.addGlobalConst( this, 'OBJ_METHOD_DOWNLOAD_BUTTON', _obj_download_button );

		return _obj_section;
	}

	// 新增效果的結果選項集
	returnResultSection(){
		let _obj_method_section = document.createElement('ul');

		this.addGlobalConst( this, 'OBJ_METHOD_RESULT', _obj_method_section );
		return _obj_method_section;
	}

	// 工具 - 新增效果 、 下載圖片，以及新增效果的結果選項集
	returnActionSection(){
		let _obj_section = document.createElement('div');
		_obj_section.className = 'pkg-action';

		// 新增效果的結果選項集
		let _obj_tools_section = this.returnToolsSection();
		Utils.addClassName(_obj_tools_section, 'pkg-action-tools');
		_obj_section.appendChild(_obj_tools_section);

		// 新增效果的結果選項集
		let _obj_method_section = this.returnResultSection();
		Utils.addClassName(_obj_method_section, 'pkg-action-method');
		_obj_section.appendChild(_obj_method_section);
		
		return _obj_section;
	}

	// 工具 - 輸出圖片尺寸
	returnSizeSection(){
		let _obj_size_section = document.createElement('div');
		_obj_size_section.className = 'pkg-size';

		let _obj_size_title = document.createElement('h3');
		_obj_size_title.className = 'blk-subtitle';
		_obj_size_title.innerText = '圖片輸出尺寸';

		let _obj_scale_section = document.createElement('div');
		_obj_scale_section.className = 'pkg-size-item';
		let _obj_custom_section = document.createElement('div');
		_obj_custom_section.className = 'pkg-size-item';

		// 圖片尺寸 - 原圖等比縮放 - radio
		let _obj_size_scale = document.createElement('input');
		_obj_size_scale.className = 'mrg-rt-base dpy-inblock';
		_obj_size_scale.type = 'radio';
		_obj_size_scale.name = 'size_'+this.getModuleId();
		_obj_size_scale.value = 'scale';
		_obj_size_scale.checked = (this.getOutputImageSetting().size === Settings.OUTPUT_SIZE_SCALE);
		this.addGlobalConst( this, 'OBJ_SIZE_SCALE_RADIO', _obj_size_scale );
		// 圖片尺寸 - 原圖等比縮放 - label
		let _obj_label_scale = document.createElement('label');
		_obj_label_scale.className = 'mrg-rt-base dpy-inblock';
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
		_obj_size_custom.className = 'mrg-rt-base dpy-inblock';
		_obj_size_custom.type = 'radio';
		_obj_size_custom.name = 'size_'+this.getModuleId();
		_obj_size_custom.value = 'custom';
		_obj_size_custom.checked = (this.getOutputImageSetting().size === Settings.OUTPUT_SIZE_CUSTOM);
		this.addGlobalConst( this, 'OBJ_SIZE_CUSTOM_RADIO', _obj_size_custom );
		// 圖片尺寸 - 自訂尺寸 - label
		let _obj_label_custom = document.createElement('label');
		_obj_label_custom.className = 'mrg-rt-base dpy-inblock';
		_obj_label_custom.appendChild(_obj_size_custom);
		_obj_label_custom.insertAdjacentHTML('beforeend','自訂尺寸（PX）');
		let _obj_custom_width = document.createElement('input');
		_obj_custom_width.className = 'mrg-lt-tiny mrg-rt-base dpy-inblock';
		_obj_custom_width.type = 'number';
		_obj_custom_width.name = 'custom_width_'+this.getModuleId();
		_obj_custom_width.min = 10;
		_obj_custom_width.max = 3000;
		_obj_custom_width.value = this.getInitOutputImageCustom().width;
		this.addGlobalConst( this, 'OBJ_SIZE_CUSTOM_WIDTH', _obj_custom_width );
		let _obj_custom_height = document.createElement('input');
		_obj_custom_height.className = 'mrg-lt-tiny dpy-inblock';
		_obj_custom_height.type = 'number';
		_obj_custom_height.name = 'custom_height_'+this.getModuleId();
		_obj_custom_height.min = 10;
		_obj_custom_height.max = 3000;
		_obj_custom_height.value = this.getInitOutputImageCustom().height;
		this.addGlobalConst( this, 'OBJ_SIZE_CUSTOM_HEIGHT', _obj_custom_height );
		// 圖片尺寸 - 自訂尺寸 - cover - radio
		let _obj_size_custom_cover = document.createElement('input');
		_obj_size_custom_cover.className = 'mrg-rt-tiny dpy-inblock';
		_obj_size_custom_cover.type = 'radio';
		_obj_size_custom_cover.name = 'custom_'+this.getModuleId();
		_obj_size_custom_cover.value = 'cover';
		_obj_size_custom_cover.checked = (this.getInitOutputImageCustom().custom === Settings.OUTPUT_CUSTOM_COVER);
		this.addGlobalConst( this, 'OBJ_SIZE_CUSTOM_COVER', _obj_size_custom_cover );
		// 圖片尺寸 - 自訂尺寸 - cover - label
		let _obj_label_custom_cover = document.createElement('label');
		_obj_label_custom_cover.className = 'mrg-rt-base dpy-inblock';
		_obj_label_custom_cover.appendChild(_obj_size_custom_cover);
		_obj_label_custom_cover.insertAdjacentHTML('beforeend','COVER');
		// 圖片尺寸 - 自訂尺寸 - contain - radio
		let _obj_size_custom_contain = document.createElement('input');
		_obj_size_custom_contain.className = 'mrg-rt-tiny dpy-inblock';
		_obj_size_custom_contain.type = 'radio';
		_obj_size_custom_contain.name = 'custom_'+this.getModuleId();
		_obj_size_custom_contain.value = 'contain';
		_obj_size_custom_contain.checked = (this.getInitOutputImageCustom().custom === Settings.OUTPUT_CUSTOM_CONTAIN);
		this.addGlobalConst( this, 'OBJ_SIZE_CUSTOM_CONTAIN', _obj_size_custom_contain );
		// 圖片尺寸 - 自訂尺寸 - contain - label
		let _obj_label_custom_contain = document.createElement('label');
		_obj_label_custom_contain.className = 'mrg-rt-base dpy-inblock';
		_obj_label_custom_contain.appendChild(_obj_size_custom_contain);
		_obj_label_custom_contain.insertAdjacentHTML('beforeend','CONTAIN');
		// 圖片尺寸 - 自訂尺寸 - fill - radio
		let _obj_size_custom_fill = document.createElement('input');
		_obj_size_custom_fill.className = 'mrg-rt-tiny dpy-inblock';
		_obj_size_custom_fill.type = 'radio';
		_obj_size_custom_fill.name = 'custom_'+this.getModuleId();
		_obj_size_custom_fill.value = 'fill';
		_obj_size_custom_fill.checked = (this.getInitOutputImageCustom().custom === Settings.OUTPUT_CUSTOM_FILL);
		this.addGlobalConst( this, 'OBJ_SIZE_CUSTOM_FILL', _obj_size_custom_fill );
		// 圖片尺寸 - 自訂尺寸 - fill - label
		let _obj_label_custom_fill = document.createElement('label');
		_obj_label_custom_fill.className = 'mrg-rt-base dpy-inblock';
		_obj_label_custom_fill.appendChild(_obj_size_custom_fill);
		_obj_label_custom_fill.insertAdjacentHTML('beforeend','FILL');
		// 圖片尺寸 - 自訂尺寸 - clip - radio
		let _obj_size_custom_clip = document.createElement('input');
		_obj_size_custom_clip.className = 'mrg-rt-tiny dpy-inblock';
		_obj_size_custom_clip.type = 'radio';
		_obj_size_custom_clip.name = 'custom_'+this.getModuleId();
		_obj_size_custom_clip.value = 'clip';
		_obj_size_custom_clip.checked = (this.getInitOutputImageCustom().custom === Settings.OUTPUT_CUSTOM_CLIP);
		this.addGlobalConst( this, 'OBJ_SIZE_CUSTOM_CLIP', _obj_size_custom_clip );
		// 圖片尺寸 - 自訂尺寸 - clip - label
		let _obj_label_custom_clip = document.createElement('label');
		_obj_label_custom_clip.className = 'dpy-inblock';
		_obj_label_custom_clip.appendChild(_obj_size_custom_clip);
		_obj_label_custom_clip.insertAdjacentHTML('beforeend','CLIP');

		let _obj_size_custom_setting = document.createElement('div');
		_obj_size_custom_setting.appendChild( _obj_label_custom );
		_obj_size_custom_setting.insertAdjacentHTML('beforeend','寬');
		_obj_size_custom_setting.appendChild( _obj_custom_width );
		_obj_size_custom_setting.insertAdjacentHTML('beforeend','高');
		_obj_size_custom_setting.appendChild( _obj_custom_height );
		_obj_custom_section.appendChild( _obj_size_custom_setting );

		let _obj_size_custom_setting2 = document.createElement('div');
		_obj_size_custom_setting2.className = 'pkg-size-item-indent';
		_obj_size_custom_setting2.appendChild( _obj_label_custom_cover );
		_obj_size_custom_setting2.appendChild( _obj_label_custom_contain );
		_obj_size_custom_setting2.appendChild( _obj_label_custom_fill );
		_obj_size_custom_setting2.appendChild( _obj_label_custom_clip );
		_obj_custom_section.appendChild( _obj_size_custom_setting2 );

		// 圖片尺寸 - 自訂尺寸 - button
		let _obj_size_submit = document.createElement('button');
		_obj_size_submit.className = 'pkg-size-confirm ui-toolsbtn';
		// _obj_size_submit.innerText = '確定';
		this.addGlobalConst( this, 'OBJ_SIZE_SUBMIT', _obj_size_submit );

		_obj_size_section.appendChild( _obj_size_title );
		_obj_size_section.appendChild( _obj_scale_section );
		_obj_size_section.appendChild( _obj_custom_section );
		_obj_size_section.appendChild( _obj_size_submit );
		return _obj_size_section;

	}

	// 工具 - 返回輸出圖片尺寸
	returnBackSection(){
		let _obj_back_section = document.createElement('div');
		_obj_back_section.className = 'pkg-back';

		// 圖片尺寸 - 返回自訂尺寸 - button
		let _obj_back_submit = document.createElement('button');
		_obj_back_submit.className = 'pkg-back-confirm ui-toolsbtn';
		// _obj_back_submit.innerText = '返回尺寸設定';
		this.addGlobalConst( this, 'OBJ_BACK_SUBMIT', _obj_back_submit );
		_obj_back_section.appendChild( _obj_back_submit );

		return _obj_back_section;
	}

	// 用dom去產生頁面上的排版
	makeTempate(){

		let _scope = this;

		let _obj_main = _scope.getMainSection();

		if( _obj_main!==undefined ){

			Utils.addClassName(_obj_main, 'pkg-workspace');

			// ** ** ** ** ** ** ** ** **

			// 工具
			let _obj_tools_section = document.createElement('div');
			_scope.addGlobalConst( _scope, 'OBJ_TOOLS_SECTION', _obj_tools_section );
			_obj_tools_section.className = _scope.getGlobalConst(_scope).CLASSNAME_WORKSPACE_TOOLS ;
			_scope.setToolsSectionClassName( _scope.getGlobalConst(_scope).WORKSPACE_TOOLS_ON_SIZE );

			// 工具 - 輸出圖片尺寸
			let _obj_size_section = _scope.returnSizeSection();
			Utils.addClassName(_obj_size_section, 'pkg-workspace-tools-item pkg-workspace-tools-item_size');
			_obj_tools_section.appendChild(_obj_size_section);

			// 工具 - 返回輸出圖片尺寸
			let _obj_back_section = _scope.returnBackSection();
			Utils.addClassName(_obj_back_section, 'pkg-workspace-tools-item pkg-workspace-tools-item_back');
			_obj_tools_section.appendChild(_obj_back_section);

			// 工具 - 上傳檔案
			let _obj_upload_section = _scope.returnUploadSection();
			Utils.addClassName(_obj_upload_section, 'pkg-workspace-tools-item pkg-workspace-tools-item_upload');
			_obj_tools_section.appendChild(_obj_upload_section);

			// 工具 - 新增效果 、 下載圖片
			let _obj_action_section = _scope.returnActionSection();
			Utils.addClassName(_obj_action_section, 'pkg-workspace-tools-item pkg-workspace-tools-item_action');
			_obj_tools_section.appendChild(_obj_action_section);

			_obj_main.appendChild(_obj_tools_section);

			// ** ** ** ** ** ** ** ** **

			// 預覽圖片
			let _obj_preview_section = _scope.returnPreviewSection();
			Utils.addClassName(_obj_preview_section, 'pkg-workspace-preview');
			_obj_main.appendChild(_obj_preview_section);

			// ** ** ** ** ** ** ** ** **

			_scope.judgeOutputImageSetting.call( _scope.getObjsSizeSubmit(), _scope );
			_scope.backSizeShow.call( _scope.getObjBackSubmit(), _scope );
			_scope.listenRangeChange.call( _scope.getObjsSizeRange(), _scope );
			_scope.getRangeShowText();

		}

	}

	backSizeShow( scope_calss ){
		let _obj_self = this;
		_obj_self.onclick = function( e ){
			scope_calss.setToolsSectionClassName( scope_calss.getGlobalConst(scope_calss).WORKSPACE_TOOLS_ON_SIZE );
		};
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
				_json_setting.range = parseInt( scope_calss.getObjsSizeRange().value, 10);
			}else if( _str_size === Settings.OUTPUT_SIZE_CUSTOM ){
				_json_setting.width = parseInt( scope_calss.getObjsSizeCustomWidth().value, 10);
				_json_setting.height = parseInt( scope_calss.getObjsSizeCustomHeight().value, 10);
				_json_setting.custom = document.querySelectorAll('[name="custom_'+scope_calss.getModuleId()+'"]:checked')[0].value || '' ;
			}

			let _json_setting_old = scope_calss.getOutputImageSetting();

			if( JSON.stringify(_json_setting_old)!==JSON.stringify(_json_setting) ){
				scope_calss.setOutputImageSetting( _json_setting, function(){
					scope_calss.getEmitter().emit('output.size.resetting');
				} );
			}

			scope_calss.getEmitter().emit('output.size.submiting');
			
		};
	}

	uploadAction( scope_calss ){
		let _obj_self = this;
		_obj_self.onchange = function( e ){ // 從頭更換圖片
			let windowURL = window.URL || window.webkitURL;
			let _str_image_data = windowURL.createObjectURL(this.files[0]);

			scope_calss.setSourceImage({
				files: this.files,
				base64: _str_image_data
			});

			scope_calss.getEmitter().emit('origin.data.changed', {
				origin_data: _str_image_data,
				// setting: scope_calss.getOutputImageSetting() // 發現on('origin.data.changed')時用不到
			});

			scope_calss.getEmitter().emit('origin.image.showing', {
				origin_data: _str_image_data
			});

			scope_calss.setToolsSectionClassName( scope_calss.getGlobalConst(scope_calss).WORKSPACE_TOOLS_ON_ACTION );

		}
	}

	// 新增效果的按鈕 - 新方法
	methodAddBtnActive( scope_calss ){
		let _obj_self = this;
		_obj_self.onclick = function( e ){
			scope_calss.getEmitter().emit('method.setting.open.asking',Settings.IMAGE_DATA_FROM_LAST);
		}
	}

	// 下載圖片的按鈕
	downloadBtnActive( scope_calss ){
		let _obj_self = this;
		_obj_self.onclick = function( e ){
			scope_calss.getEmitter().emit('images.downloading');
		}
	}

	// 刪除效果的按鈕
	methodDeleteBtnAction( scope_calss, obj_item ){
		let _obj_self = this;
		_obj_self.onclick = function( e ){
			// 先直接發出刪除methodid的事件，之後再來擴充
			scope_calss.getEmitter().emit('step.method.splicing',{
				method: obj_item.data.method,
				method_id: obj_item.data.method_id,
				method_btn: obj_item
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