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
                    <div className="pkg-colorpicker-action pkg-btnSection pkg-table wth-100pct">
                        <div className="pkg-table-row">
                            <div className="pkg-table-cell wth-50pct">
                                <span className="pkg-colorpicker-action-picked" style={{background:_str_bg, color:_str_text}}>{this.state.color}</span>
                            </div>
                            <div className="pkg-table-cell pkg-table-cell_right">
                                <button className="pkg-btnSection-btn ui-button ui-button_strong" onClick={this.emitChangeColor}>確定</button>
                                <button className="pkg-btnSection-btn ui-button ui-button_ignore" onClick={this.closeShow}>取消</button>
                            </div>
                        </div>
                    </div>
                </div>
                <span className="pkg-colorpicker-close ui-close" onClick={this.closeShow}></span>
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