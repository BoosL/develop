import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import "./styles.scss";
import { Toast } from 'vant';

const app = createApp(App);
app.use(Toast).use(store).use(router).mount("#app");
