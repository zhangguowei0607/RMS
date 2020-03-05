import React, { Component } from 'react';
import { Layout, Menu, Icon, Dropdown, Badge } from 'antd';
import { withRouter } from "react-router-dom";
import {quit} from '../../api/request'
import { connect } from "react-redux";
const { Header, Content, Sider } = Layout;

// 获取redux中的数据
var mapState = (state) => {
    console.log(state);
    return {
        length:state.list.filter((item)=>!item.read).length
    }
}
@connect(mapState)
class Admin extends Component {
    go = ({ item, key, keyPath, domEvent }) => {
        if(key==="/quit"){
            quit().then((res)=>{
                if(res.status===0){
                    sessionStorage.clear();
                    this.props.history.push("/")
                }
            })
        } 
        else{
            this.props.history.push(key);
        }
    }
    showMenu = () => {
        return (
            <Menu>
                <Menu.Item onClick={this.go} key="/home/notify">
                    <Badge dot={Boolean(this.props.length)}>通知中心</Badge>
                </Menu.Item>
                <Menu.Item onClick={this.go} key="/quit">
                    退出
                </Menu.Item>
            </Menu>
        )
    }
    render() {
        return (
            <div>
                <Layout>
                <Header className="header" style={{"display":"flex","justifyContent":"space-between"}}>
                    <div style={{ color: 'white', textAlign: "left" }}>xxx管理系统</div>
                    <div>
                        <Dropdown overlay={this.showMenu()}>
                            {/* Error: React.Children.only expected to receive a single React element child. */}
                            {/* Ant Design中<Dropdown></Dropdown> 组件内部最外层只能接受一个元素，而代码中有三个元素，所以报错。 */}
                            <Badge count={this.props.length}>
                                <div style={{"color":"white","cursor":"pointer"}}>
                                    你好:{sessionStorage.getItem("username")}
                                </div>
                            </Badge>
                        </Dropdown>
                    </div>
                </Header>
                <Layout>
                <Sider width={200} style={{ background: '#fff' }}>
                    <Menu
                    mode="inline"
                    selectedKeys={this.props.location.pathname} // 决定选中的菜单项
                    defaultOpenKeys={['sub1']}
                    style={{ height: '100%', borderRight: 0, textAlign: "left" }}
                    >
                        <Menu.Item key="/home/dashboard" onClick={this.go}><Icon type="dashboard" />仪表盘</Menu.Item>
                        <Menu.Item key="/home/list" onClick={this.go}><Icon type="unordered-list" />列表管理</Menu.Item>
                        <Menu.Item key="/home/setting" onClick={this.go}><Icon type="setting" />设置</Menu.Item>
                        <Menu.Item key="/quit"  onClick={this.go}><Icon type="close-circle" />退出</Menu.Item>
                    </Menu>
                </Sider>
                <Layout style={{ padding: '0 24px 24px' }}>
                    <Content
                    style={{
                        background: '#fff',
                        padding: 24,
                        margin: 0,
                        minHeight: 280,
                    }}
                    >
                    {this.props.children}
                    </Content>
                </Layout>
                </Layout>
            </Layout>
            </div>
        )
    }
}

export default withRouter(Admin);
