import React, { Component } from 'react';
import { Form, Icon, Input, Button, Card } from 'antd';
import { login } from "../../api/request";

@Form.create()
class Login extends Component {
    handleSubmit = e => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
               //登陆
                login(values.username,values.password).then((res)=>{
                   
                    if(res.status ===0 && res.data.login){
                         sessionStorage.setItem("username",values.username);
                         sessionStorage.setItem("token",res.data.token);
                         this.props.history.push("/home/list")
                    }
                })
            }
        });
    };
    
    render() {
        const { getFieldDecorator } = this.props.form;
        return (
            <Card title="xxx管理系统" style={{"width":"310px","margin":"20px auto","background":"#eeeeee","boxShadow":"0 0 4px gray","borderRadius":"5px"}}>
                <Form onSubmit={this.handleSubmit} className="login-form">
                    <Form.Item>
                        {getFieldDecorator('username', {
                            rules: [{ required: true, message: 'Please input your username!' }],
                        })(
                            <Input
                            prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                            placeholder="Username" style={{"width":"260px"}}
                            />,
                        )}
                    </Form.Item>
                    <Form.Item>
                        {getFieldDecorator('password', {
                            rules: [{ required: true, message: 'Please input your Password!' }],
                        })(
                            <Input
                            prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                            type="password" style={{"width":"260px"}}
                            placeholder="Password"
                            />,
                        )}
                    </Form.Item>
                    <Form.Item style={{"textAlign":"center"}}>
                        <Button type="primary" htmlType="submit" className="login-form-button">
                            登录
                        </Button>
                    </Form.Item>
                </Form>
            </Card>
        );
    }
}

export default Login;
