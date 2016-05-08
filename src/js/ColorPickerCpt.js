import React from 'react';
import ColorPicker from 'react-color-picker'; // https://www.npmjs.com/package/react-color-picker
import Extend from 'Extend';
import Utils from './Utils';

export default class ColorPickerCpt extends React.Component {
    constructor(props) {
        super(props);

        let _scope = this;

        _scope.state = {
            color: props.color,
            show: props.show
        };

        this.closeShow = this.closeShow.bind(this);
        this.changeColor = this.changeColor.bind(this);
        this.emitChangeColor = this.emitChangeColor.bind(this);

    }

    componentWillReceiveProps(nextProps){
        this.setState(Extend.deep(
            {},
            this.state,
            {...nextProps}
        ));
    }

    // componentWillUpdate

    // componentWillUnmount(){
    //     console.log('** ** componentWillUnmount ** **');
    // }

    hideShow(){
        this.setState(Extend.deep(
            {},
            this.state,
            {show: false}
        ));
    }
    closeShow(){
        this.hideShow();
        this.props.onShowChanged(false);
    }
    changeColor( str_color ){
        this.setState(Extend.deep(
            {},
            this.state,
            {color: str_color}
        ));
    }
    emitChangeColor(){
        let _scope = this;
        _scope.props.onChange(_scope.state.color, {show:false});// 把關閉的功能將給外面來做
    }
    render(){
        let _str_cn = (this.state.show===true)? 'pkg-colorpicker pkg-colorpicker_on' : 'pkg-colorpicker' ;
        let _str_bg = this.state.color;
        let _str_text = Utils.getPairColor(_str_bg);

        return (
            <div className={_str_cn}>
                <div className="pkg-colorpicker-picker">
                    <ColorPicker 
                        value={this.state.color} 
                        onChange={this.changeColor}
                        saturationWidth={350} 
                        saturationHeight={350} 
                        hueWidth={30} />
                    <div className="pkg-colorpicker-action">
                        <span className="pkg-colorpicker-action-picked" style={{background:_str_bg, color:_str_text}}>{this.state.color}</span>
                        <button onClick={this.emitChangeColor}>確定</button>
                        <button onClick={this.closeShow}>取消</button>
                    </div>
                </div>
                <button className="pkg-colorpicker-close" onClick={this.closeShow}>X</button>
            </div>
        );
    }
}

ColorPickerCpt.propTypes = {
    color: React.PropTypes.string,
    onChange: React.PropTypes.func.isRequired,
    onShowChanged: React.PropTypes.func.isRequired,
    show: React.PropTypes.bool
},
ColorPickerCpt.defaultProps = {
    control: '#fff',
    onChange: ()=>{},
    onShowChanged: ()=>{},
    show: false
};