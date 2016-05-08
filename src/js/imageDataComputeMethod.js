'use strict';
import Tools from './Tools';
import HexRgb from 'hex-rgb';
import Settings from './Settings';
import Extend from 'Extend';
import StackBlur from 'stackblur-canvas'; // https://github.com/flozz/StackBlur

// 運算的方式
// 寬高也是最後輸出的圖片的寬高
export default class ImageDataComputeMethod extends Tools {
	constructor( str_compute_timing, json_tools ){
		super();

		let _scope = this;

		_scope.setComputeTiming( str_compute_timing );
		_scope.setEmitter( json_tools.emitter );

		_scope.obj_canvas = document.createElement('canvas');
		_scope.obj_canvas_2d = _scope.obj_canvas.getContext('2d');

		_scope.obj_image = new Image();

		_scope.obj_image.onload = function(){
			console.log('** ** ** onload ** ** **');

			if( (typeof this.src === 'string') && this.src!=='' ){

				let _num_width = this.width;
				let _num_height = this.height;
				_scope.obj_canvas.width = _num_width ;
				_scope.obj_canvas.height = _num_height ;
				_scope.obj_canvas_2d.clearRect( 0, 0, _num_width, _num_height );
				_scope.obj_canvas_2d.drawImage(this, 0, 0, _num_width, _num_height);

				_scope.setComputeWidth( _num_width ); // 在此先用圖片本身的長寬去做的
				_scope.setComputeHeight( _num_height ); // 在此先用圖片本身的長寬去做的

				let _json_emit = _scope.getOtherData();
				_json_emit.origin_data = this.src ;
				_json_emit.method = _scope.getPainterMethod() ;

				_scope.getEmitter().emit('step.image.success.loaded', _json_emit);

			}else{
				console.log( '***' );
			}

		}

		_scope.obj_image.error = function(){
			_scope.getEmitter().emit('step.image.error.loaded', {
				origin_data: this.src
			});
		}

	}

	getComputeTiming(){
		return this.compute_timing;
	}
	getOtherData(){
		let _scope = this;
		return _scope.other_data;
	}
	getPainterMethod(){
		let _scope = this;
		return _scope.painter_method;
	}
	// 圖片運算是用多大寬度運算出來的
	getComputeWidth(){
		return this.compute_width;
	}
	// 圖片運算是用多大高度運算出來的
	getComputeHeight(){
		return this.compute_height;
	}

	setComputeTiming( str_compute_timing ){
		this.compute_timing = str_compute_timing || '' ;
	}
	// 圖片運算是用多大寬度運算出來的
	setComputeWidth( num ){
		this.compute_width = num || 0 ;
	}
	// 圖片運算是用多大高度運算出來的
	setComputeHeight( num ){
		this.compute_height = num || 0 ;
	}

	// ** ** ** ** ** ** ** ** ** ** ** ** ** ** ** ** ** ** ** ** ** ** ** ** ** ** ** **
	// ** ** ** ** ** ** ** ** ** ** ** ** ** ** ** ** ** ** ** ** ** ** ** ** ** ** ** **

	// 文字
	methodText( json, json_setting ){
		let _scope = this;

		console.log('json :: ', json);

		json = _scope.methodVars( json );
		json_setting = json_setting || {} ;

		let _num_compute_width = _scope.getComputeWidth(),
			_num_compute_height = _scope.getComputeHeight();

		let _str_pos = json.control.pos,
			_ary_pos = _str_pos.split(' '),
			_str_pos_x = _ary_pos[0],
			_str_pos_y = _ary_pos[1];

		let _num_size = json.control.size ;

		let _num_wrap = 10;

		_scope.obj_canvas_2d.textAlign = _str_pos_x;
		_scope.obj_canvas_2d.textBaseline = "middle";

		let _num_x,
			_num_y;

		if( _str_pos_x==='left' ){
			_num_x = _num_wrap ;
		}else if( _str_pos_x==='center' ){
			_num_x = _num_compute_width/2 ;
		}else{
			_num_x = _num_compute_width-_num_wrap ;
		}
		if( _str_pos_y==='top' ){
			_num_y = _num_wrap+_num_size/2 ;
		}else if( _str_pos_y==='center' ){
			_num_y = _num_compute_height/2 ;
		}else{
			_num_y = _num_compute_height-_num_size/2-_num_wrap ;
		}

		_scope.obj_canvas_2d.font = json.control.size+'px Georgia';
		_scope.obj_canvas_2d.fillText(json.control.text, _num_x, _num_y);
		_scope.obj_canvas_2d.fillStyle = 'red';

		_scope.emitAfterMethod( json );

	}

