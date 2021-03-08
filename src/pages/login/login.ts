import login from "../../api/login";
import { Encrypt } from "../../until/until";
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
    login.loginCode({
      phone: cellphone.value,
    }).then((res: any) => {
      codeStatus.value = false;
      let timer = setInterval(() => {
        numberCount.value--;
        if (numberCount.value <= 1) {
          //  清除定时器
          clearInterval(timer);
          codeStatus.value = true;
          numberCount.value = 59;
        }
      }, 1000);
    });
  };
  //登录注册正则验证
  function validate(this: any) {
    let pattern = /^1[3456789]\d{9}$/;
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
    login.login({
      phone: cellphone.value,
      code: code.value,
    }).then((res: any) => {
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