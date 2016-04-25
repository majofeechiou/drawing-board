'use strict';

/* *** 這部份用 ReactJs + redux 做 *** */

import React from 'react';
import RgbHex from 'rgb-hex';

export default class ColorPicker extends React.Component {
    constructor(props) {
        super(props);
        this.colorPick = this.colorPick.bind(this);
    }

    colorPick(e){
        let _obj_self = e.target;
        console.log( '----', _obj_self.style.backgroundColor );
        // this.props.whenClick( RgbHex(_obj_self.style.backgroundColor) );
        this.props.whenClick( RgbHex(_obj_self.style.backgroundColor.replace('#','')) );
        // this.props.whenClick( _obj_self.style.backgroundColor );
    }

    render(){
        let _json_style = {
            color: 'transparent',
            backgroundColor: this.props.color,
            width: Math.floor(100/this.props.oneLine)+'%',
            display: 'block',
            float: 'left'
        };
        return (
            <span style={_json_style} onClick={this.colorPick}>{this.props.color}</span>
        );
    }

};

ColorPicker.propTypes = {
    color: React.PropTypes.string,
    oneLine: React.PropTypes.number,
    whenClick: React.PropTypes.func,
},
ColorPicker.defaultProps = {
    color: '',
    oneLine: 6,
    whenClick: 6,
};