<template>
  <div class="index">
    <Header :title="title"  v-if="!$route.meta.title?false:true"/>
    <keep-alive>
      <router-view v-if="$route.meta.keepAlive" :class="title !== '齐祥云推手平台' ?'content':'nomal'"></router-view>
    </keep-alive>
    <router-view v-if="!$route.meta.keepAlive" class="content"></router-view>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import Header from './components/header.vue'
export default defineComponent({
  name: "App",
  provide () {
    return {
      reload: this.reload
    };
  },
  components: {
    Header
  },
  data(){
    return{
      isRouterAlive: true,
      title: "",
    }
  },
   watch: {
    $route (val) {
      this.title = val.meta.title
    }
  },
  methods:{
    reload(){
      this.isRouterAlive = false;
      //  ts在回调参数中直接使用this,会产生(this”隐式具有类型“ any”，因为它没有类型注释)的问题,
      //  解决办法是将this 添加到回调中或者是使用其他对象将其替换
      this.$nextTick(function (this:any) {
        this.isRouterAlive = true;
      });
      
    }
  },
});
</script>

<style lang="scss">
  #app,.index{
    height: 100%;
  }
</style>
