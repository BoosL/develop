<template>
  <div class="login">
    <div class="login-b">
      <h1>登录</h1>
      <div class="phone">
        <input type="tel" placeholder="请输入手机号" v-model="cellphone" @blur="validate()" />
      </div>
      <div class="ver-code">
        <input type="text" placeholder="请输入验证码" v-model="code" @input="validate()" />
        <button @click="getCode">
          <span v-if="codeStatus">获取验证码</span>
          <span v-else>{{numberCount}}s后重新发送</span>
        </button>
      </div>
      <div class="login-btn">
        <!-- v-if="loginController" -->
        <button class="btn btn-ori"  @click="loginClick">登录</button>
        <!-- <button class="btn btn-grey" v-else>登录</button> -->
      </div>
      <p class="prompt" @click="$router.push('/register')">没有账户，立即注册</p>
      <button @click="myFn">change</button>
      <div v-for="(item,i) in arrone" :key="i">
        <span>{{ item.name }}</span>
        <p v-show="item.check">呜哈哈</p>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent,ref,reactive,toRef } from "vue";
import { loginCode } from "./login";
export default defineComponent({
  name: "login",
  data(){
    return{
      accountBalance: [
        {
          num: 1
        }
      ]
    }
  },
  // beforeMount(){
  //   console.log('beforeMount');
  // },
  // mounted(){
  //   console.log('mounted');
  // },
  // beforeCreate(){
  //   console.log('beforeCreate')
  // },
  // created(){
  //   console.log('created');
  // },
  // beforeUpdate(){
  //   console.log('beforeUpdate')
  // },
  // updated(){
  //   console.log('updated')
  // },
  // beforeUnmount(){
  //   console.log('beforeUnmount')
  // },
  // unmounted(){
  //   console.log('unmounted')
  // },
  // errorCaptured(){
  //   console.log('errorCaptured')
  // },
  // renderTracked(){
  //   console.log('renderTracked')
  // },
  // renderTriggered(){
  //   console.log('renderTriggered')
  // },
  // computed: {
  //   accountInUSD() {
  //     console.log(this.accountBalance)
  //     this.accountBalance.forEach((e) => {
  //       e.num = 123123
  //     });
  //     let accountBalance = this.accountBalance as any;
  //     return accountBalance
  //   }
  // },
  setup() {
    let {
      cellphone,
      code,
      codeStatus,
      numberCount,
      loginController,
      validate,
      getCode,
      loginClick,
    } = loginCode();
    let obj = { name: 'lnj', age: 33 }
    let state = toRef(obj,'name')
    let state1 = ref(obj)
    let arr = [{
      name: '11',
      check: false
    }];
    let arrone = reactive(arr)
    function myFn(){
     arrone.forEach(e => {
       e.check = true
     })
    };
    return {
      cellphone,
      code,
      codeStatus,
      numberCount,
      loginController,
      validate,
      getCode,
      loginClick,
      obj,
      state,
      state1,
      myFn,
      arrone
    };
    
  },
});
</script>
<style lang="scss" scoped>
@import "../../scss/login.scss";
</style>
