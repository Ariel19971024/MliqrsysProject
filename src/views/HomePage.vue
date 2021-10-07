<template>
  <!-- 02, 03 提示訊息-->
  <div>
    <SectionTitle :title="sectionTitle" />
    <Tabs :titles="titles" :tabLen="tabLen" @tab-call-api="tabCallApi">
      <template v-slot:1>
        <Accordion id="acc1_1" title="問題保單">
          <Message title="問題描述" :content="msgContent" />
          <TabulatorTable
            :tableId="slot1Table1Id"
            :columns="slot1Table1Columns"
            :tableData="slot1Table1Data"
            checkId1="home-slot1table1-check1"
            checkId2="home-slot1table1-check2"
          />
        </Accordion>
        <Accordion id="acc1_2" title="保戶訊息">
          <TabulatorTable
            :tableId="slot1Table2Id"
            :columns="slot1Table2Columns"
            :tableData="slot1Table2Data"
            checkId1="home-slot1table2-check1"
            checkId2="home-slot1table2-check2"
          />
        </Accordion>
      </template>
      <template v-slot:2>
        <Accordion id="acc2_1" title="要保人資料">
          <Tags :tags="slot2Tags" />
          <TabulatorTable
            :tableId="slot2Table1Id"
            :columns="slot2Table1Columns"
            :tableData="slot2Table1Data"
            checkId1="home-slot2table1-check1"
            checkId2="home-slot2table1-check2"
          />
        </Accordion>
        <Accordion id="acc2_2" title="要保人特定資料">
          <Table :colNum="2" :table="slot2Table2" />
        </Accordion>
      </template>
    </Tabs>
  </div>
</template>

