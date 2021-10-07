<template>
  <div class="leftBlock-inner mCustomScrollbar" data-mcs-theme="minimal">
    <!-- menu-logo -->

    <div vue-sidebar-menu>
      <div class="frame-logo">
        <router-link to="/qrysys/homepage"
          ><img src="../assets/logo_30.svg" alt=""
        /></router-link>
      </div>
      <div class="frame-menu">
        <!-- menu-filter -->
        <!-- @onkeyup="searchMenu" -->
        <div class="menu-filter">
          <input
            type="text"
            id="menu_filter"
            v-model="searchValue"
            placeholder="探索目錄"
            @keyup.enter="searchMenu"
          />
        </div>
        <!-- vue-sidebar-menu class="sidebar"-->
        <div class="menu-list" id="menu_list">
          <sidebar-menu
            class="menuList"
            :menu="menu"
            @item-click="onItemClick"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { SidebarMenu } from "vue-sidebar-menu";
import callApi from "../helperFunctions/callApi";
export default {
  name: "Menu",
  props: {
    // menu: Array
  },
  components: {
    SidebarMenu,
  },
  created() {
    this.menuCallApi();
  },
  methods: {
    onItemClick(item) {
      item.preventDefault();
    },
    async menuCallApi() {
      const domain = this.$store.state.domain;
      const url = "http://localhost:10202/sysgrant/fetchSysMenuType3";
      // const token = this.$store.state.token;
      const params = {
        userId:"admin",
        indexId:0,
      };
      const headers = {
        "Content-Type": "application/x-www-form-urlencoded",
        //Authorization: "bearer " + token,
      };
      const { res } = callApi();
      const { data } = await res(url, params, headers);
      // this.menu=data.data;
    },
    searchMenu(){
      console.log(this.searchValue);
    }
  },
  data() {
    return {
      // menu:[],
      searchValue:"",
      menu: [
        {
          href: {
            path: "",
          },
          title: "保單價值／內容",
          icon: "",
          hiddenOnCollapse: true,
          class: "menu-unit-01",
          child: [
            {
              href: {
                path: "",
              },
              title: "保單內容",
              icon: "",
              child: [
                {
                  href: "/qrysys/inspolicydetails",
                  title: "保單明細",
                  icon: "",
                },
                {
                  href: "/qrysys/medicalnotifs",
                  title: "體檢批註告知",
                  icon: "",
                  class: "",
                },
                {
                  href: "/qrysys/relatedpartyinfo",
                  title: "關係人資料",
                  icon: "",
                },
                {
                  href: "/qrysys/inskindinfo",
                  title: "保障險種資料",
                  icon: "",
                },
                {
                  href: "/qrysys/dividendinfo",
                  title: "紅利資料",
                  icon: "",
                },
                {
                  href: "/qrysys/increasedvaluefunds",
                  title: "增值回饋分享金",
                  icon: "",
                },
              ],
            },
            {
              href: {
                path: "",
              },
              title: "保單價值",
              icon: "",
              child: [
                {
                  href: "/qrysys/annuitydetails",
                  title: "年金提存明細",
                  icon: "",
                },
                {
                  href: "/qrysys/principalrepayment",
                  title: "還本金",
                  icon: "",
                },
                {
                  href: "/qrysys/backflowquery",
                  title: "回流關聯查詢",
                  icon: "",
                },
              ],
            },
          ],
        },

        // -------SecondPart

        {
          href: {
            path: "",
          },
          title: "投資交易",
          icon: "",
          hiddenOnCollapse: true,

          class: "menu-unit-02",

          child: [
            {
              href: "/qrysys/investmenttargets",
              title: "投資標的、餘額",
              icon: "",
            },
            {
              href: "/qrysys/transactionrecord",
              title: "交易紀錄",
              icon: "",
            },
            {
              href: "/qrysys/cashflow",
              title: "現金流量",
              icon: "",
            },
            {
              href: "/qrysys/stopprofit",
              title: "自動轉換與停利查詢",
              icon: "",
            },
            {
              href: "/qrysys/deductionquery",
              title: "每月扣除額查詢",
              icon: "",
            },
            {
              href: "/qrysys/withdrawalquery",
              title: "約定轉換/提領查詢",
              icon: "",
            },
            {
              href: "/qrysys/etf",
              title: "ETF管理費查詢",
              icon: "",
            },
          ],
        },

        // ------------
        // ThirdPart------
        {
          href: {
            path: "",
          },
          title: "保戶服務資料",
          icon: "",
          hiddenOnCollapse: true,
          class: "menu-unit-03",

          child: [
            {
              href: "/qrysys/contractchange",
              title: "契約變更紀錄",
              icon: "",
            },
            {
              href: "/qrysys/noterecord",
              title: "照會紀錄",
              icon: "",
            },
            {
              href: "/qrysys/automatedquery",
              title: "自動化查詢",
              icon: "",
            },
          ],
        },

        // --------------
        // ForthPart----
        {
          href: {
            path: "",
          },
          title: "理賠／收費",
          icon: "",
          hiddenOnCollapse: true,
          class: "menu-unit-04",
          child: [
            {
              href: {
                path: "",
              },
              title: "理賠資料",
              icon: "",
              child: [
                {
                  href: "/qrysys/claimrecord",
                  title: "理賠紀錄",
                  icon: "",
                },
              ],
            },

            {
              href: {
                path: "",
              },
              title: "收費資料",
              icon: "",
              child: [
                {
                  href: "/qrysys/letterofattorny",
                  title: "授權、委託書明細",
                  icon: "",
                },
                {
                  href: "/qrysys/deductiondetails",
                  title: "扣款明細",
                  icon: "",
                },
                {
                  href: "/qrysys/remittanceinquiry",
                  title: "集體彙繳查詢",
                  icon: "",
                },
                {
                  href: "/qrysys/returnquery",
                  title: "退件查詢",
                  icon: "",
                },
                {
                  href: "/qrysys/goldawardrecord",
                  title: "送金紀錄查詢",
                  icon: "",
                },
                {
                  href: "/qrysys/mediapayment",
                  title: "媒體繳款查詢",
                  icon: "",
                },
              ],
            },
          ],
        },

        // -------------
        // FifthPart--------
        {
          href: {
            path: "",
          },
          title: "付款/保單匯款帳戶查詢",
          icon: "",
          hiddenOnCollapse: true,
          class: "menu-unit-05",
          child: [
            {
              href: "/qrysys/paymentprofile",
              title: "付款資料查詢",
              icon: "",
            },
            {
              href: "/qrysys/policypaymentquery",
              title: "保單匯款帳戶查詢",
              icon: "",
            },
            {
              href: "/qrysys/unpaidquery",
              title: "應付未付查詢",
              icon: "",
            },
          ],
        },
        //-------------

        {
          href: {
            path: "",
          },
          title: "新契約資料",
          icon: "",
          hiddenOnCollapse: true,
          class: "menu-unit-06",
          child: [
            {
              href: "/qrysys/newcontractquery",
              title: "新契約查詢",
              icon: "",
            },
            {
              href: "/qrysys/insurancerecord",
              title: "投保紀錄查詢",
              icon: "",
            },
            {
              href: "/qrysys/samplingrecord",
              title: "抽檢紀錄查詢",
              icon: "",
            },
            {
              href: "/qrysys/medicalexaminationfee",
              title: "體檢費扣擁查詢",
              icon: "",
            },
            {
              href: "/qrysys/hospital",
              title: "體檢醫院",
              icon: "",
            },
          ],
        },
      ],
    };
  },
};
</script>