	// 模糊效果
	// https://msdn.microsoft.com/zh-cn/library/gg589486(v=vs.85).aspx
	methodBlur( json, json_setting ){
		let _scope = this;

		json = _scope.methodVars( json );
		json_setting = json_setting || {} ;

		let _num_compute_width = _scope.getComputeWidth(),
			_num_compute_height = _scope.getComputeHeight(),
			_num_range = json.control.range;

        let _json_image_data = _scope.obj_canvas_2d.getImageData(0, 0, _num_compute_width, _num_compute_height);

        let _json_image_data_new = StackBlur.imageDataRGBA(_json_image_data, 0, 0, _num_compute_width, _num_compute_height, _num_range);

        _scope.obj_canvas_2d.putImageData(_json_image_data_new, 0, 0);

        _scope.emitAfterMethod( json );

	}

	// 在照片中添加纹理
	// https://msdn.microsoft.com/zh-cn/library/gg589486(v=vs.85).aspx
	methodDot( json, json_setting ){
		let _scope = this;

		json = _scope.methodVars( json );
		json_setting = json_setting || {} ;

		let _num_compute_width = _scope.getComputeWidth(),
			_num_compute_height = _scope.getComputeHeight();

		// console.log( '. . * . . * . . * . . * . . * . . * . . * . . * . . * . . * . . * . . * . . * . . * . .' );
		// console.log( '_num_compute_width :: ', _num_compute_width );
		// console.log( '_num_compute_height :: ', _num_compute_height );
		// console.log( 'json.created :: ', {...json.created} );
		// console.log( 'json_setting :: ', {...json_setting} );
		// console.log( '. . * . . * . . * . . * . . * . . * . . * . . * . . * . . * . . * . . * . . * . . * . .' );

		let _bln_old = false ;
		if( json.created && json.created.dot && json.created.dot.length>0 ){
			if( json.created && json.created.setting ){

				if(
					json.created.setting.compute_width===_num_compute_width &&
					json.created.setting.compute_height===_num_compute_height
				){
					_bln_old = true ;
				}else{
					if( 
						json_setting.size===Settings.OUTPUT_SIZE_SCALE && 
						json.created.setting.size===Settings.OUTPUT_SIZE_SCALE
					){
						if(
							json.created.setting.origin_width===json_setting.origin_width &&
							json.created.setting.origin_height===json_setting.origin_height &&
							json.created.setting.range===json_setting.range
						){
							_bln_old = true ;
						}

					}else if( 
						json_setting.size===Settings.OUTPUT_SIZE_CUSTOM &&
						json.created.setting.size===Settings.OUTPUT_SIZE_CUSTOM 
					){
						if(
							json.created.setting.width===json_setting.width &&
							json.created.setting.height===json_setting.height
						){
							_bln_old = true ;
						}

					}

				}

			}
		}

		/*
			origin_height: 818
			origin_width: 1279
			range: 100
			size: "scale"
		*/
		/*
			custom: "cover"
			height: 300
			origin_height: 333
			origin_width: 500
			size: "custom"
			width: 500
		*/

		json.created.dot = ( _bln_old===true )? json.created.dot : [] ;

		let _json_control = json.control,
			_num_size_min = _json_control.minSize,
			_num_size_max = _json_control.maxSize,
			_num_size,
			_num_size_helf,
			_num_alpha_min = _json_control.minAlpha,
			_num_alpha_max = _json_control.maxAlpha,
			_num_alpha,
			_num_total,
			_str_color,
			_str_shape = _json_control.shape.shape;

		let _num_x,
			_num_y;

		let _ary_dot_origin = JSON.parse(JSON.stringify(json.created.dot));

		if( _bln_old===true ){
			_num_total = _ary_dot_origin.length;
		}else{
			let _num_size_avg = Math.round(( parseInt(_num_size_min,10)+parseInt(_num_size_max,10) )/2) ;
			// _num_total = Math.floor( _num_compute_width*_num_compute_height/(_num_size_avg*2)/100 * _json_control.frequency * (Math.pow((_num_size_max+_num_size_avg)/2,2)/Math.pow((_num_size_min+_num_size_avg)/2,2)) / Math.floor((_num_size_avg+_num_size_max)/2) );
			_num_total = Math.ceil( _num_compute_width*_num_compute_height/(_num_size_avg*2+Math.round(Math.sqrt(_num_size_max))+Math.round(Math.sqrt(_num_size_min)))/400 * _json_control.frequency );
			json.created.setting = { ...json_setting };
		}

		let _ary_rgb = (HexRgb(_json_control.color));

		_scope.obj_canvas_2d.beginPath();

		for (let i = 0; i<_num_total; i++) {
			if( _bln_old===true ){
				_scope.obj_canvas_2d.fillStyle = _ary_dot_origin[i].color;

				_num_x = _ary_dot_origin[i].xPos ;
				_num_y = _ary_dot_origin[i].yPos ;
				_num_size = _ary_dot_origin[i].size ;

			}else{
				_num_alpha = ( parseInt(_num_alpha_min, 10) + Math.floor( ( _num_alpha_max-_num_alpha_min )*Math.random() ) )/100 ;
				_str_color = 'rgba('+_ary_rgb.join(', ')+', '+_num_alpha+')';
				_scope.obj_canvas_2d.fillStyle = _str_color;

				_num_x = Math.floor(Math.random() * _num_compute_width) ;
				_num_y = Math.floor(Math.random() * _num_compute_height) ;
				_num_size = ( parseInt(_num_size_min, 10) + Math.floor( ( _num_size_max-_num_size_min )*Math.random() ) )/2 ;
				
				(json.created.dot).push({
					xPos: _num_x,
					yPos: _num_y,
					size: _num_size,
					color: _str_color
				});

			}

			_num_size_helf = ( _num_size / 2 );

			_scope.obj_canvas_2d.beginPath();
			if( _str_shape===Settings.SHAPE_CIRCLE ){
				_scope.obj_canvas_2d.arc( _num_x, _num_y, _num_size_helf, 0, Math.PI * 2, true );
			}else if( _str_shape===Settings.SHAPE_RECT ){
				_scope.obj_canvas_2d.rect( _num_x-_num_size_helf, _num_y-_num_size_helf, _num_size, _num_size );
			}else if( _str_shape===Settings.SHAPE_RECT2 ){
		        _scope.obj_canvas_2d.moveTo(_num_x-Math.floor(_num_size_helf*1.4), _num_y);
		        _scope.obj_canvas_2d.lineTo(_num_x, _num_y-Math.floor(_num_size_helf*1.4));
		        _scope.obj_canvas_2d.lineTo(_num_x+Math.floor(_num_size_helf*1.4), _num_y);
		        _scope.obj_canvas_2d.lineTo(_num_x, _num_y+Math.floor(_num_size_helf*1.4));
		        _scope.obj_canvas_2d.lineTo(_num_x-Math.floor(_num_size_helf*1.4), _num_y);
			}else if( _str_shape===Settings.SHAPE_RHOMBUS ){
		        _scope.obj_canvas_2d.moveTo(_num_x-Math.floor(_num_size_helf*1.4*0.6), _num_y);
		        _scope.obj_canvas_2d.lineTo(_num_x, _num_y-Math.floor(_num_size_helf*1.4));
		        _scope.obj_canvas_2d.lineTo(_num_x+Math.floor(_num_size_helf*1.4*0.6), _num_y);
		        _scope.obj_canvas_2d.lineTo(_num_x, _num_y+Math.floor(_num_size_helf*1.4));
		        _scope.obj_canvas_2d.lineTo(_num_x-Math.floor(_num_size_helf*1.4*0.6), _num_y);
			}else if( _str_shape===Settings.SHAPE_STAR ){
				_scope.drawStar( _scope.obj_canvas_2d, _num_size_helf, _num_x, _num_y );
			}else if( _str_shape===Settings.SHAPE_HEART ){
				_scope.drawHeart( _scope.obj_canvas_2d );
			}
			
			_scope.obj_canvas_2d.closePath();
			_scope.obj_canvas_2d.fill();
			
		}

		_scope.emitAfterMethod( json );
		
	}

