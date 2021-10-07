//38,39,40,41,42,43,44--理賠紀錄
<template>
  <div>
    <SectionTitle :title="sectiontitle" />
    <div class="content-component content-card">
      <div class="card-inner">
        <div class="card-detail">
          <SearchFormCombine
            :bar="bar1"
            @btn-click-event="handleClaimRecordQuery"
          />
          <TabulatorTable
            :tableId="table1Id"
            :columns="table1Columns"
            :tableData="table1Data"
            checkId1="claimrecord-table1-check1"
            checkId2="claimrecord-table1-check2"
            @transmit-tabulator-data="handleTabulatorRowClick"
          />
          <Tabs2 :titles="titles" @get-tab-name="handleTabClick">
            <template v-slot:1>
              <Table :colNum="4" :table="table" />
            </template>
            <template v-slot:2>
              <TabulatorTable
                :tableId="slot2Table1Id"
                :columns="slot2Table1Columns"
                :tableData="slot2Table1Data"
                checkId1="claimrecord-slot2table1-check1"
                checkId2="claimrecord-slot2table1-check2"
              />
              <TabulatorTable
                :tableId="slot2Table2Id"
                :columns="slot2Table2Columns"
                :tableData="slot2Table2Data"
                checkId1="claimrecord-slot2table2-check1"
                checkId2="claimrecord-slot2table2-check2"
              />
            </template>
            <template v-slot:3>
              <TabulatorTable
                :tableId="slot3Table1Id"
                :columns="slot3Table1Columns"
                :tableData="slot3Table1Data"
                checkId1="claimrecord-slot3table1-check1"
                checkId2="claimrecord-slot3table1-check2"
              />
              <TabulatorTable
                :tableId="slot3Table2Id"
                :columns="slot3Table2Columns"
                :tableData="slot3Table2Data"
                checkId1="claimrecord-slot3table2-check1"
                checkId2="claimrecord-slot3table2-check2"
              />

              <TabulatorTable
                :tableId="slot3Table3Id"
                :columns="slot3Table3Columns"
                :tableData="slot3Table3Data"
                checkId1="claimrecord-slot3table3-check1"
                checkId2="claimrecord-slot3table3-check2"
              />
            </template>
            <template v-slot:4>
              <TabulatorTable
                :tableId="slot4Table1Id"
                :columns="slot4Table1Columns"
                :tableData="slot4Table1Data"
                checkId1="claimrecord-slot4table1-check1"
                checkId2="claimrecord-slot4table1-check2"
              />
              <Table :colNum="2" :table="slot4table" />
            </template>
            <template v-slot:5>
              <TabulatorTable
                :tableId="slot5Table1Id"
                :columns="slot5Table1Columns"
                :tableData="slot5Table1Data"
                checkId1="claimrecord-slot1table1-check1"
                checkId2="claimrecord-slot1table1-check2"
              />
              <TabulatorTable
                :tableId="slot5Table2Id"
                :columns="slot5Table2Columns"
                :tableData="slot5Table2Data"
                checkId1="claimrecord-slot5table2-check1"
                checkId2="claimrecord-slot5table2-check2"
              />

              <TabulatorTable
                :tableId="slot5Table3Id"
                :columns="slot5Table3Columns"
                :tableData="slot5Table3Data"
                checkId1="claimrecord-slot5table3-check1"
                checkId2="claimrecord-slot5table3-check2"
              />
            </template>
            <template v-slot:6>
              <Table :colNum="1" :table="slot6table" />
            </template>
            <template v-slot:7>
              <Topline title="拒賠原因" />
              <TabulatorTable
                :tableId="slot7Table1Id"
                :columns="slot7Table1Columns"
                :tableData="slot7Table1Data"
                checkId1="claimrecord-slot7table1-check1"
                checkId2="claimrecord-slot7table1-check2"
              />
              <Topline title="理賠註記" />
              <TabulatorTable
                :tableId="slot7Table2Id"
                :columns="slot7Table2Columns"
                :tableData="slot7Table2Data"
                checkId1="claimrecord-slot7table2-check1"
                checkId2="claimrecord-slot7table2-check2"
              />
            </template>
          </Tabs2>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import callApi from "../helperFunctions/callApi";
