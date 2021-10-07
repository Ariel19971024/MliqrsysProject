//82,83--體檢費扣擁查詢
<template>
  <div>
    <SectionTitle :title="sectiontitle" />
    <div class="content-component content-card">
      <div class="card-inner">
        <div class="card-detail"></div>
        <SearchFormCombine :bar="bar1" @btn-click-event="clickHandler" />
        <TabulatorTable
          :tableId="Table1Id"
          :columns="Table1Columns"
          :tableData="Table1Data"
          checkId1="medicalexaminationfee-table1-check1"
          checkId2="medicalexaminationfee-table1-check2"
        />
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name:"MedicalExaminationFee",
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
  },
  data() {
    return {
      Table1Id: "homeTable1",
      Table1Columns: [
        { title: "被保險人ID", field: "id" },
        { title: "姓名", field: "first" },
        { title: "體檢日期", field: "age" },
        { title: "保單號碼", field: "age" },
        { title: "扣佣金額", field: "age" },
        { title: "體檢原因", field: "age" },
        { title: "扣佣原因", field: "age" },
      ],
      Table1Data: [],
      sectiontitle: "體檢費扣擁查詢",
      bar1: [
        {
          inputType: "textfield",
          inputName: "業務員ID",
          placeholder: "業務員ID",
          id: "id",
          inputVal: "",
        },
        {
          inputType: "datepicker",
          inputName: "扣佣月份",
          id: "age",
          inputVal: "",
        },
      ],
    };
  },
};
</script>
