'use strict';

/* *** 這部份用 ReactJs + redux + nativeJS 做 *** */

import React from 'react';
import ReactDOM from 'react-dom';
import GlobalConst from './GlobalConst';
import GloablTools from './GloablTools';
import { createStore } from 'redux'
import MethodReact from './MethodReact';
import MethodReducer from './MethodReducer';

const methodStore = createStore( MethodReducer );

const OBJ_METHOD_POPUP = document.getElementById("method-popup");
const METHOD_POPUP_CLASSNAME = 'pkg-tmp-method';
const METHOD_POPUP_OPEN_CLASSNAME = 'pkg-tmp-method_open';
const METHOD_POPUP_OPEN_REG = new RegExp(METHOD_POPUP_OPEN_CLASSNAME, 'gim');

export default class MethodSection extends GlobalConst {
    constructor( str_id ){
        super();

        this.addGlobalConst( this, 'globalId', str_id );

        this.default();

    }

    default(){
        let _scope = this;
        GloablTools.Emitter().on('method.setting.open.asked', function(){
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