/**
 * axios基础构建
 * @date 2021-02-04
 */
import { HOST } from './config';
import instance from './intercept';
import { AxiosRequest, CustomResponse } from './types';
import { Decrypt, Encrypt } from '../until/until';
import { Toast } from 'vant';

 // 外部传入的baseUrl
 const token = window.localStorage.getItem("userInfo")? JSON.parse(Decrypt(window.localStorage.getItem("userInfo"))).token: "",
        reqURL = HOST,
        header: object = {
          'Content-Type': 'application/json;charset=UTF-8',
          'X-Requested-With': 'XMLHttpRequest',
          token: token
        };

class Abstract {
  private apiAxios({ baseURL = reqURL, headers = header, method, url, data, params, responseType, show }: AxiosRequest): Promise<CustomResponse> {
    return new Promise((resolve, reject) => {
      instance({
        baseURL,
        headers,
        method,
        url,
        params,
        data,
        responseType,
      }).then((res) => {
        if (res.headers.token) {
          resetToken(res.headers);
        }
        // 200:服务端业务处理正常结束
        if (res.status === 200) {
          if (res.data.success) {
            resolve({ status: true, message: 'success', data: res.data?.data, origin: res.data });
          } else {
            Toast.fail({ message: res.data?.message });
            resolve({ status: false, message: res.data?.message, data: res.data?.data, origin: res.data });
          }
        } else {
          resolve({ status: false, message: res.data?.message, data: null });
        }
      }).catch((err) => {
        const message = err?.data?.message || err?.message;
        Toast.fail({ message });
        reject({ status: false, message, data: null });
      });
    });
  }

  /**
   * GET类型的网络请求
   */
  protected getRequest({  url, data, params, responseType, show }: AxiosRequest) {
    return this.apiAxios({ method: 'GET', url, data, params, responseType,show });
  }

  /**
   * POST类型的网络请求
   */
  protected postRequest({  url, data, params, responseType, show }: AxiosRequest) {
    return this.apiAxios({ method: 'POST', url, data, params, responseType, show });
  }

  /**
   * PUT类型的网络请求
   */
  protected putRequest({  url, data, params, responseType }: AxiosRequest) {
    return this.apiAxios({ method: 'PUT', url, data, params, responseType });
  }

   /**
   * PATCH类型的网络请求
   */
  protected patchRequest({  url, data, params, responseType }: AxiosRequest) {
    return this.apiAxios({ method: 'PATCH', url, data, params, responseType });
  }

  /**
   * DELETE类型的网络请求
   */
  protected deleteRequest({  url, data, params, responseType }: AxiosRequest) {
    return this.apiAxios({ method: 'DELETE', url, data, params, responseType });
  }
}

export default Abstract;


function resetToken(header:any) {
  let userInfo = JSON.parse(Decrypt(window.localStorage.getItem("userInfo")));
  delete userInfo["token"];
  userInfo["token"] = header.token;
  window.localStorage.setItem("userInfo", Encrypt(JSON.stringify(userInfo)));
}