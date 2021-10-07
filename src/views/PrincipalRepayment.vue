<template>
  <!-- 15,16,17 還本金-->
  <div>
    <SectionTitle :title="sectionTitle" />
    <div class="content-card">
      <div class="card-inner">
        <div class="card-detail">
          <Accordion id="annuitydetails-acc1" title="給付資料">
            <Table :colNum="4" :table="acc1NTableData" />
            <TabulatorTable
              :tableId="acc1TableId"
              :columns="acc1TableColumns"
              :tableData="acc1TableData"
              checkId1="annuitydetails-acc1-table-check1"
              checkId2="annuitydetails-acc1-table-check2"
            />
          </Accordion>
        </div>
      </div>
    </div>

    <Tabs :titles="titles" :tabLen="tabLen">
      <template v-slot:1
        ><!-- 明細資料 -->
        <Accordion id="tab1-acc1" title="明細資料">
          <Table :colNum="4" :table="tab1Acc1NTableData" />
        </Accordion>
        <Accordion id="tab1-acc2" title="給付項目">
          <TabulatorTable
            :tableId="tab1Acc2TableId"
            :columns="tab1Acc2TableColumns"
            :tableData="tab1Acc2TableData"
            checkId1="annuitydetails-tab1acc2-table-check1"
            checkId2="annuitydetails-tab1acc2-table-check2"
          />
        </Accordion>
        <Accordion id="tab1-acc3" title="抵繳保單">
          <TabulatorTable
            :tableId="tab1Acc3TableId"
            :columns="tab1Acc3TableColumns"
            :tableData="tab1Acc3TableData"
            checkId1="annuitydetails-tab1acc3-table-check1"
            checkId2="annuitydetails-tab1acc3-table-check2"
          />
        </Accordion>
      </template>
      <template v-slot:2
        ><!-- 回覆情形及註記 -->
        <Accordion id="tab2-acc1" title="回覆情形">
          <TabulatorTable
            :tableId="tab2Acc1TableId"
            :columns="tab2Acc1TableColumns"
            :tableData="tab2Acc1TableData"
            checkId1="annuitydetails-tab2acc1-table-check1"
            checkId2="annuitydetails-tab2acc1-table-check2"
          />
        </Accordion>
        <Accordion id="tab2-acc2" title="缺件資料">
          <Table :colNum="1" :table="tab2Acc2NTableData" />
        </Accordion>
        <Accordion id="tab2-acc3" title="註記內容">
          <Table :colNum="1" :table="tab2Acc3NTableData" />
        </Accordion>
      </template>
      <template v-slot:3
        ><!-- 還本未回回覆 -->
        <Accordion id="tab3-acc1" title="回覆明細">
          <Table :colNum="3" :table="tab3Acc1NTableData" />
        </Accordion>
        <Accordion id="tab3-acc2" title="給付明細">
          <TabulatorTable
            :tableId="tab3Acc2TableId"
            :columns="tab3Acc2TableColumns"
            :tableData="tab3Acc2TableData"
            checkId1="annuitydetails-tab3acc2-table-check1"
            checkId2="annuitydetails-tab3acc2-table-check2"
          />
        </Accordion>
        <Accordion id="tab3-acc3" title="抵繳保單">
          <TabulatorTable
            :tableId="tab3Acc3TableId"
            :columns="tab3Acc3TableColumns"
            :tableData="tab3Acc3TableData"
            checkId1="annuitydetails-tab3acc3-table-check1"
            checkId2="annuitydetails-tab3acc3-table-check2"
          />
        </Accordion>
      </template>
    </Tabs>
  </div>
</template>

<script>

