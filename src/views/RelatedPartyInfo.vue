<template>
  <!-- 10 關係人資料-->
  <div>
    <SectionTitle :title="sectionTitle" />
    <div class="content-card">
      <div class="card-inner">
        <!-- 體檢原因資料 -->
        <div class="card-detail">
          <Accordion id="relatedpartyinfo-acc1" title="要保人、被保人、受益人資料">
            <TabulatorTable
              :tableId="tableAcc1_1Id"
              :columns="tableAcc1_1Columns"
              :tableData="tableAcc1_1Data"
              checkId1="relatedpartyinfo-acc1-1-check1"
              checkId2="relatedpartyinfo-acc1-1-check2"
            />
            <TabulatorTable
              :tableId="tableAcc1_2Id"
              :columns="tableAcc1_2Columns"
              :tableData="tableAcc1_2Data"
              checkId1="relatedpartyinfo-acc1-2-check1"
              checkId2="relatedpartyinfo-acc1-2-check2"
            />
          </Accordion>
          <Accordion id="relatedpartyinfo-acc2" title="業務員資料">
            <TabulatorTable
              :tableId="tableAcc2Id"
              :columns="tableAcc2Columns"
              :tableData="tableAcc2Data"
              checkId1="relatedpartyinfo-acc2-check1"
              checkId2="relatedpartyinfo-acc2-check2"
            />
          </Accordion>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  name: "RelatedPartyInfo",
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
      sectionTitle: "關係人資料",
      tableAcc1_1Id: "tableAcc1_1Id",
      tableAcc1_1Columns: [
        { title: "關係", field: "a" },
        { title: "姓名", field: "b" },
        { title: "性別", field: "c" },
        { title: "出生日期", field: "d" },
        { title: "身分證字號", field: "e" },
        { title: "受益順位", field: "f" },
        { title: "受益比例", field: "g" },
        { title: "與1關係", field: "h" },
        { title: "聯絡方式", field: "i" },
        { title: "電話", field: "j" },
        { title: "地址", field: "k" }    
      ],
      tableAcc1_1Data: [],
      tableAcc1_2Id: "tableAcc1_2Id",
      tableAcc1_2Columns: [
        { title: "代理投保單位編號", field: "a" },
        { title: "代表人", field: "b" },
        { title: "單位名稱", field: "c" },
        { title: "單位地址", field: "d" },
        { title: "電話", field: "e" },
        { title: "代理投保單位與要保人關係", field: "f" },
        { title: "要/被保險人身分別", field: "g" }
      ],
      tableAcc1_2Data: [],
      tableAcc2Id: "tableAcc2Id",
      tableAcc2Columns: [
        { title: "關係", field: "a" },
        { title: "身分證字號", field: "b" },
        { title: "登錄字號", field: "c" },
        { title: "姓名", field: "d" },
        { title: "職級", field: "e" },
        { title: "營業處", field: "f" },
        { title: "行動電話", field: "g" },
        { title: "營業處電話", field: "h" },
        { title: "營業處地址", field: "i" },
        { title: "比例", field: "j" },
        { title: "招攬授權分類", field: "k" },
      ],
      tableAcc2Data: [],
    };
  },
};
</script>