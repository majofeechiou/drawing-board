'use strict';

/* *** 這部份用 ReactJs + redux + nativeJS 做 *** */

import React from 'react';
import ReactDOM from 'react-dom';
// import Settings from './Settings';
import GlobalConst from './GlobalConst';
import { createStore } from 'redux'
import MethodReact from './MethodReact';
import MethodReducer from './MethodReducer';

const methodStore = createStore( MethodReducer );

export default class MethodSection extends GlobalConst {
    constructor( str_id, json_tools ){
        super();

        this.addGlobalConst( this, 'globalId', str_id );
        this.addGlobalConst( this, 'globalEmitter', json_tools.emitter );

    }

    // render(){
    //     let _data_checked = {
    //         method: this.getStateMethoChecked()
    //     };
    //     ReactDOM.render(
    //         <MethodReact
    //             methodChecked={ _data_checked } />, 
    //         document.getElementById("method-popup")
    //     );
    // }

    render(){
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