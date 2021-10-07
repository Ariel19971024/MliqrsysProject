//53,54,55,56,57--付款資料查詢
<template>
  <div>
    <SectionTitle :title="sectiontitle" />
    <div class="content-component content-card">
      <div class="card-inner">
        <div class="card-detail">
          <SearchFormCombine :bar="bar1" @btn-click-event="clickHandler" />
          <Accordion id="acc1" title="主索引畫面">
            <TabulatorTable
              :tableId="Table1Id"
              :columns="Table1Columns"
              :tableData="Table1Data"
              checkId1="paymentProfile-slot1table1-check1"
              checkId2="paymentProfile-slot1table1-check2"
            />
            <Table :colNum="2" :table="table" />
          </Accordion>
          <Tabs :titles="titles" :tabLen="tabLens">
            <template v-slot:1>
              <Accordion id="acc2" title="分錄">
                <TabulatorTable
                  :tableId="slot1Table2Id"
                  :columns="slot1Table2Columns"
                  :tableData="slot1Table2Data"
                  checkId1="paymentProfile-slot1table1-check1"
                  checkId2="paymentProfile-slot1table1-check2"
                />
              </Accordion>
            </template>
            <template v-slot:2>
              <Accordion id="acc3" title="傳票">
                <TabulatorTable
                  :tableId="slot2Table3Id"
                  :columns="slot2Table3Columns"
                  :tableData="slot2Table3Data"
                  checkId1="paymentProfile-slot1table1-check1"
                  checkId2="paymentProfile-slot1table1-check2"
                />
              </Accordion>
            </template>
            <template v-slot:3>
              <Accordion id="acc4" title="重開">
                <TabulatorTable
                  :tableId="slot3Table4Id"
                  :columns="slot3Table4Columns"
                  :tableData="slot3Table4Data"
                  checkId1="paymentProfile-slot1table1-check1"
                  checkId2="paymentProfile-slot1table1-check2"
                />
              </Accordion>
            </template>
            <template v-slot:4>
              <Accordion id="acc4" title="重開">
                <TabulatorTable
                  :tableId="slot4Table5Id"
                  :columns="slot4Table5Columns"
                  :tableData="slot4Table5Data"
                  checkId1="paymentProfile-slot1table1-check1"
                  checkId2="paymentProfile-slot1table1-check2"
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
export default {
  name:"PaymentProfile",
  data() {
    return {
      sectiontitle:"保單匯款帳戶查詢",
      tabLens: 4,
      titles: ["分錄", "傳票", "重開", "歷史"],
      content: "請輸入查詢條件",
      searchData: {},
      bar1: [
        {
          inputType: "textfield",
          inputName: "相關號碼",
          placeholder: "相關號碼",
          id: "id",
          inputVal: "",
        },
        {
          inputType: "textfield",
          inputName: "付款號碼	",
          placeholder: "付款號碼",
          id: "age",
          inputVal: "",
        },
        {
          inputType: "datepicker",
          inputName: "支票日期",

          id: "first",
          inputVal: "",
        },
      ],
      Table1Id: "paymentProfileTable1",
      Table1Columns: [
        { title: "相關號碼", field: "id" },
        { title: "	受款人", field: "first" },
        { title: "受款人(中)", field: "age" },
        { title: "付款號碼", field: "age" },
        { title: "付款方式", field: "age" },
        { title: "支票號碼", field: "age" },
        { title: "付款金額", field: "age" },
        { title: "幣別", field: "age" },
        { title: "付款型態", field: "age" },
        { title: "付款狀況", field: "age" },
        { title: "功能碼", field: "age" },
      ],
      Table1Data: [],
      table: [
        { key: "付款號碼", keyId: 1, value: "保單號碼_設計文字" },
        { key: "受款人ID", keyId: 2, value: "應繳日期_設計文字" },
        { key: "彙支票日期", keyId: 3, value: "帳單日(週期)_設計文字" },
        { key: "傳票號碼", keyId: 4, value: "要保人_設計文字" },
        { key: "Swift_Code", keyId: 5, value: "通知單到期日_設計文字" },
        { key: "兌現日期", keyId: 6, value: "信用卡有效日_設計文字" },
        { key: "匯款帳號", keyId: 7, value: "被保險人_設計文字" },
        { key: "銀行名稱", keyId: 8, value: "停效日期_設計文字" },
        { key: "處理日期", keyId: 9, value: "授權人電話_設計文字" },
        { key: "銀行地址", keyId: 10, value: "保單狀態_設計文字" },
        { key: "付款狀況日", keyId: 11, value: "帳號狀態_設計文字" },
        { key: "付款備註", keyId: 12, value: "授權人地址_設計文字" },
        { key: "執行日期", keyId: 13, value: "授權人地址_設計文字" },
        { key: "處理者", keyId: 14, value: "授權人地址_設計文字" },
        { key: "匯款日期", keyId: 15, value: "授權人地址_設計文字" },
        { key: "付款摘要", keyId: 16, value: "授權人地址_設計文字" },
        { key: "銀行碼", keyId: 17, value: "授權人地址_設計文字" },
        { key: "程式代碼", keyId: 18, value: "授權人地址_設計文字" },
      ],
      slot1Table2Id: "slot1paymentProfileTable2",
      slot1Table2Columns: [
        { title: "傳票號碼", field: "a" },
        { title: "序號", field: "b" },
        { title: "會計科目", field: "c" },
        { title: "部門別", field: "d" },
        { title: "分錄金額", field: "e" },
        { title: "沖銷碼", field: "f" },
        { title: "保單號碼", field: "g" },
        { title: "業務員代碼", field: "h" },
        { title: "原因碼", field: "i" },
        { title: "分錄摘要", field: "j" },
      ],
      slot1Table2Data: [],
      slot2Table3Id: "slot2paymentProfileTable3",
      slot2Table3Columns: [
        { title: "傳票號碼", field: "a" },
        { title: "序號", field: "b" },
        { title: "付款金額", field: "c" },
        { title: "會計科目", field: "d" },
        { title: "分錄摘要", field: "e" },
      ],
      slot2Table3Data: [],
      slot3Table4Id: "slot3paymentProfileTable4",
      slot3Table4Columns: [{ title: "重開註記", field: "a" }],
      slot3Table4Data: [],

      slot4Table5Id: "slot2paymentProfileTable3",
      slot4Table5Columns: [
        { title: "付款號碼", field: "a" },
        { title: "付款狀況", field: "b" },
        { title: "	狀況日", field: "c" },
        { title: "部門代碼", field: "d" },
        { title: "	傳票號碼", field: "e" },
        { title: "處理日期", field: "f" },
        { title: "處理時間", field: "g" },
        { title: "處理者", field: "h" },
      ],
      slot4Table5Data: [],
    };
  },
  methods: {
     clickHandler({ formData, allEmpty }) {
      console.log(formData);
      if (allEmpty) {
        //modal popup
        this.$bvModal.show("bv-modal-example");
      } else{
        //call Api
      }
    },
    handleSearch() {
      //   this.$axios({
      //     method: "post",
      //     url: "http://localhost:10202/commonController/tabulatorDatas",
      //     params: {
      //       size: this.searchData.id,
      //       pageNo: this.searchData.age,
      //     },
      //   })
      //     .then((response) => {
      //       console.log(response.data.data.dataList);
      //       console.log("Table1Data");

      //       this.Table1Data = response.data.data.dataList;

      //       console.log(this.Table1Data);
      //     })
      //     .catch((error) => {
      //       this.errored = true;
      //       console.log(error);
      //     })
      //     .finally(() => (this.loading = false));
      console.log(this.searchData);
    },
  },
};
</script>
