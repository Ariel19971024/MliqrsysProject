//47,48--集體彙繳查詢
<template>
  <div>
    <SectionTitle :title="sectiontitle" />
    <div class="content-component content-card">
      <div class="card-inner">
        <div class="card-detail">
          <SearchFormCombine :bar="bar1" @btn-click-event="clickHandler" />
          <Accordion id="acc1" title="查詢彙繳人">
            <TabulatorTable
              :tableId="Table1Id"
              :columns="Table1Columns"
              :tableData="Table1Data"
              checkId1="remittanceinquiry-acc1table1-check1"
              checkId2="remittanceinquiry-acc1table1-check2"
              @transmit-tabulator-data="handleTabulatorData"
            />
            <Table :colNum="2" :table="table" />
          </Accordion>
          <Accordion id="acc2" title="彙繳內容">
            <TabulatorTable
              :tableId="Table2Id"
              :columns="Table2Columns"
              :tableData="Table2Data"
              checkId1="remittanceinquiry-acc2table2-check1"
              checkId2="remittanceinquiry-acc2table2-check2"
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
  name:"Remittanceinquiry",
  data() {
    return {
      dataBox:null,
      searchData: {},
      content: "請輸入查詢條件",
      sectiontitle: "集體彙繳查詢",
      details: [],
      bar1: [
        {
          inputType: "textfield",
          inputName: "彙繳編號",
          placeholder: "彙繳編號",
          id: "remittanceNumber",
          inputVal: "",
        },
        {
          inputType: "textfield",
          inputName: "受任人姓名",
          placeholder: "受任人姓名",
          id: "nameOfAssignee",
          inputVal: "",
        },
        {
          inputType: "textfield",
          inputName: "公司名稱",
          placeholder: "公司名稱",
          id: "companyName",
          inputVal: "",
        },
      ],
      //   acc1--tabulator
      Table1Id: "homeTable1",
      Table1Columns: [
        { title: "彙繳編號", field: "m_group_code" },
        { title: "	受任人姓名", field: "m_assigner" },
        { title: "公司名稱", field: "m_company_name" },
      ],
      Table1Data: [],
      // acc2---tabulator
      Table2Id: "homeTable2",
      Table2Columns: [
        { title: "保單號碼", field: "m_policy_no" },
        { title: "要保人", field: "m_owner_name" },
        { title: "被保險人", field: "m_insured_name" },
        { title: "生效日", field: "m_issue_date" },
        { title: "繳費終日", field: "m_paid_to_date" },
        { title: "繳別", field: "m_modx" },
        { title: "狀態", field: "m_po_sts_code" },
        { title: "新", field: "m_new_ind" },
        { title: "舊", field: "m_old_ind" },
      ],
      Table2Data: [],

      table: [
        { key: "彙繳編號", keyId: "m_group_code", value: "" },
        { key: "彙繳生效", keyId: "m_effect_date", value: "" },
        { key: "彙繳地址", keyId: "m_address", value: "" },
        { key: "前次修改日", keyId:"m_process_date", value: "" },
        { key: "郵遞區號", keyId: "m_zip_code", value: "" },
        { key: "前次修改者", keyId:"m_process_name", value: "" },
        { key: "受任人姓名", keyId: "m_assigner", value: "" },
        { key: "指示說明", keyId: "m_group_rate_desc", value: "" },
        { key: "彙繳電話", keyId:"m_tel_1", value: "" },
        { key: "總件數", keyId: "m_new_desc", value: "" },
        { key: "公司名稱", keyId: "m_company_name", value: "" },
        { key: "總人數", keyId: "m_new_desc", value: "" },
      ],
      pracData: [],
    };
  },
  methods: {
    async handleTabulatorData(value){
      this.Table2Data=[],
      console.log(value.m_group_code)
      const domain = this.$store.state.domain;
      const url = domain + "/premGBill/executeMission03";

      const params = {
        group_code: value.m_group_code,
      };

      const headers = {
        "Content-Type": "application/x-www-form-urlencoded",
        //Authorization: "bearer " + token,
      };
      const { res } = callApi();
      const { data, status } = await res(url, params, headers);
      console.log(data.data)
      this.Table2Data=data.data
    },
     clickHandler({ formData, allEmpty }) {
       this.dataBox=formData
      if (allEmpty) {
        //modal popup
        this.$bvModal.show("bv-modal-example");
      } else {
        this.assignerApi()//查詢彙繳人
        this.assignerTableApi()//查詢彙繳人table
      }
      
      
    },
    async assignerApi(){
      
      const domain = this.$store.state.domain;
      const url = domain + "/premGBill/executeMission";

      const params = {
        assigner: this.dataBox.nameOfAssignee,
        company_name:this.dataBox.companyName,
        group_code: this.dataBox.remittanceNumber,
      };

      const headers = {
        "Content-Type": "application/x-www-form-urlencoded",
        //Authorization: "bearer " + token,
      };
      const { res } = callApi();
      const { data, status } = await res(url, params, headers);
      const tableDataDetail = data.data;
      this.Table1Data=data.data
    },
    async assignerTableApi(){
       const domain = this.$store.state.domain;
      const url = domain + "/premGBill/executeMission02";

      const params = {
        assigner: this.dataBox.nameOfAssignee,
        company_name:this.dataBox.companyName,
        group_code: this.dataBox.remittanceNumber,
      };

      const headers = {
        "Content-Type": "application/x-www-form-urlencoded",
        //Authorization: "bearer " + token,
      };
      const { res } = callApi();
      const { data, status } = await res(url, params, headers);
      console.log(data.data)
      let TableData=data.data[0]
      populateTable(TableData, this.table);
    },
  },
};
</script>
