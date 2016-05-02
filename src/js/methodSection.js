'use strict';

/* *** 這部份用 ReactJs + redux + nativeJS 做 *** */

import React from 'react';
import ReactDOM from 'react-dom';
import GlobalConst from './GlobalConst';
import GloablTools from './GloablTools';
import { createStore } from 'redux'
import MethodReact from './MethodReact';
import MethodReducer from './MethodReducer';
import Extend from 'Extend';
import GloablData from './GloablData';
import ImageDataComputeMethod from './ImageDataComputeMethod';
import Settings from './Settings';

const methodStore = createStore( MethodReducer );
const OBJ_METHOD_POPUP = document.getElementById("method-popup");
const METHOD_POPUP_CLASSNAME = 'pkg-tmp-method';
const METHOD_POPUP_OPEN_CLASSNAME = 'pkg-tmp-method_open';
const METHOD_POPUP_OPEN_REG = new RegExp(METHOD_POPUP_OPEN_CLASSNAME, 'gim');

export default class MethodSection extends GlobalConst {
    constructor( str_id ){
        super();

        this.addGlobalConst( this, 'globalId', str_id );

        this.imageDataComputeMethod = new ImageDataComputeMethod(Settings.COMPUTE_TIMING_PREVIEW, {emitter:GloablTools.Emitter()});

        this.default();

    }

    default(){
        let _scope = this;
        GloablTools.Emitter().on('method.setting.open.asked', function(){
            let _json_emit = arguments[0];
            GloablTools.Emitter().emit('step.image.new.loading', _json_emit);

            let _str_cn_base = _scope.getMethodBaseClassName();
            OBJ_METHOD_POPUP.className = _str_cn_base+' '+METHOD_POPUP_OPEN_CLASSNAME;
            GloablTools.Emitter().emit('method.setting.opening');
        });

        GloablTools.Emitter().on( 'method.cotroller.control.asking', function(){  // 新的設定的做法
            let _json_emit = arguments[0] ;
            GloablTools.Emitter().emit('method.cotroller.control.operating', _json_emit);
            GloablTools.Emitter().emit('method.setting.close.asked');
        });

        GloablTools.Emitter().on( 'method.setting.close.asked', function(){  // 新的設定的做法
            let _json_emit = arguments[0] ;
            OBJ_METHOD_POPUP.className = _scope.getMethodBaseClassName();
        });

        GloablTools.Emitter().on('step.image.new.loading',function(){
            let _json_emit = arguments[0];
            _json_emit.data = _json_emit.data || {} ;

            let _json_other = _json_emit.data || {} ;
            GloablData.setNowImageData( _json_other );
            console.log( 'new.loading---', _json_emit );
            GloablData.setPreviewImageInfo( _json_emit.data );

        });

        GloablTools.Emitter().on('method.cotroller.previewing',function(){
            let _json = arguments[0];
            let _json_other = Extend.deep(_json, {
                data: GloablData.getNowImageData().data,
                origin_data: GloablData.getNowImageData().origin_data,
                method_id: GloablData.getNowImageData().method_id
            });
            _scope.imageDataComputeMethod.changeData( _json.method, _json_other.data, _json_other );
        });

        GloablTools.Emitter().on('step.image.success.loaded',function(){
            // 成功放進照片了

            let _json = arguments[0],
                _bln_delete_created = arguments[1],
                _str_method = _json.method;

            if( _bln_delete_created === true ){
                _json.created = _json.created || {} ;
            }

            if( _str_method===Settings.METHOD_DOT ){
                _scope.imageDataComputeMethod.methodDot( _json );

            }else if( _str_method===Settings.METHOD_ALPHA ){
                _scope.imageDataComputeMethod.methodAlpha( _json );

            }else if( _str_method===Settings.METHOD_SATURATE ){
                _scope.imageDataComputeMethod.methodSaturate( _json );

            }else if( _str_method===Settings.METHOD_CONTRAST ){
                _scope.imageDataComputeMethod.methodContrast( _json );

            }else if( _str_method===Settings.METHOD_INVERT ){
                _scope.imageDataComputeMethod.methodInvert( _json );

            }else{
                _scope.imageDataComputeMethod.methodOrigin( _json );
            }

        });

        GloablTools.Emitter().on('preview.image.success.computed',function(){
            console.log('** ** ** ** ** ** // ** ** preview.image.success.computed ** ** // ** ** ** ** ** **');
            console.log( 'arguments[0] :: ', arguments[0] );
            let _json = arguments[0];
            GloablData.setPreviewImageInfo( _json, function(){
                GloablTools.Emitter().emit('preview.image.object.data.changing');
            } );

            // let _obj_image = new Image();
            // _obj_image.src = _json.data;
            // document.getElementsByTagName('body')[0].appendChild(_obj_image);
        });

    }

    getMethodBaseClassName(){
        return OBJ_METHOD_POPUP.className.replace( METHOD_POPUP_OPEN_REG, '' );
    }

    render(){
        let _scope = this;
        ReactDOM.render(
            <MethodReact
                methodStore={methodStore} />, 
                OBJ_METHOD_POPUP
        );
    }

    create(){
        this.render();
        methodStore.subscribe( this.render );
    }

};


/*
https://github.com/reactjs/redux/blob/master/examples/counter/

import Counter from './components/Counter'
import counter from './reducers'

const store = createStore(counter)
const rootEl = document.getElementById('root')

function render() {
  ReactDOM.render(
    <Counter
      value={store.getState()}
      onIncrement={() => store.dispatch({ type: 'INCREMENT' })}
      onDecrement={() => store.dispatch({ type: 'DECREMENT' })}
    />,
    rootEl  
  )
}

render()
store.subscribe(render)
*/