import { populateTable } from "../helperFunctions/commonVue.js";
export default {
  name: "ClaimRecord",
  mounted(){
    this.domain = this.$store.state.domain;
  },
  methods: {
    async handleClaimRecordQuery(value) {
      const url = this. domain + "/claimHistory/executeMission01";
      // const token = this.$store.state.token;
      const params = value.formData;
      const headers = {
        "Content-Type": "application/x-www-form-urlencoded",
        //Authorization: "bearer " + token,
      };
      const { res } = callApi();
      const { data } = await res(url, params, headers);
      console.log(data.data);
      this.table1Data = data.data;
    },
    handleTabulatorRowClick(data) {
      this.rowData = data;
      this.fetchCurrentTabData();
    },
    handleTabClick(tabName) {
      this.currentTab = tabName;
      this.fetchCurrentTabData();
    },
    fetchCurrentTabData() {
      if(!this.rowData) return;
      let tabName = this.currentTab;
      switch (tabName) {
        case "理賠基本資料":
          this.fetchClaimSettlementInfo();
          break;
        case "事故原因及註記病史":
          this.fetchAccidentCause();
          this.fetchMedicalHistory();
          break;
        case "給付資料":
          this.fetchBenefitMaterials1();
          this.fetchBenefitMaterials2();
          this.fetchBenefitMaterials3();
          break;
        case "受益人":
          this.fetchBeneficiaryInfo();
          break;
        case "就診醫院":
          this.fetchVisitedHospital1();
          this.fetchVisitedHospital2();
          this.fetchVisitedHospital3();
          break;
        case "地檢署相驗明細":
          this.fetchInspectionDetails();
          break;
        case "拒賠原因及理賠註記":
          this.fetchRefusalReasons();
          this.fetchClaimNotes();
          break;
        default:
          alert("請洽詢管理人員!");
      }
    },
    //* 理賠基本資料
    async fetchClaimSettlementInfo() {
      console.log("理賠基本資料api");
      const url = this.domain + "/claimHistory/executeMission02";
      const params = {
        claim_seq: this.rowData["r_claim_seq"],
        claim_year: this.rowData["r_claim_year"],
        policy_no: this.rowData["r_policy_no"],
      };
      const headers = {
        "Content-Type": "application/x-www-form-urlencoded",
      };
      const { res } = callApi();
      const { data } = await res(url, params, headers);

     

      let newTableData = data.data[0]; // object
      //console.log(newTableData);
      populateTable(newTableData, this.table);
    },
    //*事故原因及註記病史(事故原因)
    async fetchAccidentCause() {
      console.log("事故原因及註記病史(事故原因)api");
      const url = this.domain + "/claimHistory/executeMission02event";
      const params = {
        claim_seq: this.rowData["r_claim_seq"],
        claim_year: this.rowData["r_claim_year"],
        policy_no: this.rowData["r_policy_no"],
      };
      const headers = {
        "Content-Type": "application/x-www-form-urlencoded",
      };
      const { res } = callApi();
      const { data } = await res(url, params, headers);
      this.slot2Table1Data = data.data;
    },
    //*事故原因及註記病史(註記病史)
    async fetchMedicalHistory() {
      console.log("事故原因及註記病史(註記病史)api");
      const url = this.domain + "/claimHistory/executeMission02sick";
      const params = {
        claim_seq: this.rowData["r_claim_seq"],
        claim_year: this.rowData["r_claim_year"],
        policy_no: this.rowData["r_policy_no"],
      };
      const headers = {
        "Content-Type": "application/x-www-form-urlencoded",
      };
      const { res } = callApi();
      const { data } = await res(url, params, headers);
      this.slot2Table2Data = data.data;
    },
    //*給付資料(上)
    async fetchBenefitMaterials1() {
      console.log("給付資料(上)api");
      const url = this.domain + "/claimHistory/executeMission03";
      //TODO params的值和rowData沒有對到
      const params = {
        claim_seq: this.rowData["r_claim_seq"],
        claim_year: this.rowData["r_claim_year"],
        policy_no: this.rowData["r_policy_no"],
        client_id: this.rowData["r_client_id"],
        client_ident: this.rowData["r_client_ident"],
        event_date: this.rowData["r_event_date"],
        type: this.rowData["r_type"],
      };
      const headers = {
        "Content-Type": "application/x-www-form-urlencoded",
      };
      const { res } = callApi();
      const { data } = await res(url, params, headers);
      this.slot3Table1Data = data.data;
    },
    //*給付資料(中)
    async fetchBenefitMaterials2() {
      console.log("給付資料(中)api");
      const url = this.domain + "/claimHistory/executeMission04";
      //TODO params的值和rowData沒有對到
      const params = {
        claim_seq: this.rowData["r_claim_seq"],
        claim_year: this.rowData["r_claim_year"],
        policy_no: this.rowData["r_policy_no"],
        client_id: this.rowData["r_client_id"],
        client_ident: this.rowData["r_client_ident"],
        event_date: this.rowData["r_event_date"],
        type: this.rowData["r_type"],
      };
      const headers = {
        "Content-Type": "application/x-www-form-urlencoded",
      };
      const { res } = callApi();
      const { data } = await res(url, params, headers);
      //TODO
      //console.log(data.data);
      this.slot3Table2Data = data.data;
    },
    //*給付資料(下)
    async fetchBenefitMaterials3() {
      console.log("給付資料(下)api");
      const url = this.domain + "/claimHistory/executeMission05";
      //TODO params的值和rowData沒有對到
      const params = {
        claim_seq: this.rowData["r_claim_seq"],
        claim_year: this.rowData["r_claim_year"],
        policy_no: this.rowData["r_policy_no"],
        coverage_no: this.rowData["r_coverage_no"],
        plan_code: this.rowData["r_plan_code"],
        rate_scale: this.rowData["r_rate_scale"],
      };
      const headers = {
        "Content-Type": "application/x-www-form-urlencoded",
      };
      const { res } = callApi();
      const { data } = await res(url, params, headers);
      //TODO
      console.log(data);
      this.slot3Table3Data = data.data;
    },
    //*受益人
    async fetchBeneficiaryInfo() {
      console.log("受益人api");
      const url = this.domain + "/claimHistory/executeMission05";
      //TODO params的值和rowData沒有對到
      const params = {
        claim_seq: this.rowData["r_claim_seq"],
        claim_year: this.rowData["r_claim_year"],
        policy_no: this.rowData["r_policy_no"],
        client_id: this.rowData["r_client_id"],
        client_ident: this.rowData["r_client_ident"],
        event_date: this.rowData["r_event_date"],
        type: this.rowData["r_type"],
      };
      const headers = {
        "Content-Type": "application/x-www-form-urlencoded",
      };
      const { res } = callApi();
      const { data } = await res(url, params, headers);
      //TODO
      this.slot4Table1Data = data.data;
      populateTable(data.data[0], this.slot4table);
      
    },
    //*就診醫院(上)
    async fetchVisitedHospital1() {
      console.log("就診醫院(上)api");
      const url = this.domain + "/claimHistory/executeMission08";
      const params = {
        claim_seq: this.rowData["r_claim_seq"],
        claim_year: this.rowData["r_claim_year"],
        policy_no: this.rowData["r_policy_no"],
      };
      const headers = {
        "Content-Type": "application/x-www-form-urlencoded",
      };
      const { res } = callApi();
      const { data } = await res(url, params, headers);
      this.slot5Table1Data = data.data;
    },
    //*就診醫院(中)
    async fetchVisitedHospital2() {
      console.log("就診醫院(中)api");
      const url = this.domain + "/claimHistory/executeMission12";
      const params = {
        claim_seq: this.rowData["r_claim_seq"],
        claim_year: this.rowData["r_claim_year"],
        policy_no: this.rowData["r_policy_no"],
        clhn_seq: this.rowData["r_clhn_seq"]
      };
      const headers = {
        "Content-Type": "application/x-www-form-urlencoded",
      };
      const { res } = callApi();
      const { data } = await res(url, params, headers);
      this.slot5Table2Data = data.data;
    },
    //*就診醫院(下)
    async fetchVisitedHospital3() {
      console.log("就診醫院(下)api");
      const url = this.domain + "/claimHistory/executeMission09";
      const params = {
        claim_seq: this.rowData["r_claim_seq"],
        policy_no: this.rowData["r_policy_no"]
      };
      const headers = {
        "Content-Type": "application/x-www-form-urlencoded",
      };
      const { res } = callApi();
      const { data } = await res(url, params, headers);
      this.slot5Table3Data = data.data;
    },
    //*地檢署相驗明細
    async fetchInspectionDetails() {
      console.log("地檢署相驗明細api");
      const url = this.domain + "/claimHistory/executeMission11";
      const params = {
        claim_seq: this.rowData["r_claim_seq"],
        policy_no: this.rowData["r_policy_no"],
        cl_examine_code: this.rowData["cl_examine_code"]
      };
      const headers = {
        "Content-Type": "application/x-www-form-urlencoded",
      };
      const { res } = callApi();
      const { data } = await res(url, params, headers);
      populateTable(data.data[0], this.slot6table);
    },
    //*拒賠原因及理賠註記-拒賠原因
    async fetchRefusalReasons() {
      console.log("拒賠原因及理賠註記-拒賠原因api");
      const url = this.domain + "/claimHistory/executeMission06";
      const params = {
        claim_seq: this.rowData["r_claim_seq"],
        policy_no: this.rowData["r_policy_no"],
        cl_examine_code: this.rowData["cl_examine_code"]
      };
      const headers = {
        "Content-Type": "application/x-www-form-urlencoded",
      };
      const { res } = callApi();
      const { data } = await res(url, params, headers);
      this.slot7Table1Data = data.data;
    },
    //*拒賠原因及理賠註記-理賠註記
    async fetchClaimNotes() {
      console.log("拒賠原因及理賠註記-理賠註記api");
      const url = this.domain + "/claimHistory/executeMission10";
      const params = {
        claim_seq: this.rowData["r_claim_seq"],
        policy_no: this.rowData["r_policy_no"],
        cl_examine_code: this.rowData["cl_examine_code"]
      };
      const headers = {
        "Content-Type": "application/x-www-form-urlencoded",
      };
      const { res } = callApi();
      const { data } = await res(url, params, headers);
      this.slot7Table2Data = data.data;
    },
  },
  data() {
    return {
      domain: "",
      rowData: null,
      currentTab: "理賠基本資料",
      tabLen: 10,
      titles: [
        "理賠基本資料",
        "事故原因及註記病史",
        "給付資料",
        "受益人",
        "就診醫院",
        "地檢署相驗明細",
        "拒賠原因及理賠註記",
      ],
      sectiontitle: "理賠紀錄",
      bar1: [
        {
          inputType: "textfield",
          inputName: "保單號碼",
          placeholder: "保單號碼",
          id: "policy_no",
        },
        {
          inputType: "textfield",
          inputName: "被保險人ID",
          placeholder: "被保險人ID	",
          id: "insured_id",
        },
        {
          inputType: "dropdown",
          inputName: "年度",
          id: "claim_year",
          options: ["2018", "2019", "2020", "2021"],
        },
      ],
      table1Id: "claimRecordTable1",
      table1Columns: [
        { title: "保單號碼", field: "r_policy_no" },
        { title: "年", field: "r_claim_year" },
        { title: "序", field: "r_claim_seq" },
        { title: "註", field: "r_clcm_ind" },
        { title: "事故日期", field: "r_event_date" },
        { title: "事故人", field: "r_event_name" },
        { title: "理賠狀態", field: "r_cl_sts_code" },
        { title: "理賠型態", field: "r_claim_desc" },
        { title: "結案型態", field: "r_cl_examine_desc" },
        { title: "審核員", field: "r_examine_name" },
        { title: "結案日期", field: "r_approve_date" },
        { title: "給付金額", field: "r_claim_amt_d" },
        { title: "事故原因", field: "r_cl_event_desc" },
      ],
      table1Data: [],
      table: [
        { key: "事故人ID", keyId: "r_event_id", value: "事故人ID_設計文字" },
        { key: "送件業務員姓名", keyId: "r_agent_name", value: "送件業務員姓名_設計文字" },
        { key: "受益人", keyId: "r_benf_name", value: "受益人_設計文字" },
        { key: "扣貸款本息", keyId: "r_loans_apls", value: "扣貸款本息_設計文字" },
        { key: "事故人姓名", keyId: "r_event_name", value: "事故人姓名_設計文字" },
        { key: "營業單位", keyId: "r_agent_dept_code", value: "營業單位_設計文字" },
        { key: "結案日期", keyId: "r_approve_date", value: "結案日期_設計文字" },
        { key: "扣欠繳保費", keyId: "r_minus_prem_susp", value: "扣欠繳保費_設計文字" },
        { key: "保單關係人", keyId: "r_client_ident", value: "保單關係人_設計文字" },
        { key: "事故型態", keyId: "r_cl_event_desc", value: "事故型態_設計文字" },
        { key: "保險種類", keyId: "r_type", value: "保險種類_設計文字" },
        { key: "解約金", keyId: "r_cv_amt_out", value: "解約金_設計文字" },
        { key: "生效日期", keyId: "r_po_issue_date", value: "生效日期_設計文字" },
        { key: "支票委託書", keyId: "r_clus_ind", value: "支票委託書_設計文字" },
        { key: "理賠給付", keyId: "r_claim_amt", value: "理賠給付_設計文字" },
        { key: "給付小記", keyId: "r_sub_amt", value: "給付小記_設計文字" },
        { key: "受理號碼", keyId: "r_receive_no", value: "受理號碼_設計文字" },
        { key: "差額證明", keyId: "r_cl_type_other", value: "差額證明_設計文字" },
        { key: "紅利給付", keyId: "r_dividend", value: "紅利給付_設計文字" },
        { key: "延息起算日", keyId: "r_defer_beg_date", value: "延息起算日_設計文字" },
        { key: "櫃檯受理", keyId: "r_clof_approve_ind", value: "櫃檯受理_設計文字" },
        { key: "審核員", keyId: "r_examine_name", value: "審核員_設計文字" },
        { key: "溢繳保費", keyId: "r_prem_susp", value: "溢繳保費_設計文字" },
        { key: "延息結算日", keyId: "r_defer_end_date", value: "延息結算日_設計文字" },
        { key: "受理日期", keyId: "r_receive_date", value: "受理日期_設計文字" },
        { key: "受理地區", keyId: "r_rec_dept_name", value: "受理地區_設計文字" },
        { key: "退整期保費", keyId: "r_misc_susp", value: "退整期保費_設計文字" },
        { key: "延滯利息", keyId: "r_defer_int", value: "延滯利息_設計文字" },
        { key: "文件齊全日", keyId: "r_paper_ok_date", value: "文件齊全日_設計文字" },
        { key: "覆核員", keyId: "r_approve_name", value: "覆核員_設計文字" },
        { key: "未到期保費", keyId: "r_unearned_prem", value: "未到期保費_設計文字" },
        { key: "扣所得稅", keyId: "r_tax_withheld", value: "扣所得稅_設計文字" },
        { key: "事故日期", keyId: "r_event_date", value: "事故日期_設計文字" },
        { key: "覆核地區", keyId: "r_app_dept_name", value: "覆核地區_設計文字" },
        { key: "扣保單貸款本息", keyId: "r_loans", value: "扣保單貸款本息_設計文字" },
        { key: "扣健保補充保費", keyId: "r_addition_premium", value: "扣健保補充保費_設計文字" },
        { key: "事故地區", keyId: "r_event_area", value: "事故地區_設計文字" },
        { key: "理賠狀態", keyId: "r_cl_sts_desc", value: "理賠狀態_設計文字" },
        { key: "扣保單墊繳本息", keyId: "r_apls", value: "扣保單墊繳本息_設計文字" },
        { key: "給付金額", keyId: "r_disb_amt_d", value: "給付金額_設計文字" },
        { key: "理賠型態", keyId: "r_claim_desc", value: "理賠型態_設計文字" },
        { key: "結案型態", keyId: "r_cl_event_desc", value: "結案型態_設計文字" },
        { key: "扣應繳保費", keyId: "r_mode_prem", value: "扣應繳保費_設計文字" },
        { key: "幣別", keyId: "r_currency", value: "幣別_設計文字" },
        { key: "副本", keyId: "r_clcp_ind", value: "副本_設計文字" },
        { key: "覆核型態", keyId: "r_cl_approve_desc", value: "覆核型態_設計文字" },
        { key: "代扣其他款項", keyId: "r_suspense", value: "代扣其他款項_設計文字" },
      ],
      // slot2---2table
      slot2Table1Id: "claimRecordSlot2Table1",
      slot2Table1Columns: [
        { title: "事故原因", field: "cl_event_code" },
        { title: "代碼描述", field: "cl_event_desc" },
      ],
      slot2Table1Data: [],
      slot2Table2Id: "claimRecordSlot2Table2",
      slot2Table2Columns: [
        { title: "註記病史", field: "cl_event_code" },
        { title: "代碼描述", field: "cl_event_desc" },
      ],
      slot2Table2Data: [],
      // slot3---3tabulator
      slot3Table1Id: "claimRecordSlot3Table1",
      slot3Table1Columns: [
        { title: "保險項目", field: "r_plan_code" },
        { title: "版數", field: "r_rate_scale" },
        { title: "生效日期", field: "r_co_issue_date" },
        { title: "狀態", field: "r_co_sts_code" },
        { title: "保險金額", field: "r_face_amt" },
        { title: "理賠金額", field: "r_claim_amt" },
      ],
      slot3Table1Data: [],
      slot3Table2Id: "claimRecordSlot3Table2",
      slot3Table2Columns: [
        { title: "註記病史", field: "r_result_ind" },
        { title: "單位申請理賠金額", field: "r_cl_unit_amt" },
        { title: "項目", field: "r_cl_deform_code" },
        { title: "比例", field: "r_cl_deform_perc" },
        { title: "天數", field: "r_cl_days" },
        { title: "倍數", field: "r_cl_multiple" },
        { title: "分子", field: "r_cl_dividend" },
        { title: "分母", field: "r_cl_divisor" },
        { title: "第次", field: "r_cl_terms" },
        { title: "理賠金額", field: "r_claim_amt" },
      ],
      slot3Table2Data: [],
      slot3Table3Id: "claimRecordSlot3Table3",
      slot3Table3Columns: [
        { title: "理賠項目", field: "claim_item" },
        { title: "代碼", field: "claim_code" },
        { title: "代碼描述", field: "claim_desc" },
        { title: "%/準則/燒傷程度", field: "claim_level1" },
        { title: "殘廢等級/倍數", field: "claim_level2" },
      ],
      slot3Table3Data: [],
      // slot4 ---1tabulator 1table
      slot4Table1Id: "claimRecordSlot4Table1",
      //TODO
      slot4Table1Columns: [
        { title: "受益人ID姓名", field: "r_benf_id" },
        { title: "姓名", field: "r_benf_name" },
        { title: "關係", field: "r_i1_rela_with_benf" },
        { title: "國籍", field: "r_country_desc" },
        { title: "保險金比率", field: "r_cl_dividend" },
        { title: "給付小計", field: "r_claim_amt" },
        { title: "延滯利息", field: "g" },
        { title: "所得稅", field: "r_tax_withheld" },
        { title: "補充保費", field: "r_addition_premium" },
        { title: "給付金額", field: "r_disb_amt" },
        { title: "帳號", field: "r_remit_account" },
      ],
      slot4Table1Data: [],
      slot4table: [
        { key: "郵遞區號", keyId: "zip_code", value: "郵遞區號_設計文字" },
        { key: "受款人英文名", keyId: "r_payee", value: "受款人英文名_設計文字" },
        { key: "受益人地址", keyId: "address", value: "受益人_設計文字" },
        { key: "SWIFT CODE", keyId: "r_swift_code", value: "SWIFT CODE_設計文字" },
        { key: "事聯絡電話", keyId: "tel_1", value: "聯絡電話_設計文字" },
        { key: "銀行名稱", keyId: "r_bank_name", value: "銀行名稱_設計文字" },
        { key: "手機號碼", keyId: "hand_tel", value: "手機號碼_設計文字" },
        { key: "銀行地址", keyId: "r_bank_address_e", value: "銀行地址_設計文字" },
        { key: "入出境日期", keyId: "beg_date", value: "入出境日期_設計文字" },
        { key: "匯款帳號", keyId: "r_remit_account_e", value: "匯款帳號_設計文字" },
      ],
      //  slot5----3tabulator
      slot5Table1Id: "claimRecordSlot5Table1",
      slot5Table1Columns: [
        { title: "醫院代碼", field: "hi_hospital_id" },
        { title: "醫院名稱", field: "hi_hospital_name" },
        { title: "註記", field: "remark" },
        { title: "科別", field: "clmd_code" },
        { title: "醫師姓名", field: "doctor_name" },
        { title: "醫師身分證號", field: "doctor_id" },
      ],
      slot5Table1Data: [],
      slot5Table2Id: "claimRecordSlot5Table2",
      slot5Table2Columns: [
        { title: "項目", field: "desc" },
        { title: "起日", field: "beg_date" },
        { title: "時間", field: "beg_time" },
        { title: "迄日", field: "end_date" },
        { title: "時間", field: "end_time" },
        { title: "天數", field: "clhd_day" },
        { title: "時數", field: "clhd_hour" },
        { title: "次數", field: "times" },
      ],
      slot5Table2Data: [],
      slot5Table3Id: "claimRecordSlot5Table3",
      slot5Table3Columns: [
        { title: "醫院代碼", field: "hi_hospital_id"},
        { title: "醫院名稱", field: "hi_hospital_name" },
        { title: "註記", field: "remark" },
        { title: "住院起訖", field: "cl_hs_date_1" },
        { title: "天數", field: "period" },
      ],
      slot5Table3Data: [],
      // slot6----1table
      slot6table: [
        { key: "死亡地點", keyId: "r_address", value: "死亡地點_設計文字" },
        { key: "死亡場所", keyId: "r_death_place", value: "死亡場所_設計文字" },
        { key: "死亡種類", keyId: "r_death_type", value: "死亡種類_設計文字" },
        { key: "地檢署名稱", keyId: "r_office_name", value: "地檢署名稱_設計文字" },
        { key: "檢察官姓名", keyId: "r_prosecutor_name", value: "檢察官姓名_設計文字" },
        {
          key: "法醫師/檢驗員姓名",
          keyId: "r_forensic_name",
          value: "法醫師/檢驗員姓名_設計文字",
        },
        { key: "證明書開立日期", keyId: "r_certificate_date", value: "證明書開立日期_設計文字" },
      ],
      // slot7----2tabulator
      slot7Table1Id: "claimRecordSlot7Table1",
      slot7Table1Columns: [
        { title: "險種簡稱", field: "r_plan_abbr_code" },
        { title: "版數", field: "r_rate_scale" },
        { title: "註記", field: "r_result_ind" },
        { title: "拒賠原因碼", field: "r_cl_notice_code" },
        { title: "拒賠代碼描述", field: "r_cl_notice_desc1" },
      ],
      slot7Table1Data: [],
      slot7Table2Id: "claimRecordSlot7Table2",
      slot7Table2Columns: [
        { title: "註記代碼", field: "cl_comment_code" },
        { title: "註記代碼描述", field: "cl_comment_desc" },
      ],
      slot7Table2Data: [],
    };
  },
};
</script>

<style></style>
