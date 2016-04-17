'use strict';

import React from 'react';

export default class ItemBase extends React.Component {
	constructor(props) {
		super(props);
		this.handleChange = this.handleChange.bind(this);
		let _bln_checked = false;
		if ('checked' in props) {
			_bln_checked = props.checked;
		} else {
			_bln_checked = props.defaultChecked;
		}
		this.state = {checked:_bln_checked};
	}

	componentWillReceiveProps(json_next_rops) {
		if ('checked' in json_next_rops) {
			this.setState({
				checked: json_next_rops.checked
			});
		}
	}

	handleChange(e) {
		const checked = e.target.checked;
		if (!('checked' in this.props)) {
			this.setState({
				checked: checked ? 1 : 0,
			});
		}
		this.props.onChange(e, this.state.checked);
	}

	getShowText(){
		let _json_item = this.props.item,
			_ary_showkey = this.props.showKey,
			_ary_return = [];
		for( let i=0; i<_ary_showkey.length; i++ ){
			_ary_return.push( _json_item[_ary_showkey[i]] );
		}
		return _ary_return.join( this.props.between );
	}

	render() {
		const props = this.props;
		let checked = this.state.checked;
		if (typeof checked === 'boolean') {
			checked = checked ? 1 : 0;
		}
		let _str_classname_all = 'pkg-item',
			_str_classname_input = 'pkg-item-input';
		return (
			<span className={_str_classname_all}>
				<input type={this.props.type}
					name={this.props.name}
					value={this.props.value}
					disabled={this.props.disabled}
					className={_str_classname_input}
					defaultChecked={!!props.defaultChecked}
					checked={!!checked}
					onChange={this.handleChange}
				/>
				{this.getShowText()}
			</span>
		);
	}
}
// --{JSON.stringify(!!checked)}--


ItemBase.propTypes = {
	item: React.PropTypes.object,
	showKey: React.PropTypes.array,
    between: React.PropTypes.string,
	style: React.PropTypes.object,
	defaultChecked: React.PropTypes.oneOfType([React.PropTypes.number, React.PropTypes.bool]),
	checked: React.PropTypes.oneOfType([React.PropTypes.number, React.PropTypes.bool]),
	onChange: React.PropTypes.func,
};

ItemBase.defaultProps = {
	item: {},
	showKey: [],
	between: '',
	defaultChecked: 0,
	onChange: () => {
	},
};
