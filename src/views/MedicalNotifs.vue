<template>
  <!-- 09 體檢批註告知-->
  <div>
    <SectionTitle :title="sectionTitle" />
    <div class="content-card">
      <div class="card-inner">
        <div class="card-detail">
          <Accordion id="medicalnotifs-acc1" title="體檢原因資料">
            <TabulatorTable
              :tableId="tableAcc1Id"
              :columns="tableAcc1Columns"
              :tableData="tableAcc1Data"
              checkId1="medicalnotifs-acc1-check1"
              checkId2="medicalnotifs-acc1-check2"
            />
          </Accordion>
          <Accordion id="medicalnotifs-acc2" title="告知資料">
            <TabulatorTable
              :tableId="tableAcc2Id"
              :columns="tableAcc2Columns"
              :tableData="tableAcc2Data"
              checkId1="medicalnotifs-acc2-check1"
              checkId2="medicalnotifs-acc2-check2"
            />
          </Accordion>
          <Accordion id="medicalnotifs-acc3" title="批註資料">
            <TabulatorTable
              :tableId="tableAcc3Id"
              :columns="tableAcc3Columns"
              :tableData="tableAcc3Data"
              checkId1="medicalnotifs-acc3-check1"
              checkId2="medicalnotifs-acc3-check2"
            />
          </Accordion>
          <Accordion id="medicalnotifs-acc4" title="弱體資料">
            <TabulatorTable
              :tableId="tableAcc4Id"
              :columns="tableAcc4Columns"
              :tableData="tableAcc4Data"
              checkId1="medicalnotifs-acc4-check1"
              checkId2="medicalnotifs-acc4-check2"
            />
          </Accordion>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "MedicalNotifs",
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
    // console.log(this.insPolicyNumber);
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
      sectionTitle: "體檢批註告知",
      tableAcc1Id: "tableAcc1Id",
      tableAcc1Columns: [
        { title: "關係", field: "a" },
        { title: "身分證字號", field: "b" },
        { title: "姓名", field: "c" },
        { title: "照會日期", field: "d" },
        { title: "體檢原因", field: "e" }
      ],
      tableAcc1Data: [],
      tableAcc2Id: "tableAcc2Id",
      tableAcc2Columns: [
        { title: "關係", field: "a" },
        { title: "照會日期", field: "b" },
        { title: "照會號碼", field: "c" },
        { title: "身分證字號", field: "d" },
        { title: "姓名", field: "e" },
        { title: "告知事項", field: "f" },
        { title: "相關保單", field: "g" },
      ],
      tableAcc2Data: [],
      tableAcc3Id: "tableAcc3Id",
      tableAcc3Columns: [
        { title: "關係", field: "a" },
        { title: "身分證字號", field: "b" },
        { title: "姓名", field: "c" },
        { title: "批註日期", field: "d" },
        { title: "取消日期", field: "e" },
        { title: "類別", field: "f" },
        { title: "批註內容", field: "g" },
        { title: "批註年限", field: "h" },
      ],
      tableAcc3Data: [],
      tableAcc4Id: "tableAcc4Id",
      tableAcc4Columns: [
        { title: "關係", field: "a" },
        { title: "受理日期", field: "b" },
        { title: "受理號碼", field: "c" },
        { title: "身分證字號", field: "d" },
        { title: "姓名", field: "e" },
        { title: "弱體", field: "f" },
        { title: "保單號碼", field: "g" },
      ],
      tableAcc4Data: [],
    };
  },
};
</script>
