//52--媒體繳款查詢
<template>
  <div>
    <SectionTitle :title="sectiontitle" />
    <div class="content-component content-card">
      <div class="card-inner">
        <div class="card-detail">
          <SearchFormCombine :bar="bar1" @btn-click-event="clickHandler" />
          <Table :colNum="3" :table="table" />
          <TabulatorTable
            :tableId="Table1Id"
            :columns="Table1Columns"
            :tableData="Table1Data"
            checkId1="mediapayment-table1-check1"
            checkId2="mediapayment-table1-check2"
          />
          <Accordion id="acc1" title="ATM其他資訊">
            <TabulatorTable
              :tableId="Table2Id"
              :columns="Table2Columns"
              :tableData="Table2Data"
              checkId1="mediapayment-acc1table2-check1"
              checkId2="mediapayment-acc1table2-check2"
            />
          </Accordion>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import callApi from "../helperFunctions/callApi";
import { populateTable } from "../helperFunctions/commonVue.js";
export default {
  name: "MediaPayment",
  mounted() {
    this.watchApiCall();
  },
  computed: {
    insPolicyNumber() {
      return this.$store.state.insPolicyNumber;
    },
  },
  watch: {
    insPolicyNumber(newVal, oldVal) {
      //call api to set table1Data
      this.watchApiCall(); //媒體繳款查詢table
      // localStorage.policy_no=newVal;
      console.log(`newVal: ${newVal} \n oldVal: ${oldVal}`);
    },
    immediate: true,
  },
  methods: {
    async watchApiCall() {
      const domain = this.$store.state.domain;
      const url = domain + "/premPostal/executeMission01";
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
      this.paymentTableData=data.data[0]
      populateTable(data.data[0], this.table);
    },
    clickHandler({ formData, allEmpty }) {
      this.paymentType=formData.payment;
      if (allEmpty) {
        this.$bvModal.show("bv-modal-example");
      } else {
        //  call api
        if (this.paymentType === "0") {
          this.paymentTableApiCall(); //媒體繳款查詢tabulator
        } else {
          this.atmTableApiCall(); //ATM其他資訊
        }
      }
    },
    async paymentTableApiCall() {
      this.Table1Data=[];
       const domain = this.$store.state.domain;
      const url = domain + "/premPostal/executeMission02";

      const params = {
        currency: this.paymentTableData.currency,
        policy_no: this.insPolicyNumber,
      };

      const headers = {
        "Content-Type": "application/x-www-form-urlencoded",
        //Authorization: "bearer " + token,
      };
      const { res } = callApi();
      const { data, status } = await res(url, params, headers);
      let table1Data=data.data;
      this.Table1Data=table1Data;
    },
    async atmTableApiCall(){
      this.Table2Data=[];
       const domain = this.$store.state.domain;
      const url = domain + "/premPostal/executeMission03";

      const params = {
        type:  this.paymentType,
        policy_no: this.insPolicyNumber,
      };

      const headers = {
        "Content-Type": "application/x-www-form-urlencoded",
        //Authorization: "bearer " + token,
      };
      const { res } = callApi();
      const { data, status } = await res(url, params, headers);
      let table2Data=data.data;
      this.Table2Data=table2Data
    },
  },

  data() {
    return {
      paymentType:null,
      paymentTableData: null,
      sectiontitle: "媒體繳款查詢",
      bar1: [
        {
          inputType: "dropdown",
          inputName: "付費管道",
          options: [
            { text: "全部", value: "0" },
            { text: "ATM", value: "1" },
            { text: "便利商店", value: "2" },
            { text: "劃撥", value: "3" },
          ],
          id: "payment",
          inputVal: "0",
        },
      ],
      table: [
        { key: "保單號碼", keyId: "policy_no", value: "" },
        { key: "要保人", keyId: "owner_name", value: "" },
        { key: "保單生效", keyId: "po_issue_date", value: "" },
        { key: "保單狀態", keyId: "po_sts_desc", value: "" },
        { key: "被保險人", keyId: "insured_name", value: "" },
        { key: "保費到期", keyId: "paid_to_date", value: "" },
        { key: "收費方式", keyId: "method_desc", value: "" },
        { key: "繳別", keyId: "modx_desc", value: "" },
        { key: "原始保費", keyId: "gross_mode_prem", value: "" },
        { key: "溢/欠款", keyId: "prem_susp", value: "" },
        { key: "", keyId: 11, value: "" },
        { key: "紅利金額", keyId: "div_amt", value: "" },
      ],
      Table1Id: "homeTable1",
      Table1Columns: [
        { title: "序", field: "seq" },
        { title: "來源", field: "source_desc" },
        { title: "繳款日期", field: "transfer_date" },
        { title: "	繳款金額", field: "transfer_amt" },
        { title: "應繳費日", field: "bill_date_from" },
        { title: "	入帳保費", field: "mode_prem" },
        { title: "局號/銀行/商店", field: "store_name" },
        { title: "	序號/門市", field: "store_other" },
        { title: "交易日期", field: "tran_date" },
        { title: "過帳碼", field: "tran_sts" },
      ],
      Table1Data: [],
      Table2Id: "homeTable2",
      Table2Columns: [
        { title: "	轉出銀行", field: "transfer_bank" },
        { title: "轉出帳號", field: "transfer_account" },
        { title: "交易時間", field: "transfer_time" },
        { title: "ATM代號", field: "atm_code" },
        { title: "金資序號", field: "atm_seq" },
        { title: "費用", field: "atm_fee" },
      ],
      Table2Data: [],
    };
  },
};
</script>
