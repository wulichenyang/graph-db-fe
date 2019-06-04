// /**
//  * axios封装
//  * 请求拦截、响应拦截、错误统一处理
//  */
// import axios from "axios";
// import { AxiosResponse } from "axios"
// import { ApiConfig } from "@/../config/index.ts"
// import { Toast } from 'vant'
// import cookie from "@/assets/js/cookie.ts";
// import router from "@/router"

// // import router from '../router';
// // import store from '../store/index';

// // /**
// //  * 提示函数
// //  * 禁止点击蒙层、显示一秒后关闭
// //  */
// // const tip = msg => {
// //   Toast({
// //     message: msg,
// //     duration: 1000,
// //     forbidClick: true
// //   });
// // }

// /**
//  * 跳转登录页
//  * 携带当前页面路由，以期在登录页面完成登录后返回当前页面
//  */
// const toLogin = () => {
//   router.replace({
//     path: '/login',
//   });
// }

// /**
//  * 请求失败后的错误统一处理
//  * @param {Number} status 请求失败的状态码
//  */
// const errorHandle = (status: number, msg: string): void => {
//   // 状态码判断
//   switch (status) {
//     // 501: Not Implemented
//     case 501:
//       // Toast('501 请求错误')
//       Toast(msg)
//       break;
//     // 502: 内部服务器错误
//     case 502:
//       // Toast('502 请求错误')
//       Toast(msg || '502 密码错误')
//       break;
//     // 400: bad request
//     case 400:
//       // Toast('400 错误的请求')
//       Toast(msg)
//       break;
//     case 401:
//       // toLogin();
//       // Toast('401 未登录')
//       Toast(msg)
//       console.log("401")
//       break;
//     // 403 token过期
//     // 清除token并跳转登录页
//     case 403:
//       // Toast('403 登录过期，请重新登录')
//       Toast(msg)
//       console.log("403 登录过期，请重新登录");
//       // localStorage.removeItem('token');
//       // store.commit('loginSuccess', null);
//       // setTimeout(() => {
//       //   toLogin();
//       // }, 1000);
//       break;
//     // 404请求不存在
//     case 404:
//       // Toast('404 请求的资源不存在')
//       Toast(msg)
//       console.log("请求的资源不存在");
//       break;
//     case 301:
//       // 网易云的301是未登录 具体其他再设置
//       // 301 Moved Permanently
//       cookie.removeCookie('accessToken')
//       toLogin()
//       Toast(msg)
//       console.log("301 Moved Permanently")
//     default:
//       Toast(msg)
//       console.log(msg);
//   }
// }

// // 创建axios实例
// const instance = axios.create({ timeout: 1000 * 12 });
// // 设置CORS头部携带cookie
// instance.defaults.withCredentials = true
// // 设置post请求头
// instance.defaults.headers.post["Content-Type"] = "application/x-www-form-urlencoded";
// /**
//  * 请求拦截器
//  * 每次请求前，如果存在token则在请求头中携带token
//  */
// instance.interceptors.request.use(
//   // (config: any) => {
//   //   // 登录流程控制中，根据本地是否存在token判断用户的登录情况
//   //   // 但是即使token存在，也有可能token是过期的，所以在每次的请求头中携带token
//   //   // 后台根据携带的token判断用户的登录情况，并返回给我们对应的状态码
//   //   // 而后我们可以在响应拦截器中，根据状态码进行一些统一的操作。

//   //   // const token = store.state.token;
//   //   // token && (config.headers.Authorization = token);
//   //   return config;
//   // },
//   // (error: any) => Promise.error(error)
// )

// // 响应拦截器
// instance.interceptors.response.use(
//   // 请求成功
//   (res: AxiosResponse) => res.status === 200 ? Promise.resolve(res) : Promise.reject(res),
//   // 请求失败
//   (error) => {
//     const { response } = error;
//     // response 是axio返回的对象
//     // response.data是服务器返回的对象
//     if (response) {
//       // 请求已发出，但是不在2xx的范围
//       errorHandle(response.status, response.data.msg);
//       return Promise.reject(response);
//     } else {
//       // 处理断网的情况
//       // eg:请求超时或断网时，更新state的network状态
//       // network状态在app.vue中控制着一个全局的断网提示组件的显示隐藏
//       // 关于断网组件中的刷新重新获取数据，会在断网组件中说明
//       // store.commit('changeNetwork', false);
//     }
//   });
// /**
//  * get方法，对应get请求
//  * @param {String} url [请求的url地址]
//  * @param {Object} params [请求时携带的参数]
//  */
// export async function get(url: string, params?: any) {
//   try {
//     return await instance.get(ApiConfig.HOST + url, {
//       params,
//     })
//   } catch (error) {
//     console.error("Api request error: " + error)
//     return new Promise((r, f) => {
//       return f({
//         data: {},
//         msg: "Get Api request error",
//         status: 1,
//       })
//     })
//   }
// }
// /**
// * post方法，对应post请求
// * @param {String} url [请求的url地址]
// * @param {Object} params [请求时携带的参数]
// */
// export async function post(url: string, params: any) {
//   try {
//     return await instance.post(ApiConfig.HOST + url, params)
//   } catch (error) {
//     console.error("Api request error: " + error)
//     return new Promise((r, f) => {
//       return f({
//         data: {},
//         msg: "Post Api request error",
//         status: 1,
//       })
//     })
//   }
// }

// // export default instance;
