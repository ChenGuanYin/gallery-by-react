import React, { Component } from 'react';

class ImgFigure extends Component {
    render() {
        let styleObj = {};
        // 如果props属性指定了这张图片的位置
        if (this.props.arrange.pos) {
            styleObj = Object.assign({}, this.props.arrange.pos)
        };
        // 如果图片的旋转角度有并且不为0，添加旋转角度
        if (this.props.arrange.rotate) {
            (['MozTransform', 'msTransform', 'WebkitTransform', 'transform']).forEach(function (value) {
              styleObj[value] = 'rotate(' + this.props.arrange.rotate + 'deg)';
            }.bind(this));
        }
        return (
            <figure className='img-figure' style={styleObj}>
                <img src={this.props.data.imageUrl} alt={this.props.data.title} />
                <figcaption>
                    <h2 className='img-title'>{this.props.data.title}</h2>
                </figcaption>
            </figure>
        )
    }
}

export default ImgFigure;