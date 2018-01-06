import React from 'react';

class ControllerUnit extends React.Component {
    handleClick(e) {
        if(this.props.arrange.isCenter){
            this.props.inverse()
        }else {
            this.props.center();
        }
        e.stopPropagation();
        e.preventDefault();
    };
    render () {
        let unitClassName = "controller-unit";
        if(this.props.arrange.isCenter) unitClassName += ' is-center';
        if(this.props.arrange.isInverse) unitClassName += ' is-inverse'
        return (
            <span className={unitClassName} onClick={this.handleClick.bind(this)}></span>
        )
    }
} 

export default ControllerUnit;