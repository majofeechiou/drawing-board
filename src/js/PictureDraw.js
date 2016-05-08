'use strict';

import Settings from './Settings';
import Utils from './Utils';
import MainImageFilter from './MainImageFilter';
import ImageDataComputeMethod from './ImageDataComputeMethod';
import ImageDataComputeProcess from './ImageDataComputeProcess';
import ImageDataOriginal from './ImageDataOriginal';
import StepMethod from './StepMethod';
import GlobalConst from './GlobalConst';
import Emitter from 'ComponentEmitter';
import GloablTools from './GloablTools';
import GloablData from './GloablData';
import Extend from 'Extend';

export default class PictureDraw extends GlobalConst {
	constructor( obj_main, str_id ){
		super();
		
		let _scope = this;

		_scope.addGlobalConst( _scope, 'ComponentId', str_id );

		let emitter = new Emitter();
		_scope.addGlobalConst( _scope, 'emitter', emitter );

		_scope.mainImageFilter = new MainImageFilter( obj_main, {emitter:emitter} );
		_scope.stepMethod = new StepMethod({emitter:emitter});
		_scope.imageDataComputeProcess = new ImageDataComputeProcess({emitter:emitter});
		_scope.imageDataComputeMethod = new ImageDataComputeMethod(Settings.COMPUTE_TIMING_RESULT, {emitter:emitter});
		_scope.imageDataOriginal = new ImageDataOriginal({emitter:emitter});

		if( obj_main!==undefined ){

			// 用完運算結束後，我們要用出預覽圖
			_scope.getGlobalConst(_scope).emitter.on('step.image.final.step.computed', function(e){
				let _json_data = arguments[0];
				_scope.mainImageFilter.getObjImagePreview().src = _json_data.data ;
			});

			// 新增效果
			_scope.getGlobalConst(_scope).emitter.on('step.method.show.adding', function(e){
				// 新增顯示method的文字
				let _json_data = arguments[0];
				let _obj_result = document.createElement('li');
				_obj_result.data = _obj_result.data || {} ;
				_obj_result.data.method_id = _json_data.method_id ;
				_obj_result.data.method = _json_data.method ;
				_obj_result.setAttribute('data-method-id',_json_data.method_id);
				_obj_result.insertAdjacentHTML('beforeend', Settings.getConstNameByEn(_json_data.method) );
				let _obj_delete = document.createElement('span');
				_obj_delete.className = 'pkg-action-method-delete';
				_obj_delete.innerText = 'X';
				_obj_result.appendChild(_obj_delete);
				_scope.mainImageFilter.getObjMethodResult().appendChild(_obj_result);

				// _scope.mainImageFilter.methodDeleteBtnAction.call( _obj_result, _scope.mainImageFilter );
				_scope.mainImageFilter.methodDeleteBtnAction.call( _obj_delete, _scope.mainImageFilter, _obj_result );

				// 以下是實際執行新的圖片運算工作

				let _sary_step_data = _scope.imageDataComputeProcess.getStepImage();

				if( (_sary_step_data instanceof Array === true) && _sary_step_data.length>0 ){

					// let _num_width = _scope.imageDataComputeMethod.getComputeWidth();
					// let _num_height = _scope.imageDataComputeMethod.getComputeHeight();

					_json_data.origin_data = _sary_step_data[(_sary_step_data.length-1)].data; // 目前得到的最後一次運算結果

					_scope.getGlobalConst(_scope).emitter.emit('step.image.success.loaded', _json_data, true);

				}

			});

			_scope.getGlobalConst(_scope).emitter.on('step.method.show.deleting', function(e){
				let _json_data = arguments[0];
				let _sary_step_data = _scope.imageDataComputeProcess.getStepImage();

				if( (_sary_step_data instanceof Array === true) && _sary_step_data.length>0 ){

					let _num_step_data = _sary_step_data.length;

					let _sary_new_step_data = [];

					for( let i=0; i<_num_step_data; i++ ){
						if( _sary_step_data[i].method_id===_json_data.method_id ){
							break;
						}else{
							_sary_new_step_data.push( _sary_step_data[i] );
						}
					}

					let _num_new_step_data_length = _sary_new_step_data.length;

					if( _num_new_step_data_length<_sary_step_data.length ){
						if( _sary_new_step_data.length===1 ){
							_scope.imageDataComputeMethod.changeData( '', _sary_new_step_data[0].origin_data, _sary_new_step_data[0], function(){
								_scope.imageDataComputeProcess.setStepImage( _sary_new_step_data );
							} );
						}else{
							_scope.imageDataComputeProcess.setStepImage( _sary_new_step_data );
						}
					}
			
				}

				_scope.mainImageFilter.getObjMethodResult().removeChild(_json_data.method_btn);

			});

			// ** ** ** ** ** ** ** ** ** ** ** ** ** ** ** ** ** ** ** ** ** ** 
			GloablTools.Emitter().on( 'method.cotroller.control.operating', function(){  // 新的設定的做法
				let _json = arguments[0];
				// // // // // let _json_size_setting = arguments[1];
				if( _json.from===_scope.getGlobalConst(_scope).ComponentId ){
					_json.from =null;
					delete _json.from;

					// _json.setting = _scope.getEmitSetting(); // 別加了 ?!
					_scope.stepMethod.pushStepMethod( _json );
				}
			});
			_scope.getGlobalConst(_scope).emitter.on('step.method.pushing',function(){  // 舊的下直式選單的做法
				_scope.stepMethod.pushStepMethod(...arguments);
			});
			// ** ** ** ** ** ** ** ** ** ** ** ** ** ** ** ** ** ** ** ** ** ** 

			_scope.getGlobalConst(_scope).emitter.on('step.method.splicing',function(){
				_scope.stepMethod.spliceStepMethod(...arguments);
			});

			_scope.getGlobalConst(_scope).emitter.on('step.method.option.added', function(e){
				let _json_data = arguments[0];
				_scope.getGlobalConst(_scope).emitter.emit('step.method.show.adding', _json_data); // 要改了，先不傳這事件?!
			});

			_scope.getGlobalConst(_scope).emitter.on('step.method.option.deleted', function(e){
				let _json_data = arguments[0];
				_scope.getGlobalConst(_scope).emitter.emit('step.method.show.deleting', _json_data); // 要改了，先不傳這事件?!
			});

			_scope.getGlobalConst(_scope).emitter.on('init.data.changed', function(e){
				console.log( '----- init.data.changed -----' );
				let _json_data = arguments[0];
				_scope.imageDataComputeProcess.setStepImage( [], ImageDataComputeProcess.TIMMING_RESET, _json_data );
			});

			_scope.getGlobalConst(_scope).emitter.on('init.data.size.asking', function(e){
				console.log( '----- init.data.size.asking -----' );
				let _json_data = arguments[0];
				// _json_data.setting = _scope.getEmitSetting();
				_scope.imageDataOriginal.operateImageSize( _json_data, _scope.getEmitSetting() );
			});

			_scope.getGlobalConst(_scope).emitter.on('origin.data.changed', function(e){
				console.log( '----- origin.data.changed -----' );
				let _json_data = arguments[0];
				_scope.imageDataOriginal.getObjImage().src = _json_data.origin_data;
			});

			_scope.getGlobalConst(_scope).emitter.on('origin.image.showing', function(e){
				console.log( '----- origin.image.showing -----' );
				let _json_data = arguments[0];
				_scope.mainImageFilter.getObjOriginImage().src = _json_data.origin_data;
			});

			_scope.getGlobalConst(_scope).emitter.on('output.size.submiting', function(){
				let _sary_step_image = _scope.imageDataComputeProcess.getStepImage();

				if( _sary_step_image.length>0 ){
					_scope.mainImageFilter.setToolsSectionClassName( _scope.mainImageFilter.getGlobalConst(_scope.mainImageFilter).WORKSPACE_TOOLS_ON_ACTION );
				}else{
					_scope.mainImageFilter.setToolsSectionClassName( _scope.mainImageFilter.getGlobalConst(_scope.mainImageFilter).WORKSPACE_TOOLS_ON_UPLOAD );
				}
			});

			_scope.getGlobalConst(_scope).emitter.on('output.size.resetting', function(){
				console.log( '----- output.size.resetting -----' );
				let _str_image_data = _scope.mainImageFilter.getSourceImage().base64;

				if( typeof _str_image_data === 'string' && _str_image_data.length>0 ){
					let _json_emit = {
						origin_data: _str_image_data,
						// setting: _scope.mainImageFilter.getOutputImageSetting() // 發現on('origin.data.changed')時用不到
					};
					_scope.getGlobalConst(_scope).emitter.emit('origin.data.changed', _json_emit); // 導至圖片重讀

				}

			});

			_scope.getGlobalConst(_scope).emitter.on('step.image.success.loaded', function(e){
				console.log( '----- step.image.success.loaded -----' );

				let _json = arguments[0],
					_bln_delete_created = arguments[1],
					_str_method = _json.method;

				if( _bln_delete_created === true ){
					_json.created = _json.created || {} ;
				}

				if( _str_method===Settings.METHOD_DOT ){
					_scope.imageDataComputeMethod.methodDot( _json, _scope.getEmitSetting() );

				}else if( _str_method===Settings.METHOD_ALPHA ){
					_scope.imageDataComputeMethod.methodAlpha( _json, _scope.getEmitSetting() );

				}else if( _str_method===Settings.METHOD_SATURATE ){
					_scope.imageDataComputeMethod.methodSaturate( _json, _scope.getEmitSetting() );

				}else if( _str_method===Settings.METHOD_CONTRAST ){
					_scope.imageDataComputeMethod.methodContrast( _json, _scope.getEmitSetting() );

				}else if( _str_method===Settings.METHOD_INVERT ){
					_scope.imageDataComputeMethod.methodInvert( _json, _scope.getEmitSetting() );

				}else if( _str_method===Settings.METHOD_BLUR ){
					_scope.imageDataComputeMethod.methodBlur( _json, _scope.getEmitSetting() );

				}else if( _str_method===Settings.METHOD_TEXT ){
					_scope.imageDataComputeMethod.methodText( _json, _scope.getEmitSetting() );

				}else{
					_scope.imageDataComputeMethod.methodOrigin( _json, _scope.getEmitSetting() );
				}

			});

			_scope.getGlobalConst(_scope).emitter.on('step.image.error.loaded', function(e){
				( '錯誤!!' );
			});

			_scope.getGlobalConst(_scope).emitter.on('step.image.success.computed', function(e){
				let _json_data = arguments[0];
				if( _json_data && (typeof _json_data.origin_data === 'string') && (_json_data.origin_data!=='') ){
					_scope.imageDataComputeProcess.pushStepData( _json_data, _scope.stepMethod.getStepMethod() );
				}
			});

			_scope.getGlobalConst(_scope).emitter.on('step.image.seted', function(e){
				let _str_timming = arguments[0],
					_json_other = arguments[1] || {};

				if( _str_timming===ImageDataComputeProcess.TIMMING_RESET ){
					_scope.imageDataComputeMethod.changeData( '', _json_other.origin_data, _json_other );
				}else{
					_scope.getGlobalConst(_scope).emitter.emit('step.image.pushed');
				}
			});

			_scope.getGlobalConst(_scope).emitter.on('step.image.pushed', function(e){
				let _str_timming = arguments[0],
					_json_other = arguments[1] || {};

				let _num_step_length = _scope.imageDataComputeProcess.getStepImage().length,
					_sary_step_method = _scope.stepMethod.getStepMethod();
				let _sary_step_image = _scope.imageDataComputeProcess.getStepImage(),
					_json_data = _sary_step_image[_sary_step_image.length-1];

				// +* +* +* +* +* +* +* +* +* +* +* +* +* +* +* +*

				if( _num_step_length<_sary_step_method.length ){ 
					// 先處理圖片
					_scope.imageDataComputeMethod.changeData( _sary_step_method[_num_step_length].method, _json_data.data, _sary_step_method[_num_step_length] );
				}else{
					// 圖片處理好了，我們現在要準備預覽
					_scope.getGlobalConst(_scope).emitter.emit('step.image.final.step.computed', _json_data);
					console.log('******************* 預覽圖片!! *******************');
				}

			});

			_scope.getGlobalConst(_scope).emitter.on('method.setting.open.asking', function(e){
				let _str_from_data = arguments[0];
				let _json_emit = {};
				let _str_from = _scope.getGlobalConst(_scope).ComponentId ;
				GloablData.setFrom( _str_from );

				if( _str_from_data===Settings.IMAGE_DATA_FROM_LAST ){
					let _sary_step_image = _scope.imageDataComputeProcess.getStepImage();
					if( _sary_step_image.length>0 ){
						_json_emit.data = _sary_step_image[(_sary_step_image.length-1)];
					}else{
						_json_emit.data = {}
					}
				}
				GloablTools.Emitter().emit('method.setting.open.asked',_json_emit, _scope.getEmitSetting());
			});

		}

	}

