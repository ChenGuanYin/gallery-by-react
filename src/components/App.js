import React, { Component } from 'react';
import '../css/App.css';
import data from '../data/imageDatas.json';

let imageData = (function getImageUrl(dataArr) {
  dataArr.forEach((item) => {
    item.imageUrl = require(`../images/${item.fileName}`)
  });
  return dataArr
})(data);
console.log(imageData)
class App extends Component {
  render() {
    return (
      <div className="stage">
        <section className="image-sec">
        </section> 
        <nav className='controller-nav'>
        </nav>
      </div>
    );
  }
}

export default App;