	// 透明
	// https://msdn.microsoft.com/zh-cn/library/gg589493(v=vs.85).aspx
	methodAlpha( json, json_setting ){
		let _scope = this;

		json = _scope.methodVars( json );
		json_setting = json_setting || {} ;

		let _num_compute_width = _scope.getComputeWidth(),
			_num_compute_height = _scope.getComputeHeight(),
			_num_range = json.control.range;

        let _json_image_data = _scope.obj_canvas_2d.getImageData(0, 0, _num_compute_width, _num_compute_height);

        // Loop through data.
        for (let i = 0; i < (_num_compute_width*_num_compute_height*4); i += 4) {

          // First bytes are red bytes.        
          // Second bytes are green bytes.
          // Third bytes are blue bytes.
          // Fourth bytes are alpha bytes
          // Test of alpha channel at 50%.
          // _json_image_data.data[i + 3] = 128;
          _json_image_data.data[i + 3] = _json_image_data.data[i + 3]*(_num_range/100);
        }
		_scope.obj_canvas_2d.putImageData(_json_image_data, 0, 0);

		_scope.emitAfterMethod( json );

	}

	// 負片效果
	methodInvert( json, json_setting ){
		let _scope = this;

		json = _scope.methodVars( json );
		json_setting = json_setting || {} ;

		let _num_compute_width = _scope.getComputeWidth(),
			_num_compute_height = _scope.getComputeHeight();

        let _json_image_data = _scope.obj_canvas_2d.getImageData(0, 0, _num_compute_width, _num_compute_height);

        // Loop through data.
        for (let i = 0; i < (_num_compute_width*_num_compute_height*4); i += 4) {
          _json_image_data.data[i] = 255-_json_image_data.data[i];
          _json_image_data.data[(i+1)] = 255-_json_image_data.data[(i+1)];
          _json_image_data.data[(i+2)] = 255-_json_image_data.data[(i+2)];
        }
		_scope.obj_canvas_2d.putImageData(_json_image_data, 0, 0);

		_scope.emitAfterMethod( json );

	}

