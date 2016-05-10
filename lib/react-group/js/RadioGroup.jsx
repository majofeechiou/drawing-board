'use strict';

/*
	這些系列參考了：
	"homepage": "http://github.com/react-component/checkbox",
	"homepage": "http://github.com/react-component/radio",
*/

import React from 'react';
import ItemBase from './ItemBase';
import ClassNames from 'classnames';
import Setting from './Setting';
import CheckedUI from './CheckedUI';
import extend from 'JsonExtend';

export default class RadioGroup extends React.Component {

	constructor(props) {
		super(props);
		this.handleChange = this.handleChange.bind(this);
		this.toggleDisabled = this.toggleDisabled.bind(this);
		this.arrangeProps(props);
	}

	componentWillReceiveProps(nextProps){
		this.arrangeProps(nextProps);
	}

	mergeState(json){
		let _json_state = JSON.parse(JSON.stringify(this.state)),
			_json_extend = extend(_json_state, json);
		this.setState( _json_extend );
	}

	getMainSelectKey(){
		return this.props.selectKey[0];
	}

	arrangeProps(props){
		let _str_format = 'string' ; 
		if( typeof props.outputFormat === 'string' && (props.outputFormat).match(/^((string)|(json)|(array)|(sarray))$/i)!==null ){
			_str_format = props.outputFormat ;
		}
		// let _data_result = 
		// 	( _str_format==='array' || _str_format==='sarray' )? [] : 
		// 	(( _str_format==='json' )? {} : '' ) ;
		let _data_result;
		if(  _str_format==='array' || _str_format==='sarray' ){
			if( props.outputResult instanceof Array === true ){
				_data_result = props.outputResult;
			}else{
				_data_result = [];
			}
		}else if( _str_format==='string' ){
			if( typeof props.outputResult === 'string' ){
				_data_result = props.outputResult;
			}else{
				_data_result = '';
			}
		}else{
			if( typeof props.outputResult === 'object' ){
				_data_result = props.outputResult;
			}else{
				_data_result = {};
			}
		}
		// this.setState({
		// 	format: _str_format ,
		// 	disabled: false ,
		// 	outputResult: _data_result
		// });
		this.state = {
			format: _str_format ,
			disabled: false ,
			outputResult: _data_result
		};
	}

