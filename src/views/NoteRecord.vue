//35--照會紀錄
<template>
  <div>
    <SectionTitle :title="sectiontitle" />
    <div class="content-component content-card">
      <div class="card-inner">
        <div class="card-detail">
          <SearchFormCombine :bar="bar1" @btn-click-event="clickHandler" />
          <Accordion id="acc1" title="照會繳費">
            <Table :colNum="3" :table="table1" />
          </Accordion>
          <Accordion id="acc2" title="照會補件">
            <TabulatorTable
              :tableId="Table1Id"
              :columns="Table1Columns"
              :tableData="Table1Data"
              checkId1="noteRecord-slot1table1-check1"
              checkId2="noteRecord-slot1table1-check2"
            />
          </Accordion>
          <Accordion id="acc3" title="體檢原因">
            <TabulatorTable
              :tableId="Table2Id"
              :columns="Table2Columns"
              :tableData="Table2Data"
              checkId1="noteRecord-slot1table1-check1"
              checkId2="noteRecord-slot1table1-check2"
            />
          </Accordion>
          <Accordion id="acc4" title="照會項目">
            <TabulatorTable
              :tableId="Table3Id"
              :columns="Table3Columns"
              :tableData="Table3Data"
              checkId1="noteRecord-slot1table1-check1"
              checkId2="noteRecord-slot1table1-check2"
            />
          </Accordion>
          <Accordion id="acc5" title="體檢項目">
            <TabulatorTable
              :tableId="Table4Id"
              :columns="Table4Columns"
              :tableData="Table4Data"
              checkId1="noteRecord-slot1table1-check1"
              checkId2="noteRecord-slot1table1-check2"
            />
          </Accordion>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import callApi from "../helperFunctions/callApi";
