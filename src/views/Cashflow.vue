//25,26,27--現金流量
<template>
  <div>
    <SectionTitle :title="sectiontitle" />
    <div class="content-component content-card">
      <div class="card-inner">
        <div class="card-detail">
          <Accordion id="acc1" title="入帳資料">
            <div style="position:relative">
              <TabulatorTable
                :tableId="Table1Id"
                :columns="Table1Columns"
                :tableData="Table1Data"
                checkId1="cashFlow-acc1table1-check1"
                checkId2="cashFlow-acc1table1-check2"
                @transmit-tabulator-data="handleTabulatorData"
              />
              <Loading :active.sync="isLoading" :is-full-page="false">
              </Loading>
            </div>
          </Accordion>
          <Accordion id="acc2" title="入帳明細">
            <TabulatorTable
              :tableId="Table2Id"
              :columns="Table2Columns"
              :tableData="Table2Data"
              checkId1="cashFlow-acc2table2-check1"
              checkId2="cashFlow-acc2table2-check2"
            />
          </Accordion>
          <Accordion id="acc3" title="保費明細">
            <Tabs2 :titles="titles2" @get-tab-name="handleTabClick">
              <template v-slot:1>
                <TabulatorTable
                  :tableId="slot1Table3Id"
                  :columns="slot1Table3Columns"
                  :tableData="slot1Table3Data"
                  checkId1="cashFlow-slot1table3-check1"
                  checkId2="cashFlow-slot1table3-check2"
                />
              </template>
              <template v-slot:2>
                <TabulatorTable
                  :tableId="slot2Table4Id"
                  :columns="slot2Table4Columns"
                  :tableData="slot2Table4Data"
                  checkId1="cashFlow-slot2table4-check1"
                  checkId2="cashFlow-slot2table4-check2"
                />
              </template>
              <template v-slot:3>
                <TabulatorTable
                  :tableId="slot3Table5Id"
                  :columns="slot3Table5Columns"
                  :tableData="slot3Table5Data"
                  checkId1="cashFlow-slot3table5-check1"
                  checkId2="cashFlow-slot3table5-check2"
                />
              </template>
            </Tabs2>
          </Accordion>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import Loading from "vue-loading-overlay";