	handleChange(e) {
		let _scope = this;
		let _bln_changed = false;
		let _str_value = e.target.value;
		let _str_selectkey = _scope.getMainSelectKey();
		(this.props.inputOption).find(function(json){

			if( json[_str_selectkey]===_str_value ){
				let _json_args = {},
					_str_format = _scope.state.format ;

				if( _str_format==='string' ){
					_json_args.outputResult = _str_value ;	
				}else if( _str_format==='json' ){
					_json_args.outputResult = json ;	
				}else if( _str_format==='array' || _str_format==='sarray' ){
					let _data_old_result = ( _scope.state.outputResult instanceof Array )? JSON.parse(JSON.stringify(_scope.state.outputResult)) : [];
					let _data_item;
					if( _str_format==='array' ){
						_data_item = _str_value ;
					}else{
						_data_item = json ;
					}
					if( !!e.target.checked ){
						if( _data_old_result.length>=1 ){
							_json_args.outputResult = _data_old_result.concat( [_data_item] );
						}else{
							_json_args.outputResult = [ _data_item ];
						}
					}else{
						let _data_ary_output = [];
						if( _str_format==='array' ){
							_data_old_result.filter(function(str_value, num_index){
								if( str_value!==_data_item ){
									_data_ary_output.push(str_value);
								}
							});
						}else{
							_data_old_result.filter(function(json_value, num_index){
								if( json_value[_str_selectkey]!==_data_item[_str_selectkey] ){
									_data_ary_output.push(json_value);
								}
							});
						}
						_json_args.outputResult = _data_ary_output ;
					}
				}

				_scope.mergeState(_json_args);

				if( _scope.props.onChange && (_scope.props.onChange instanceof Function===true) ){
					// setTimeout(function(){
						let _json_ouput = {
							value: _str_value,
							item: json,
							result: _json_args.outputResult
						};
						_bln_changed = true;
						_scope.props.onChange(_bln_changed, _json_ouput );
					// },1);
				}
				// return false;
			}

		});

		// if( _bln_changed===false ){
		// 	_scope.props.onChange( _bln_changed, {value: _str_value} );
		// }
	}
	toggleDisabled() {
		this.mergeState({
			disabled: !this.state.disabled
		});
	}
	judegItemChecked(json_item){
		let _str_format = this.state.format,
			_str_selectkey = this.getMainSelectKey(),
			_str_item_value = json_item[_str_selectkey] ;

		if( _str_format==='string' ){
			return ( this.state.outputResult === _str_item_value );
		}else if( _str_format==='json' ){
			return ( this.state.outputResult[_str_selectkey] === _str_item_value );
		}else if( _str_format==='array' || _str_format==='sarray' ){
			let _data_result = this.state.outputResult;
			let _bln_return = false;
			if( _str_format==='array' ){
				for( let i=0; i<_data_result.length; i++ ){
					if(_data_result[i]===_str_item_value){
						_bln_return = true;
						break;
					}
				}
				return _bln_return;
			}else{
				for( let j=0; j<_data_result.length; j++ ){
					if(_data_result[j][_str_selectkey]===_str_item_value){
						_bln_return = true;
						break;
					}
				}
				return _bln_return;
			}
		}
	}
	render() {
		let _str_classname_all = ClassNames({
			[this.props.className]: !!this.props.className,
			'pkg-checked': true,
			'pkg-checked_disabled': (this.state.disabled===Setting.DISABLED_TRUE),
			'pkg-list': true,
			[CheckedUI.getDisabled( this.props.display )]: true,
			[CheckedUI.getPadding( this.props.padding )]: true,
			[CheckedUI.getFillte( this.props.fillet )]: true,
			[CheckedUI.getListStyle( this.props.listStyle )]: true,
			[CheckedUI.getListPosition( this.props.listPosition )]: true,
			[CheckedUI.getIconPosition( this.props.iconPosition )]: true,
			[CheckedUI.getIconShow( this.props.iconShow )]: true,
			[CheckedUI.getStyleName( this.props.styleName, this.props.offBack )]: true,
			[CheckedUI.getComposition( this.props.composition )]: true,

		});
		let _str_classname_inner = ClassNames({
			'pkg-list-option': (this.props.listPosition===Setting.LIST_POSITION_INNER),
			'pkg-checked-icon': (this.props.listPosition!==Setting.LIST_POSITION_INNER),
			'pkg-style-icon': ( (this.props.styleIcon===true) && (this.props.listPosition!==Setting.LIST_POSITION_INNER) ),
			'pkg-style-iconback': ( (this.props.styleIconBack===true) && (this.props.listPosition!==Setting.LIST_POSITION_INNER) ),
			'pkg-style-list': ( (this.props.styleList===true) && (this.props.listPosition===Setting.LIST_POSITION_INNER) ),
		});
		let _str_selectkey = this.getMainSelectKey();
		return (
			<div className={_str_classname_all}>
				{this.props.inputOption.map((json_item)=>{

					let _str_classname_outer = ClassNames({
						'pkg-checked-option': true,
						'pkg-checked-option_checked': this.judegItemChecked(json_item),
						'pkg-list-option': (this.props.listPosition===Setting.LIST_POSITION_OUTER),
						'pkg-checked-icon': (this.props.listPosition!==Setting.LIST_POSITION_OUTER),
						
						'pkg-style-item': true,
						'pkg-style-item_checked': this.judegItemChecked(json_item) ,
						'pkg-style-icon': ( (this.props.styleIcon===true) && (this.props.listPosition!==Setting.LIST_POSITION_OUTER) ),
						'pkg-style-icon_checked': ( (this.props.styleIcon===true) && (this.props.listPosition!==Setting.LIST_POSITION_OUTER) && this.judegItemChecked(json_item) ),
						'pkg-style-iconback': ( (this.props.styleIconBack===true) && (this.props.listPosition!==Setting.LIST_POSITION_OUTER) ),
						'pkg-style-iconback_checked': ( (this.props.styleIconBack===true) && (this.props.listPosition!==Setting.LIST_POSITION_OUTER) && this.judegItemChecked(json_item) ),
						'pkg-style-border': ( this.props.styleBorder===true ),
						'pkg-style-border_checked': ( (this.props.styleBorder===true) && this.judegItemChecked(json_item) ),
						'pkg-style-list': ( (this.props.styleList===true) && (this.props.listPosition===Setting.LIST_POSITION_OUTER) ),
						'pkg-style-list_checked': ( (this.props.styleList===true) && (this.props.listPosition===Setting.LIST_POSITION_OUTER) && this.judegItemChecked(json_item) ),
					});

					let _str_classname_inner_add = ClassNames({
						'pkg-style-icon_checked': ( (this.props.styleIcon===true) && (this.props.listPosition!==Setting.LIST_POSITION_INNER) && this.judegItemChecked(json_item) ),
						'pkg-style-iconback_checked': ( (this.props.styleIconBack===true) && (this.props.listPosition!==Setting.LIST_POSITION_INNER) && this.judegItemChecked(json_item) ),
						'pkg-style-list_checked': ( (this.props.styleList===true) && (this.props.listPosition===Setting.LIST_POSITION_INNER) && this.judegItemChecked(json_item) ),
					});

					return (
						<label key={this.props.name+'-'+_str_selectkey+'-'+json_item[_str_selectkey]+Date.now()+'-'+Math.floor(Math.random()*1000)}
							className={_str_classname_outer}>
							<span className={_str_classname_inner+' '+_str_classname_inner_add}>
								<ItemBase value={json_item[_str_selectkey]}
									checked={this.judegItemChecked(json_item)}
									onChange={this.handleChange}
									disabled={this.state.disabled}
									type={ (this.state.format==='array' || this.state.format==='sarray')? 'checkbox' : 'radio' }
									name={this.props.name}
									showKey={this.props.showKey}
									between={this.props.between}
									item={json_item} />
							</span>
						</label> 
					);
				})}
			</div>

		);
	}
}