	// 灰階
	// https://msdn.microsoft.com/zh-cn/library/gg589527(v=vs.85).aspx
	methodGray( json, json_setting ){
		let _scope = this;
		
		json = _scope.methodVars( json );
		json_setting = json_setting || {} ;

		let _num_compute_width = _scope.getComputeWidth(),
			_num_compute_height = _scope.getComputeHeight();

        let _json_image_data = _scope.obj_canvas_2d.getImageData(0, 0, _num_compute_width, _num_compute_height);

		let _num_red,
			_num_green,
			_num_blue,
			_num_gray;

        // Loop through data.
        for (let i = 0; i < (_num_compute_width*_num_compute_height*4); i += 4) {

			// First bytes are red bytes.        
			// Get red value.
			_num_red = _json_image_data.data[i];

			// Second bytes are green bytes.
			// Get green value.
			_num_green = _json_image_data.data[i + 1];

			// Third bytes are blue bytes.
			// Get blue value.
			_num_blue = _json_image_data.data[i + 2];

			// Fourth bytes are alpha bytes
			// We don't care about alpha here.
			// Add the three values and divide by three.
			// Make it an integer.
			_num_gray = parseInt((_num_red + _num_green + _num_blue) / 3);

			// Assign average to red, green, and blue.
			_json_image_data.data[i] = _num_gray;
			_json_image_data.data[i + 1] = _num_gray;
			_json_image_data.data[i + 2] = _num_gray;

        }

		_scope.obj_canvas_2d.putImageData(_json_image_data, 0, 0);

		_scope.emitAfterMethod( json );

	}