	// ** ** ** ** ** ** ** ** ** ** ** ** ** ** ** ** ** ** ** ** ** ** **

	getEmitSetting(){
		let _scope = this ;

		let _num_compute_width = _scope.imageDataComputeMethod.getComputeWidth(); // 這裡用的是用canvas運算時的大小
		let _num_compute_height = _scope.imageDataComputeMethod.getComputeHeight(); // 這裡用的是用canvas運算時的大小

		// console.log( '- .. - .. - .. - .. - .. - .. - .. - .. - .. - .. - .. - .. - .. - .. -' );
		// console.log( '_num_compute_width :: ', _num_compute_width );
		// console.log( '_num_compute_height :: ', _num_compute_height );
		// console.log( '_scope.imageDataOriginal.getOriginImageSize() :: ', _scope.imageDataOriginal.getOriginImageSize() );
		// console.log( '- .. - .. - .. - .. - .. - .. - .. - .. - .. - .. - .. - .. - .. - .. -' );

		return Extend.deep(
			_scope.mainImageFilter.getOutputImageSetting(),
			_scope.imageDataOriginal.getOriginImageSize(), // 這裡抓到的，是外部原圖的大小 
			{
				compute_width: _num_compute_width,
				compute_height: _num_compute_height
			}
		);
	}

};
