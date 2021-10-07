//29--每月扣除餘額查詢
<template>
  <div>
    <SectionTitle :title="sectiontitle" />
    <div class="content-component content-card">
      <div class="card-inner">
        <div class="card-detail">
          <Accordion id="acc1" title="每月扣除額">
            <TabulatorTable
              :tableId="Table1Id"
              :columns="Table1Columns"
              :tableData="Table1Data"
              checkId1="deductionQuery-acc1table1-check1"
              checkId2="deductionQuery-acc1table1-check2"
              @transmit-tabulator-data="handleTabulatorData"
            />
          </Accordion>
          <Accordion id="acc2" title="扣除額明細">
            <TabulatorTable
              :tableId="Table2Id"
              :columns="Table2Columns"
              :tableData="Table2Data"
              checkId1="deductionQuery-acc2table2-check1"
              checkId2="deductionQuery-acc2table2-check2"
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
  name: "DeductionQuery",
  mounted() {
    this.monthDeductionApiCall();
  },
  computed: {
    insPolicyNumber() {
      return this.$store.state.insPolicyNumber;
    },
  },
  watch: {
    insPolicyNumber(newVal, oldVal) {
      //call api to set table1Data
      this.monthDeductionApiCall(); //每月扣除餘額
      console.log(oldVal);
      console.log(`newVal: ${newVal} \n oldVal: ${oldVal}`);
    },
    immediate: true,
  },
  methods: {
    async monthDeductionApiCall() {
      this.Table1Data = [];
      const domain = this.$store.state.domain;
      const url = domain + "/investDeduction/executeMission01";
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
      let table1Data = data.data;
      this.Table1Data = table1Data;
    },
    async handleTabulatorData(rowValue) {
      //扣除額明細
      this.Table2Data = [];
      const domain = this.$store.state.domain;
      const url = domain + "/investDeduction/executeMission02";
      // const token = this.$store.state.token;
      const params = {
        paid_to_date: rowValue.m_paid_to_date,
        policy_no: this.insPolicyNumber,
        seq_no: rowValue.m_seq_no,
      };
      const headers = {
        "Content-Type": "application/x-www-form-urlencoded",
        //Authorization: "bearer " + token,
      };
      const { res } = callApi();
      const { data } = await res(url, params, headers);
      let table2Data = data.data;
      this.Table2Data = table2Data;
    },
  },
  data() {
    return {
      sectiontitle: "每月扣除額查詢",
      Table1Id: "deductionQuerySlot1Table1",
      Table1Columns: [
        { title: "週年日", field: "m_paid_to_date" },
        { title: "帳戶管理費", field: "m_acct_fee" },
        { title: "目標管理費", field: "m_target_fee" },
        { title: "應扣COI", field: "m_coi_amt" },
        { title: "實扣COI", field: "m_coi_amt_pay" },
        { title: "入帳日", field: "m_tran_date" },
        { title: "扣否", field: "m_vcoid_sts" },
        { title: "實際扣收方式", field: "r_coi_seq_ind" },
      ],
      Table1Data: [],
      Table2Id: "deductionQuerySlot1Table2",
      Table2Columns: [
        { title: "序號", field: "m_seq_no" },
        { title: "產品險種", field: "m_plan_code" },
        { title: "版數", field: "m_rate_scale" },
        { title: "淨危險保額(萬)", field: "m_coi_face_amt" },
        { title: "應扣COI", field: "m_coi_amt2" },
        { title: "實扣COI", field: "m_coi_amt_pay2" },
      ],
      Table2Data: [],
    };
  },
};
</script>