	// 彩度（飽和度）
	// 拿這個網址來改的https://msdn.microsoft.com/zh-cn/library/gg589527(v=vs.85).aspx
	methodSaturate( json, json_setting ){
		let _scope = this;
		
		json = _scope.methodVars( json );
		json_setting = json_setting || {} ;

		let _num_compute_width = _scope.getComputeWidth(),
			_num_compute_height = _scope.getComputeHeight(),
			_num_range = json.control.range;

        let _json_image_data = _scope.obj_canvas_2d.getImageData(0, 0, _num_compute_width, _num_compute_height);

		let _num_red,
			_num_green,
			_num_blue,
			_json_rgb = {};

		if( _num_range>0 || _num_range<0 ){
	        // Loop through data.
	        for (let i = 0; i < (_num_compute_width*_num_compute_height*4); i += 4) {

				_num_red = _json_image_data.data[i];
				_num_green = _json_image_data.data[i + 1];
				_num_blue = _json_image_data.data[i + 2];

				_json_rgb = _scope.operateSaturateRGB( _num_range, _num_red, _num_green, _num_blue );

				_json_image_data.data[i] = _json_rgb.red;
				_json_image_data.data[i + 1] = _json_rgb.green;
				_json_image_data.data[i + 2] = _json_rgb.blue;

	        }
		}

		_scope.obj_canvas_2d.putImageData(_json_image_data, 0, 0);

		_scope.emitAfterMethod( json );

	}

	// 對比
	// 其實有另外這兒的可以參考，但我沒用 http://stackoverflow.com/questions/10521978/html5-canvas-image-contrast
	methodContrast( json, json_setting ){
		let _scope = this;
		
		json = _scope.methodVars( json );
		json_setting = json_setting || {} ;

		let _num_compute_width = _scope.getComputeWidth(),
			_num_compute_height = _scope.getComputeHeight(),
			_num_range = json.control.range;

        let _json_image_data = _scope.obj_canvas_2d.getImageData(0, 0, _num_compute_width, _num_compute_height);

        let _num_red,
        	_num_green,
        	_num_blue,
        	_json_rgb = {};

        if( _num_range>0 || _num_range<0 ){
		    for(let i=0;i<_json_image_data.data.length;i+=4){

				_num_red = _json_image_data.data[i];
				_num_green = _json_image_data.data[i + 1];
				_num_blue = _json_image_data.data[i + 2];

		        _json_rgb = _scope.operateContrastRGB( _num_range, _num_red, _num_green, _num_blue );

		        _json_image_data.data[i] = _json_rgb.red;
		        _json_image_data.data[i + 1] = _json_rgb.green;
		        _json_image_data.data[i + 2] = _json_rgb.blue;
		    }
		}
	    
	    _scope.obj_canvas_2d.putImageData(_json_image_data, 0, 0);

	    _scope.emitAfterMethod( json );
	}

