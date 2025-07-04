// 配置 axios
import axios from 'axios';
import router from '@/router';
import { ElNotification } from 'element-plus';

let http = axios.create({
    withCredentials: true, //允许传递 cookie
    baseURL: '/api',
});

//service  拦截器

// 添加请求拦截器
http.interceptors.request.use(
    function (config) {
        // 在发送请求之前做些什么
        // console.log("请求拦截器")
        // console.log("\r\n\r\n");
        // console.log("config.url: " + config.url);
        // console.log("config.method:" + config.method);
        // console.log("config.params:" + config.params);
        // console.log("\r\n\r\n");
        if (config.method == 'get' && config.params) {
            const encodeParam = new URLSearchParams(config.params);
            // console.log("encodeParam", encodeParam);

            config.params = encodeParam;
        }

        return config;
    },
    function (error) {
        // 对请求错误做些什么
        return Promise.reject(error);
    }
);

// 添加响应拦截器
http.interceptors.response.use(
    function (response) {
        // 对响应数据做点什么
        // console.log("响应拦截器");

        // console.log("router",router);

        let { status, data } = response;
        if (status == 200) {
            //表示  网络请求请求成功了
            /***
             * data {
             *   code : 响应的代码   404 500   200
             *   msg: 失败的原因
             *   data:  在200的情况下返回的数据
             *
             * }
             */
            let { code, msg } = data;
            if (code == 200) {
                // console.log("拦截器", data);
                return data.data;
            } else if (code == 401) {
                // alert(msg || "未登录");

                // console.log("router",router)

                ElNotification({
                    title: 'Error',
                    message: msg || '未登录',
                    type: 'error',
                });
                router.replace({ path: '/login' });
                //需要编写代码重新登录
                return;
            } else if (code == 404) {
                // alert(msg || "请求地址异常");
                ElNotification({
                    title: 'Error',
                    message: msg || '请求地址异常',
                    type: 'error',
                });
                return;
            } else if (code == 500) {
                // alert(msg || "服务器异常");
                ElNotification({
                    title: 'Error',
                    message: msg || '服务器异常,请查看IDEA控制台',
                    type: 'error',
                });
                return;
            }
        }

        return response;
    },
    function (error) {
        // 对响应错误做点什么
        return Promise.reject(error);
    }
);

interface Result<T> {
    code: number;
    msg?: string;
    data?: T;
}

/***
 * {{
 *     data:{}ss
 * }}
 */
const service = {
    get<T>(url: string, config?: axios.AxiosRequestConfig): Promise<T> {
        return http.get<T, Result<T>>(url, config);
    },
    post<T>(url: string, config?: axios.AxiosRequestConfig): Promise<T> {
        return http.post<T, Result<T>>(url, config);
    },
};

export { service };
