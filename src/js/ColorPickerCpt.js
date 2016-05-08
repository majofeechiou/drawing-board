import React from 'react';
import ColorPicker from 'react-color-picker'; // https://www.npmjs.com/package/react-color-picker
import Extend from 'Extend';

export default class ColorPickerCpt extends React.Component {
    constructor(props) {
        super(props);

        let _scope = this;

        _scope.state = {
            color: props.color,
            show: props.show
        };

        this.closeShow = this.closeShow.bind(this);

    }

    componentWillReceiveProps(nextProps){
        this.setState(Extend.deep(
            {},
            this.state,
            {...nextProps}
        ));
    }

    hideShow(){
        this.setState(Extend.deep(
            {},
            this.state,
            {show: false}
        ));
    }
    closeShow(){
        this.hideShow();
    }
    render(){
        let _str_cn = (this.state.show)? 'pkg-colorpicker' : 'pkg-colorpicker pkg-colorpicker_off' ;
        return (
            <div className={_str_cn}>
                <ColorPicker 
                    value={this.state.color} 
                    onDrag={this.props.onDrag}
                    saturationWidth={350} 
                    saturationHeight={350} 
                    hueWidth={30}
                    className="pkg-colorpicker-picker" />
                <button className="pkg-colorpicker-close" onClick={this.closeShow}>X</button>
            </div>
        );
    }
}

ColorPickerCpt.propTypes = {
    color: React.PropTypes.string,
    onDrag: React.PropTypes.func.isRequired,
    show: React.PropTypes.bool
},
ColorPickerCpt.defaultProps = {
    control: '#fff',
    onDrag: ()=>{},
    show: false
};