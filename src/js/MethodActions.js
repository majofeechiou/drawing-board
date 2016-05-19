'use strict';

import React from 'react';
import GloablTools from './GloablTools';
import GloablData from './GloablData';

export default class MethodActions extends React.Component {
    constructor(props) {
        super(props);

        let _scope = this;
        _scope.closeMethod = _scope.closeMethod.bind(_scope);
        
    }

    closeMethod(){
        GloablTools.Emitter().emit('method.setting.close.asked');
    }

    render(){
        let _json_now_image = GloablData.getNowImageData() ;
        return (
            <div className={this.props.className+' pkg-btnSection'}>
                <If condition={ _json_now_image && (typeof _json_now_image.origin_data === 'string') && _json_now_image.origin_data!=='' }>
                    <button onClick={this.props.prevewAction} className="pkg-btnSection-btn ui-button ui-button_warn">預覽</button>
                </If>
                <button onClick={this.props.submitAction} className="pkg-btnSection-btn ui-button ui-button_strong">確定</button>
                <button onClick={this.closeMethod} className="pkg-btnSection-btn ui-button ui-button_ignore">取消</button>
            </div>
        );
    }

}; 

MethodActions.propTypes = {
    prevewAction: React.PropTypes.func.isRequired,
    submitAction: React.PropTypes.func.isRequired,
    className: React.PropTypes.string,
},
MethodActions.defaultProps = {
    prevewAction: ()=>{},
    submitAction: ()=>{},
    className: '',
};