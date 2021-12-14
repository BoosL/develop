//服务器
let protocolStr = document.location.protocol;
// export const HOST = "http://192.168.1.85:9110"
// export const HOST = "http://192.168.1.221:9016"; //游望
// export const HOST = "http://192.168.1.131:9016" //于洋
// export const HOST = "http://192.168.1.190:9016"; //海峰
// export const HOST = "http://192.168.1.130:9016"; //陈勇宏
// export const HOST = "http://192.168.1.64:9016"; //波哥
// export const HOST = "http://192.168.1.166:9016"; //兴付
// export const HOST = "http://192.168.1.235:9016" //李国
// export const HOST = "http://192.168.1.64:9016" // 起点
// export const HOST = `${protocolStr}//m.qxy37.net/wapapis`; //朱日和
export const HOST = "http://m.qxy37.com/wapapis"; //正式环境

//消息中心服务器
// export const HOST_MSG = `http://192.168.1.235:9060`
// export const HOST_MSG = `${protocolStr}//m.qxy37.com/msgapis`;
export const HOST_MSG = `${protocolStr}//m.qxy37.net/msgapis`;
// export const HOST_MSG = `http://m.qxy37.com/msg`

//图片地址
export const imgUrlBase = `${protocolStr}//upload1.qxy37.net`;

//动态图片地址
export const activeImgUrlBase = `${protocolStr}//m.qxy37.net/wapapis/shop/h5/open`;

//服务器地址
// export const wapUrl = "${protocolStr}//m.qxy37.xyz"
export const wapUrl = `${protocolStr}//m.qxy37.net`;
// 众销平台地址
export const marketUrl = `${protocolStr}//b.qxy37.net`;

//消息地址
// export const serverUrl = "ws://192.168.1.236:8060"
export const serverUrl = "ws://im.qxy37.net/apis";


export const weixin_url = `${protocolStr}//m.qxy37.net/payMoney.html`;  // 登录微信回调地址

export const weixin_url_open = `${protocolStr}//m.qxy37.net/payMoneyOpen.html`; // 不登录微信回调地址

export const weixin_url2 = `${protocolStr}//m.qxy37.net/popularize/myExtend`;
// 蛋糕券活动页
export const cake_url2 = `${protocolStr}//m.qxy37.net/coupon/cakeCoupon`;
//2020双节活动落地页
export const national_url = `${protocolStr}//m.qxy37.net/ad`;
// export const weixin_appid = "wx994c9e7af854eba6"; 
export const weixin_appid = "wx519bfa2e15ad0b34";
export const jp_appid = "wx44101fdd8be4c0bd";

export const weixin_scope = "snsapi_base";

//加密KEY
export const KEY = "1234123412ABCDEF"; //十六位十六进制数作为密钥
