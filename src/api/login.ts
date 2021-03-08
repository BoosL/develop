/**
 * 基础数据 API 集合类
 * 集成Abstract
 * @date 2021-02-03
 */
import Abstract from '../axios/abstract';

class Basic extends Abstract {
    loginCode(params:any) {
        const url = "/shop/h5/open/user/sms/sign/code";
        return new Promise(resolve => {
            this.postRequest({ url, params }).then(res => {
            resolve(res);
            });
        });
    }

    login(params:any) {
        const url = "/shop/h5/open/user/sms/share/sale/login";
        return new Promise(resolve => {
            this.postRequest({ url, params }).then(res => {
            resolve(res);
            });
        });
    }
}
// 单列模式返回对象
let login;
export default (() => {
    if (login) return login;
    login = new Basic();
    return login;
})();