<style>
.vsm--link_level-1 .vsm--title:hover {
  text-decoration: underline;
}
.vsm--link_level-2 .vsm--title:hover {
  color: orangered;
  text-decoration: underline;
}
.vsm--link_level-3 .vsm--title:hover {
  color: orangered;
  text-decoration: underline;
}

a.vsm--link_level-2 .vsm--title::before {
  display: none;
}
/* .menu-close {
  margin-left: -166px !important;
} */

.sidebar.v-sidebar-menu .vsm-arrow:after {
  content: "\f105";
  font-family: "FontAwesome";
}
.sidebar.v-sidebar-menu .collapse-btn:after {
  content: "\f07e";
  font-family: "FontAwesome";
}

.vsm--list {
  margin-top: -10px;
}

.vsm--item {
  background-color: #1c5579 !important;
  margin: 10px auto;
  /* border: 1px solid #78909C !important; */
  /* border-radius: 5px; */
  width: 95%;
  text-align: left;
}

.vsm--link:hover {
  background-color: #fff;
  color: #1c5579 !important;
}

.vsm--link {
  height: 37px;
}

.vsm--list .vsm--item a {
  color: white;
  text-decoration: none;
  width: 100% !important;
  margin-right: 0;
  display: flex;
  align-items: center;
}

