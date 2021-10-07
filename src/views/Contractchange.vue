//33,34--契約變更紀錄
<template>
  <div>
    <SectionTitle :title="sectiontitle" />
    <div class="content-component content-card">
      <div class="card-inner">
        <div class="card-detail">
          <SearchFormCombine :bar="bar1" @btn-click-event="clickHandler" />
          <Accordion id="acc1" title="契約變更紀錄">
            <TabulatorTable
              :tableId="Table1Id"
              :columns="Table1Columns"
              :tableData="Table1Data"
              checkId1="contractChange-acc1table1-check1"
              checkId2="contractChange-acc1table1-check2"
            />
          </Accordion>
          <Accordion id="acc2" title="受理項目">
            <TabulatorTable
              :tableId="Table2Id"
              :columns="Table2Columns"
              :tableData="Table2Data"
              checkId1="contractChange-acc2table2-check1"
              checkId2="contractChange-acc2table2-check2"
            />
          </Accordion>
          <Tabs2 :titles="titles">
            <template v-slot:1>
              <TabulatorTable
                :tableId="slot1Table3Id"
                :columns="slot1Table3Columns"
                :tableData="slot1Table3Data"
                checkId1="contractChange-slot1table3-check1"
                checkId2="contractChange-slot1table3-check2"
              />
            </template>
            <template v-slot:2>
              <TabulatorTable
                :tableId="slot2Table5Id"
                :columns="slot2Table5Columns"
                :tableData="slot2Table5Data"
                checkId1="contractChange-slot2table5-check1"
                checkId2="contractChange-slot2table5-check2"
              />
            </template>
          </Tabs2>
          <Accordion id="acc3" title="退件原因說明">
            <TabulatorTable
              :tableId="slot2Table4Id"
              :columns="slot2Table4Columns"
              :tableData="slot2Table4Data"
              checkId1="contractChange-acc3table1-check1"
              checkId2="contractChange-acc3table1-check2"
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
  name:"Contractchange",
  data() {
    return {
      sectiontitle: "契約變更紀錄",
      bar1: [
        {
          inputType: "textfield",
          inputName: "新件保單號碼",
          placeholder: "新件保單號碼",
          id: "id",
          inputVal: "",
        },
        {
          inputType: "textfield",
          inputName: "舊件保單號碼	",
          placeholder: "舊件保單號碼	",
          id: "age",
          inputVal: "",
        },
        {
          inputType: "datepicker",
          inputName: "還本週年日",
          placeholder: "還本週年日",
          id: "first",
          inputVal: "",
        },
      ],
      Table1Id: "contractChangeSlot1Table1",
      Table1Columns: [
        { title: "受理號碼", field: "a" },
        { title: "受理日期", field: "b" },
        { title: "保單號碼", field: "c" },
        { title: "申請人ID", field: "d" },
        { title: "單位", field: "e" },
        { title: "代辦人", field: "f" },
        { title: "承辦人", field: "g" },
        { title: "受理狀況", field: "h" },
        { title: "狀況日期", field: "i" },
      ],
      Table1Data: [],
      Table2Id: "contractChangeSlot1Table2",
      Table2Columns: [
        { title: "受理項目", field: "a" },
        { title: "受理項目說明", field: "b" },
      ],
      Table2Data: [],
      titles: ["檢附文件", "其他契變保單查詢"],
      slot1Table3Id: "contractChangeSlot1Table3",
      slot1Table3Columns: [
        { title: "文件項目", field: "a" },
        { title: "文件項目說明", field: "b" },
        { title: "保單代碼", field: "c" },
      ],
      slot1Table3Data: [],
      slot2Table4Id: "contractChangeSlot1Table4",
      slot2Table4Columns: [
        { title: "退件項目", field: "a" },
        { title: "退件項目說明", field: "b" },
      ],
      slot2Table4Data: [],
      slot2Table5Id: "contractChangeSlot1Table5",
      slot2Table5Columns: [
        { title: "	保單號碼", field: "a" },
        { title: "狀況", field: "b" },
      ],
      slot2Table5Data: [],
    };
  },
   methods: {
    clickHandler(val) {
      console.log(val);
      //  call api
     
    },
  },
};
</script>
