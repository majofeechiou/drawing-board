'use strict';

import Settings from './Settings';
import Utils from './Utils';
import Tools from './Tools';
import GloablData from './GloablData';

export default class StepMethod extends Tools {
    constructor(json_tools){
        super();

        // this.init_step_method = [ 
        //  {
        //      method: '',
        //      method_id: Utils.createMethodId()
        //  }
        // ];
        let _sary_init = [ 
            {
                method: '',
                method_id: Utils.createMethodId()
            }
        ];
        GloablData.setInitStepMethod( _sary_init );

        let _sary_step_method_other = [];
        GloablData.getOtherStepMethod( _sary_step_method_other );;

        // this.step_method = this.init_step_method.concat( _sary_step_method_other );
        GloablData.setStepMethod( _sary_init.concat( _sary_step_method_other ) );
        this.setEmitter( json_tools.emitter );
    }

    getStepMethod(){
        // return this.step_method || [] ;
        return GloablData.getStepMethod() ;
    }

    pushStepMethod( json ){
        let _scope = this;
        if( json!==undefined ){
            json.method_id = json.method_id || Utils.createMethodId();
            // this.step_method.push( json );
            // console.log( 'this.step_method :: ', this.step_method );
            // _scope.getEmitter().emit('step.method.option.added', json);
            GloablData.pushStepMethod( json, function(){
                console.log( 'this.step_method :: ', this.step_method );
                _scope.getEmitter().emit('step.method.option.added', json);
            } );
        }
    }

    spliceStepMethod( json ){
        let _scope = this ;
        if( json!==undefined && ( (typeof json.method_id === 'string') && json.method_id!=='' ) ){
            let _num_index;
            let _sary_method = GloablData.getStepMethod();
            // for( let i=0;i<this.step_method.length;i++ ){
            //  if( this.step_method[i].method_id===json.method_id ){
            //      _num_index = i;
            //      break;
            //  }
            // }
            for( let i=0;i<_sary_method.length;i++ ){
                if( _sary_method[i].method_id===json.method_id ){
                    _num_index = i;
                    break;
                }
            }
            if( _num_index>=0 ){
                // this.step_method.splice(_num_index,1);
                // this.getEmitter().emit('step.method.option.deleted', json);
                GloablData.spliceStepMethod( _num_index, 1, function(){
                    _scope.getEmitter().emit('step.method.option.deleted', json);
                } );
            }
        }
    }

};