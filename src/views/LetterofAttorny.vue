//45--授權,委託書明細
<template>
  <div>
    <SectionTitle :title="sectiontitle" />
    <div class="content-component content-card">
      <div class="card-inner">
        <div class="card-detail">
          <SearchFormCombine :bar="bar1" @btn-click-event="clickHandler" />
          <Accordion id="acc1" title="授權、委託書明細-主要資料">
            <Table :colNum="3" :table="table" />
          </Accordion>
          <Accordion id="acc2" title="授權、委託書明細-異動資料">
            <TabulatorTable
              :tableId="Table1Id"
              :columns="Table1Columns"
              :tableData="Table1Data"
              checkId1="home-slot1table1-check1"
              checkId2="home-slot1table1-check2"
            />
          </Accordion>
          <Accordion id="acc3" title="授權、委託書明細-歸檔資料">
            <TabulatorTable
              :tableId="Table2Id"
              :columns="Table2Columns"
              :tableData="Table2Data"
              checkId1="home-slot1table1-check1"
              checkId2="home-slot1table1-check2"
            />
          </Accordion>
          <Accordion id="acc4" title="授權、委託書明細-暫停扣款資料">
            <TabulatorTable
              :tableId="Table3Id"
              :columns="Table3Columns"
              :tableData="Table3Data"
              checkId1="home-slot1table1-check1"
              checkId2="home-slot1table1-check2"
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
  name: "LetterofAttorny",
  mounted() {
    // console.log(this.insPolicyNumber);
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
      console.log(`newVal: ${newVal} \n oldVal: ${oldVal}`);
    },
    immediate: true,
  },
  methods: {
    clickHandler({ formData, allEmpty }) {
      this.formDataBox = formData;
      // console.log(this.formDataBox);
      if (allEmpty) {
        //modal popup
        this.$bvModal.show("bv-modal-example");
      } else {
        this.callTabulatorApi1();//授權、委託書明細-主要資料
        this.callTabulatorApi2();//授權、委託書明細-異動資料
        this.callTabulatorApi3();//授權、委託書明細-歸檔資料
        this.callTabulatorApi4();//授權、委託書明細-暫停扣款資料
      }
    },

    async callTabulatorApi1() {
      const domain = this.$store.state.domain;
      const url = domain + "/premProxy/executeMission01";

      const params = {
        bank_op_ind: this.formDataBox.bankOperationCode,
        policy_no: localStorage.getItem("policy_no"),
      };

      const headers = {
        "Content-Type": "application/x-www-form-urlencoded",
        //Authorization: "bearer " + token,
      };
      const { res } = callApi();
      const { data, status } = await res(url, params, headers);
      const tableDataDetail = data.data[0];
      populateTable(tableDataDetail, this.table);
    },
    async callTabulatorApi2() {
      this.Table1Data = [];
      const domain = this.$store.state.domain;
      const url = domain + "/premProxy/executeMission02";
      const params = {
        bank_op_ind: this.formDataBox.bankOperationCode,
        policy_no: this.insPolicyNumber,
      };

      const headers = {
        "Content-Type": "application/x-www-form-urlencoded",
        //Authorization: "bearer " + token,
      };
      const { res } = callApi();
      const { data, status } = await res(url, params, headers);
      this.Table1Data = data.data;
      // console.log(tableDataDetail)
    },
    async callTabulatorApi3() {
      this.Table1Data = [];
      const domain = this.$store.state.domain;
      const url = domain + "/premProxy/executeMission03";

      const params = {
        bank_op_ind: this.formDataBox.bankOperationCode,
        policy_no: this.insPolicyNumber,
      };

      const headers = {
        "Content-Type": "application/x-www-form-urlencoded",
        //Authorization: "bearer " + token,
      };
      const { res } = callApi();
      const { data, status } = await res(url, params, headers);
      this.Table2Data = data.data;
      // console.log(tableDataDetail)
    },
    async callTabulatorApi4() {
      this.Table1Data = [];
      const domain = this.$store.state.domain;
      const url = domain + "/premProxy/executeMission04";

      const params = {
        bank_op_ind: this.formDataBox.bankOperationCode,
        policy_no: this.insPolicyNumber,
      };

      const headers = {
        "Content-Type": "application/x-www-form-urlencoded",
        //Authorization: "bearer " + token,
      };
      const { res } = callApi();
      const { data, status } = await res(url, params, headers);
      this.Table3Data = data.data;
      // console.log(tableDataDetail)
    },
  },

  data() {
    return {
      formDataBox: null,
      sectiontitle: "授權、委託書明細",
      bar1: [
        {
          inputType: "dropdown",
          inputName: "銀行作業代碼",
          options: ["委託書", "信用卡代收", "信用卡代墊"],
          id: "bankOperationCode",
          inputVal: "委託書",
        },
      ],
      table: [
        { key: "保單號碼", keyId: "policy_no", value: "" },
        { key: "應繳日期", keyId: "paid_to_date", value: "" },
        { key: "帳單日(週期)", keyId: "bank_paid_date", value: "" },
        { key: "要保人", keyId: "applicant_name", value: "" },
        { key: "通知單到期日", keyId: "bill_to_date", value: "" },
        { key: "信用卡有效日", keyId: "disable_date", value: "" },
        { key: "被保險人", keyId: "insured_name", value: "" },
        { key: "停效日期", keyId: "gap_start_date", value: "" },
        { key: "授權人電話", keyId: "acc_tel", value: "" },
        { key: "保單狀態", keyId: "po_sts_code", value: "" },
        { key: "帳號狀態", keyId: "acct_sts_desc", value: "" },
        { key: "授權人地址", keyId: "acc_address", value: "" },
        { key: "保費繳法", keyId: "modx_desc", value: "" },
        { key: "授權書狀態", keyId: "proxy_sts_desc", value: "" },
        { key: "授權人生日", keyId: "acc_birth_date", value: "" },
        { key: "收費方式", keyId: "method_desc", value: "" },
        { key: "異動者", keyId: "process_use", value: "" },
        { key: "累計失敗次數", keyId: "trf_errmax", value: "" },
        { key: "異動日", keyId: "process_date", value: "" },
      ],
      //   acc1--tabulator
      Table1Id: "homeTable1",
      Table1Columns: [
        { title: "異動日期", field: "process_date" },
        { title: "受理號碼", field: "receive_no" },
        { title: "狀態", field: "status_desc" },
        { title: "銀行", field: "bank_name" },
        { title: "扣款銀行", field: "bank_branch_d" },
        { title: "卡別/帳號", field: "card_type" },
        { title: "	帳單日(週期)", field: "bank_paid_date" },
        { title: "授權人", field: "acc_name" },
        { title: "授權人ID", field: "acc_id" },
        { title: "	異動者", field: "process_user" },
      ],
      Table1Data: [],
      // acc2---tabulator
      Table2Id: "homeTable2",
      Table2Columns: [
        { title: "歸檔號碼", field: "return_no" },
        { title: "歸檔類別", field: "return_type" },
        { title: "歸檔日期", field: "return_date" },
        { title: "歸檔者", field: "return_user" },
        { title: "受理號碼", field: "receive_no" },
        { title: "歸檔原因", field: "return_reason" },
      ],
      Table2Data: [],
      //  acc3--tabulator
      Table3Id: "homeTable3",
      Table3Columns: [
        { title: "暫停扣款迄月", field: "trf_end_date" },
        { title: "處理日期", field: "process_date" },
        { title: "處理時間", field: "process_time" },
        { title: "處理者", field: "process_user" },
      ],
      Table3Data: [],
    };
  },
};
</script>