	// ** ** ** ** ** ** ** ** ** ** ** ** ** ** ** ** ** ** ** ** ** ** ** ** ** ** ** **
	// ** ** ** ** ** ** ** ** ** ** ** ** ** ** ** ** ** ** ** ** ** ** ** ** ** ** ** **

	clearCanvas( callback ){

		this.obj_canvas_2d.clearRect( 0, 0, this.getComputeWidth(), this.getComputeHeight() ); // ????

		if( callback && callback instanceof Function ){
			setTimeout(function() {
				callback();
			}, 10);
		}

	}

	// json_other : 會有 setting, control
	changeData( str_painter_method, str_base64, json_other, callback ){
		let _scope = this;
		_scope.clearCanvas(function(){
			_scope.painter_method = str_painter_method;
			_scope.obj_image.src = str_base64;
			_scope.other_data = json_other;
			if( callback && callback instanceof Function ){
				setTimeout(function() {
					callback();
				}, 10);
			}
		});
	}

	// 傳來什麼，就如實地回傳
	methodOrigin( json ){
		let _scope = this;
		_scope.emitAfterMethod( json );
	}

	methodVars( json ){
		json = json || {};
		// json.setting = json.setting || {} ;
		json.control = json.control || {} ;
		json.created = json.created || {} ;

		return json;
	}

	emitAfterMethod( json ){
		let _scope = this;
		
		json = _scope.methodVars( json );

		let _data_url = _scope.obj_canvas.toDataURL();

		let _json_emit = {
			origin_data: json.origin_data,
			data: _data_url
		};

		if( json.method_id!==undefined ){
			_json_emit.method_id = json.method_id ;
			// _json_emit.method = json.method ;
		}

		let _str_compute_timing = _scope.getComputeTiming();
		if( _str_compute_timing===Settings.COMPUTE_TIMING_RESULT ){
			_scope.getEmitter().emit('step.image.success.computed', _json_emit);
		}else if( _str_compute_timing===Settings.COMPUTE_TIMING_PREVIEW ){
			let _json_preview = Extend.deep(json,{data:_data_url});
			_scope.getEmitter().emit('preview.image.success.computed', _json_preview);
		}
	}

	// ** ** ** ** ** ** ** ** ** ** ** ** ** ** ** ** ** ** ** ** ** ** ** ** ** ** ** **

	operateSaturateRGB( num_range, num_red, num_green, num_blue ){
		let _num_saturate_min =  Math.floor((num_red + num_green + num_blue) / 3); // 全灰階
		let _json_output = {} ;
		if( num_range<0 ){
			_json_output = {
				red: _num_saturate_min + Math.floor( ( num_red-_num_saturate_min ) * (1-Math.abs(num_range/100) ) ),
				green: _num_saturate_min + Math.floor( ( num_green-_num_saturate_min ) * (1-Math.abs(num_range/100) ) ),
				blue: _num_saturate_min + Math.floor( ( num_blue-_num_saturate_min ) * (1-Math.abs(num_range/100) ) )
			};
		}else{
			_json_output = {
				red: num_red + Math.floor( ( num_red-_num_saturate_min ) * (num_range/100) ),
				green: num_green + Math.floor( ( num_green-_num_saturate_min ) * (num_range/100) ),
				blue: num_blue + Math.floor( ( num_blue-_num_saturate_min ) * (num_range/100) )
			};
		}

		_json_output.red = this.checkColorRange( _json_output.red );
		_json_output.green = this.checkColorRange( _json_output.green );
		_json_output.blue = this.checkColorRange( _json_output.blue );
		return _json_output;
	}

