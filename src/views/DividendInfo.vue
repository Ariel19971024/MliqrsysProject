<template>
  <!-- 12 紅利資料-->
  <div>
    <SectionTitle :title="sectionTitle" />
    <div class="content-card">
      <div class="card-inner">
        <div class="card-detail">
          <Accordion id="dividendinfo-acc1" title="基本資料">
            <Tags :tags="acc1Tags" />
            <Table :colNum="2" :table="table1Data" />
          </Accordion>
          <Accordion id="dividendinfo-acc2" title="明細資料">
            <TabulatorTable
              :tableId="tableAcc2Id"
              :columns="tableAcc2Columns"
              :tableData="tableAcc2Data"
              checkId1="dividendinfo-acc2-check1"
              checkId2="dividendinfo-acc2-check2"
            />
          </Accordion>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "DividendInfo",
  // beforeRouteEnter(to, from, next) {
  //   next((vm) => {
  //     vm.$store.dispatch("addHistory", {
  //       name: from.name,
  //       cName: from.meta.name,
  //       path: from.path,
  //       id: uuid(),
  //     });
  //   });
  // },
  mounted() {
    console.log(this.insPolicyNumber);
  },
  computed: {
    insPolicyNumber() {
      return this.$store.state.insPolicyNumber;
    },
  },
  watch: {
    insPolicyNumber(newVal, oldVal) {
      //call api to set table1Data
      this.watchApiCall();
      console.log(`newVal: ${newVal} \n oldVal: ${oldVal}`);
    },
  },
  methods: {
    async watchApiCall() {
      console.log("callApi");
      // const domain = this.$store.state.domain;
      // const url = domain + "/RIAF001Api/RIAF001Query";
      //   const url = "http://localhost:10201/querySystemControllerApi/cc183i";
      //   // const token = this.$store.state.token;
      //   const params = {
      //     i_policy_no: "12345",
      //   };
      //   const headers = {
      //     "Content-Type": "application/x-www-form-urlencoded",
      //     //Authorization: "bearer " + token,
      //   };
      //   try {
      //     const res = await axios.post(url, qs.stringify(params), {
      //       headers,
      //     });
      //     console.log(res);
      //   } catch (e) {
      //     console.log(e);
      //     //   alert("無法查詢資料，請洽系統管理人員。");
      //   }
    },
  },
  data() {
    return {
      sectionTitle: "紅利資料",
      acc1Tags: [
        { title: "計息日", detail: "計息日_設計文字" },
        { title: "紅利金額", detail: "紅利金額_設計文字" },
        { title: "紅利利息", detail: "紅利利息_設計文字" },
        { title: "合計金額", detail: "合計金額_設計文字" },
      ],
      tableAcc2Id: "tableAcc2Id",
      tableAcc2Columns: [
        { title: "保單狀態碼", field: "a" },
        { title: "險種版數", field: "b" },
        { title: "年度PUA保額", field: "c" },
        { title: "力年度PUA累積保額", field: "d" },
      ],
      tableAcc2Data: [],
      table1Data: [
        { key: "保單號碼", keyId: "", value: "" },
        { key: "紅利選擇", keyId: "", value: "" },
        { key: "保單狀態", keyId: "", value: "" },
        { key: "給付年度", keyId: "", value: "" },
        { key: "要保人", keyId: "", value: "" },
        { key: "給付紅利", keyId: "", value: "" },
        { key: "被保人", keyId: "", value: "" },
      ],
    };
  },
};
</script>
