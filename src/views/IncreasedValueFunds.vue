<template>
  <!-- 13 增值回饋分享金 -->
  <div>
    <SectionTitle :title="sectionTitle" />
    <div class="content-card">
      <div class="card-inner">
        <div class="card-detail">
          <Accordion id="increasedvaluefunds-acc1" title="回饋分享金資料">
            <Table :colNum="4" :table="table1Data" />
          </Accordion>
          <Accordion id="increasedvaluefunds-acc2" title="回饋分享金說明">
            <TabulatorTable
              :tableId="tableAcc2Id"
              :columns="tableAcc2Columns"
              :tableData="tableAcc2Data"
              checkId1="increasedvaluefunds-acc2-check1"
              checkId2="increasedvaluefunds-acc2-check2"
            />
          </Accordion>
          <Accordion id="increasedvaluefunds-acc3" title="宣告利率">
            <TabulatorTable
              :tableId="tableAcc3Id"
              :columns="tableAcc3Columns"
              :tableData="tableAcc3Data"
              checkId1="increasedvaluefunds-acc3-check1"
              checkId2="increasedvaluefunds-acc3-check2"
            />
          </Accordion>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { populateTable } from "../helperFunctions/commonVue.js";
import callApi from "../helperFunctions/callApi";
export default {
  name: "IncreasedValueFunds",
  // beforeRouteEnter(to, from, next) {
  //   next((vm) => {
  //     vm.$store.dispatch("addHistory", {
  //       name: from.name,
  //       cName: from.meta.name,
  //       path: from.path,
  //       id: uuid(),
  //     });
  //   });
  // },
  mounted() {
    this.watchApiCall();
    this.watchApiCall2();
    this.watchApiCall3();
  },
  computed: {
    insPolicyNumber() {
      return this.$store.state.insPolicyNumber;
    },
  },
  watch: {
    insPolicyNumber(newVal, oldVal) {
      //call api to set table1Data
      // localStorage.policy_no = newVal;
      this.watchApiCall();//回饋分享金資料
      this.watchApiCall2();//回饋分享金說明
      this.watchApiCall3();//宣告利率

      console.log(`newVal: ${newVal} \n oldVal: ${oldVal}`);
    },
  },
  methods: {
    async watchApiCall() {//回饋分享金資料
      // console.log("callApi");
      const domain = this.$store.state.domain;
      const url = domain + "/poValueAddShare/executeMission01";
      // const token = this.$store.state.token;
      const params = {
        policy_no: this.insPolicyNumber,
      };
      const headers = {
        "Content-Type": "application/x-www-form-urlencoded",
        //Authorization: "bearer " + token,
      };
      const { res } = callApi();
      const { data, status } = await res(url, params, headers);
      const tableDataDetail = data.data[0];
      this.table1Data = populateTable(tableDataDetail, this.table1Data);
    },
    async watchApiCall2() {//回饋分享金說明
      // console.log("callApi");
      const domain = this.$store.state.domain;
      const url = domain + "/poValueAddShare/executeMission02";
      // const token = this.$store.state.token;
      const params = {
        policy_no: this.insPolicyNumber,
      };
      const headers = {
        "Content-Type": "application/x-www-form-urlencoded",
        //Authorization: "bearer " + token,
      };
      const { res } = callApi();
      const { data, status } = await res(url, params, headers);
      this.tableAcc2Data = data.data;
    },
    async watchApiCall3() {//宣告利率
      // console.log("callApi");
      const domain = this.$store.state.domain;
      const url = domain + "/poValueAddShare/executeMission03";
      // const token = this.$store.state.token;
      const params = {
        policy_no: this.insPolicyNumber,
      };
      const headers = {
        "Content-Type": "application/x-www-form-urlencoded",
        //Authorization: "bearer " + token,
      };
      const { res } = callApi();
      const { data, status } = await res(url, params, headers);
      this.tableAcc3Data = data.data;
    },
  },
  data() {
    return {
      sectionTitle: "增值回饋分享金",
      tableAcc2Id: "tableAcc2Id",
      tableAcc2Columns: [
        { title: "計息日", field: "r_int_date" },
        { title: "計算本金", field: "r_this_calc_amt" },
        { title: "利息", field: "r_this_int" },
        { title: "交易項目", field: "r_tran_item" },
        { title: "交易金額", field: "r_amount" },
        { title: "累計回饋分享金", field: "r_accu_refund" },
        { title: "回饋抵繳", field: "r_accu_return_amt" },
        { title: "作業日期", field: "r_process_date" },
      ],
      tableAcc2Data: [
        // {a: "123", b: 50},
        // {a: "124", b: 60},
        // {a: "125", b: 70},
      ],
      tableAcc3Id: "tableAcc3Id",
      tableAcc3Columns: [
        { title: "日期", field: "r_int_ym" },
        { title: "選告利率%", field: "r_int_rate_decl" },
      ],
      tableAcc3Data: [
        // {a: "123", b: 50},
        // {a: "124", b: 60},
        // {a: "125", b: 70},
      ],
      table1Data: [
        { key: "保單號碼", keyId: "r_policy_no", value: "" },
        { key: "要保人", keyId: "r_o1_names", value: "" },
        { key: "保單生效日", keyId: "r_po_issue_date", value: "" },
        { key: "幣別", keyId: "r_currency_ch", value: "" },
        { key: "計算日期", keyId: "r_calc_date", value: "" },
        { key: "應繳費日", keyId: "r_paid_to_date", value: "" },
        { key: "險種", keyId: "r_plan_code", value: "" },
        { key: "保單狀態", keyId: "r_po_sts_code", value: "" },
        { key: "保單週月", keyId: "r_policy_moniv_date", value: "" },
        { key: "回饋金週期", keyId: "r_div_option_ch2", value: "" },
        { key: "給付頻率", keyId: "r_div_pay_freq_ch", value: "" },
        { key: "回饋金選擇1", keyId: "r_div_option_ch", value: "" },
        { key: "回饋分享金", keyId: "r_accu_amt", value: "" },
        { key: "本次利息", keyId: "r_this_int", value: "" },
        { key: "回饋分享金總和", keyId: "r_total_amt", value: "" },
        { key: "回饋金選擇2", keyId: "r_div_option_ch2", value: "" },
        { key: "保單年度", keyId: "r_dur", value: "" },
        { key: "保險年齡", keyId: "r_age", value: "" },
        { key: "回饋抵繳", keyId: "r_accu_return_amt", value: "" },
        { key: "閉鎖期(年)", keyId: "r_div_lock_dur", value: "" },
      ],
    };
  },
};
</script>
