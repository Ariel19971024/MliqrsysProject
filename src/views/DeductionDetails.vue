//46--扣款明細
<template>
  <div>
    <SectionTitle :title="sectiontitle" />
    <div class="content-component content-card">
      <div class="card-inner">
        <div class="card-detail">
          <Accordion id="acc1" title="目前扣款資料">
            <Table :colNum="3" :table="table" />
          </Accordion>
          <Accordion id="acc2" title="扣款明細">
            <TabulatorTable
              :tableId="Table1Id"
              :columns="Table1Columns"
              :tableData="Table1Data"
              checkId1="deductionDetails-acc2table1-check1"
              checkId2="deductionDetails-acc2table1-check2"
            />
            <Table :colNum="2" :table="table1" />
          </Accordion>
          <Accordion id="acc3" title="繳費通知">
            <Table :colNum="1" :table="table2" />
          </Accordion>
          <Accordion id="acc4" title="後印送金單">
            <Table :colNum="1" :table="table3" />
          </Accordion>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { v4 as uuid } from "uuid";

export default {
  name:"DeductionDetails",
  // beforeRouteEnter(to, from, next) {
  //   next((vm) => {
  //     vm.$store.commit("setHistory", {
  //       name: from.name,
  //       path: from.path,
  //       id: uuid(),
  //     });
  //   });
  // },
  data() {
    return {
      sectiontitle: "扣款明細",
      table: [
        { key: "保單號碼", keyId: 1, value: "保單號碼_設計文字" },
        { key: "生效日期", keyId: 2, value: "生效日期_設計文字" },
        { key: "委託人姓名", keyId: 3, value: "委託人姓名_設計文字" },
        { key: "要保人", keyId: 4, value: "要保人_設計文字" },
        { key: "應繳費日", keyId: 5, value: "應繳費日_設計文字" },
        { key: "委託人ID", keyId: 6, value: "委託人ID_設計文字" },
        { key: "被保險人", keyId: 7, value: "被保險人_設計文字" },
        { key: "通知單到期日", keyId: 8, value: "通知單到期日_設計文字" },
        { key: "委託對象", keyId: 9, value: "委託對象_設計文字" },
        { key: "保單狀態", keyId: 10, value: "保單狀態_設計文字" },
        { key: "停效日期", keyId: 11, value: "停效日期_設計文字" },
        { key: "轉帳/收單行", keyId: 12, value: "轉帳/收單行_設計文字" },
        { key: "保單繳法", keyId: 13, value: "保單繳法_設計文字" },
        { key: "當期保費", keyId: 14, value: "當期保費_設計文字" },
        { key: "帳號", keyId: 15, value: "帳號_設計文字" },
        { key: "收費方式", keyId: 16, value: "收費方式_設計文字" },
        { key: "溢/欠繳", keyId: 17, value: "溢/欠繳_設計文字" },
        { key: "帳單日", keyId: 18, value: "帳單日_設計文字" },
        { key: "累積失敗次數", keyId: 19, value: "累積失敗次數_設計文字" },
        { key: "紅利金額", keyId: 20, value: "紅利金額_設計文字" },
        { key: "委託書狀態", keyId: 21, value: "委託書狀態_設計文字" },
        { key: "回饋分享金", keyId: 22, value: "回饋分享金_設計文字" },
      ],
      //   acc1--tabulator
      Table1Id: "deductionDetailsTable1",
      Table1Columns: [
        { title: "首期", field: "a" },
        { title: "應繳日期", field: "b" },
        { title: "扣款日期", field: "c" },
        { title: "扣還款", field: "d" },
        { title: "扣款金額", field: "e" },
        { title: "過帳日期", field: "f" },
        { title: "	轉帳結果", field: "g" },
        { title: "失敗原因", field: "h" },
        { title: "收費方式", field: "i" },
      ],
      Table1Data: [],

      table1: [
        { key: "保單號碼", keyId: 1, value: "保單號碼_設計文字" },
        { key: "扣款銀行", keyId: 2, value: "生效日期_設計文字" },
        { key: "送金單起日", keyId: 3, value: "委託人姓名_設計文字" },
        { key: "發卡銀行", keyId: 4, value: "要保人_設計文字" },
        { key: "送金單迄日", keyId: 5, value: "應繳費日_設計文字" },
        { key: "帳號/卡號", keyId: 6, value: "委託人ID_設計文字" },
        { key: "送金單號碼", keyId: 7, value: "被保險人_設計文字" },
        { key: "有效日期", keyId: 8, value: "通知單到期日_設計文字" },
        { key: "繳次", keyId: 9, value: "委託對象_設計文字" },
        { key: "處理日期", keyId: 10, value: "保單狀態_設計文字" },
        { key: "扣款人ID", keyId: 11, value: "停效日期_設計文字" },
        { key: "處理者", keyId: 12, value: "轉帳/收單行_設計文字" },
        { key: "扣款人姓名", keyId: 13, value: "保單繳法_設計文字" },
        { key: "變更狀態", keyId: 14, value: "當期保費_設計文字" },
      ],
      table2: [
        { key: "繳別保費", keyId: 1, value: "保單號碼_設計文字" },
        { key: "溢/欠款", keyId: 2, value: "生效日期_設計文字" },
        { key: "紅利", keyId: 3, value: "委託人姓名_設計文字" },
        { key: "回饋分享金", keyId: 4, value: "要保人_設計文字" },
        { key: "延滯息", keyId: 5, value: "應繳費日_設計文字" },
      ],
      table3: [
        { key: "繳別保費", keyId: 1, value: "保單號碼_設計文字" },
        { key: "溢/欠款", keyId: 2, value: "生效日期_設計文字" },
        { key: "紅利", keyId: 3, value: "委託人姓名_設計文字" },
        { key: "回饋分享金", keyId: 4, value: "要保人_設計文字" },
        { key: "延滯息", keyId: 5, value: "應繳費日_設計文字" },
      ],
    };
  },
};
</script>
