import React, { Component } from 'react';
import E from "echarts";
import { Row, Col } from 'antd';

export default class DashBoard extends Component {
    randColor() { // 产生随机颜色
        var r = Math.floor(Math.random()*256); // 0-255
        var g = Math.floor(Math.random()*256); // 0-255
        var b = Math.floor(Math.random()*256); // 0-255
        return '#' + r.toString(16).padStart(2,'0') + g.toString(16).padStart(2,'0') + b.toString(16).padStart(2,'0');
    }
    componentDidMount() {
        var myChart = E.init(this.node);

        // 指定图表的配置项和数据
        var option = {
            title: {
                text: 'ECharts 入门示例'
            },
            tooltip: {},
            legend: {
                data:['销量']
            },
            xAxis: {
                data: ["衬衫","羊毛衫","雪纺衫","裤子","高跟鞋","袜子"]
            },
            yAxis: {},
            series: [{
                name: '销量',
                type: 'bar',
                data: [5, 20, 36, 10, 10, 20]
            }]
        };

        // 使用刚指定的配置项和数据显示图表。
        myChart.setOption(option);
    }
    render() {
        return (
            <div>
                <Row style={{"marginBottom":"30px"}}>
                    <Col span={6} style={{"background":this.randColor(),"height":"50px","lineHeight":"50px"}}>总访问量:10000</Col>
                    <Col span={6} style={{"background":this.randColor(),"height":"50px","lineHeight":"50px"}}>今日访问:1</Col>
                    <Col span={6} style={{"background":this.randColor(),"height":"50px","lineHeight":"50px"}}>一周访问:10</Col>
                    <Col span={6} style={{"background":this.randColor(),"height":"50px","lineHeight":"50px"}}>一月访问:100</Col>
                </Row>
                <div ref={(node)=>this.node=node} style={{"height":"400px","width":"600px","margin":"0 auto"}}></div>
            </div>
        )
    }
}
