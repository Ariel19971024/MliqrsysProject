//32--ETF管理費查詢
<template>
  <div>
    <SectionTitle :title="sectiontitle" />
    <div class="content-component content-card">
      <div class="card-inner">
        <div class="card-detail">
          <Accordion id="acc1" title="ETF管理費">
            <Tags :tags="tags" />
            <TabulatorTable
              :tableId="Table1Id"
              :columns="Table1Columns"
              :tableData="Table1Data"
              checkId1="etf-acc1table1-check1"
              checkId2="etf-acc1table1-check2"
              @transmit-tabulator-data="handleTabulatorData"
            />
          </Accordion>
          <Accordion id="acc2" title="明細資料">
            <TabulatorTable
              :tableId="Table2Id"
              :columns="Table2Columns"
              :tableData="Table2Data"
              checkId1="etf-acc2table2-check1"
              checkId2="etf-acc2table2-check2"
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
  name: "ETF",
  computed: {
    insPolicyNumber() {
      return this.$store.state.insPolicyNumber;
    },
  },
  mounted() {
    this.ETFDateApi(); //下次ETF管理費作業日期
    this.ETFTabulatorApi(); //ETF管理費
  },
  watch: {
    insPolicyNumber(newVal, oldVal) {
      //call api to set table1Data
      this.ETFDateApi(); //下次ETF管理費作業日期
      this.ETFTabulatorApi(); //ETF管理費
      // localStorage.policy_no=newVal;
      console.log(oldVal);
      console.log(`newVal: ${newVal} \n oldVal: ${oldVal}`);
    },
    immediate: true,
  },
  methods: {
    async ETFDateApi() {
      //下次ETF管理費作業日期
      const domain = this.$store.state.domain;
      const url = domain + "/investETFi/executeMission";
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
      this.tags[0].detail = data.data[0]["paid_to_date_etf"];
    },
    async ETFTabulatorApi() {
      this.Table1Data = [];
      const domain = this.$store.state.domain;
      const url = domain + "/investETFi/executeMission02";
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
    async handleTabulatorData(rowValue) {
      //明細資料
      this.Table2Data=[]
      
       const domain = this.$store.state.domain;
      const url = domain + "/investETFi/executeMission03";
      // const token = this.$store.state.token;
      const params = {
        paid_to_date_etf:rowValue.paid_to_date_etf,
        policy_no: this.insPolicyNumber,
      };
      const headers = {
        "Content-Type": "application/x-www-form-urlencoded",
        //Authorization: "bearer " + token,
      };
      const { res } = callApi();
      const { data } = await res(url, params, headers);
      console.log(data.data);
      this.Table2Data=data.data
    },
  },
  data() {
    return {
      sectiontitle: "ETF管理費查詢",
      tags: [{ title: "下次ETF管理費作業日期", detail: "" }],
      Table1Id: "etfSlot1Table1",
      Table1Columns: [
        { title: "週月日", field: "paid_to_date_etf" },
        { title: "ETF管理費(合計)", field: "etf_fee" },
        { title: "入帳日", field: "tran_date" },
      ],
      Table1Data: [],
      Table2Id: "etfSlot1Table2",
      Table2Columns: [
        { title: "基金代碼", field: "invs_code" },
        { title: "基金名稱", field: "invs_title" },
        { title: "基金價值", field: "invs_amt_nt" },
        { title: "管理費", field: "etf_fee" },
      ],
      Table2Data: [],
    };
  },
};
</script>
