//20,21--投資標的,餘額
<template>
  <div>
    <SectionTitle :title="sectiontitle" />
    <div class="content-component content-card">
      <div class="card-inner">
        <div class="card-detail">
          <Accordion id="acc1" title="投資餘額">
            <Table :colNum="3" :table="balancesTable" />
          </Accordion>
          <Accordion id="acc2" title="投資標的">
            <TabulatorTable
              :tableId="Table1Id"
              :columns="Table1Columns"
              :tableData="Table1Data"
              checkId1="investmentTargets-acc2table1-check1"
              checkId2="investmentTargets-acc2table1-check2"
              @transmit-tabulator-data="handleTabulatorData"
          /></Accordion>
        </div>
      </div>
    </div>
    <Tabs :titles="titles" :tabLen="tabLen" @tab-call-api="tabCallApi">
      <template v-slot:1>
        <TabulatorTable
          :tableId="tableSlot4Id"
          :columns="tableSlot4Columns"
          :tableData="tableSlot4Data"
          checkId1="investmentTargets-slot1table4-check1"
          checkId2="investmentTargets-slot1table4-check2"
        />
      </template>
      <template v-slot:2>
        <Accordion id="acc3" title="投資標的配息">
          <Tags :tags="slot2Tagsid" />
          <TabulatorTable
            :tableId="tableSlot2Id"
            :columns="tableSlot2Columns"
            :tableData="tableSlot2Data"
            checkId1="investmentTargets-slot2table2-check1"
            checkId2="investmentTargets-slot2table2-check2"
            @transmit-tabulator-data="handleTab2TabulatorData"
          />
        </Accordion>
      </template>
    </Tabs>
  </div>
