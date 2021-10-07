//49--退件查詢
<template>
  <div>
    <SectionTitle :title="sectiontitle" />
    <div class="content-component content-card">
      <div class="card-inner">
        <div class="card-detail"></div>
        <Accordion id="acc1" title="退件資料">
          <TabulatorTable
            :tableId="Table1Id"
            :columns="Table1Columns"
            :tableData="Table1Data"
            checkId1="returnquery-table1-check1"
            checkId2="returnquery-table1-check2"
            @transmit-tabulator-data="handleTabulatorData"
          />
        </Accordion>
        <Accordion id="acc2" title="保戶資料">
          <Table :colNum="1" :table="acc1_table" />
        </Accordion>
        <Accordion id="acc3" title="業務員資料">
          <Table :colNum="1" :table="acc2_table" />
        </Accordion>
        <Accordion id="acc4" title="代辦人資料">
          <Table :colNum="1" :table="acc3_table" />
        </Accordion>
      </div>
    </div>
  </div>
</template>
<script>
import callApi from "../helperFunctions/callApi";
import { populateTable } from "../helperFunctions/commonVue.js";
export default {
  name:"ReturnQuery",
  mounted(){
    this.returnDataTable()//退件資料
  },
  computed:{
    insPolicyNumber() {
      return this.$store.state.insPolicyNumber;
    },
  },
  methods:{
    async returnDataTable(){
       const domain = this.$store.state.domain;
      const url = domain + "/premReject/executeMission01";

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
      this.returnTableData=data.data;
      this.Table1Data=this.returnTableData;
    },
    async handleTabulatorData(rowValue){//保戶資料+業務員資料+代辦人資料
    console.log(rowValue)
         const domain = this.$store.state.domain;
      const url = domain + "/premReject/executeMission02";

      // const token = this.$store.state.token;
      const params = {
        bank_op_ind:rowValue.bank_op_ind,
        policy_no:this.insPolicyNumber,
        process_date:rowValue.process_date,
        
      };
      const headers = {
        "Content-Type": "application/x-www-form-urlencoded",
        //Authorization: "bearer " + token,
      };
      const { res } = callApi();
      const { data } = await res(url, params, headers);
      let clientData=data.data[0];
      console.log(clientData);
      populateTable(clientData, this.acc1_table);
      populateTable(clientData, this.acc2_table);
      populateTable(clientData, this.acc3_table);
    }
  },
  data() {
    return {
      returnTableData:null,
      sectiontitle: "退件查詢",
      Table1Id: "homeTable1",
      Table1Columns: [
        { title: "保單號碼", field: "policy_no" },
        { title: "類別", field: "bank_op_ind" },
        { title: "幣別", field: "currency_desc" },
        { title: "錯誤訊息", field: "reject_msg" },
        { title: "收費方式", field: "method_desc" },
        { title: "應繳日期", field: "paid_to_date" },
        { title: "處理日期", field: "process_date" },
        { title: "受理號碼", field: "receive_no" },
        { title: "處理者", field: "process_user" },
      ],
      Table1Data: [],
      acc1_table: [
        { key: "狀態", keyId: "attention_ind", value: "" },
        { key: "姓名", keyId: "o1_name", value: "" },
        { key: "身份證字號", keyId: "o1_id", value: "" },
      ],
      acc2_table: [
        { key: "狀態", keyId: "agent_ind", value: "" },
        { key: "姓名", keyId: "agent_name", value: "" },
        { key: "身份證字號", keyId: "agent_name", value: "" },
        { key: "營業處", keyId: "agent_dept", value: "" },
      ],
      acc3_table: [
        { key: "狀態", keyId: "send_user_ind", value: "" },
        { key: "姓名", keyId:"send_user_name", value: "" },
        { key: "身份證字號", keyId: "send_user_id", value: "" },
        { key: "營業處", keyId: "send_user_dept", value: "" },
        { key: "代辦人身份", keyId: "send_user_desc", value: "" },
      ],
    };
  },
};
</script>
