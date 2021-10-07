//30,31--約定轉換/提領查詢
<template>
  <div>
    <SectionTitle :title="sectiontitle" />
    <Tabs :titles="titles" :tabLen="tabLen">
      <template v-slot:1>
        <Accordion id="acc1" title="約定提領交易">
          <TabulatorTable
            :tableId="slot1Table1Id"
            :columns="slot1Table1Columns"
            :tableData="slot1Table1Data"
            checkId1="withdrawquery-acc1slot1table1-check1"
            checkId2="withdrawquery-acc1table1-check2"
            @transmit-tabulator-data="tableHandler"
          />
        </Accordion>
        <Accordion id="acc2" title="約定提領明細">
          <TabulatorTable
            :tableId="slot1Table2Id"
            :columns="slot1Table2Columns"
            :tableData="slot1Table2Data"
            checkId1="withdrawquery-acc2table1-check1"
            checkId2="withdrawquery-acc2table1-check2"
          />
          <TabulatorTable
            :tableId="slot1Table3Id"
            :columns="slot1Table3Columns"
            :tableData="slot1Table3Data"
            checkId1="withdrawquery-acc2table3-check1"
            checkId2="withdrawquery-acc2table3-check2"
          />
        </Accordion>
      </template>
      <template v-slot:2>
        <Accordion id="acc3" title="約定轉換交易">
          <TabulatorTable
            :tableId="slot2Table4Id"
            :columns="slot2Table4Columns"
            :tableData="slot2Table4Data"
            checkId1="withdrawquery-acc3table1-check1"
            checkId2="withdrawquery-acc3table1-check2"
            @transmit-tabulator-data="tableHandlerSlot2"
          />
        </Accordion>
        <Accordion id="acc4" title="約定轉換明細">
          <TabulatorTable
            :tableId="slot2Table5Id"
            :columns="slot2Table5Columns"
            :tableData="slot2Table5Data"
            checkId1="withdrawquery-acc4table1-check1"
            checkId2="withdrawquery-acc4table1-check2"
            @transmit-tabulator-data="tableHandlerSlot2Table2"
          />
          <TwoTables>
            <template v-slot:left>
              <Topline title="約定轉換轉出" />
              <TabulatorTable
                :tableId="slotLeftTable6Id"
                :columns="slotLeftTable6Columns"
                :tableData="slotLeftTable6Data"
                checkId1="withdrawquery-slot1table6-check1"
                checkId2="withdrawquery-slot1table6-check2"
              />
            </template>
            <template v-slot:right>
              <Topline title="約定轉換轉入" />
              <TabulatorTable
                :tableId="slotRightTable7Id"
                :columns="slotRightTable7Columns"
                :tableData="slotRightTable7Data"
                checkId1="withdrawquery-slot1table7-check1"
                checkId2="withdrawquery-slot1table7-check2"
              />
            </template>
          </TwoTables>
        </Accordion>
      </template>
    </Tabs>
  </div>
