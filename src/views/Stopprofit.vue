//28--自動轉換與停利查詢
<template>
  <div>
    <SectionTitle :title="sectiontitle" />
    <div class="content-component content-card">
      <div class="card-inner">
        <div class="card-detail">
          <Accordion id="acc1" title="入帳資料">
            <Tags :tags="acc1Tags" />
            <TabulatorTable
              :tableId="slot1Table1Id"
              :columns="slot1Table1Columns"
              :tableData="slot1Table1Data"
              checkId1="stopprofit-acc1table1-check1"
              checkId2="stopprofit-acc1table1-check2"
            />
          </Accordion>
          <Accordion id="acc2" title="加碼明細">
            <TabulatorTable
              :tableId="slot1Table2Id"
              :columns="slot1Table2Columns"
              :tableData="slot1Table2Data"
              checkId1="stopprofit-acc2table2-check1"
              checkId2="stopprofit-acc2table2-check2"
            />
          </Accordion>
          <Accordion id="acc3" title="停利明細">
            <SearchFormCombine :bar="bar1" @btn-click-event="clickHandler" />

            <TabulatorTable
              :tableId="slot1Table3Id"
              :columns="slot1Table3Columns"
              :tableData="slot1Table3Data"
              checkId1="stopprofit-acc3table3-check1"
              checkId2="stopprofit-acc3table3-check2"
            />
          </Accordion>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { v4 as uuid } from "uuid";

export default {
  name: "Stopprofit",
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
      id: "searcharea",
      sectiontitle: "自動轉換與停利查詢",
      acc1Tags: [
        { title: "下次自動轉換日期", detail: "下次自動轉換日期_設計文字" },
      ],
      slot1Table1Id: "homeSlot1Table1",
      slot1Table1Columns: [
        { title: "週月日", field: "a" },
        { title: "批次作業日", field: "b" },
        { title: "應轉出金額", field: "c" },
        { title: "實際轉出金額", field: "d" },
        { title: "執行狀態", field: "e" },
        { title: "事由", field: "f" },
      ],
      slot1Table1Data: [],
      slot1Table2Id: "homeSlot1Table2",
      slot1Table2Columns: [
        { title: "基金代碼", field: "a" },
        { title: "自動轉換金額", field: "b" },
        { title: "報酬率%", field: "c" },
        { title: "加碼機制", field: "d" },
        { title: "加碼倍數", field: "e" },
        { title: "加碼後轉換金額", field: "f" },
      ],
      slot1Table2Data: [],
      slot1Table3Id: "homeSlot1Table3",
      slot1Table3Columns: [
        { title: "批次作業日", field: "a" },
        { title: "基金代碼", field: "b" },
        { title: "預定停利%", field: "c" },
        { title: "報酬率%", field: "d" },
        { title: "持有成本", field: "e" },
        { title: "基金子價值", field: "f" },
      ],
      slot1Table3Data: [],
      bar1: [
        {
          inputType: "datepicker",
          id: "first",
          inputName: "查詢期間",
          inputVal: "",
        },
        {
          inputType: "datepicker",
          id: "second",
          inputName: "~",
          inputVal: "",
        },

        {
          inputType: "textfield",
          inputName: "基金代碼",
          placeholder: "基金代碼",
          id: "3",

          inputVal: "",
        },
      ],
    };
  },
  methods: {
    clickHandler({ formData, allEmpty }) {
      console.log(formData);
      if (allEmpty) {
        //modal popup
        this.$bvModal.show("bv-modal-example");
      } else {
        //call Api
      }
    },
  },
};
</script>