<script>
import callApi from "../helperFunctions/callApi";
import { populateTable } from "../helperFunctions/commonVue.js";
export default {
  name: "insPolicyDetails",
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
    this.watchApiCall();//問題保單
    this.watchApiCallTable2();//保戶訊息
  },
  computed: {
    insPolicyNumber() {
      return this.$store.state.insPolicyNumber;
    },
    applicant() {
      return this.$store.state.applicant;
    },
    table1Data() {
      let data = this.$store.state.singleInsPolicyData;
      console.log(data);
      let id = data ? data.id : "no id";
      let originalTable1Data = this.table1;
      if (data) {
        for (let i = 0; i < originalTable1Data.length; i++) {
          originalTable1Data[i]["value"] = `${id}_newData`;
        }
      }
      return originalTable1Data;
    },

  },

  watch: {
    insPolicyNumber(newVal, oldVal) {
      //call api to set table1Data
      this.watchApiCall();
      this.watchApiCallTable2();

      // localStorage.policy_no=newVal;
      console.log(oldVal);
      console.log(`newVal: ${newVal} \n oldVal: ${oldVal}`);
    },
    immediate: true,
  },
  methods: {
    tabCallApi(tabName) {
      // console.log(tabName)
      if (tabName === "要保人資料") {
        this.watchTabApi();//要保人資料
        this.watchTabTableApi();//要保人特定資料
      }
    },
    // 1問題保單---------------------
    async watchApiCall() {
      console.log("callApi");
      //table2 init
      this.slot1Table1Data = [];
      const domain = this.$store.state.domain;
      const url = domain + "/clientInfo/executeMission01";

      // const token = this.$store.state.token;
      const params = {
        policy_no: this.insPolicyNumber,
      };
      const headers = {
        "Content-Type": "application/x-www-form-urlencoded",
        //Authorization: "bearer " + token,
      };
      const { res } = callApi();
      const { data } = await res(url, params, headers);
      console.log(data.data)
      this.slot1Table1Data = data.data;
    },

    // 2保戶訊息--------------------------
    async watchApiCallTable2() {
      //table2 init
      this.slot1Table2Data = [];
      const domain = this.$store.state.domain;
      const url = domain + "/clientInfo/executeMission02";
      // const token = this.$store.state.token;
      const params = {
        policy_no: this.insPolicyNumber,
      };
      const headers = {
        "Content-Type": "application/x-www-form-urlencoded",
        //Authorization: "bearer " + token,
      };
      const { res } = callApi();
      const { data } = await res(url, params, headers);
      this.slot1Table2Data = data.data;
    },

    // 3要保人資料------------------------
    async watchTabApi() {
      //table2 init
      this.slot2Table1Data = [];
      const domain = this.$store.state.domain;
      const url = domain + "/clientInfo/executeMissionTabValues01";
      // const token = this.$store.state.token;
      const params = {
        client_id: this.applicant,

      };
      const headers = {
        "Content-Type": "application/x-www-form-urlencoded",
        //Authorization: "bearer " + token,
      };
      const { res } = callApi();
      const { data } = await res(url, params, headers);
      console.log(data.data)
      this.slot2Table1Data = data.data;
    },
    // 4要保人特定資料-------------------------
    
    async watchTabTableApi() {
      //table2 init
      const domain = this.$store.state.domain;
      const url = domain + "/clientInfo/executeMissionTabValues02";
      // const token = this.$store.state.token;
      const params = {
        policy_no: this.insPolicyNumber,
        client_id: this.applicant,
      };
      const headers = {
        "Content-Type": "application/x-www-form-urlencoded",
        //Authorization: "bearer " + token,
      };
      const { res } = callApi();
      const { data } = await res(url, params, headers);
      
      console.log(data.data)
      let newTableData = data.data[0]; 
      populateTable(newTableData, this.slot2Table2);
      this.slot2Table2[1].value=newTableData.mail_sts+"/"+newTableData.home_sts;
    },
  },

  data() {
    return {
      slot2Tags: [{title: "要保人姓名/ID", detail: "要保人姓名/ID_設計文字"}],
      sectionTitle: "提示訊息",
      tabLen: 2,
      titles: ["訊息", "要保人資料"],
      msgContent: "",
      slot1Table1Id: "homeSlot1Table1",
      slot1Table2Id: "homeSlot1Table2",
      slot2Table1Id: "homeSlot2Table1",
      slot1Table1Columns: [
        { title: "種類", field: "restrained" },
        { title: "處理者", field: "process_user" },
        { title: "處理日期", field: "process_date" },
        { title: "問題描述", field: "restrained_desc" },
      ],
      slot1Table2Columns: [
        { title: "保單號碼", field: "policy_no" },
        { title: "訊息種類", field: "eccm_type" },
        { title: "訊息內容", field: "comments" },
        { title: "通知日期", field: "crt_date" },
        { title: "發送單位", field: "dept_name" },
      ],
      slot2Table1Columns: [
        { title: "保單號碼", field: "policy_no" },
        { title: "收費地址指示", field: "mail_addr_ind" },
        { title: "住所地址指示", field: "home_addr_ind" },

        { title: "無效收費地址", field: "pmia_sts" },

        { title: "收費地址", field: "mail_addr" },
        { title: "住所地址", field: "home_addr" },
      ],
      slot1Table1Data: [],
      slot1Table2Data: [],
      slot2Table1Data: [],
      //TODO swagger key對不上
      slot2Table2: [

        { key: "列管/手機", keyId: "mobil_no", value: "" },
        { key: "電子表單/驗證",keyId: "mail_sts",value: "",},
        { key: "列管/E-mail", keyId: "e_mail", value: "" },
        //no match
        { key: "自動化交易申請", keyId: "ec_acct", value: "" },
        { key: "失聯保戶", keyId: "lost_ind", value: "" },
        {key: "投資風險屬性",keyId: "risk_suit_desc",value: "",},
        {key: "FATCA指示",keyId: "fatca_ind_desc",value: "",},
        //no match
        { key: "未領還本金", keyId: "r_psck_sw", value: "" },
        { key: "簽樣卡", keyId: "o1_sign_ptn_card", value: "" },

      ],
    };
  },
};
</script>
<style></style>
