//22,23,24--交易紀錄
<template>
  <div>
    <SectionTitle :title="sectiontitle" />
    <div class="content-component content-card">
      <div class="card-inner">
        <div class="card-detail">
          <Accordion id="acc1" title="交易紀錄">
            <TabulatorTable
              :tableId="Table1Id"
              :columns="Table1Columns"
              :tableData="Table1Data"
              checkId1="transcationrecord-acc1table1-check1"
              checkId2="transcationrecord-acc1table1-check2"
              @transmit-tabulator-data="handleTabulatorData"
            />
          </Accordion>
        </div>
      </div>
    </div>
    <Tabs :titles="titles" :tabLen="tabLen" @tab-call-api="tabCallApi">
      <template v-slot:1>
        <TabulatorTable
          :tableId="slot1Table2Id"
          :columns="slot1Table2Columns"
          :tableData="slot1Table2Data"
          checkId1="transcationrecord-slot1table2-check1"
          checkId2="transcationrecord-slot1table2-check2"
        />
      </template>
      <template v-slot:2>
        <TabulatorTable
          :tableId="slot2Table4Id"
          :columns="slot2Table4Columns"
          :tableData="slot2Table4Data"
          checkId1="transcationrecord-slot2table4-check1"
          checkId2="transcationrecord-slot2table4-check2"
        />
      </template>
      <template v-slot:3>
        <Accordion id="acc3" title="淨值延後說明">
          <TabulatorTable
            :tableId="slot3Table5Id"
            :columns="slot3Table5Columns"
            :tableData="slot3Table5Data"
            checkId1="transcationrecord-acc3table5-check1"
            checkId2="transcationrecord-acc3table5-check2"
          />
        </Accordion>
      </template>
    </Tabs>
    <div class="content-component content-card">
      <div class="card-inner">
        <div class="card-detail">
          <Accordion id="acc2" title="首期利息">
            <TabulatorTable
              :tableId="slot1Table3Id"
              :columns="slot1Table3Columns"
              :tableData="slot1Table3Data"
              checkId1="transcationrecord-acc2table3-check1"
              checkId2="transcationrecord-acc2table3-check2"
            />
          </Accordion>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import callApi from "../helperFunctions/callApi";