	operateContrastRGB( num_range, num_red, num_green, num_blue ){
		let _num_contrast_base =  128;
		let _json_output = {} ;

		let _bln_red_bigger = (num_red>_num_contrast_base);
		let _bln_green_bigger = (num_green>_num_contrast_base);
		let _bln_blue_bigger = (num_blue>_num_contrast_base);

		let _num_red_end = (num_red>_num_contrast_base)? 255 : 0 ;
		let _num_green_end = (num_green>_num_contrast_base)? 255 : 0 ;
		let _num_blue_end = (num_blue>_num_contrast_base)? 255 : 0 ;

		if( num_range<0 ){ // ok
			_json_output = {
				red: _num_contrast_base + Math.floor( (num_red-_num_contrast_base)*(1-Math.abs(num_range/100)) ),
				green: _num_contrast_base + Math.floor( (num_green-_num_contrast_base)*(1-Math.abs(num_range/100)) ),
				blue: _num_contrast_base + Math.floor( (num_blue-_num_contrast_base)*(1-Math.abs(num_range/100)) )
			};
		}else{
			_json_output = {
				red: num_red + Math.floor( (_num_red_end-num_red)*(num_range/100)/2 ),
				green: num_green + Math.floor( (_num_green_end-num_green)*(num_range/100)/2 ),
				blue: num_blue + Math.floor( (_num_blue_end-num_blue)*(num_range/100)/2 )
			};
		}
		_json_output.red = this.checkColorRange( _json_output.red );
		_json_output.green = this.checkColorRange( _json_output.green );
		_json_output.blue = this.checkColorRange( _json_output.blue );
		return _json_output;

	}

	checkColorRange( num ){
		return ( num>255 )? 255 : ( ( num<0 )? 0 : num );
	}

	// ** ** ** ** ** ** ** ** ** ** ** ** ** ** ** ** ** ** ** ** ** ** ** ** ** ** ** **
	// ** ** ** ** ** ** ** ** ** ** ** ** ** ** ** ** ** ** ** ** ** ** ** ** ** ** ** **

	// 參考 http://www.jb51.net/article/78818.htm
	// drawStar(obj_2d, r, x, y) {
	// 	let _num_dit = Math.PI * 4 / 5;
	// 	let _num_sin;
	// 	let _num_cos;
	// 	let _num_deg;
	// 	for (let i = 0; i < 5; i++) {
	// 		_num_deg = _num_dit * i;
	// 		_num_sin = Math.sin(_num_deg) * r + y;
	// 		_num_cos = Math.cos(_num_deg) * r + x;
	// 		if( i===0 ){
	// 			obj_2d.moveTo(_num_cos, _num_sin);
	// 		}
	// 		obj_2d.lineTo(_num_cos, _num_sin);
	// 	}
 //    }
	drawStar(obj_2d, r, x, y) {
		let _num_dit = Math.PI * 2 / 10;
		let _num_sin;
		let _num_cos;
		let _num_deg;
		for (let i = 0; i < 10; i++) {
			_num_deg = _num_dit * i;
			if( i%2===0 ){
				_num_sin = Math.sin(_num_deg) * r + y;
				_num_cos = Math.cos(_num_deg) * r + x;
			}else{
				_num_sin = Math.sin(_num_deg) * r * 0.55 + y;
				_num_cos = Math.cos(_num_deg) * r * 0.55 + x;
			}
			if( i===0 ){
				obj_2d.moveTo(_num_cos, _num_sin);
			}
			obj_2d.lineTo(_num_cos, _num_sin);
		}
    }

	// 參考 http://bbs.blueidea.com/thread-3013245-1-1.html
	// obj_2d.translate(300,100);
	drawHeart( obj_2d ){
		let r=0 , a=20 , start = 0 , end= 0;
		obj_2d.rotate(Math.PI);
		for(let q=0; q<1000; q++){
			start +=  Math.PI * 2 /1000;
			end = start + Math.PI * 2 /1000;
			r=a*Math.sqrt(225/(17-16*Math.sin(start)*Math.sqrt(Math.cos(start)*Math.cos(start))))
			obj_2d.arc(0,0,r,start,end,false);
		}
	}

}