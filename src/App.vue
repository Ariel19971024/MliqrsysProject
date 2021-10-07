<template>
<div v-if="this.$route.path == '/qrysys/login'">
    <router-view />
</div>
  <body id="canvas" v-else-if="this.$route.path != '/'" @mouseover="OperatingLogout()">
    <div class="frame">
      <!-- frame: menu -->
      <nav :class="leftBlock" id="left_menu">
        <Menu />
      </nav>
      <!-- frame: content -->
      <div :class="rightBlock" id="right_content">
        <Header :name="headerTitle" @ham-clicked="hamClicked" />
        <main class="frame-content mainModule">
          <div class="content">
            <!-- includes breadcrumb, search, router-view -->
            <MainContent />

            <!-- copyright -->
            <div class="content-component content-copyright">
              版權所有 © 2021 三商美邦人壽
            </div>
          </div>
          <div class="aside">
            <a
              @click="sideToggle"
              :class="sidebarClass"
              data-toggle="tooltip"
              title="瀏覽紀錄"
              data-placement="left"
            >
              <span class="material-icons" title="瀏覽紀錄"
                >pending_actions</span
              >
            </a>
          </div>
        </main>
      </div>
    </div>
    <Sidebar :toggle="sideOpen" />
  </body>
  
</template>

<script>
import Vue from "vue";
import VueTabulator from "vue-tabulator";
import axios from "axios";
import qs from "qs";
import router from "./router";
import { BootstrapVue } from "bootstrap-vue";
import { domain4Springboot } from "./helperFunctions/commonVue";

// import components globally
import Menu from "./components/Menu.vue";
// import Datatable from './components/Datatable.vue';
// import Table from './components/Table.vue';
import Header from "./components/Header.vue";
import Breadcrumb from "./components/Breadcrumb.vue";
import Search from "./components/Search.vue";
import Highlight from "./components/Highlight.vue";
import SectionTitle from "./components/SectionTitle.vue";
import Tabs from "./components/Tabs.vue";
import Tabs2 from "./components/Tabs2.vue";
import Message from "./components/Message.vue";
import Table from "./components/Table.vue";
import TwoTables from "./components/TwoTables.vue";
import HorizontalTable from "./components/HorizontalTable.vue";

import Accordion from "./components/Accordion.vue";
import Button from "./components/Button.vue";
import Dialog from "./components/Dialog.vue";
import MainContent from "./components/MainContent.vue";
import Modal from "./components/Modal.vue";
import Note from "./components/Note.vue";
import SearchFormCombine from "./components/SearchFormCombine.vue";
import Searchfield from "./components/SearchField.vue";
import Searchform from "./components/SearchForm.vue";
import Sidebar from "./components/Sidebar.vue";
import Tags from "./components/Tags.vue";
import TabulatorTable from "./components/TabulatorTable.vue";
import Topline from "./components/Topline.vue";

// Import Bootstrap and BootstrapVue CSS files (order is important)
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-vue/dist/bootstrap-vue.css";

Vue.use(BootstrapVue);
Vue.use(VueTabulator);

Vue.prototype.$axios = axios;
Vue.prototype.$qs = qs;

// glocal component registration

Vue.component("Accordion", Accordion);
Vue.component("Breadcrumb", Breadcrumb);
Vue.component("Button", Button);
Vue.component("Dialog", Dialog);
Vue.component("Highlight", Highlight);
Vue.component("HorizontalTable", HorizontalTable);
Vue.component("MainContent", MainContent);
Vue.component("Message", Message);
Vue.component("Modal", Modal);
Vue.component("Note", Note);
Vue.component("Search", Search);
Vue.component("SearchFormCombine", SearchFormCombine);
Vue.component("Searchfield", Searchfield);
Vue.component("Searchform", Searchform);
Vue.component("SectionTitle", SectionTitle);
Vue.component("Sidebar", Sidebar);
Vue.component("Table", Table);
Vue.component("Tabs", Tabs);
Vue.component("Tabs2", Tabs2);
Vue.component("Tags", Tags);
Vue.component("TabulatorTable", TabulatorTable);
Vue.component("Topline", Topline);
Vue.component("TwoTables", TwoTables);

export default {
  name: "App",
  components: {
    Menu,
    Header,
  },
  beforeCreate() {
    console.log("before Create");
    const domain = domain4Springboot(true);
    this.$store.commit("setDomain", domain);
    
  },
  beforeRouteLeave(to, from, next) {
    console.log(from);
    
  },

  created() {
    // console.log(this.$route);
    this.tokenCheck();
  },

  data() {
    return {
      acc: "collapse-a",
      headerTitle: "主機交易查詢系統",
      ham: true,
      sideOpen: false,
      currentTime: new Date().getTime(),
    };
  },
  computed: {
    leftBlock() {
      let style = "frame-block leftBlock";
      if (!this.ham) {
        style = style.concat(" menu-close");
      }
      return style;
    },
    rightBlock() {
      let style = "frame-block rightBlock";
      if (!this.ham) {
        style = style.concat(" right-fluid");
      }
      return style;
    },
    sidebarClass() {
      let style = "aside-btn";
      if (this.sideOpen) {
        style = style.concat(" aside-active");
      }
      return style;
    },
  },
  methods: {
    hamClicked(value) {
      this.ham = value;
    },
    sideToggle() {
      this.sideOpen = !this.sideOpen;
    },
    tokenCheck() {
      const token = "123456";
      if (!token) {
        if (this.$route.path == "/qrysys/login") {
          // 解決重複載入的問題
        } else {
          this.$router.push("/qrysys/login");
        }
      } else if (this.$route.path == "/qrysys/homepage") {
        //
      } else {
        this.$router.push("/qrysys/homepage");
      }
    },
    OperatingLogout() {
      let currentTime = this.currentTime;
      let lastTime = new Date().getTime();
      let timeOut = 24*60*60*10000;
      if (lastTime - currentTime > timeOut) {
        // 未操作頁面，跳轉登入頁面
        this.currentTime = new Date().getTime();
        sessionStorage.removeItem("loginToken");
        this.tokenCheck();
      } else {
        this.currentTime = new Date().getTime();
      }
    },
    //
  },
};
</script>

<style lang="scss" scoped>
@import "custom.scss";
@import "./css/material-icons.css";
@import "./css/material-icons-ie.css";
@import "./css/global.css";
@import "./css/layout.css";
@import "./css/page.css";
@import "./css/pg.css";

.aside a {
  color: #fff !important;
  cursor: pointer;
}

.aside a.aside-active {
  color: #0e4c6d !important;
}
</style>
