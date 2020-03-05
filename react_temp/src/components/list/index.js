import React, { Component } from 'react'
import { Table, Card, Modal, message } from "antd";
import { getList, remove } from "../../api/request";
const { confirm } = Modal;
export default class List extends Component {
    constructor(props) {
        super(props);
        this.state = {
            count:0, // 总数
            pageSize:5, // 分页
            id: -1, // 删除对应的id
            visible: false, // 确认删除提示框显隐
            key: "updatable", // 正在删除全局提示
            dataSource : [],
            columns : [
                {
                  title: '姓名',
                  dataIndex: 'name',
                  key: 'name',
                },
                {
                  title: '年龄',
                  dataIndex: 'age',
                  key: 'age',
                },
                {
                  title: '操作',
                  dataIndex: 'operate',
                  key: 'operate',
                  render: (next,record) => {
                    //   console.log(record);
                      return <button onClick={this.showDeleteConfirm.bind(this,record.key)}>删除</button>
                  }
                },
            ]
        }
    }
    showDeleteConfirm(id) {
        this.setState({
            id,
            visible:true
        })
        confirm({
            title: '你确认要删除吗?',
            okText: '确认',
            cancelText: '取消',
            visible: this.state.visible,
            onOk: this.handleOk, 
            onCancel: this.handleCancel
        });
    }
    handleCancel = () => { // 删除取消按钮
        this.setState({
            visible:false
        })
    }
    handleOk = () => { // 删除确认点击
        let {key} = this.state;
        message.loading({ content: '正在删除...', key });
        setTimeout(() => {
            message.success({ content: '删除成功!', key, duration: 2 });
            remove(this.state.id).then((res) => {
                if (res.status === 0) {
                    this.getData(1,this.state.count);
                }
            }).finally(() => {
                this.setState({
                    visible:false
                })
            })
        }, 1000);
    }
    componentDidMount() {
        this.getData(1,this.state.pageSize);
    }
    getData(page,pageSize) {
        getList(page,pageSize).then((res) => {
            // console.log(res);
            var list = res.list.map((item) => {
                return {
                    key: item._id,
                    name: item.name,
                    age: item.age,
                }
            })
            this.setState({
                dataSource:list,
                count:res.count
            })
        })
    }
    getPageContent = (page,pageSize) => {
        this.getData(page,pageSize);
    }
    componentWillUnmount() { // 解决异步数据回来的时候，组件却卸载了的问题
        // 重写组件的setState方法，直接返回空
        this.setState = (state,callback) => {
            return;
        }
    }
    goAdd = () => {
        this.props.history.push("/home/add");
    }
    render() {
        let { dataSource, columns, count, pageSize } = this.state;
        return (
            <div>
                <Card bordered={false} title="学生列表" extra={<button onClick={this.goAdd}>添加</button>}>
                    <Table dataSource={dataSource} columns={columns} pagination={{total:count,pageSize:pageSize,onChange:this.getPageContent}} />;
                </Card>
            </div>
        )
    }
}
