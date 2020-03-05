/* eslint-disable jsx-a11y/alt-text */
import React, { Component } from 'react';
import { Upload } from 'antd';
import { upload } from "../../api/request";

export default class Setting extends Component {
    constructor(props) {
        super(props);
        this.state = {
            img:""
        }
    }
    upload = ({file}) => {
        var form = new FormData();
        form.append("file",file);
        upload(form).then((res) => {
            // console.log(res);
            if (res.status === 0) {
                this.setState({
                    img:"http://localhost:4000" + res.path
                })
            }
        })

    }
    render() {
        return (
            <div>
                <Upload name="avatar" listType="picture-card" showUploadList={false} customRequest={this.upload}>
                    {this.state.img ? <img style={{"width":"100px"}} src={this.state.img} /> : "上传"}
                </Upload>
            </div>
        )
    }
}
