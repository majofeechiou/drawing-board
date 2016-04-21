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

export default class MethodSection extends GlobalConst {
    constructor( str_id ){
        super();

        this.addGlobalConst( this, 'globalId', str_id );

        this.default();

    }

    default(){
        GloablTools.Emitter().on('method.setting.open.asked', function(){
            GloablTools.Emitter().emit('method.setting.opening');
        });
    }

    render(){
        let _scope = this;
        ReactDOM.render(
            <MethodReact
                methodStore={methodStore} />, 
            document.getElementById("method-popup")
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