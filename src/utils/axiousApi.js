import axios from 'axios'
import {Message} from 'element-ui'
import { getToken } from "@/utils/auth";
import store from "@/store";

axios.interceptors.request.use(config => {
    if (store.getters.token) {
        config.headers['token'] = getToken();
    }
    return config;
}, err => {
    Message.error({message: '请求超时!'});
    // return Promise.resolve(err);
})
axios.interceptors.response.use(data => {
    if (data.status && data.status == 200 && data.data.status == 500) {
        Message.error({message: data.data.msg});
        return;
    }
    if (data.data.msg) {
        Message.success({message: data.data.msg});
    }
    return data;
}, err => {
    if (err.response.status == 504 || err.response.status == 404) {
        Message.error({message: '服务器被吃了⊙﹏⊙∥'});
    } else if (err.response.status == 403) {
        Message.error({message: '权限不足,请联系管理员!'});
    } else if (err.response.status == 401) {
        Message.error({message: err.response.data.msg});
    } else {
        if (err.response.data.msg) {
            Message.error({message: err.response.data.msg});
        }else{
            Message.error({message: '未知错误!'});
        }
    }
    // return Promise.resolve(err);
})
//生产环境使用
//let base = 'http://120.27.241.26:8990';
//dev环境使用
let base = '';
export const postRequest = (url, params) => {
    return axios({
        method: 'post',
        url: `${base}${url}`,
        data: params,
        transformRequest: [function (data) {
            let ret = ''
            for (let it in data) {
                ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&'
            }
            return ret
        }]
    });
};
export const getRequest = (url) => {
    return axios({
        method: 'get',
        url: `${base}${url}`
    });
};
export const uploadFileRequest = (url, params) => {
    return axios({
        method: 'post',
        url: `${base}${url}`,
        data: params,
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    });
};
