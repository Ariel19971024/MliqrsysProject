//58--保單匯款帳戶查詢
<template>
  <div>
    <SectionTitle :title="sectiontitle" />
    <div class="content-component content-card">
      <div class="card-inner">
        <div class="card-detail">
          <Accordion id="acc1" title="保單匯款帳戶查詢">
            <Tags :tags="tags" />
            <TabulatorTable
              :tableId="Table1Id"
              :columns="Table1Columns"
              :tableData="Table1Data"
              checkId1="policypaymentquery-table1-check1"
              checkId2="policypaymentquery-table1-check2"
            />
          </Accordion>
          <Accordion id="acc2" title="保單匯款帳號">
            <TabulatorTable
              :tableId="Table2Id"
              :columns="Table2Columns"
              :tableData="Table2Data"
              checkId1="policypaymentquery-acc2table2-check1"
              checkId2="policypaymentquery-acc2table2-check2"
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
  name:"PolicyPaymentQuery",
  mounted(){
    this.paymentSearchApiCall()//保單匯款帳戶查詢
    this.paymentAccountApiCall()//保單匯款帳號
  },
  computed:{
    singleInsPolicyData(){
      return this.$store.state.singleInsPolicyData;
    },
    assured(){
      return this.$store.state.assured;
    },
    insPolicyNumber() {
      return this.$store.state.insPolicyNumber;
    },
  },
  methods:{
    async paymentSearchApiCall(){
      this.Table1Data=[];
      const domain = this.$store.state.domain;
      const url = domain + "/payAccount/executeMission01";
      // const token = this.$store.state.token;
      const params = {
        client_id:this.assured,
        client_name:this.singleInsPolicyData.i1_name,
        policy_no: this.insPolicyNumber,
      };
      const headers = {
        "Content-Type": "application/x-www-form-urlencoded",
        //Authorization: "bearer " + token,
      };
      const { res } = callApi();
      const { data } = await res(url, params, headers);
      let table1Data= data.data;
      this.Table1Data=table1Data;
      this.tags[0].detail=this.assured;
      this.tags[1].detail=this.singleInsPolicyData.i1_name;
    },
    async paymentAccountApiCall(){
      const domain = this.$store.state.domain;
      const url = domain + "/payAccount/executeMission02";
      // const token = this.$store.state.token;
      const params = {
        client_id:this.assured,
        client_name:this.singleInsPolicyData.i1_name,
        policy_no: this.insPolicyNumber,
      };
      const headers = {
        "Content-Type": "application/x-www-form-urlencoded",
        //Authorization: "bearer " + token,
      };
      const { res } = callApi();
      const { data } = await res(url, params, headers);
      let table2Data =data.data;
      this.Table2Data=table2Data;
    },
  },
  data() {
    return {
      sectiontitle: "保單匯款帳戶查詢",
      tags: [
        { title: "客戶證號", detail: "" },
        { title: "客戶姓名", detail: "" },
      ],
      Table1Id: "homeTable1",
      Table1Columns: [
        { title: "保單號碼", field: "r_policy_no" },
        { title: "幣別", field: "r_currency" },
        { title: "帳戶狀況", field: "r_acct_sts_desc" },
        { title: "銀行代碼", field: "r_bank_code" },
        { title: "匯款帳號", field: "r_bank_account" },
        { title: "銀行名稱", field: "r_bank_name" },
        { title: "通匯代碼", field: "r_swift_code" },
        { title: "銀行英文名稱", field: "r_bank_name_e" },
        { title: "受款人英文姓名", field: "r_names_e" },
      ],
      Table1Data: [],
      Table2Id: "homeTable2",
      Table2Columns: [
        { title: "客戶證號", field: "r_policy_no" },
        { title: "姓名", field: "r_names" },
        { title: "關係", field: "r_relation" },
        { title: "幣別", field: "r_currency" },
        { title: "帳號狀況", field: "r_acct_sts_desc" },
        { title: "銀行代碼", field: "r_bank_code" },
        { title: "匯款帳號", field: "r_bank_account" },
        { title: "英文姓名", field: "r_names_e" },
      ],
      Table2Data: [],
    };
  },
};
</script>
