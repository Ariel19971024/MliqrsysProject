//59---應付未付查詢
<template>
  <div>
    <SectionTitle :title="sectiontitle" />
    <div class="content-component content-card">
      <div class="card-inner">
        <div class="card-detail">
          <Accordion id="acc1" title="應付未付款項保單查詢">
            <Tags :tags="tags" />
            <TabulatorTable
              :tableId="Table1Id"
              :columns="Table1Columns"
              :tableData="Table1Data"
              checkId1="unpaiquery-acc1table1-check1"
              checkId2="unpaiquery-acc1table1-check2"
              @transmit-tabulator-data="handleTabulatorData"
            />
          </Accordion>
          <Accordion id="acc2" title="應付未付款項">
            <TabulatorTable
              :tableId="Table2Id"
              :columns="Table2Columns"
              :tableData="Table2Data"
              checkId1="unpaiquery-acc2table2-check1"
              checkId2="unpaiquery-acc2table2-check2"
            />
            <TabulatorTable
              :tableId="Table3Id"
              :columns="Table3Columns"
              :tableData="Table3Data"
              checkId1="unpaiquery-acc2table3-check1"
              checkId2="unpaiquery-acc2table3-check2"
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
  name: "UnpaidQuery",
  mounted() {
    this.unpaidSearchApi();
  },
  computed: {
    applicantId() {
      return this.$store.state.applicant;
    },
  },
  methods: {
    async unpaidSearchApi() {
      const domain = this.$store.state.domain;
      const url = domain + "/shouldPayNoPayData/executeMission01";
      // const token = this.$store.state.token;
      const params = {
        o1_id: this.applicantId,
      };
      const headers = {
        "Content-Type": "application/x-www-form-urlencoded",
        //Authorization: "bearer " + token,
      };
      const { res } = callApi();
      const { data } = await res(url, params, headers);
      this.tags[0].detail = this.applicantId;
      let table1Data = data.data;
      this.Table1Data = table1Data;
    },
    async handleTabulatorData(rowValue) {
      this.Table2Data = [];
      this.Table3Data = [];
      console.log(rowValue);
      const domain = this.$store.state.domain;
      const url = domain + "/shouldPayNoPayData/executeMission02";
      // const token = this.$store.state.token;
      const params = {
        pshpPolicy_no: rowValue.policy_no,
      };
      const headers = {
        "Content-Type": "application/x-www-form-urlencoded",
        //Authorization: "bearer " + token,
      };
      const { res } = callApi();
      const { data } = await res(url, params, headers);
      let tableResult = data.data;
      this.Table2Data = tableResult;
      this.Table3Data = tableResult;
    },
  },
  data() {
    return {
      sectiontitle: "應付未付查詢",
      tags: [{ title: "客戶證號", detail: "" }],
      Table1Id: "homeTable1",
      Table1Columns: [
        { title: "保單號碼", field: "policy_no" },
        { title: "幣別", field: "currency" },
        { title: "狀態", field: "po_sts_code" },
        { title: "要保人", field: "o1_name" },
        { title: "主被保人", field: "i1_name" },
        { title: "生存受益人", field: "survialBeneficiaryNameString	" },
        { title: "期滿受益人", field: "maturedBeneficiaryNameString" },
        { title: "身故受益人", field: "deathBeneficiaryNameString" },
      ],
      Table1Data: [],
      Table2Id: "homeTable2",
      Table2Columns: [
        { title: "原交易日期", field: "tran_date_o" },
        { title: "功能碼", field: "function_code" },
        { title: "作業指示", field: "pshp_indDesc" },
        { title: "原付款號碼", field: "disb_no_o" },
        { title: "原付款對象", field: "names" },
        { title: "原付款對象ID", field: "client_id" },
        { title: "給付金額", field: "payee" },
        { title: "部門", field: "dept_code" },
      ],
      Table2Data: [],
      Table3Id: "homeTable3",
      Table3Columns: [
        { title: "新交易日期", field: "tran_date" },
        { title: "新付款號碼", field: "disb_no" },
        {
          title: "付款狀態",
          field: "",
          formatter: function(cell) {
            let data = cell.getRow().getData();
            return data.disb_sts_code + " " + data.disb_sts_desc;
          },
        },
        {
          title: "處理狀態",
          field: "",
          formatter: function(cell) {
            let data = cell.getRow().getData();
            return data.pshp_sts_code + " " + data.pshp_sts_Desc;
          },
        },
        { title: "處理日期", field: "process_date" },
        { title: "申請單位", field: "fapply_dept_code" },
        { title: "申請者", field: "apply_userName" },
        { title: "申請日期", field: "apply_date" },
        { title: "確認者", field: "approve_userName" },
        { title: "確認日期", field: "approve_date" },
      ],
      Table3Data: [],
    };
  },
};
</script>
