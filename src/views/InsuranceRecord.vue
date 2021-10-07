//76-79--投保紀錄查詢
<template>
  <div>
    <SectionTitle :title="sectiontitle" />
    <div class="content-component content-card">
      <div class="card-inner">
        <div class="card-detail">
          <Tags :tags="tags" />
          <Tabs :titles="titles" :tabLen="tabLen">
            <template v-slot:1>
              <TabulatorTable
                :tableId="Table1Id"
                :columns="Table1Columns"
                :tableData="Table1Data"
                checkId1="insuranceRecord-slot1table1-check1"
                checkId2="insuranceRecord-slot1table1-check2"
              />
              <Accordion id="acc2" title="IPA續保歷史資料查詢">
                <TabulatorTable
                  :tableId="Table2Id"
                  :columns="Table2Columns"
                  :tableData="Table2Data"
                  checkId1="insuranceRecord-slot1table2-check1"
                  checkId2="insuranceRecord-slot1table2-check2"
                />
              </Accordion>
            </template>
            <template v-slot:2>
              <TabulatorTable
                :tableId="Table3Id"
                :columns="Table3Columns"
                :tableData="Table3Data"
                checkId1="insuranceRecord-slot2table3-check1"
                checkId2="insuranceRecord-slot2table3-check2"
              />
            </template>

            <template v-slot:3>
              <Accordion id="acc3" title="累計保額查詢">
                <SearchFormCombine
                  :bar="bar1"
                  @btn-click-event="clickHandler"
                />
                <TabulatorTable
                  :tableId="Table4Id"
                  :columns="Table4Columns"
                  :tableData="Table4Data"
                  checkId1="insuranceRecord-slot3table4-check1"
                  checkId2="insuranceRecord-slot3table4-check2"
                />
                <Note />
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
  methods: {
    clickHandler(val) {
      console.log(val);
      //  call api
    },
  },
  data() {
    return {
      tabLen: 3,
      titles: ["保單號碼", "險種類別", "累計保額"],
      sectiontitle: "投保紀錄查詢",
      tags: [
        { title: "被保人ID", detail: "	客戶證號_設計文字" },
        { title: "被保人名", detail: "客戶證號_設計文字" },
        { title: "被保險人", detail: "客戶證號_設計文字" },
      ],
      Table1Id: "insuranceRecordTable1",
      Table1Columns: [
        { title: "	續保", field: "id" },
        { title: "保單號碼", field: "first" },
        { title: "ST", field: "age" },
        { title: "險種簡稱", field: "age" },
        { title: "版數", field: "age" },
        { title: "st", field: "age" },
        { title: "	保額", field: "age" },
        { title: "生效日期", field: "age" },
      ],
      Table1Data: [],
      Table2Id: "insuranceRecordTable2",
      Table2Columns: [
        { title: "保單號碼", field: "a" },
        { title: "險種", field: "b" },
        { title: "	版數", field: "c" },
        { title: "職級", field: "d" },
        { title: "保額", field: "e" },
        { title: "生效日", field: "f" },
        { title: "承保年度", field: "g" },
        { title: "註記", field: "h" },
        { title: "業務員", field: "i" },
      ],
      Table2Data: [],

      Table3Id: "insuranceRecordTable3",
      Table3Columns: [
        { title: "	續保", field: "id" },
        { title: "保單號碼", field: "first" },
        { title: "ST", field: "age" },
        { title: "險種簡稱", field: "age" },
        { title: "版數", field: "age" },
        { title: "st", field: "age" },
        { title: "	保額", field: "age" },
        { title: "生效日期", field: "age" },
      ],
      Table3Data: [],

      Table4Id: "insuranceRecordTable4",
      Table4Columns: [
        { title: "	險種類別", field: "id" },
        { title: "累計保額", field: "first" },
        { title: "單位", field: "age" },
        { title: "	目前尚可投保額度", field: "age" },
        { title: "單位", field: "age" },
      ],
      Table4Data: [],

      bar1: [
        {
          inputType: "textfield",
          inputName: "保險年齡",
          placeholder: "保險年齡",
          id: "id",
          inputVal: "",
        },
        {
          inputType: "textfield",
          inputName: "職業代號",
          placeholder: "職業代號",
          id: "age",
          inputVal: "",
        },
        {
          inputType: "radio",
          inputName: "業務員招攬授權等級",
          id: "first",
          inputVal: "",
          options: ["資深優良免體檢", "優良免體檢", "一般免體檢"],
        },
      ],
    };
  },
};
</script>
