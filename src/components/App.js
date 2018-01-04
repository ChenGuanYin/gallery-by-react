import React, { Component } from 'react';
import ImgFigure from './ImgFigure.jsx';
import '../css/App.css';
import data from '../data/imageDatas.json';

let imageData = (function getImageUrl(dataArr) {
  dataArr.forEach((item) => {
    item.imageUrl = require(`../images/${item.fileName}`)
  });
  return dataArr
})(data);

class App extends Component {
  constructor(props) {
    super(props);
    this.Constant = {
      centerPos: {  // 中心点
      left: 0,
      right: 0
    },
    hposRange: {  // 水平方向的取值范围
      leftSecX: [0, 0],
      rightSecX: [0, 0],
      y: [0, 0]
    },
    vPosRange: {  // 垂直方向的取值范围
      x: [0, 0],
      topY: [0, 0]
    }
  }
  }
  render() {
    let controllerUnits = [];
    let ImgFigures = [];
    imageData.forEach((item) => {
      ImgFigures.push(<ImgFigure data={item} key={item.fileName}/>)
    })
    return (
      <div className="stage">
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
