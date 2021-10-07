<template>
  <!-- 14 年金提存明細-->
  <div>
    <SectionTitle :title="sectionTitle" />
    <div class="content-card">
      <div class="card-inner">
        <div class="card-detail">
          <Accordion id="annuitydetails-acc1" title="提存明細內容">
            <TabulatorTable
              :tableId="tableAcc1Id"
              :columns="tableAcc1Columns"
              :tableData="tableAcc1Data"
              checkId1="annuitydetails-acc1-check1"
              checkId2="annuitydetails-acc1-check2"
              @transmit-tabulator-data="tableHandler"
            />
          </Accordion>
          <Accordion id="annuitydetails-acc2" title="提存明細其他相關資料">
            <Table :colNum="2" :table="table1Data" />
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
  name: "AnnuityDetails",
  mounted() {
    if (this.insPolicyNumber) {
      this.getAnnuityDetails();
    }
    // this.getAnnuityDetails();
  },
  computed: {
    insPolicyNumber() {
      return this.$store.state.insPolicyNumber;
    },
    
  },
  watch: {
    insPolicyNumber(newVal, oldVal) {
      //call api to set table1Data
      this.getAnnuityDetails();
      console.log(`newVal: ${newVal} \n oldVal: ${oldVal}`);
    },
  },
  methods: {
    tableHandler(rowValue) {
    populateTable(rowValue, this.table1Data);
    },
    async getAnnuityDetails() {
      this.tableAcc1Data = [];
      const domain = this.$store.state.domain;
      const url = domain + "/valueWithdraw/getResultList";
      // const url = "http://localhost:10203/valueWithdraw/getResultList";
      const params = {
        policy_no: 123,
      };
      // const token = this.$store.state.token;
      const headers = {
        "Content-Type": "application/x-www-form-urlencoded",
        //Authorization: "bearer " + token,
      };
      const { res } = callApi();
      const { data } = await res(url, params, headers);

      this.tableAcc1Data = data.data;
    },
  },
  data() {
    return {
      sectionTitle: "年金提存明細",
      tableAcc1Id: "tableAcc1Id",
      tableAcc1Columns: [
        { title: "保單號碼", field: "policy_no" },
        { title: "作業日期", field: "tran_date" },
        { title: "作業前累積本金", field: "last_accu_amt" },
        { title: "作業前未承認AV", field: "last_misc_ac_amt" },
        { title: "作業前應計利息", field: "last_ac_bal_int" },
        { title: "作業後累積本金", field: "accu_amt" },
        { title: "作業後未承認AV", field: "misc_accu_amt" },
        { title: "作業後應計利息", field: "accu_bal_int" },
      ],
      tableAcc1Data: [],
      table1Data: [
        { key: "登錄序號", keyId: "entry_no", value: "" },
        { key: "附加費用", keyId: "front_charge_amt", value: "" },
        { key: "處理狀況", keyId: "ansv_proc_ind", value: "" },
        { key: "使用利息", keyId: "diff_int", value: "" },
        { key: "本次計算利息", keyId: "this_int", value: "" },
        { key: "預收保費", keyId: "misc_susp", value: "" },
        { key: "變動本金", keyId: "diff_accu_amt", value: "" },
        { key: "解約費用", keyId: "surd_charge_amt", value: "" },
      ],
    };
  },
};
</script>
