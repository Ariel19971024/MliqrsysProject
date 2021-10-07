//50,51--送金紀錄查詢
<template>
  <div>
    <SectionTitle :title="sectiontitle" />
    <div class="content-component content-card">
      <div class="card-inner">
        <div class="card-detail">
           
          <Table :colNum="3" :table="table" />
          <Accordion id="acc1" title="送金紀錄">
            <TabulatorTable
              :tableId="Table1Id"
              :columns="Table1Columns"
              :tableData="Table1Data"
              checkId1="goldAwardRecord-acc1table1-check1"
              checkId2="goldAwardRecord-acc1table1-check2"
              @transmit-tabulator-data="handleTabulatorData"
            />
          </Accordion>
          <Tabs :titles="titles" :tabLen="tabLen" @tab-call-api="tabCallApi">
            <template v-slot:1>
              <Table :colNum="2" :table="table2" />
            </template>
            <template v-slot:2>
              <Accordion id="acc2" title="修改歷史">
                <TabulatorTable
                  :tableId="slot2Table2Id"
                  :columns="slot2Table2Columns"
                  :tableData="slot2Table2Data"
                  checkId1="goldAwardRecord-acc2table2-check1"
                  checkId2="goldAwardRecord-acc2table2-check2"
                />
              </Accordion>
            </template>
          </Tabs>
        </div>
      </div>
    </div>
  </div>
  
