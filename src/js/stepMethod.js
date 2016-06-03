'use strict';

import Settings from './Settings';
import Utils from './Utils';
import Tools from './Tools';
import GloablTools from './GloablTools';

export default class StepMethod extends Tools {
	constructor(json_tools){
		super();

		this.init_step_method = [ 
			{
				method: '',
				method_id: Utils.createMethodId()
			}
		];
		let _sary_step_method_other = [];

		this.step_method = this.init_step_method.concat( _sary_step_method_other );
		this.setEmitter( json_tools.emitter );

		window.step_method = this.step_method;

	}

	getStepMethod(){
		return this.step_method || [] ;
	}

	pushStepMethod( json ){
		let _scope = this ;
		if( json!==undefined ){
			json.method_id = json.method_id || Utils.createMethodId();
			_scope.step_method.push( json );
			setTimeout(function(){
				_scope.getEmitter().emit('step.method.option.added', json);
				GloablTools.Emitter().emit('ga.event', {
					eventCategory: 'method',
					eventAction: 'method.add',
					eventLabel: '[method:'+json.method+'][control:'+JSON.stringify(json.control)+']'
				});
			},100);
		}
	}

	spliceStepMethod( json ){
		if( json!==undefined && ( (typeof json.method_id === 'string') && json.method_id!=='' ) ){
			let _num_index;
			for( let i=0;i<this.step_method.length;i++ ){
				if( this.step_method[i].method_id===json.method_id ){
					_num_index = i;
					GloablTools.Emitter().emit('ga.event', {
						eventCategory: 'method',
						eventAction: 'method.delete',
						eventLabel: '[method:'+this.step_method[i].method+'][control:'+JSON.stringify(this.step_method[i].control)+']'
					});
					break;
				}
			}
			if( _num_index>=0 ){
				this.step_method.splice(_num_index,1);
				this.getEmitter().emit('step.method.option.deleted', json);				
			}
		}
	}

};