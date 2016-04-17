'use strict';

import React from 'react';
import ReactDOM from 'react-dom';
// import Settings from './Settings';
import GlobalConst from './globalConst';
// import ReactSetting from './../../lib/react-group/js/Setting';
import MethodOption from './methodOption';

export default class MethodSection extends GlobalConst {
    constructor( str_id, json_tools ){
        super();

        this.addGlobalConst( this, 'globalId', str_id );
        this.addGlobalConst( this, 'globalEmitter', json_tools.emitter );
    }

    render(){
        ReactDOM.render(
            <MethodOption
                myvar="myvar" />, 
            document.getElementById("method-popup")
        );
    }

    create(){
        this.render();
    }

};

