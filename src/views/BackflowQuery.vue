<template>
  <!-- 18,19 回流關聯查詢-->
  <div>
    <SectionTitle :title="sectionTitle" />
    <div class="content-card">
      <div class="card-inner">
        <div class="card-detail">
          <SearchFormCombine :bar="bar1" @btn-click-event="clickHandler" />
          <!-- <Searchform
            :bar="bar2"
            @search-form-submit="collectSearchFormData"
          ></Searchform> -->
          <Accordion id="backflowquery-acc1" title="新件保單">
            <TabulatorTable
              :tableId="tableAcc1Id"
              :columns="tableAcc1Columns"
              :tableData="tableAcc1Data"
              checkId1="backflowquery-acc1-check1"
              checkId2="backflowquery-acc1-check2"
              @transmit-tabulator-data="tableHandler"
            />
          </Accordion>
          <Accordion id="backflowquery-acc2" title="舊件保單">
            <TabulatorTable
              :tableId="tableAcc2Id"
              :columns="tableAcc2Columns"
              :tableData="tableAcc2Data"
              checkId1="backflowquery-acc2-check1"
              checkId2="backflowquery-acc2-check2"
            />
          </Accordion>
          <Modal />
        </div>
      </div>
      <button>
        <router-link to="/qrysys/testpageforremotetabulator"
          >To Remote Tabulator</router-link
        >
      </button>
    </div>
  </div>
</template>

<script>

import callApi from "../helperFunctions/callApi";
export default {
  name: "BackflowQuery",
  // beforeRouteEnter(to, from, next) {
  //   next((vm) => {
  //     vm.$store.dispatch("addHistory", {
  //       name: from.name,
  //       cName: from.meta.name,
  //       path: from.path,
  //       id: uuid(),
  //     });
  //   });
  // },
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
      console.log(`newVal: ${newVal} \n oldVal: ${oldVal}`);
    },
  },
  methods: {
    tableHandler(rowValue) {//舊件保單
      console.log(rowValue.m_policy_no);
      this.dataBox = rowValue.m_policy_no;
      this.tabulatorCallApi();
    },
    async clickHandler({ formData, allEmpty }) {//新件保單
      console.log(formData);
      if (allEmpty) {
        //modal popup
        this.$bvModal.show("bv-modal-example");
      } else {
        const domain = this.$store.state.domain;
        const url = domain + "/valueReAssociate/executeMission01";
        const params = {
          Anniv_date: formData.backflowDate1,
          New_policy: formData.newInsPolicyNo,
          Old_policy: formData.oldInsPolicyNo,
        };
        const headers = {
          "Content-Type": "application/x-www-form-urlencoded",
          //Authorization: "bearer " + token,
        };
        const { res } = callApi();
        const { data } = await res(url, params, headers);
        this.tableAcc1Data = data.data;
      }
    },
    async tabulatorCallApi() {
      const domain = this.$store.state.domain;
      const url = domain + "/valueReAssociate/executeMission02";
      const params = {
        k_policy_no: this.dataBox,
      };
      const headers = {
        "Content-Type": "application/x-www-form-urlencoded",
        //Authorization: "bearer " + token,
      };
      const { res } = callApi();
      const { data, status } = await res(url, params, headers);
      console.log(data);
      this.tableAcc2Data = data.data;
    },

    // collectSearchFormData({formData, allEmpty}) {
    //   console.log(formData);
    //   if (allEmpty) {
    //     //modal popup
    //     this.$bvModal.show("modal-1");
    //   }else{
    //     //call api
    //   }

    // },
  },
  data() {
    return {
      dataBox: null,
      sectionTitle: "回流關聯查詢",
      //查詢
      bar1: [
        {
          inputType: "textfield",
          inputName: "新件保單號碼",
          id: "newInsPolicyNo",
          placeholder: "新件保單號碼",
          value: "",
        },
        {
          inputType: "textfield",
          inputName: "舊件保單號碼",
          id: "oldInsPolicyNo",
          placeholder: "舊件保單號碼",
          value: "",
        },
        {
          inputType: "datepicker",
          inputName: "還本週年日",
          id: "backflowDate1",
          value: null,
        },
      ],
      // bar2: [
      //   {
      //     inputType: "radio",
      //     inputName: "業務員招攬授權等級",
      //     id: "level",
      //     options: [
      //       {
      //         text: "資深優良免體檢",
      //         value: 1,
      //       },
      //       {
      //         text: "優良免體檢",
      //         value: 2,
      //       },
      //       {
      //         text: "一般免體檢",
      //         value: 3,
      //       },
      //     ],
      //     value: "",
      //   },
      // ],
      //新件保單
      tableAcc1Id: "tableAcc1Id",
      tableAcc1Columns: [
        { title: "保單號碼", field: "m_policy_no" },
        { title: "新件險種", field: "m_plan_code" },
        { title: "新件要保人", field: "m_O1_name" },
        { title: "新件被保人", field: "m_I1_name" },
      ],
      tableAcc1Data: [],
      //舊件保單
      tableAcc2Id: "tableAcc2Id",
      tableAcc2Columns: [
        { title: "舊件保單", field: "m_join_policy" },
        { title: "受益人姓名", field: "m_benf_name" },
        { title: "還本週年日", field: "m_cp_anniv_date" },
        { title: "實付金額", field: "m_cp_real_payamt" },
      ],
      tableAcc2Data: [],
    };
  },
};
</script>
