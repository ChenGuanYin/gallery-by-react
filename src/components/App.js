import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import ImgFigure from './ImgFigure.jsx';
import ControllerUnit from './ControllerUnit.jsx';
import '../css/App.css';
import data from '../data/imageDatas.json';

let imageData = (function getImageUrl(dataArr) {
  dataArr.forEach((item) => {
    item.imageUrl = require(`../images/${item.fileName}`)
  });
  return dataArr
})(data);
//  获取区间内的一个随机值
function random(min, max) {
  return Math.ceil(Math.random() * (max - min) + min)
}
// 获取0-30°之间的一个任意正负值
function randomDeg() {
  return (Math.random() > 0.5 ? '-' : '') + Math.ceil(Math.random() * 30)
}
class App extends Component {
  constructor(props) {
    super(props);
    this.Constant = {
      centerPos: {  // 中心点
        left: 0,
        top: 0
      },
      hPosRange: {  // 水平方向的取值范围
        leftSecX: [0, 0],
        rightSecX: [0, 0],
        y: [0, 0]
      },
      vPosRange: {  // 垂直方向的取值范围
        x: [0, 0],
        topY: [0, 0]
      }
    };
    this.state = {
      imagesArrangeArr: []
    }
  };
  /*
  * @param index传入当前inver操作的索引 
  * @ruturn {function} 闭包函数，其内的ruturn一个真正被执行的函数
  */
  handleInverse(index) {
    return function() {
      let imgsArrangeArr = this.state.imagesArrangeArr;
      imgsArrangeArr[index].isInverse = !imgsArrangeArr[index].isInverse
      this.setState({
        imagesArrangeArr: imgsArrangeArr
      })
    }.bind(this)
  };

  /*
  * @param 需要居中元素的索引
  * @ruturn {function} 闭包函数，其内的ruturn一个真正被执行的函数
  */
  center(index) {
    return function() {
      this.rearRange(index)
    }.bind(this);
  };
  componentDidMount() {
    // 拿到整个舞台的大小
    const stageDOM = ReactDOM.findDOMNode(this.refs.stage),
      stageW = stageDOM.scrollWidth,
      stageH = stageDOM.scrollHeight,
      halfStageW = stageW / 2,
      halfStageH = stageH / 2,
      // 拿到整个的ImgFigure的大小
      imageDOM = ReactDOM.findDOMNode(this.refs.figure0),
      imageW = imageDOM.scrollWidth,
      imageH = imageDOM.scrollHeight,
      halfImageW = imageW / 2,
      halfImageH = imageH / 2;
    // 计算中心元素的位置
    this.Constant.centerPos.left = halfStageW - halfImageW;
    this.Constant.centerPos.top = halfStageH - halfImageH;
    // 计算水平方向的取值范围
    this.Constant.hPosRange.leftSecX[0] = -halfImageW;
    this.Constant.hPosRange.leftSecX[1] = halfStageW - halfImageW * 3;
    this.Constant.hPosRange.rightSecX[0] = halfStageW + halfImageW;
    this.Constant.hPosRange.rightSecX[1] = stageW - halfImageW;
    this.Constant.hPosRange.y[0] = -halfImageH;
    this.Constant.hPosRange.y[1] = stageH - halfImageH;
    // 计算垂直方向的取值范围
    this.Constant.vPosRange.x[0] = halfStageW - imageW;
    this.Constant.vPosRange.x[1] = halfStageW;
    this.Constant.vPosRange.topY[0] = -halfImageH;
    this.Constant.vPosRange.topY[1] = halfStageH - halfImageH * 3;
    this.rearRange(0)
  };
  /*
   * 重新布局所有的图片
   * @param cneterIndex指定居中排布的图片索引
  */
  rearRange(centerIndex) {
    const imgsArrangeArr = this.state.imagesArrangeArr,
      constant = this.Constant,
      centerPos = constant.centerPos,
      hPosRange = constant.hPosRange,
      vPosRange = constant.vPosRange,
      hPosRangeLeftSecX = hPosRange.leftSecX,
      hPosRangeRightSecX = hPosRange.rightSecX,
      hPosRangeY = hPosRange.y,
      vPosRangeX = vPosRange.x,
      vPosRangeTopY = vPosRange.topY,
      // 获取中间的内容
      imgsArrangeCenterArr = imgsArrangeArr.splice(centerIndex, 1),
      // 获取上面的内容
      topImgNum = Math.floor(Math.random() * 2),
      topImgSpliceIndex = Math.ceil(Math.random() * (imgsArrangeArr.length - topImgNum)),
      imgsArrangeTopArr = imgsArrangeArr.splice(topImgSpliceIndex, topImgNum);

    // 居中的cneterIndex图片布局
    imgsArrangeCenterArr[0] = {
      pos: centerPos,
      rotate: 0,
      isCenter: true
    }

    // 布局位于上测的图片
    imgsArrangeTopArr.forEach((item, index) => {
      imgsArrangeTopArr[index] = {
        pos: {
          left: random(vPosRangeX[0], vPosRangeX[1]),
          top: random(vPosRangeTopY[0], vPosRangeTopY[1])
        },
        rotate: randomDeg(),
        isCenter: false
      }
    })
    // 布局左右两边的图片
    for (let i = 0, k = imgsArrangeArr.length; i < k; i++) {
     let hPosRangeX = null;
      if (i % 2 === 0) {
        hPosRangeX = hPosRangeLeftSecX;
      } else {
        hPosRangeX = hPosRangeRightSecX;
      }
      imgsArrangeArr[i] =  {
        pos: {
          left: random(hPosRangeX[0], hPosRangeX[1]),
          top: random(hPosRangeY[0], hPosRangeY[1])
        },
        rotate: randomDeg(),
        isCenter: false,
      }
    }

    if (imgsArrangeTopArr && imgsArrangeTopArr[0]) {
      imgsArrangeArr.splice(topImgSpliceIndex, 0, imgsArrangeTopArr[0]);
    }
    imgsArrangeArr.splice(centerIndex, 0, imgsArrangeCenterArr[0]);

    // 设置总的图片位置信息
    this.setState({
      imagesArrangeArr: imgsArrangeArr
    })
  };
  render() {
    let controllerUnits = [];
    let ImgFigures = [];
    imageData.forEach((item, index) => {
      if (!this.state.imagesArrangeArr[index]) {
        this.state.imagesArrangeArr[index] = {
          pos: {
            left: 0,
            top: 0
          },
          rotate: 0,  // 旋转角度
          isInverse: false, // 是否翻转
          isCenter: false   // 是否居中
        }
      }
      ImgFigures.push(<ImgFigure data={item} key={item.fileName} 
        ref={`figure${index}`} arrange={this.state.imagesArrangeArr[index]} 
        inverse={this.handleInverse(index)} center={this.center(index)}/>)

      controllerUnits.push(<ControllerUnit key={item.fileName} arrange={this.state.imagesArrangeArr[index]}
        inverse={this.handleInverse(index)} center={this.center(index)}/>)
    })
    return (
      <div className="stage" ref="stage">
        <section className="image-sec">
          {ImgFigures}
        </section>
        <nav className='controller-nav'>
          {controllerUnits}
        </nav>
      </div>
    );
  }
}

export default App;
