'use strict';

/* *** 這部份用 ReactJs + redux 做 *** */

import MethodOption from './methodOption';
import MethodControll from './methodControll';
import React from 'react';
import ReactDOM from 'react-dom';
import Settings from './Settings';
import ReactSetting from './../../lib/react-group/js/Setting';

export default class MethodReact extends React.Component {

    constructor( props ){
        super( props );
        this.arrangeProps( props );
        this.state = {tt:123};
    }

    componentWillReceiveProps(nextProps){
        this.arrangeProps(nextProps);
    }

    arrangeProps({...json_next}){
        this.state = json_next;
    }

    render(){
        return (
            <div>
                <MethodOption 
                    methodStore={ this.props.methodStore } />
                <MethodControll 
                    methodStore={ this.props.methodStore } />
            </div>
        );
    }

};


MethodReact.propTypes = {
    methodStore: React.PropTypes.object.isRequired
},
MethodReact.defaultProps = {
    methodStore: {}
};