'use strict';
import Tools from './Tools';
import HexRgb from 'hex-rgb';

// 運算的方式
export default class ImageDataComputeMethod extends Tools {
	constructor( json_tools ){
		super();

		let _scope = this;

		_scope.setEmitter( json_tools.emitter );

		_scope.obj_canvas = document.createElement('canvas');
		_scope.obj_canvas_2d = _scope.obj_canvas.getContext('2d');

		_scope.obj_image = new Image();

		_scope.obj_image.onload = function(){

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

	// // 雪花
	// // https://msdn.microsoft.com/zh-cn/library/gg589486(v=vs.85).aspx
	// methodSnow( json ){
	// 	let _scope = this;
		
	// 	json = _scope.methodVars( json );

	// 	let _num_width = _scope.getComputeWidth(),
	// 		_num_height = _scope.getComputeHeight();

	// 	let x,
	// 		y;

	// 	// Draw snowflakes. // 雪花
	// 	for (let i = 0; i <= 500; i++) {
	// 		// Get random positions for flakes.
	// 		x = Math.floor(Math.random() * _num_width);
	// 		y = Math.floor(Math.random() * _num_height);

	// 		// Make the flakes white
	// 		_scope.obj_canvas_2d.fillStyle = "white";

	// 		// Draw an individual flakes.
	// 		_scope.obj_canvas_2d.beginPath();
	// 		_scope.obj_canvas_2d.arc(x, y, 3, 0, Math.PI * 2, true);
	// 		_scope.obj_canvas_2d.closePath();
	// 		_scope.obj_canvas_2d.fill();
	// 	}

	// 	_scope.emitAfterMethod( json );

	// }

	// // 在照片中添加纹理
	// // https://msdn.microsoft.com/zh-cn/library/gg589486(v=vs.85).aspx
	// methodDot( json ){
	// 	let _scope = this;
		
	// 	json = _scope.methodVars( json );

	// 	let _num_width = _scope.getComputeWidth(),
	// 		_num_height = _scope.getComputeHeight();

	// 	let x,
	// 		y;

	// 	// Draw snowflakes. // 雪花
	// 	for (let i = 0; i <= 150; i++) {
	// 		// Get random positions for flakes.
	// 		x = Math.floor(Math.random() * _num_width);
	// 		y = Math.floor(Math.random() * _num_height);

	// 		// Make the flakes white
	// 		_scope.obj_canvas_2d.fillStyle = "black";

	// 		// Draw an individual flakes.
	// 		_scope.obj_canvas_2d.beginPath();
	// 		_scope.obj_canvas_2d.arc(x, y, 5, 0, Math.PI * 2, true);
	// 		_scope.obj_canvas_2d.closePath();
	// 		_scope.obj_canvas_2d.fill();
	// 	}

	// 	_scope.emitAfterMethod( json );
		
	// }

	// 在照片中添加纹理
	// https://msdn.microsoft.com/zh-cn/library/gg589486(v=vs.85).aspx
	methodDot( json ){
		let _scope = this;
		
		json = _scope.methodVars( json );

		let _bln_old = ( json.control.created && json.control.created.length>0 ) ;
		json.control.created = ( _bln_old===true )? json.control.created : [] ;

		let _num_width = _scope.getComputeWidth(),
			_num_height = _scope.getComputeHeight(),
			_json_control = json.control,
			_num_size_min = _json_control.minSize,
			_num_size_max = _json_control.maxSize,
			_num_size,
			_num_total = Math.floor(_num_width*_num_height/_num_size_max/_num_size_max/100*_json_control.frequency);

		let x,
			y;

		let _ary_rgb = (HexRgb(_json_control.color));
		let _str_color = 'rgba('+_ary_rgb.join(', ')+', '+_json_control.alpha/100+')';

		// _scope.obj_canvas_2d.fillStyle = _json_control.color;
		_scope.obj_canvas_2d.fillStyle = _str_color;

		// Draw snowflakes. // 雪花
		for (let i = 0; i <= _num_total; i++) {
			// Get random positions for flakes.
			x = ( _bln_old===true )? json.control.created[i].x : ( Math.floor(Math.random() * _num_width) );
			y = ( _bln_old===true )? json.control.created[i].y : ( Math.floor(Math.random() * _num_height) );


			if( _bln_old===true ){
				x = json.control.created[i].x ;
				y = json.control.created[i].y ;
				_num_size = json.control.created[i].size;
			}else{
				x = Math.floor(Math.random() * _num_width) ;
				y = Math.floor(Math.random() * _num_height) ;
				_num_size = ( parseInt(_num_size_min, 10) + Math.floor( ( _num_size_max-_num_size_min )*Math.random() ) )/2 ;
				json.control.created.push({
					x,
					y,
					size: _num_size
				});
			}

			// Draw an individual flakes.
			_scope.obj_canvas_2d.beginPath();
			_scope.obj_canvas_2d.arc(x, y, _num_size, 0, Math.PI * 2, true);
			_scope.obj_canvas_2d.closePath();
			_scope.obj_canvas_2d.fill();
			
		}

		console.log( 'json :::: ', json );

		_scope.emitAfterMethod( json );
		
	}

	// 透明
	// https://msdn.microsoft.com/zh-cn/library/gg589493(v=vs.85).aspx
	methodAlpha( json ){
		let _scope = this;

		json = _scope.methodVars( json );

		let _num_width = _scope.getComputeWidth(),
			_num_height = _scope.getComputeHeight(),
			_num_range = json.control.range;

        let _json_image_data = _scope.obj_canvas_2d.getImageData(0, 0, _num_width, _num_height);

        // Loop through data.
        for (var i = 0; i < (_num_width*_num_height*4); i += 4) {

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

	// 灰階
	// https://msdn.microsoft.com/zh-cn/library/gg589527(v=vs.85).aspx
	methodGray( json ){
		let _scope = this;
		
		json = _scope.methodVars( json );

		let _num_width = _scope.getComputeWidth(),
			_num_height = _scope.getComputeHeight();

        let _json_image_data = _scope.obj_canvas_2d.getImageData(0, 0, _num_width, _num_height);

		let _num_red,
			_num_green,
			_num_blue,
			_num_gray;

        // Loop through data.
        for (var i = 0; i < (_num_width*_num_height*4); i += 4) {

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
	methodSaturate( json ){
		let _scope = this;
		
		json = _scope.methodVars( json );

		let _num_width = _scope.getComputeWidth(),
			_num_height = _scope.getComputeHeight(),
			_num_range = json.control.range;

        let _json_image_data = _scope.obj_canvas_2d.getImageData(0, 0, _num_width, _num_height);

		let _num_red,
			_num_green,
			_num_blue,
			_json_rgb = {};

		if( _num_range>0 || _num_range<0 ){
	        // Loop through data.
	        for (var i = 0; i < (_num_width*_num_height*4); i += 4) {

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
	methodContrast( json ){
		let _scope = this;
		
		json = _scope.methodVars( json );

		let _num_width = _scope.getComputeWidth(),
			_num_height = _scope.getComputeHeight(),
			_num_range = json.control.range;

        let _json_image_data = _scope.obj_canvas_2d.getImageData(0, 0, _num_width, _num_height);

        let _num_red,
        	_num_green,
        	_num_blue,
        	_json_rgb = {};

        if( _num_range>0 || _num_range<0 ){
		    for(var i=0;i<_json_image_data.data.length;i+=4){

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
		json.setting = json.setting || {} ;
		json.control = json.control || {} ;
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

		_scope.getEmitter().emit('step.image.success.computed', _json_emit);
	}

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

}