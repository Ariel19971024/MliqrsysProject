//80-81--抽檢紀錄查詢
<template>
  <div>
    <SectionTitle :title="sectiontitle" />
    <div class="content-component content-card">
      <div class="card-inner">
        <div class="card-detail"></div>
        <SearchFormCombine :bar="bar1" @btn-click-event="handleRecordQuery" />
        <TabulatorTable
          :tableId="table1Id"
          :columns="table1Columns"
          :tableData="table1Data"
          checkId1="samplingrecord-table1-check1"
          checkId2="samplingrecord-table1-check2"
        />
      </div>
    </div>
  </div>
</template>
<script>
import callApi from "../helperFunctions/callApi";
export default {
  name: "SamplingRecord",
  methods: {
    async handleRecordQuery({ formData, allEmpty }) {
      if (!formData["agent_code"]) {
        //modal popup
        this.$bvModal.show("bv-modal-example");
      } else {
        console.log("抽檢紀錄查詢api");
        const domain = this.$store.state.domain;
        const url = domain + "/newSamplingRecord/executeMission02";
        const params = {
          agent_code: formData["agent_code"],
        };
        const headers = {
          "Content-Type": "application/x-www-form-urlencoded",
        };
        const { res } = callApi();
        const { data } = await res(url, params, headers);
        this.table1Data = data.data;
      }
    },
  },
  data() {
    return {
      table1Id: "samplingTable1",
      table1Columns: [
        { title: "	保單號碼", field: "r_policy_no" },
        { title: "	保單狀態", field: "r_po_sts_desc" },
        { title: "抽檢日期", field: "r_app_input_date" },
        { title: "體檢狀態", field: "r_medical_desc" },
      ],
      table1Data: [],
      sectiontitle: "抽檢紀錄查詢",
      bar1: [
        {
          inputType: "textfield",
          inputName: "業務員ID",
          placeholder: "業務員ID",
          id: "agent_code",
          inputVal: "",
        },
        {
          inputType: "textfield",
          inputName: "姓名",
          placeholder: "姓名",
          id: "agent_name",
          inputVal: "",
        },
        {
          inputType: "dropdown",
          inputName: "豁免中(Y/N)",
          options: [
            { text: "Y", value: "Y" },
            { text: "N", value: "N" },
          ],
          id: "immune",
          inputVal: "Y",
        },
      ],
    };
  },
};
</script>
