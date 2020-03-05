import axios from "./index";

export const getList = (page,pageSize) => { // 分页的接口
    return axios.get("/pagelist",{params:{page,pageSize}});
}

export const add = (name,age) => { // 添加的接口
    return axios.post("/add",{name,age});
}

export const remove = (id) => { // 删除的接口
    return axios.post("/del",{id});
}

export const login = (username,password) => { // 登录的接口
    return axios.post("/users/login",{username,password});
}

export const quit = () => { // 登录的接口
    return axios.post("/users/quit");
}

export const upload = (data) => { // 上传的接口  data是上传的表单数据 fromdata
    return axios.post("/upload",data);
}