</template>
<script>
import callApi from "../helperFunctions/callApi";
import { populateTable } from "../helperFunctions/commonVue.js";
export default {
  name: "GoldAwardRecord",
  mounted() {
    this.watchApiCall();
    this.watchTabulatorCall();
  },
  computed: {
    insPolicyNumber() {
      return this.$store.state.insPolicyNumber;
    },
  },
  watch: {
    insPolicyNumber(newVal, oldVal) {
      this.watchApiCall(); //送金紀錄查詢下面table
      this.watchTabulatorCall(); //送金紀錄
      console.log(oldVal);
      console.log(`newVal: ${newVal} \n oldVal: ${oldVal}`);
    },
    immediate: true,
  },
  methods: {
    //送金紀錄查詢下面table-----
    async watchApiCall() {
      console.log("tableApi");
      //table2 init
      const domain = this.$store.state.domain;
      const url = domain + "/premBldt/executeMission";
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
      let newTableData = data.data[0];
      populateTable(newTableData, this.table);
    },
    //送金紀錄-----
    async watchTabulatorCall() {
      console.log("tableApi");
      //table2 init
      this.Table1Data = [];
      const domain = this.$store.state.domain;
      const url = domain + "/premBldt/executeMission01";
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
      this.Table1Data = data.data;
    },
    
    async handleTabulatorData(rowData) {
      this.tableRowData = rowData;
      console.log(this.tableRowData);
      this.tabCallApiHandler();
      this.firstTabApi();
    },
    //tabapi
     tabCallApi(tabName) {
      this.currentTabName=tabName;
      this.tabCallApiHandler();
      
    },
    tabCallApiHandler(){
      let tabName = this.currentTabName;
      if (!this.tableRowData) return;
      switch (tabName) {
        case "送金明細":
          this.firstTabApi(); //送金明細
          break;
        case "修改歷史":
          this.secondTabApi(); //修改歷史
          break;
      }
    },
    async secondTabApi(){//修改歷史
      this.slot2Table2Data = [];
      const domain = this.$store.state.domain;
      const url = domain + "/premBldt/executeMission03";
      // const token = this.$store.state.token;
      const params = {
        bill_no: this.tableRowData.bill_no,
        related_key: this.tableRowData.related_key,
      };
      const headers = {
        "Content-Type": "application/x-www-form-urlencoded",
        //Authorization: "bearer " + token,
      };
      const { res } = callApi();
      const { data } = await res(url, params, headers);
      this.slot2Table2Data = data.data;
    },
    async firstTabApi(){//送金明細
      const domain = this.$store.state.domain;
      const url = domain + "/premBldt/executeMission02";
      // const token = this.$store.state.token;
      const params = {
        bill_no: this.tableRowData.bill_no,
        related_key: this.tableRowData.related_key,
      };
      const headers = {
        "Content-Type": "application/x-www-form-urlencoded",
        //Authorization: "bearer " + token,
      };
      const { res } = callApi();
      const { data } = await res(url, params, headers);
      let newTableData = data.data[0];
      populateTable(newTableData, this.table2);
      populateTable(this.tableRowData, this.table2);
    }
  },
  data() {
    return {
      currentTabName:null,
      tableRowData: null,
      tabLen: 2,
      titles: ["送金明細", "修改歷史"],
      sectiontitle: "送金紀錄查詢",
      table: [
        { key: "保單號碼", keyId: "policy_no", value: "事故人ID_設計文字" },
        {
          key: "應繳費日",
          keyId: "paid_to_date",
          value: "送件業務員姓名_設計文字",
        },
        { key: "紅利金額", keyId: "dividend", value: "受益人_設計文字" },
        { key: "保單狀態", keyId: "po_sts_desc", value: "扣貸款本息_設計文字" },
        {
          key: "送金到期日",
          keyId: "bill_to_date",
          value: "事故人姓名_設計文字",
        },
        {
          key: "回饋分享金",
          keyId: "accu_return_amt",
          value: "營業單位_設計文字",
        },
        { key: "生效日期", keyId: "po_issue_date", value: "結案日期_設計文字" },
        { key: "本期保費", keyId: "mode_prem_h", value: "扣欠繳保費_設計文字" },
        {
          key: "收費代碼",
          keyId: "collector_id",
          value: "保單關係人_設計文字",
        },
        { key: "被保險人", keyId: "i1_name", value: "事故型態_設計文字" },
        {
          key: "原始保費",
          keyId: "gross_mode_prem",
          value: "保險種類_設計文字",
        },
        { key: "收費員", keyId: "collector_name", value: "解約金_設計文字" },
        { key: "要保人", keyId: "o1_name", value: "生效日期_設計文字" },
        { key: "溢/欠款", keyId: "prem_susp", value: "支票委託書_設計文字" },
        { key: "收費區域", keyId: "collect_code", value: "理賠給付_設計文字" },
        { key: "繳法", keyId: "modx_desc", value: "給付小記_設計文字" },
        { key: "折扣金額", keyId: "prem_disc", value: "受理號碼_設計文字" },
        { key: "折扣期限", keyId: "disc_deadline", value: "差額證明_設計文字" },
        { key: "收費方式", keyId: "method_desc", value: "紅利給付_設計文字" },
      ],
      Table1Id: "goldAwardRecordTable1",
      Table1Columns: [
        { title: "序號", field: "seqno" },
        { title: "送金單號", field: "bill_no" },
        { title: "狀態", field: "bldt_sts_date" },
        { title: "應繳費日", field: "bill_date_from" },
        { title: "收費員代碼", field: "collector" },
        { title: "收費員", field: "collector_name" },
        { title: "入帳保費", field: "mode_prem" },
        { title: "Related Key", field: "related_key" },
        { title: "初始出單日", field: "process_date" },
        { title: "狀態日期", field: "bldt_sts_date" },
        { title: "最遠支票日", field: "last_check_date" },
      ],
      Table1Data: [],
      table2: [
        { key: "原始保費", keyId: "gross_mode_prem", value: "" },
        { key: "", keyId: "", value: "" },
        { key: "高保費", keyId: "high_remark", value: "" },
        { key: "應繳費日", keyId: "bill_date_from", value: "" },
        { key: "高保費金額", keyId: "high_remark", value: "" },
        { key: "繳次", keyId: "modx_sequence", value: "" },
        { key: "歸檔批次", keyId: "bill_return_no", value: "" },
        { key: "原始保費", keyId: "gross_mode_prem", value: "" },
        { key: "收費率", keyId: "coll_rate_ind", value: "" },
        { key: "入帳日期", keyId: "bldt_sts_date", value: "" },
        { key: "定期保費", keyId: "fixed_ind", value: "" },
        { key: "保費折扣", keyId: "prem_disc", value: "" },
        { key: "E-Billing", keyId: "pceb_sts_code", value: "" },
        { key: "折扣率", keyId: "prem_disc_perc", value: "" },
      ],
      slot2Table2Id: "goldAwardRecordSlot2Table1",
      slot2Table2Columns: [
        { title: "變更前送金狀況", field: "bill_sts_new_desc" },
        { title: "變更前收費員代碼", field: "collector_pre" },
        { title: "變更前收費率", field: "coll_rate_ind_pre" },
        { title: "	變更前保費收入", field: "mode_prem_pre" },
        { title: "變更後送金狀況", field: "bill_sts_new_desc" },
        { title: "變更後收費員代碼", field: "collector_new" },
        { title: "變更後收費率", field: "coll_rate_ind_new" },
        { title: "	變更後保費收入", field: "mode_prem_new" },
        { title: "變更者姓名", field: "process_user_name" },
        { title: "程式代碼", field: "program_id" },
        { title: "處理日期", field: "process_date" },
        { title: "處理時間", field: "process_time" },
      ],
      slot2Table2Data: [],
    };
  },
};
</script>
