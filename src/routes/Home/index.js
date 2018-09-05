import React, {Component} from 'react'
import './index.less';
import XLSX from 'xlsx';
var wb;//读取完成的数据
export default class Home extends Component {
  importf = (e) => {
    let obj = e.target
    if (!obj.files) {
      return;
    }
    var f = obj.files[0];
    var reader = new FileReader();
    reader.readAsBinaryString(f);
    
    reader.onload = function (e) {
      var data = e.target.result;
      wb = XLSX.read(data, {type: 'binary'});
      //wb.SheetNames[0]是获取Sheets中第一个Sheet的名字 wb.Sheets[Sheet名]获取第一个Sheet的数据
      console.log(wb.SheetNames[0]);
      console.log(wb);
      
      
      document
        .getElementById("demo")
        .innerHTML = JSON.stringify(XLSX.utils.sheet_to_json(wb.Sheets[wb.SheetNames[0]]));
    };
  }
  render() {
    return (
      <div className="home">
        <input type="file" onChange={this.importf} />
        <div id="demo"></div>
      </div>
    )
  }
}
