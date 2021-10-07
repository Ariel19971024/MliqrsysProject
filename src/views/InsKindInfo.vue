<template>
  <!-- 11 保障險種資料-->
  <div>
    <SectionTitle :title="sectionTitle" />
    <div class="content-card">
      <div class="card-inner">
        <div class="card-detail">
          <Accordion id="inskindinfo-acc1" title="保障內容">
            <TabulatorTable
              :tableId="tableAcc1Id"
              :columns="tableAcc1Columns"
              :tableData="tableAcc1Data"
              checkId1="inskindinfo-acc1-check1"
              checkId2="inskindinfo-acc1-check2"
              @transmit-tabulator-data="handleTabulatorData"
            />
          </Accordion>
          <Accordion id="inskindinfo-acc2" title="保障內容與其他相關資料">
            <Table :colNum="2" :table="table1Data" />
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
  name: "InsKindInfo",
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
  },
  computed: {
    insPolicyNumber() {
      return this.$store.state.insPolicyNumber;
    },
  },
  watch: {
    // insPolicyNumber:{
    //   handler(newVal, oldVal){
    //      this.watchApiCall();
    //       console.log(`newVal: ${newVal} \n oldVal: ${oldVal}`);
    //   }
    // },
    // immediate:true,
    // deep: true
    insPolicyNumber(newVal, oldVal) {
      //call api to set table1Data
      this.watchApiCall();//保障險種資料
      // localStorage.policy_no=newVal;
      console.log(oldVal);
      console.log(`newVal: ${newVal} \n oldVal: ${oldVal}`);
    },
    immediate: true,
  },
  methods: {
    handleTabulatorData(rowData) {//push data in to table
      //* to populate custom table
      console.log(rowData);
      this.table1Data = populateTable(rowData, this.table1Data);
    },
    async watchApiCall() {
      //table2 init
      this.tableAcc1Data = [];
      const domain = this.$store.state.domain;
      const url = domain + "/poPlan/executeMission";
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
      this.tableAcc1Data = data.data;
    },
  },

  data() {
    return {
      sectionTitle: "保障險種資料",
      tableAcc1Id: "tableAcc1Id",
      tableAcc1Columns: [
        { title: "關係", field: "client_ident" },
        // no match
        { title: "產品簡名", field: "plan_code" },
        { title: "版數", field: "rate_scale" },
        { title: "社保", field: "rate_insu" },
        { title: "保額", field: "unit_value" },
        // no match
        { title: "狀態", field: "co_sts_desc" },
        { title: "職級", field: "rate_occu" },
        { title: "年齡", field: "rate_age" },
        { title: "性別", field: "rate_sex" },
        { title: "年度", field: "dur" },
        { title: "生效日期", field: "co_issue_date" },
        // no match
        { title: "每期保費", field: "prem_factor" },
        // no match
        { title: "變更生效日", field: "co_chg_date" },
      ],
      tableAcc1Data: [],
      table1Data: [
        { key: "險種名稱", keyId: "plan_desc", value: "" },
        { key: "比例加費", keyId: "multi_rating_1", value: "" },
        { key: "單位保額", keyId: "unit_value", value: "" },
        { key: "繳費終日", keyId: "matured_date", value: "" },
        { key: "單位保費", keyId: "prem_factor", value: "" },
        { key: "展期終日", keyId: "eti_expired_date", value: "" },
        { key: "定額加費", keyId: "flat_rating_amt", value: "" },
        { key: "生存保額", keyId: "eti_pe_amt", value: "" },
        { key: "生效日期", keyId: "co_issue_date", value: "" },
        { key: "基本附加", keyId: "b_prem_loading", value: "" },
        { key: "應繳費日", keyId: "paid_to_date", value: "" },
        { key: "體位", keyId: "rate_medi", value: "" },
        { key: "增額繳清", keyId: "accumulated_pua", value: "" },
        //no match
        { key: "原始保費", keyId: "prem_factor", value: "" },
        { key: "弱體代碼", keyId: "sub_std_desc", value: "" },
        { key: "加費年期", keyId: "flat_rating_year", value: "" },
        { key: "保險金額/保費", keyId: "face_amt", value: "" },
        { key: "保障終期", keyId: "expired_date", value: "" },
        { key: "每期保費", keyId: "prem_factor", value: "" },
        { key: "保障狀態", keyId: "co_sts_desc", value: "" },
        { key: "基本投資", keyId: "b_prem_loading", value: "" },
        { key: "生存到期", keyId: "eti_pe_date", value: "" },
        { key: "", keyId: 22, value: "" },
        { key: "年度目標", keyId: "co_target_prem", value: "" },
      ],
    };
  },
};
</script>