</template>
<script>
import callApi from "../helperFunctions/callApi";
import { populateTable } from "../helperFunctions/commonVue.js";
export default {
  name: "Investmenttargets",
  mounted() {
    this.ayncFunction();
  },
  computed: {
    insPolicyNumber() {
      return this.$store.state.insPolicyNumber;
    },
  },
  watch: {
    insPolicyNumber(newVal, oldVal) {
      //call api to set table1Data
      this.balancesTableApi(); //投資餘額
      this.investmentTarget(); //投資標的
      // console.log(`newVal: ${newVal} \n oldVal: ${oldVal}`);
    },
    immediate: true,
  },
  methods: {
    async ayncFunction() {
      await this.balancesTableApi();
      this.investmentTarget();
    },
    async balancesTableApi() {
      const domain = this.$store.state.domain;
      const url = domain + "/investGoal/executeMission01";
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
      this.balancesData = data.data[0];
      this.balancesTable = populateTable(data.data[0], this.balancesTable);
    },
    async investmentTarget() {
      const domain = this.$store.state.domain;
      const url = domain + "/investGoal/executeMission02";
      // const token = this.$store.state.token;
      const params = {
        currency: this.balancesData.r_currency,
        exprc: this.balancesData.r_exprc,
        exsrc: this.balancesData.r_exsrc,
        pv_calc_date: this.balancesData.r_pv_calc_date,
        pv_calc_type: this.balancesData.r_pv_calc_type,
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
    handleTabulatorData(rowValue) {
      //投資標的rowValue
      this.rowValueData = rowValue;
      console.log(this.rowValueData);
      this.handleAllTabs();
      
    },
    async balancesTabApi() {
      const domain = this.$store.state.domain;
      const url = domain + "/investGoal/executeMission03";
      // const token = this.$store.state.token;
      const params = {
        invs_code: this.rowValueData.r_invs_code,
        invs_name: this.rowValueData.r_invs_name,
        policy_no: this.insPolicyNumber,
      };
      const headers = {
        "Content-Type": "application/x-www-form-urlencoded",
        //Authorization: "bearer " + token,
      };
      const { res } = callApi();
      const { data } = await res(url, params, headers);

      this.tableSlot4Data = data.data;
    },
    tabCallApi(tabName) {
      this.currentTab=tabName;
      this.handleAllTabs();
    },
    handleAllTabs(){
      if(!this.rowValueData) return;
      let tabName = this.currentTab;
      switch(tabName){
        case "投資餘額":
        this.balancesTabApi(); //投資餘額
        break;
        case "投資標的配息":
        this.investmentTargetTabApi(); //投資標的配息
        break;
      }
    },
    async investmentTargetTabApi() {
      const domain = this.$store.state.domain;
      const url = domain + "/investGoal/executeMission04";
      // const token = this.$store.state.token;
      const params = {
        currency: this.balancesData.r_currency,
        exprc: this.balancesData.r_exprc,
        exsrc: this.balancesData.r_exsrc,
        invs_code: this.rowValueData.r_invs_code,
        policy_no: this.insPolicyNumber,
      };
      const headers = {
        "Content-Type": "application/x-www-form-urlencoded",
        //Authorization: "bearer " + token,
      };
      const { res } = callApi();
      const { data } = await res(url, params, headers);
      this.tableSlot2Data = data.data;
      this.slot2Tagsid[0].detail = data.data.exrt_rate;
    },
    handleTab2TabulatorData(rowValue) {
      console.log(rowValue);
      this.slot2Tagsid[0].detail = rowValue.exrt_rate;
      this.slot2Tagsid[1].detail = rowValue.invs_base_rate;
      this.slot2Tagsid[2].detail = rowValue.invs_ad_amt;
      this.slot2Tagsid[3].detail = rowValue.div_tax_rate;
    },
  },
  data() {
    return {
      currentTab:"投資餘額",
      rowValueData: null,
      balancesData: null,
      sectiontitle: "投資標的、餘額",
      slot2Tagsid: [
        { title: "筆數", detail: "" },
        { title: "累積配息率", detail: "" },
        { title: "累積配息金額", detail: "" },
        { title: "ETF課稅率", detail: "" },
      ],
      balancesTable: [
        { key: "保單號碼", keyId: "r_policy_no", value: "" },
        { key: "帳戶餘額", keyId: "r_av_amt", value: "" },
        { key: "澳幣AUD", keyId: "r_aud", value: "" },
        { key: "SN報酬率", keyId: "r_po_invs_rate", value: "" },
        { key: "總投入金額", keyId: "r_po_invs_tot", value: "" },
        { key: "紐幣NZD", keyId: "r_nzd", value: "" },
        { key: "帳戶報酬率", keyId: "r_po_invs_rate", value: "" },
        { key: "計算日期", keyId: "r_exrt_date", value: "" },
        { key: "港幣HKD", keyId: "r_hkd", value: "" },
        { key: "待投入額", keyId: "r_deposit_amt", value: "" },
        { key: "美元USD", keyId: "r_usd", value: "" },
        { key: "日圓JPY", keyId: "r_jpy", value: "" },
        { key: "贖回待付", keyId: "r_part_wd_amt", value: "" },
        { key: "歐元EUR", keyId: "r_eur", value: "" },
        { key: "台幣TWD", keyId: "r_twd", value: "" },
        { key: "上下限%", keyId: "r_po_lower_rate", value: "" },
      ],
      Table1Id: "investmentTargetsSlot1Table1",
      Table1Columns: [
        { title: "序號", field: "r_seq" },
        { title: "標的代碼", field: "r_invs_code" },
        { title: "投資標的", field: "r_invs_name" },
        { title: "單位", field: "r_invs_units" },
        { title: "單位淨值", field: "r_invs_value" },
        { title: "標的價值(原幣)", field: "r_invs_amt" },
        { title: "標的價值(台幣)", field: "r_invs_amt_nt" },
        { title: "平均成本", field: "r_invs_avg_cost" },
        { title: "投入金額", field: "r_invs_amt_cost" },
        { title: "報酬率", field: "r_invs_invs_rate" },
        { title: "上限%", field: "r_invs_upper" },
        { title: "下限%", field: "r_invs_lower" },
        { title: "幣別", field: "r_invs_currency" },
        { title: "風險等級", field: "r_invs_risk_degree" },
      ],
      Table1Data: [],
      tabLen: 2,
      titles: ["投資餘額", "投資標的配息"],
      tableSlot4Id: "tableSlot4Id",
      tableSlot4Columns: [
        { title: "標的代碼", field: "r_invs_code" },
        { title: "號碼", field: "r_seq" },
        { title: "餘額日", field: "r_invs_bl_date" },
        { title: "登入序號", field: "r_entry_no" },
        { title: "異動代號", field: "r_invs_ad_ind" },
        { title: "異動指示", field: "r_invs_ad_desc1" },
        { title: "異動次指示", field: "r_invs_ad_sub_ind" },
        { title: "異動次指示代碼", field: "r_invs_ad_desc2" },
        { title: "單位數", field: "r_invs_units" },
        { title: "單位淨值", field: "r_invs_value" },
        { title: "平均成本", field: "r_invs_avg_cost" },
      ],
      tableSlot4Data: [],
      tableSlot2Id: "investmentTargetsSlot2Table1",
      tableSlot2Columns: [
        { title: "紅利周年日", field: "invs_ad_no" },
        { title: "除昔日", field: "invs_base_date" },
        { title: "配息率", field: "invs_base_rate" },
        { title: "匯率", field: "exrt_rate" },
        { title: "淨值", field: "invs_value" },
        { title: "持有單位數", field: "invs_units" },
        { title: "預扣稅額", field: "iv_tax_amt" },
        { title: "稅後配息金額", field: "invs_ad_amt" },
        { title: "配息單位", field: "diff_units" },
      ],
      tableSlot2Data: [],
    };
  },
};
</script>