export default {
  name: "Transactionrecord",
  mounted(){
    this.recordTableApi();
    this.initialInterestApi();
  },
  computed: {
    insPolicyNumber() {
      return this.$store.state.insPolicyNumber;
    },
  },
  watch: {
    insPolicyNumber(newVal, oldVal) {
      //call api to set table1Data
      this.recordTableApi(); //交易紀錄
      this.initialInterestApi();//首期利息
      // console.log(`newVal: ${newVal} \n oldVal: ${oldVal}`);
    },
    immediate: true,
  },
  methods:{
    async initialInterestApi(){//首期利息
    this.slot1Table3Data=[];
      const domain = this.$store.state.domain;
      const url = domain + "/investHistory/executeMission03";
      // const token = this.$store.state.token;
      const params = {
        policy_no: this.insPolicyNumber,
      };
      const headers = {
        "Content-Type": "application/x-www-form-urlencoded",
        //Authorization: "bearer " + token,
      };
      const { res } = callApi();
      const { data } = await res(url, params, headers);
      this.slot1Table3Data=data.data;
    },
    async recordTableApi(){
      this.Table1Data=[];
      const domain = this.$store.state.domain;
      const url = domain + "/investHistory/executeMission01";
      // const token = this.$store.state.token;
      const params = {
        policy_no: this.insPolicyNumber,
      };
      const headers = {
        "Content-Type": "application/x-www-form-urlencoded",
        //Authorization: "bearer " + token,
      };
      const { res } = callApi();
      const { data } = await res(url, params, headers);
      this.Table1Data=data.data;
    },
    handleTabulatorData(rowValue){
      this.rowValueData=rowValue;
      this.handleAllTabApi();
    },
    async transactionDetailsApi(){
      this.slot1Table2Data=[];
      const domain = this.$store.state.domain;
      const url = domain + "/investHistory/executeMission02";
      // const token = this.$store.state.token;
      const params = {
        check_info_join: this.rowValueData.check_info_join,
        currency: this.rowValueData.r_currency,
        exprc: this.rowValueData.r_exprc,
        exsrc: this.rowValueData.r_exsrc,
        invs_ad_no: this.rowValueData.r_invs_ad_no,
        invs_ivtr_code: this.rowValueData.r_invs_ivtr_code,
        invs_tr_date: this.rowValueData.r_invs_tr_date,
      };
      const headers = {
        "Content-Type": "application/x-www-form-urlencoded",
        //Authorization: "bearer " + token,
      };
      const { res } = callApi();
      const { data } = await res(url, params, headers);
      this.slot1Table2Data=data.data;
    },
    tabCallApi(tabName){
      this.currentTab=tabName;
      this.handleAllTabApi();
    },
    handleAllTabApi(){
      if(!this.rowValueData) return;
      let tabName = this.currentTab;
      switch(tabName){
        case "交易明細":
        this.transactionDetailsApi();//交易明細
        break;
        case "延遲交易說明":
        this.delayTransactionApi();//延遲交易說明
        break;
        case "淨值延後說明":
        this.tabThirdApi();//淨值延後說明
        break;
      }
    },
    async delayTransactionApi(){//延遲交易說明
    this.slot2Table4Data=[];
      const domain = this.$store.state.domain;
      const url = domain + "/investHistory/executeMission04";
      // const token = this.$store.state.token;
      const params = {
        invs_ad_no: this.rowValueData.r_invs_ad_no,
      };
      const headers = {
        "Content-Type": "application/x-www-form-urlencoded",
        //Authorization: "bearer " + token,
      };
      const { res } = callApi();
      const { data } = await res(url, params, headers);
      this.slot2Table4Data=data.data;
    },
    async tabThirdApi(){
      this.slot3Table5Data=[];
      const domain = this.$store.state.domain;
      const url = domain + "/investHistory/executeMission05";
      // const token = this.$store.state.token;
      const params = {
        invs_ad_no: this.rowValueData.r_invs_ad_no,
      };
      const headers = {
        "Content-Type": "application/x-www-form-urlencoded",
        //Authorization: "bearer " + token,
      };
      const { res } = callApi();
      const { data } = await res(url, params, headers);
      this.slot3Table5Data=data.data;
    }
  },
  data() {
    return {
      currentTab:"交易明細",
      rowValueData:null,
      sectiontitle: "交易紀錄",
      Table1Id: "homeSlot1Table1",
      Table1Columns: [
        { title: "標的作業日", field: "r_invs_ad_date" },
        { title: "標的交易日", field: "r_invs_tr_date" },
        { title: "處理情形", field: "r_invs_ad_sts_desc" },
        { title: "下次交易日", field: "r_next_tr_date" },
        { title: "交易總額", field: "r_invs_ivtr_amt" },
        { title: "交易編號", field: "r_invs_ad_no" },
        { title: "交易指示", field: "r_invs_ad_desc" },
        { title: "交易碼", field: "r_invs_ivtr_code" },
        { title: "交易資訊", field: "r_check_info_join" },
        { title: "交易扣除費用", field: "r_invs_expense" },
        { title: "標的交易總費用", field: "r_invs_fee_amt" },
      ],
      Table1Data: [],
      tabLen: 3,
      titles: ["交易明細", "延遲交易說明", "淨值延後說明"],
      slot1Table2Id: "homeSlot1Table2",
      slot1Table2Columns: [
        { title: "次指示", field: "r_invs_ad_sub_desc" },
        { title: "標的號碼", field: "r_invs_no" },
        { title: "標的代號", field: "r_invs_code" },
        { title: "異動單位數", field: "r_invs_ad_units" },
        { title: "單位淨值", field: "r_invs_value" },
        { title: "淨值日期", field: "r_invs_tr_date" },
        { title: "幣別", field: "r_currency" },
        { title: "匯率", field: "r_exrt_rate" },
        { title: "匯率日期", field: "r_exrt_date" },
        { title: "異動金額", field: "r_invs_ad_amt" },
        { title: "標的交易費用", field: "r_invs_ad_fee" },
        { title: "異動後比例", field: "r_invs_ad_perc" },
        { title: "損益", field: "r_invs_gain_loss" },
        { title: "完成指示", field: "r_ivtr_ok_desc" },
      ],
      slot1Table2Data: [],
      slot1Table3Id: "homeSlot1Table3",
      slot1Table3Columns: [
        { title: "標的代碼", field: "r_invs_code" },
        { title: "計算起日", field: "r_int_str_date" },
        { title: "計算迄日", field: "r_int_end_date" },
        { title: "本金", field: "r_invs_ivtr_amt" },
        { title: "利息", field: "r_this_int" },
        { title: "帳務日期", field: "r_tran_date" },
        { title: "入帳號碼", field: "r_entry_no" },
      ],
      slot1Table3Data: [],

      slot2Table4Id: "homeSlot2Table4",
      slot2Table4Columns: [
        { title: "次指示", field: "r_invs_ad_sub_desc" },
        { title: "標的代碼", field: "r_invs_code" },
        { title: "異動前交易日期", field: "r_ori_invs_tr_date" },
        { title: "異動後交易日期", field: "r_invs_tr_date" },
        { title: "異動說明", field: "r_desc" },
      ],
      slot2Table4Data: [],
      slot3Table5Id: "homeSlot1Table4",
      slot3Table5Columns: [
        { title: "次指示", field: "r_invs_ad_sub_desc" },
        { title: "標的代碼", field: "r_invs_code" },
        { title: "未公佈之淨值評價日", field: "r_invs_tr_date" },
        { title: "淨值實際取得日期", field: "r_get_date" },
      ],
      slot3Table5Data: [],
    };
  },
};
</script>
