'use strict';

import Emitter from 'ComponentEmitter';

const GlobalEmitter = new Emitter();

export default class GloablTools {
    static Emitter(){
        return GlobalEmitter;
    }
};