.vsm--title {
  display: inline-flex;
  align-items: center;
  height: 90%;
  font-size: 14px !important;
  font-weight: 600;
  line-height: 1rem;
  padding: 4.5px;
}

.vsm--item_open .vsm--dropdown .vsm--list .vsm--item {
  width: 100%;
  border-radius: 0;
  margin: 0 !important;
  /* border-top: 1px solid #78909c; */
}

.vsm--dropdown {
  /* border-radius: 0 0 5px 5px; */
  margin-top: 10px;
}

.vsm--dropdown .vsm--list {
  /* background-color: white !important; */
  width: 100% !important;
}

.vsm--dropdown .vsm--list .vsm--item {
  background-color: #eee !important;
  color: #666666 !important;
  /* border-top: 1px solid #78909C !important; */
  border-left: 0px !important;
  border-right: 0px !important;
  border-bottom: 0px !important;
}

.vsm--dropdown .vsm--list .vsm--item :hover {
  background-color: #cfd8dc;
}

.vsm--dropdown .vsm--list .vsm--item a {
  color: #666666 !important;
  height: auto !important;
  padding: 9.5px 4.5px 9.5px 4.5px;
  padding-left: 10px;
  font-size: 14px !important;
}
.vsm--dropdown .vsm--list .vsm--item a .vsm--title {
  padding: 0px !important;
}

.vsm--dropdown {
  border: 1px solid #78909c;
}

.vsm--dropdown .vsm--dropdown {
  border: none;
}

.vsm--dropdown .vsm--list .vsm--item .vsm--dropdown .vsm--list .vsm--item {
  background-color: #eee !important;
  color: #666666 !important;
  /* border-top: 1px solid #78909c; */
}

.vsm--dropdown
  .vsm--list
  .vsm--item
  .vsm--dropdown
  .vsm--list
  .vsm--item
  .vsm--title {
  padding-left: 10px !important;
}

.vsm--dropdown
  .vsm--list
  .vsm--item
  .vsm--dropdown
  .vsm--list
  .vsm--item
  a
  span {
  padding-left: 3.5px;
}

.vsm--icon {
  margin-left: 0.5rem;
  font-size: 1rem;
  width: 20px !important;
  height: 20px !important;
}

/* .vsm--list .vsm--item .vsm--link_level-3 {
  color: black !important;
} */

.vsm--toggle-btn {
  display: none;
}

.vsm--link_level-3 i {
  opacity: 0;
}

.vsm--link_level-1:hover {
  background-color: rgb(28, 85, 121);
  color: #fff !important;
}

.vsm--link_level-2 span::before {
  font-family: "Material Icons";
  content: "folder_open";
  font-feature-settings: "liga";
  font-size: 1rem;
  margin-right: 4px;
  color: #0e4c6d;
}

.vsm--link_level-2 ~ .vsm--dropdown {
  padding: 0 10px 5px;
  border-bottom: #ccc solid 1px;
}

.vsm--link_level-2 ~ .vsm--dropdown .vsm--item {
  border-left: #555 solid 1px;
}

.vsm--link_level-2 ~ .vsm--dropdown .vsm--item:nth-last-child(1) {
  border: none;
}
</style>
