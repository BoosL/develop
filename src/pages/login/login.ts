import login from "../../api/login";
import { Encrypt, debounce, throttle } from "../../until/until";
import { ref } from "vue";
export function loginCode() {
  let cellphone = ref(""),
      codeStatus = ref(true),
      numberCount = ref(59),
      code = ref(""),
      loginController = ref(false);
  //获取验证码
  function getCode(this: any, e: any) {
    e.preventDefault();
    if (cellphone.value === "") {
      this.$toast("请输入手机号");
      return;
    }
    // 节流
    if (!this.clickMe) {
      this.clickMe = throttle(function(){
        console.log('123:');
        login.loginCode({
          phone: cellphone.value,
        }).then((res: any) => {
          codeStatus.value = false;
          numberCount.value--;
          if (numberCount.value <= 1) {
            //  清除定时器
            codeStatus.value = true;
            numberCount.value = 59;
          }
        });
      }, 1000)
    }
    this.clickMe();
     
  };
  //登录注册正则验证
  function validate(this: any) {
    let pattern = /^1[3456789]\d{9}$/;
    if (!this.clickMe) {
      this.clickMe = debounce(function(){
          console.log('123:');
      }, 1000)
    }
    this.clickMe('zhoulw');
    if (!cellphone.value || !pattern.test(cellphone.value)) {
      this.$toast.fail("请正确填写您的手机号");
      loginController.value = false;
      return false;
    }
    
    if (!code.value || code.value.length != 6) {
      loginController.value = false;
      return false;
    }
    loginController.value = true;
  };
  // 登录
  function loginClick(this: any) {
    // 防抖
    debounce(login,2000)
    if (!this.clickMe) {
      this.clickMe = debounce(function(this: any){
        console.log('111:');
        login.login({
          phone: cellphone.value,
          code: code.value,
        }).then((res: any) => {
          console.log(res,'login');
          if(res.data !== null){
            this.$toast({
              type: "success",
              message: res.data.message,
            });
            localStorage.setItem(
              "userInfo",
              Encrypt(JSON.stringify(res.data.data))
            );
            this.$router.push("/singleProduct");
          }
        });
      }, 1000)
    }
  };
  return {
    cellphone,
    code,
    codeStatus,
    numberCount,
    loginController,
    validate,
    getCode,
    loginClick
  };
}