export default {
  name: "PrincipalRepayment",
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
      //   }
    },
  },
  data() {
    return {
      sectionTitle: "還本金",
      titles: ["明細資料", "回覆情形及註記", "還本未回回覆"],
      tabLen: 3,
      //給付資料
      acc1TableId: "acc1TableId",
      acc1TableColumns: [
        { title: "還本週年日", field: "a" },
        { title: "還本產品簡名", field: "b" },
        { title: "還本版數", field: "c" },
        { title: "註記", field: "d" },
        { title: "還本狀況", field: "e" },
        { title: "支票兌現", field: "f" },
        { title: "應付金額", field: "g" },
        { title: "加項金額", field: "h" },
        { title: "減項金額", field: "i" },
        { title: "實付金額", field: "j" },
        { title: "還本種類", field: "k" },
        { title: "回流專案回覆時間", field: "l" },
      ],
      acc1TableData: [],
      acc1NTableData: [
        { key: "保單號碼", keyId: 0, value: "" },
        { key: "保單狀態(中文)", keyId: 1, value: "" },
        { key: "生效日", keyId: 2, value: "" },
        { key: "作帳日", keyId: 3, value: "" },
        { key: "保單狀態", keyId: 4, value: "" },
        { key: "收費方式", keyId: 5, value: "" },
        { key: "保費到期日", keyId: 6, value: "" },
        { key: "", keyId: 7, value: "" },
      ],
      //明細資料
      tab1Acc1NTableData: [
        { key: "還本週年日", keyId: 0, value: "" },
        { key: "回覆指示", keyId: 1, value: "" },
        { key: "郵寄地址", keyId: 2, value: "" },
        { key: "電匯指示", keyId: 3, value: "" },
        { key: "給付方式", keyId: 4, value: "" },
        { key: "超借指示", keyId: 5, value: "" },
        { key: "領取人", keyId: 6, value: "" },
        { key: "電匯日期", keyId: 7, value: "" },
        { key: "業務員", keyId: 8, value: "" },
        { key: "還款指示", keyId: 9, value: "" },
        { key: "領取人ID", keyId: 10, value: "" },
        { key: "", keyId: 11, value: "" },
        { key: "未兌支票", keyId: 12, value: "" },
        { key: "ID影本檢付", keyId: 13, value: "" },
        { key: "領取地點", keyId: 14, value: "" },
        { key: "", keyId: 15, value: "" },
        { key: "給付變更", keyId: 16, value: "" },
        { key: "註記", keyId: 17, value: "" },
        { key: "受益人", keyId: 18, value: "" },
        { key: "", keyId: 19, value: "" },
      ],
      //給付項目
      tab1Acc2TableId: "tab1Acc2TableId",
      tab1Acc2TableColumns: [
        { title: "順序", field: "a" },
        { title: "受領人", field: "b" },
        { title: "比率(%)", field: "c" },
        { title: "實付金額", field: "d" },
        { title: "付款號碼", field: "e" },
        { title: "電匯帳號", field: "f" },
      ],
      tab1Acc2TableData: [],
      //抵繳保單
      tab1Acc3TableId: "tab1Acc3TableId",
      tab1Acc3TableColumns: [
        { title: "保單號碼", field: "a" },
        { title: "保單狀態", field: "b" },
        { title: "收費方式", field: "c" },
        { title: "繳費終日", field: "d" },
      ],
      tab1Acc3TableData: [],
      //tab2
      //回覆情形
      tab2Acc1TableId: "tab2Acc1TableId",
      tab2Acc1TableColumns: [
        { title: "回覆序號", field: "a" },
        { title: "回覆日期", field: "b" },
        { title: "回覆情形", field: "c" },
        { title: "處理情形", field: "d" },
        { title: "承辦者(中文)", field: "e" },
        { title: "承辦單位", field: "f" },
      ],
      tab2Acc1TableData: [],
      //缺件資料
      tab2Acc2NTableData: [
        { key: "缺件資料", keyId: 0, value: "" },
        { key: "缺件資料", keyId: 1, value: "" },
        { key: "缺件資料", keyId: 2, value: "" },
        { key: "缺件資料", keyId: 3, value: "" },
        { key: "缺件資料", keyId: 4, value: "" },
        { key: "缺件資料", keyId: 5, value: "" },
        { key: "缺件資料", keyId: 6, value: "" },
      ],
      //註記內容
      tab2Acc3NTableData: [
        { key: "註記內容", keyId: 0, value: "" },
        { key: "註記內容", keyId: 1, value: "" },
        { key: "註記內容", keyId: 2, value: "" },
        { key: "註記內容", keyId: 3, value: "" },
        { key: "註記內容", keyId: 4, value: "" },
      ],
      //tab3
      //回覆明細
      tab3Acc1NTableData: [
        { key: "週年日", keyId: 0, value: "" },
        { key: "付款方式", keyId: 1, value: "" },
        { key: "建檔者", keyId: 2, value: "" },
        { key: "郵件地址", keyId: 3, value: "" },
        { key: "", keyId: 4, value: "" },
        { key: "", keyId: 5, value: "" },
      ],
      //給付明細
      tab3Acc2TableId: "tab3Acc2TableId",
      tab3Acc2TableColumns: [
        { title: "支票號碼", field: "a" },
        { title: "原受領人ID", field: "b" },
        { title: "原受領人姓名", field: "c" },
        { title: "新受領人ID", field: "d" },
        { title: "新受領人姓名", field: "e" },
        { title: "匯款銀行", field: "f" },
        { title: "匯款帳號", field: "g" },
        { title: "說明", field: "h" },
      ],
      tab3Acc2TableData: [],
      //抵繳保單
      tab3Acc3TableId: "tab3Acc3TableId",
      tab3Acc3TableColumns: [{ title: "保單號碼", field: "a" }],
      tab3Acc3TableData: [],
    };
  },
};
</script>