import { populateTable } from "../helperFunctions/commonVue.js";
export default {
  name: "NoteRecord",
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
      // localStorage.policy_no=newVal;
      console.log(oldVal);
      console.log(`newVal: ${newVal} \n oldVal: ${oldVal}`);
    },
    immediate: true,
  },
  methods: {
    async clickHandler({ formData, allEmpty }) {
      this.formDataBox = formData;
      console.log(this.formDataBox);
      if (allEmpty) {
        //modal popup
        this.$bvModal.show("bv-modal-example");
      } else {
        this.callTabulatorApi1();//照會繳費
        this.callTabulatorApi2();//照會補件
        this.callTabulatorApi3();//體檢原因
        this.callTabulatorApi4();//照會項目,體檢項目
        const domain = this.$store.state.domain;
        const url = domain + "/posNoticeController/executeMission01";

        const params = {
          notice_seq: formData.acceptanceNumber,
          po_chg_rece_no: formData.noteNumber,
          policy_no: this.insPolicyNumber,
        };

        const headers = {
          "Content-Type": "application/x-www-form-urlencoded",
          //Authorization: "bearer " + token,
        };
        const { res } = callApi();
        const { data, status } = await res(url, params, headers);
        let newTableData = data.data[0];
        populateTable(newTableData, this.table1);
      }
    },
    async callTabulatorApi1() {
      this.Table1Data = [];
      const domain = this.$store.state.domain;
      const url = domain + "/posNoticeController/executeMission02";

      const params = {
        notice_seq: this.formDataBox.acceptanceNumber,
        po_chg_rece_no: this.formDataBox.noteNumber,
        policy_no: this.insPolicyNumber,
      };

      const headers = {
        "Content-Type": "application/x-www-form-urlencoded",
        //Authorization: "bearer " + token,
      };
      const { res } = callApi();
      const { data, status } = await res(url, params, headers);
      const tableDataDetail = data.data;
      this.Table1Data = tableDataDetail;
      // console.log(tableDataDetail)
    },
    async callTabulatorApi2() {
      this.Table2Data = [];
      const domain = this.$store.state.domain;
      const url = domain + "/posNoticeController/executeMission03";

      const params = {
        notice_seq: this.formDataBox.acceptanceNumber,
        po_chg_rece_no: this.formDataBox.noteNumber,
        policy_no: this.insPolicyNumber,
      };

      const headers = {
        "Content-Type": "application/x-www-form-urlencoded",
        //Authorization: "bearer " + token,
      };
      const { res } = callApi();
      const { data, status } = await res(url, params, headers);
      const tableDataDetail = data.data;
      this.Table2Data = tableDataDetail;
      // console.log(tableDataDetail)
    },
    async callTabulatorApi3() {
      this.Table3Data = [];
      const domain = this.$store.state.domain;
      const url = domain + "/posNoticeController/executeMission04";
      const params = {
        notice_seq: this.formDataBox.acceptanceNumber,
        po_chg_rece_no: this.formDataBox.noteNumber,
        policy_no: this.insPolicyNumber,
      };

      const headers = {
        "Content-Type": "application/x-www-form-urlencoded",
        //Authorization: "bearer " + token,
      };
      const { res } = callApi();
      const { data, status } = await res(url, params, headers);
      const tableDataDetail = data.data;
      this.Table3Data = tableDataDetail;
      // console.log(tableDataDetail)
    },
    async callTabulatorApi4() {
      this.Table4Data = [];
      const domain = this.$store.state.domain;
      const url = domain + "/posNoticeController/executeMission05";

      const params = {
        notice_seq: this.formDataBox.acceptanceNumber,
        po_chg_rece_no: this.formDataBox.noteNumber,
        policy_no: localStorage.getItem("policy_no"),
      };

      const headers = {
        "Content-Type": "application/x-www-form-urlencoded",
        //Authorization: "bearer " + token,
      };
      const { res } = callApi();
      const { data, status } = await res(url, params, headers);
      const tableDataDetail = data.data;
      this.Table4Data = tableDataDetail;
      // console.log(tableDataDetail)
    },
  },
  data() {
    return {
      formDataBox: null,
      sectiontitle: "照會紀錄",
      bar1: [
        {
          inputType: "textfield",
          inputName: "受理號碼",
          placeholder: "受理號碼",
          id: "acceptanceNumber",
          value: "",
        },
        {
          inputType: "textfield",
          inputName: "照會序號",
          placeholder: "照會序號	",
          id: "noteNumber",
          value: "",
        },
      ],
      table1: [
        { key: "保單號碼", keyId: "policy_no", value: "" },
        { key: "主契約保費", keyId: "prem_primary_lf", value: "" },
        //no match
        { key: "補收從(日期)", keyId: "notice_seq", value: "" },
        { key: "受理號碼", keyId: "po_chg_rece_no", value: "" },
        { key: "壽險附約保費", keyId: "prem_rider_en", value: "" },
        { key: "到期續期保費", keyId: "mode_prem", value: "" },
        { key: "承辦人", keyId: "access_name", value: "" },
        { key: "健康險保費", keyId: "prem_primary_hr", value: "" },
        { key: "應付解約金", keyId: "cv_amt", value: "" },
        { key: "照會序號", keyId: "notice_seq", value: "" },
        { key: "傷害險保費", keyId: "prem_primary_pa", value: "" },
        { key: "紅利退費", keyId: "prem_rider_tr", value: "" },
        { key: "照會日期", keyId: "notify_date", value: "" },
        { key: "保單價值準備金", keyId: "pv_amt", value: "" },
        { key: "本次變更應收小記", keyId: "po_chg_pay_total", value: "" },
        { key: "回覆日期", keyId: "act_return_date", value: "" },
        { key: "延繳保費利息", keyId: "prem_delay_int", value: "" },
        { key: "暫收款", keyId: "prem_susp", value: "" },
        { key: "申請項目", keyId: "po_chg_pay_ind", value: "" },
        { key: "償還借款/墊繳本息", keyId: "loan_return_this", value: "" },
        { key: "合計應繳金額", keyId: "grand_total", value: "" },
        { key: "核保通過日", keyId: "po_chg_uw_date", value: "" },
        { key: "償還欠繳金額", keyId: "debt_return_this", value: "" },
        { key: "變更後繳別", keyId: "mode_prem", value: "" },
        { key: "繳費截止日", keyId: "paid_to_date", value: "" },
        { key: "", keyId: 0, value: "" },

        { key: "變更後繳別保費", keyId: "reinstate_susp", value: "" },
      ],
      Table1Id: "noteRecordSlot1Table1",
      Table1Columns: [
        { title: "補件項目", field: "po_chg_note_code" },
        { title: "補件項目說明", field: "po_chg_note_desc" },
      ],
      Table1Data: [],
      Table2Id: "noteRecordSlot1Table2",
      Table2Columns: [
        { title: "體檢原因", field: "exam_reason_code" },
        { title: "體檢原因說明", field: "exam_reason_desc" },
      ],
      Table2Data: [],
      Table3Id: "noteRecordSlot1Table3",
      Table3Columns: [
        { title: "照會項目", field: "po_chg_note_code" },
        { title: "照會項目說明", field: "po_chg_note_desc" },
        { title: "保費-投資", field: "result_ind" },
      ],
      Table3Data: [],
      Table4Id: "noteRecordSlot1Table4",
      Table4Columns: [
        { title: "體檢項目", field: "exam_item_code" },
        { title: "體檢項目說明", field: "exam_item_desc" },
      ],
      Table4Data: [],
    };
  },
};
</script>
