//36,37--自動化查詢
<template>
  <div>
    <SectionTitle :title="sectiontitle" />
    <Tabs :titles="titles" :tabLen="tabLens">
      <template v-slot:1>
        <TabulatorTable
          :tableId="slot1Table1Id"
          :columns="slot1Table1Columns"
          :tableData="slot1Table1Data"
          checkId1="automatedQuery-slot1table1-check1"
          checkId2="automatedQuery-slot1table1-check2"
          @transmit-tabulator-data="handleTabulatorData"
        />
        <TabulatorTable
          :tableId="slot1Table2Id"
          :columns="slot1Table2Columns"
          :tableData="slot1Table2Data"
          checkId1="automatedQuery-slot1table2-check1"
          checkId2="automatedQuery-slot1table2-check2"
        />
      </template>
    </Tabs>
    <Tabs :titles="titles2" :tabLen="tabLens" @tab-call-api="tabCallApi">
      <template v-slot:1>
        <TabulatorTable
          :tableId="slot1Table3Id"
          :columns="slot1Table3Columns"
          :tableData="slot1Table3Data"
          checkId1="automatedQuery-slot1table3-check1"
          checkId2="automatedQuery-slot1table3-check2"
        />
      </template>
      <template v-slot:2>
        <TabulatorTable
          :tableId="slot1Table4Id"
          :columns="slot1Table4Columns"
          :tableData="slot1Table4Data"
          checkId1="automatedQuery-slot1table4-check1"
          checkId2="automatedQuery-slot1table4-check2"
        />
      </template>
    </Tabs>
  </div>
</template>
<script>
import callApi from "../helperFunctions/callApi";
export default {
  name: "AutomatedQuery",
  mounted() {
    this.accountDetails(); //帳戶明細上面table
  },
  computed: {
    clientId() {
      return this.$store.state.assured;
    },
  },
  methods: {
    tabCallApi(tabName) {
      this.currentTab=tabName;
      this.handleAllTabsApi();
    },
    handleAllTabsApi(){
      if(!this.tableRowData) return;
      let tabName = this.currentTab;
      switch(tabName){
        case "建檔明細":
          this.firstTabTable(); //建檔明細
          break;
          case "密碼列印紀錄":
          this.secondTabTable(); //密碼列印紀錄
          break;
      }
    },
    async accountDetails() {
      this.slot1Table1Data = [];
      const domain = this.$store.state.domain;
      const url = domain + "/posEC/executeMission01";
      // const token = this.$store.state.token;
      const params = {
        client_id: this.clientId,
      };
      const headers = {
        "Content-Type": "application/x-www-form-urlencoded",
        //Authorization: "bearer " + token,
      };
      const { res } = callApi();
      const { data } = await res(url, params, headers);
      let accountTopdata = data.data;
      this.slot1Table1Data = accountTopdata;
    },
    handleTabulatorData(rowValue) {
      this.tableRowData = rowValue;
      this.accountBelowTable(); //帳戶明細下面table
      this.handleAllTabsApi();
    },
    async accountBelowTable() {
      this.slot1Table2Data = [];
      const domain = this.$store.state.domain;
      const url = domain + "/posEC/executeMission02";
      // const token = this.$store.state.token;
      const params = {
        account_no: this.tableRowData.remit_account,
        acct_source: this.tableRowData.acct_source,
        bank_id: this.tableRowData.remit_bank,
        lcnt: this.tableRowData.accu_lcnt,
        client_id: this.clientId,
      };
      const headers = {
        "Content-Type": "application/x-www-form-urlencoded",
        //Authorization: "bearer " + token,
      };
      const { res } = callApi();
      const { data } = await res(url, params, headers);
      let tableData = data.data;
      this.slot1Table2Data = tableData;
    },
    async firstTabTable() {
      this.slot1Table3Data=[];
      const domain = this.$store.state.domain;
      const url = domain + "/posEC/executeMission03";
      // const token = this.$store.state.token;
      const params = {
        account_no: this.tableRowData.remit_account,
        acct_source: this.tableRowData.acct_source,
        bank_id: this.tableRowData.remit_bank,
        client_id: this.clientId,
      };
      const headers = {
        "Content-Type": "application/x-www-form-urlencoded",
        //Authorization: "bearer " + token,
      };
      const { res } = callApi();
      const { data } = await res(url, params, headers);
      let tableData = data.data;
      this.slot1Table3Data = tableData;
    },
    async secondTabTable(){
      this.slot1Table4Data=[];
      const domain = this.$store.state.domain;
      const url = domain + "/posEC/executeMission04";
      // const token = this.$store.state.token;
      const params = {
        account_no: this.tableRowData.remit_account,
        acct_source: this.tableRowData.acct_source,
        bank_id: this.tableRowData.remit_bank,
        client_id: this.clientId,
      };
      const headers = {
        "Content-Type": "application/x-www-form-urlencoded",
        //Authorization: "bearer " + token,
      };
      const { res } = callApi();
      const { data } = await res(url, params, headers);
      let tableData = data.data;
      this.slot1Table4Data=tableData;
    }
  },
  data() {
    return {
      currentTab:"建檔明細",
      tableRowData: null,
      sectiontitle: "自動化查詢",
      tabLens: 2,
      titles: ["帳戶明細", "EC交易紀錄"],
      titles2: ["建檔明細", "密碼列印紀錄"],
      slot1Table1Id: "automatedQuerySlot1Table1",
      slot1Table1Columns: [
        { title: "狀態", field: "active_sw" },
        { title: "幣別", field: "currency_ind	" },
        { title: "類別", field: "acct_source" },
        { title: "戶名", field: "payee" },
        { title: "戶名(英)", field: "payee_e" },
        { title: "匯款銀行", field: "remit_bank" },
        { title: "帳號", field: "remit_account" },
        { title: "銀行名稱", field: "bank_name" },
      ],
      slot1Table1Data: [],
      slot1Table2Id: "automatedQuerySlot1Table2",
      slot1Table2Columns: [
        { title: "密碼等級", field: "pwd_sw" },
        { title: "借款提領次數", field: "accu_lcnt" },
        { title: "累積錯誤次數", field: "accu_ecnt" },
      ],
      slot1Table2Data: [],
      slot1Table3Id: "automatedQuerySlot1Table3",
      slot1Table3Columns: [
        { title: "訊息", field: "active_sw" },
        {
          title: "被保險人",
          field: "name",
          formatter: function(cell) {
            let data = cell.getRow().getData();
            let dataFormmater=data.insured_id + "/" + data.insured_name;
            return dataFormmater;
            }
        },
        { title: "保單號碼", field: "policy_no" },
        { title: "保單狀態", field: "po_sts_code" },
        {
          title: "銀行代碼及帳號",
          field: "",
          formatter: function(cell) {
            let data = cell.getRow().getData();
            return data.bank_id + "-" + data.account_no;
          },
        },
      ],
      slot1Table3Data: [],
      slot1Table4Id: "automatedQuerySlot1Table4",
      slot1Table4Columns: [
        { title: "列印方式", field: "print_style_desc" },
        { title: "列印項目", field: "prt_op_desc" },
        { title: "列印日期", field: "print_date" },
        { title: "失效日期", field: "overdue_date" },
        { title: "列印者", field: "user_name" },
        { title: "郵寄地址", field: "address" },
      ],
      slot1Table4Data: [],
    };
  },
};
</script>