// <button onClick={this.toggleDisabled}>toggle disabled</button> // 這個要移除

RadioGroup.propTypes = {
	onChange: React.PropTypes.func,
	outputResult: React.PropTypes.any.isRequired,
	className: React.PropTypes.string,
    inputOption: React.PropTypes.array,
    selectKey: React.PropTypes.array,
    showKey: React.PropTypes.array,
    between: React.PropTypes.string,
    outputFormat: React.PropTypes.string.isRequired,
    display: React.PropTypes.string,
    listStyle: React.PropTypes.string,
    listPosition: React.PropTypes.string,
    iconPosition: React.PropTypes.string,
    iconShow: React.PropTypes.array,
    styleName: React.PropTypes.string,
    offBack: React.PropTypes.bool,
    composition: React.PropTypes.string,
    styleBorder: React.PropTypes.bool,
    styleIcon: React.PropTypes.bool,
    styleIconBack: React.PropTypes.bool,
    styleList: React.PropTypes.bool,
},
RadioGroup.defaultProps = {
	className: '',
	outputResult: null,
	inputOption: [],
	selectKey: [],
	showKey: [],
	between: '',
	display: Setting.DISPLAY_INBLOCK,
    listStyle: '',
    listPosition: Setting.LIST_POSITION_INNER,
    iconPosition: Setting.ICON_POSTION_LEFT,
    iconShow: [],
    styleName: '',
    offBack: false,
    composition: '',
    styleBorder: false,
    styleIcon: false,
    styleIconBack: false,
    styleList: false,
};