import "vue-loading-overlay/dist/vue-loading.css";
import Layout from "./Layout.vue";
import callApi from "../helperFunctions/callApi";
export default {
  name: "Cashflow",
  components: {
    Loading,
  },
  mounted() {
    this.accountInformationApi();
  },
  computed: {
    insPolicyNumber() {
      return this.$store.state.insPolicyNumber;
    },
  },
  watch: {
    insPolicyNumber(newVal, oldVal) {
      //call api to set table1Data
      this.accountInformationApi(); //入帳資料
      // console.log(`newVal: ${newVal} \n oldVal: ${oldVal}`);
    },
  },
  methods: {
    async accountInformationApi() {
      const vm = this;
      vm.isLoading = true;
      const domain = this.$store.state.domain;
      const url = domain + "/investCash/executeMission01";
      const params = {
        policy_no: this.insPolicyNumber,
      };
      const headers = {
        "Content-Type": "application/x-www-form-urlencoded",
        //Authorization: "bearer " + token,
      };

      const { res } = callApi();
      const { data, status, totaltime } = await res(url, params, headers);
      vm.isLoading = false;
      if (data.data.length === 0) {
        alert("查無資料!!");
      }
      this.Table1Data = data.data;
    },
    async handleTabulatorData(rowValue) {
      //入帳明細
      this.rowValueData = rowValue;
      this.tabCallApiHandler();
      this.policyDetailApi(); //保費明細
      this.Table2Data = [];
      const domain = this.$store.state.domain;
      const url = domain + "/investCash/executeMission02";
      const params = {
        currency: rowValue.currency,
        entry_no: rowValue.entry_no,
        policy_no: this.insPolicyNumber,
      };
      const headers = {
        "Content-Type": "application/x-www-form-urlencoded",
        //Authorization: "bearer " + token,
      };

      const { res } = callApi();
      const { data, status, totaltime } = await res(url, params, headers);
      this.Table2Data = data.data;
    },
    handleTabClick(tabName) {
      //tab
      this.currentTabName = tabName;
      this.tabCallApiHandler(); //處理tabapi
    },
    tabCallApiHandler() {
      let tabName = this.currentTabName;
      if (!this.rowValueData) return;
      switch (tabName) {
        case "目標堆疊":
          this.secondTabApi(); //目標堆疊
          break;
        case "保費明細":
          this.policyDetailApi(); //保費明細
          break;
        case "立投費用":
          this.thirdTabApi(); //立投費用
          break;
      }
    },
    async policyDetailApi() {
      this.slot1Table3Data = [];
      const domain = this.$store.state.domain;
      const url = domain + "/investCash/executeMission03";
      const params = {
        currency: this.rowValueData.currency,
        entry_no: this.rowValueData.entry_no,
        policy_no: this.insPolicyNumber,
      };
      const headers = {
        "Content-Type": "application/x-www-form-urlencoded",
        //Authorization: "bearer " + token,
      };

      const { res } = callApi();
      const { data, status } = await res(url, params, headers);
      this.slot1Table3Data = data.data;
    },
    async secondTabApi() {
      //目標堆疊
      this.slot2Table4Data = [];
      const domain = this.$store.state.domain;
      const url = domain + "/investCash/executeMission04";
      const params = {
        currency: this.rowValueData.currency,
        entry_no: this.rowValueData.entry_no,
        policy_no: this.insPolicyNumber,
      };
      const headers = {
        "Content-Type": "application/x-www-form-urlencoded",
        //Authorization: "bearer " + token,
      };

      const { res } = callApi();
      const { data, status } = await res(url, params, headers);
      this.slot2Table4Data = data.data;
    },
    async thirdTabApi() {
      const domain = this.$store.state.domain;
      const url = domain + "/investCash/executeMission05";
      const params = {
        currency: this.rowValueData.currency,
        entry_no: this.rowValueData.entry_no,
        policy_no: this.insPolicyNumber,
      };
      const headers = {
        "Content-Type": "application/x-www-form-urlencoded",
        //Authorization: "bearer " + token,
      };

      const { res } = callApi();
      const { data, status } = await res(url, params, headers);
      this.slot3Table5Data=data.data;
    },
  },
  data() {
    return {
      currentTabName: null,
      rowValueData: null,
      isLoading: false,
      sectiontitle: "現金流量",
      titles2: ["保費明細", "目標堆疊", "立投費用"],
      Table1Id: "cashFlowSlot1Table1",
      Table1Columns: [
        { title: "交易日期", field: "tran_date" },
        { title: "功能", field: "function_code" },
        { title: "收入金額", field: "receive_amt" },
        { title: "給付金額", field: "payout_amt" },
        { title: "管理費用", field: "fee_amt" },
        { title: "手續費", field: "charge_amt" },
        { title: "入帳號碼", field: "entry_no" },
        { title: "交易編號", field: "invs_ad_no" },
      ],
      Table1Data: [],
      Table2Id: "cashFlowSlot1Table2",
      Table2Columns: [
        { title: "費用種類", field: "cash_flow_type_d" },
        { title: "費用金額", field: "amt" },
      ],
      Table2Data: [],
      slot1Table3Id: "cashFlowSlot1Table3",
      slot1Table3Columns: [
        { title: "保費-目標(基本)", field: "target_prem" },
        { title: "保費-額外(超額)", field: "excess_prem" },
        { title: "保費-投資", field: "invest_prem" },
        { title: "保費-壽險", field: "term_prem" },
        { title: "保費-附約", field: "rider_prem" },
        { title: "目標保費堆疊迄日", field: "r_due_date_to" },
      ],
      slot1Table3Data: [],
      slot2Table4Id: "cashFlowSlot1Table4",
      slot2Table4Columns: [
        { title: "保單年度", field: "r_policy_year" },
        { title: "保費年度", field: "r_prem_year" },
        { title: "目標(基本)保費", field: "r_target_prem" },
        { title: "額外(超額)保費", field: "r_excess_prem" },
        { title: "費用-目標(基本)", field: "r_feld_expn_tgpm" },
        { title: "費用-額外(超額)", field: "r_feld_expn_espm" },
      ],
      slot2Table4Data: [],
      slot3Table5Id: "cashFlowSlot1Table5",
      slot3Table5Columns: [
        { title: "淨保險費", field: "r_net_prem" },
        { title: "立投費用", field: "r_immed_inv_expn" },
      ],
      slot3Table5Data: [],
    };
  },
};
</script>
<style scoped>
@keyframes ldio-2gn8nvj94zp {
  0% {
    top: 96px;
    left: 96px;
    width: 0;
    height: 0;
    opacity: 1;
  }
  100% {
    top: 18px;
    left: 18px;
    width: 156px;
    height: 156px;
    opacity: 0;
  }
}

.ldio-2gn8nvj94zp div {
  position: absolute;
  border-width: 4px;
  border-style: solid;
  opacity: 1;
  border-radius: 50%;
  animation: ldio-2gn8nvj94zp 1s cubic-bezier(0, 0.2, 0.8, 1) infinite;
}

.ldio-2gn8nvj94zp div:nth-child(1) {
  border-color: #1d3f72;
}

.ldio-2gn8nvj94zp div:nth-child(2) {
  border-color: #5699d2;
  animation-delay: -0.5s;
}

.loadingio-spinner-ripple-wu44vrvts1 {
  width: 200px;
  height: 200px;
  display: inline-block;
  overflow: hidden;
  /*  background 設定 none  */
  background: none;
}
.ldio-2gn8nvj94zp {
  width: 100%;
  height: 100%;
  position: relative;
  transform: translateZ(0) scale(1);
  backface-visibility: hidden;
  transform-origin: 0 0; /* see note above */
}
.ldio-2gn8nvj94zp div {
  box-sizing: content-box;
}
</style>