</template>
<script>
import Layout from "./Layout.vue";
import Button from "../components/Button.vue";
import Message from "../components/Message.vue";
import callApi from "../helperFunctions/callApi";
export default {
  name: "WithdrawalQuery",
  // beforeRouteEnter(to, from, next) {
  //   next((vm) => {
  //     vm.$store.commit("setHistory", {
  //       name: from.name,
  //       path: from.path,
  //       id: uuid(),
  //     });
  //   });
  // },
  mounted() {
    // console.log(this.insPolicyNumber);
    this.watchApiCall();
    this.watchApiCall2();
  },
  computed: {
    insPolicyNumber() {
      return this.$store.state.insPolicyNumber;
    },
  },
  watch: {
    insPolicyNumber(newVal, oldVal) {
      //call api to set table1Data
      this.watchApiCall();
      this.watchApiCall2();
      // localStorage.policy_no = newVal;
      console.log(oldVal);
      console.log(`newVal: ${newVal} \n oldVal: ${oldVal}`);
    },
    immediate: true,
  },
  methods: {
    tableHandlerSlot2Table2(rowValue) {
      this.rowValueBox2 = rowValue;
      console.log(rowValue);
      this.callApiLeftTable();
      this.callApiRightTable();
    },
    tableHandlerSlot2(rowValue) {
      this.rowValueBox = rowValue;
      localStorage.chah_seq = rowValue.r_chah_seq;
      localStorage.chlh_seq = rowValue.r_chlh_seq;
      this.callSlot2TableApi();
    },
    tableHandler(rowValue) {
      this.rowValueBox = rowValue;
      localStorage.chah_seq = rowValue.r_chah_seq;
      this.callTable1Api();
      this.callTable2Api();
    },
    async watchApiCall() {
      console.log("callApi");
      //table2 init
      this.slot1Table1Data = [];
      const domain = this.$store.state.domain;
      const url = domain + "/investAppoint/executeWithdrawInnerMission01";
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
      this.slot1Table1Data = data.data;
    },
    async watchApiCall2() {
      console.log("callApi");
      //table2 init
      this.slot2Table4Data = [];
      const domain = this.$store.state.domain;

      const url = domain + "/investAppoint/executeSwitchInnerMission01";
      // const url =
      //   "http://localhost:10203/investAppoint/executeSwitchInnerMission01";
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

      this.slot2Table4Data = data.data;
    },
    async callTable1Api() {
      console.log("callApi");
      //table2 init
      const domain = this.$store.state.domain;
      const url = domain + "/investAppoint/executeWithdrawInnerMission02";
      // const token = this.$store.state.token;
      const params = {
        chah_seq: this.rowValueBox.r_chah_seq,
      };
      const headers = {
        "Content-Type": "application/x-www-form-urlencoded",
        //Authorization: "bearer " + token,
      };
      const { res } = callApi();
      const { data } = await res(url, params, headers);
      this.slot1Table2Data = data.data;
    },
    async callTable2Api() {
      console.log("callApi");
      //table2 init
      // const url = domain + "/RIAF001Api/RIAF001Query";
      const domain = this.$store.state.domain;
      const url = domain + "/investAppoint/executeWithdrawInnerMission03";
      // const token = this.$store.state.token;
      const params = {
        chah_seq: this.rowValueBox.r_chah_seq,
        chlh_seq: this.rowValueBox.r_chlh_seq,
      };
      const headers = {
        "Content-Type": "application/x-www-form-urlencoded",
        //Authorization: "bearer " + token,
      };
      const { res } = callApi();
      const { data, status } = await res(url, params, headers);
      console.log(data);
      this.slot1Table3Data = data.data;
    },
    async callSlot2TableApi() {
      console.log("callApi");
      //table2 init
      this.slot2Table5Data = [];
      const domain = this.$store.state.domain;
      const url = domain + "/investAppoint/executeSwitchInnerMission02";
      // const url = domain + "/RIAF001Api/RIAF001Query";

      // const token = this.$store.state.token;
      const params = {
        chah_seq: this.rowValueBox.r_chah_seq,
      };
      const headers = {
        "Content-Type": "application/x-www-form-urlencoded",
        //Authorization: "bearer " + token,
      };
      const { res } = callApi();
      const { data, status } = await res(url, params, headers);
      console.log(data);
      this.slot2Table5Data = data.data;
    },
    async callApiLeftTable() {
      console.log("callApi");
      //table2 init

      const domain = this.$store.state.domain;

      const url = domain + "/investAppoint/executeSwitchInnerSellMission03";
      // const token = this.$store.state.token;
      const params = {
        chah_seq: localStorage.getItem("chah_seq"),
        chlh_seq: localStorage.getItem("chlh_seq"),
      };
      const headers = {
        "Content-Type": "application/x-www-form-urlencoded",
        //Authorization: "bearer " + token,
      };
      const { res } = callApi();
      const { data, status } = await res(url, params, headers);
      console.log(data);
      this.slotLeftTable6Data = data.data;
    },
    async callApiRightTable() {
      console.log("callApi");
      //table2 init

      const domain = this.$store.state.domain;

      const url = domain + "/investAppoint/executeSwitchInnerBuyMission03";
      // const token = this.$store.state.token;
      const params = {
        chah_seq: localStorage.getItem("chah_seq"),
        chlh_seq: localStorage.getItem("chlh_seq"),
      };
      const headers = {
        "Content-Type": "application/x-www-form-urlencoded",
        //Authorization: "bearer " + token,
      };
      const { res } = callApi();
      const { data, status } = await res(url, params, headers);
      console.log(data);
      this.slotRightTable7Data = data.data;
    },
  },

  data() {
    return {
      rowValueBox: null,
      rowValueBox2: null,
      sectiontitle: "約定轉換/提領查詢",
      tabLen: 2,
      titles: ["約定提領", "約定轉換"],
      slot1Table1Id: "homeSlot1Table1",
      slot1Table1Columns: [
        { title: "約定交易日", field: "r_auto_tr_date" },
        { title: "實際作業日", field: "r_process_date" },
        { title: "受理號碼", field: "r_receive_no" },
        { title: "應贖回金額", field: "r_invs_amt" },
        { title: "實際贖回金額", field: "r_invs_real_amt" },
        { title: "交易編號", field: "r_invs_ad_no" },
        { title: "狀態", field: "r_ivchg_sts_code" },
        { title: "事由", field: "r_resp_code" },
      ],
      slot1Table1Data: [],
      slot1Table2Id: "homeSlot1Table2",
      slot1Table2Columns: [
        { title: "約定受理號碼", field: "r_receive_no" },
        { title: "指定日期(起日)", field: "r_bgn_date" },
        { title: "頻率", field: "r_chah_freq" },
        { title: "下次執行日", field: "r_auto_tr_date" },
      ],
      slot1Table2Data: [],
      slot1Table3Id: "homeSlot1Table3",
      slot1Table3Columns: [
        { title: "約定提領基金", field: "r_invs_code" },
        { title: "約定提領基金名稱", field: "r_invs_title" },
        { title: "提領方式", field: "r_chah_sell_type" },
        { title: "約定提領金額", field: "r_invs_ad_amt" },
      ],
      slot1Table3Data: [],
      slot2Table4Id: "homeSlot1Table4",
      slot2Table4Columns: [
        { title: "約定交易日", field: "r_auto_tr_date" },
        { title: "實際作業日", field: "r_process_date" },
        { title: "受理號碼", field: "r_receive_no" },
        { title: "應贖回金額", field: "r_invs_amt" },
        { title: "實際贖回金額", field: "r_invs_real_amt" },
        { title: "交易編號", field: "r_invs_ad_no" },
        { title: "狀態", field: "r_ivchg_sts_code" },
        { title: "事由", field: "r_resp_code" },
      ],
      slot2Table4Data: [],
      slot2Table5Id: "homeSlot1Table5",
      slot2Table5Columns: [
        { title: "	約定受理號碼", field: "r_receive_no" },
        { title: "指定日期(起日)", field: "r_bgn_date" },
        { title: "頻率", field: "r_chah_freq" },
        { title: "下次執行日", field: "r_auto_tr_date" },
      ],
      slot2Table5Data: [],
      slotLeftTable6Id: "homeSlot1Table6",
      slotLeftTable6Columns: [
        { title: "約定轉出基金", field: "r_invs_code" },
        { title: "約定轉出基金名稱", field: "r_invs_title" },
        { title: "轉出方式", field: "r_chah_sell_type" },
        { title: "約定轉出金額", field: "r_invs_ad_amt" },
      ],
      slotLeftTable6Data: [],
      slotRightTable7Id: "homeSlot1Table7",
      slotRightTable7Columns: [
        { title: "	約定買入基金", field: "r_invs_code" },
        { title: "	約定買入基金名稱", field: "r_invs_title" },
        { title: "	買入分配比例", field: "r_invs_ad_perc" },
      ],
      slotRightTable7Data: [],
    };
  },
};
</script>
