//60~75--新契約查詢
<template>
  <div>
    <SectionTitle :title="sectiontitle" />
    <Tabs :titles="titles" :tabLen="tabLen" @tab-call-api="handleTabCallApi">
      <template v-slot:1>
        <Accordion id="acc1" title="要保人資料">
          <Table :colNum="4" :table="acc1_table" />
        </Accordion>
        <Accordion id="acc2" title="被保險人資料">
          <TabulatorTable
            :tableId="slot1Table1Id"
            :columns="slot1Table1Columns"
            :tableData="slot1Table1Data"
            checkId1="home-slot1table1-check1"
            checkId2="home-slot1table1-check2"
          />
        </Accordion>
        <Accordion id="acc3" title="保障內容">
          <TabulatorTable
            :tableId="slot1Table2Id"
            :columns="slot1Table2Columns"
            :tableData="slot1Table2Data"
            checkId1="home-slot1table1-check1"
            checkId2="home-slot1table1-check2"
          />
        </Accordion>
        <Tabs2 :titles="titles2" @get-tab-name="handleTabClick">
          <template v-slot:1>
            <TabulatorTable
              :tableId="slot1Tabs2TableId"
              :columns="slot1Tabs2TableColumns"
              :tableData="slot1Tabs2TableData"
              checkId1="home-slot1table1-check1"
              checkId2="home-slot1table1-check2"
            />
          </template>
          <template v-slot:2>
            <TabulatorTable
              :tableId="slot2Tabs2TableId"
              :columns="slot2Tabs2TableColumns"
              :tableData="slot2Tabs2TableData"
              checkId1="home-slot1table1-check1"
              checkId2="home-slot1table1-check2"
            />
          </template>
          <template v-slot:3>
            <TabulatorTable
              :tableId="slot3Tabs2TableId"
              :columns="slot3Tabs2TableColumns"
              :tableData="slot3Tabs2TableData"
              checkId1="home-slot1table1-check1"
              checkId2="home-slot1table1-check2"
            />
          </template>
          <template v-slot:4>
            <Tags :tags="tags" />
            <TabulatorTable
              :tableId="slot4Tabs2TableId"
              :columns="slot4Tabs2TableColumns"
              :tableData="slot4Tabs2TableData"
              checkId1="home-slot1table1-check1"
              checkId2="home-slot1table1-check2"
              @transmit-tabulator-data="handleTabulatorData"
            />
          </template>
          <template v-slot:5>
            <TabulatorTable
              :tableId="slot5Tabs2TableId"
              :columns="slot5Tabs2TableColumns"
              :tableData="slot5Tabs2TableData"
              checkId1="home-slot1table1-check1"
              checkId2="home-slot1table1-check2"
            />
          </template>
          <template v-slot:6>
            <TabulatorTable
              :tableId="slot6Tabs2TableId"
              :columns="slot6Tabs2TableColumns"
              :tableData="slot6Tabs2TableData"
              checkId1="home-slot1table1-check1"
              checkId2="home-slot1table1-check2"
            />
          </template>
          <template v-slot:7>
            <TabulatorTable
              :tableId="slot7Tabs2TableId"
              :columns="slot7Tabs2TableColumns"
              :tableData="slot7Tabs2TableData"
              checkId1="home-slot1table1-check1"
              checkId2="home-slot1table1-check2"
            />
          </template>
          <template v-slot:8>
            <TabulatorTable
              :tableId="slot8Tabs2TableId"
              :columns="slot8Tabs2TableColumns"
              :tableData="slot8Tabs2TableData"
              checkId1="home-slot1table1-check1"
              checkId2="home-slot1table1-check2"
            />
          </template>
          <template v-slot:9>
            <TabulatorTable
              :tableId="slot9Tabs2TableId"
              :columns="slot9Tabs2TableColumns"
              :tableData="slot9Tabs2TableData"
              checkId1="home-slot1table1-check1"
              checkId2="home-slot1table1-check2"
            />
          </template>
          <template v-slot:10>
            <TabulatorTable
              :tableId="slot10Tabs2TableId"
              :columns="slot10Tabs2TableColumns"
              :tableData="slot10Tabs2TableData"
              checkId1="home-slot1table1-check1"
              checkId2="home-slot1table1-check2"
            />
          </template>
          <template v-slot:11>
            <TabulatorTable
              :tableId="slot11Tabs2TableId"
              :columns="slot11Tabs2TableColumns"
              :tableData="slot11Tabs2TableData"
              checkId1="home-slot1table1-check1"
              checkId2="home-slot1table1-check2"
            />
            <TabulatorTable
              :tableId="slot11Tabs2Table2Id"
              :columns="slot11Tabs2Table2Columns"
              :tableData="slot11Tabs2TableData"
              checkId1="home-slot1table1-check1"
              checkId2="home-slot1table1-check2"
            />
            <TabulatorTable
              :tableId="slot11Tabs2Table3Id"
              :columns="slot11Tabs2Table3Columns"
              :tableData="slot11Tabs2Table3Data"
              checkId1="home-slot1table1-check1"
              checkId2="home-slot1table1-check2"
            />
          </template>
        </Tabs2>
      </template>
      <template v-slot:2>
        <Table :colNum="2" :table="slot2_table" />
        <TabulatorTable
          :tableId="slot2Table1Id"
          :columns="slot2Table1Columns"
          :tableData="slot2Table1Data"
          checkId1="home-slot1table1-check1"
          checkId2="home-slot1table1-check2"
        />
      </template>
      <template v-slot:3>
        <TabulatorTable
          :tableId="slot3Table1Id"
          :columns="slot3Table1Columns"
          :tableData="slot3Table1Data"
          checkId1="home-slot1table1-check1"
          checkId2="home-slot1table1-check2"
        />
      </template>
      <template v-slot:4>
        <Table :colNum="2" :table="slot4_table" />
      </template>
      <template v-slot:5>
        <Table :colNum="1" :table="slot5_table" />
      </template>
      <template v-slot:6>
        <Accordion id="acc4" title="基本資料">
          <Table :colNum="3" :table="slot6_table" />
        </Accordion>
        <Accordion id="acc5" title="契撤相關索引資料">
          <TabulatorTable
            :tableId="slot6Table1Id"
            :columns="slot6Table1Columns"
            :tableData="slot6Table1Data"
            checkId1="home-slot1table1-check1"
            checkId2="home-slot1table1-check2"
          />
        </Accordion>
        <Accordion id="acc6" title="照會資料">
          <TabulatorTable
            :tableId="slot6Table2Id"
            :columns="slot6Table2Columns"
            :tableData="slot6Table2Data"
            checkId1="newcontractquery-acc6table2-check1"
            checkId2="newcontractquery-acc6table2-check2"
          />
          <TabulatorTable
            :tableId="slot6Table3Id"
            :columns="slot6Table3Columns"
            :tableData="slot6Table3Data"
            checkId1="newcontractquery-acc6table3-check1"
            checkId2="newcontractquery-acc6table3-check2"
          />
        </Accordion>
      </template>
    </Tabs>
  </div>
</template>
<script>
import callApi from "../helperFunctions/callApi";
import { populateTable } from "../helperFunctions/commonVue.js";
export default {
  name: "NewContractQuery",
  mounted() {
    this.tabsCallApi();
    this.topTabsCallApi();
  },
  computed: {
    insPolicyNumber() {
      return this.$store.state.insPolicyNumber;
    },
  },
  watch: {
    insPolicyNumber(newVal, oldVal) {
      //call api to set table1Data
      console.log(`newVal: ${newVal} \n oldVal: ${oldVal}`);
      this.topTabsCallApi();
      this.tabsCallApi();
    },
    immediate: true,
  },
  methods: {
    handleTabCallApi(tabName){//上方tabs
      this.currentTopName=tabName;
      this.topTabsCallApi();
    },
    topTabsCallApi(){
       let tabName = this.currentTopName;
       switch(tabName){
        case "基本資料":
          this.basicDataApi();
        break;
       }  
    },
    handleTabClick(tabName) {
      this.currentName = tabName;
      this.tabsCallApi(); //下方tab2
    },
    tabsCallApi() {
      let tabName = this.currentName;
      switch (tabName) {
        case "批註":
          this.firstTab2Api();
          break;
        case "弱體代碼":
          this.secondTab2Api();
          break;
        case "體檢資料":
          this.thirdTab2Api();
          break;
          case "優體保單":
          this.forthTab2Api();
          break;
          case "核保訊息":
          this.tabTenApi();
          break;
          case "公會索引":
          this.tabFifthApi();
          break;
      }
    },
    async firstTab2Api() {
      //批註
      const domain = this.$store.state.domain;
      const url = domain + "/newDetail/executeMission04";
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
      this.slot1Tabs2TableData = data.data;
    },
    async tabTenApi() {
      //核保訊息
      const domain = this.$store.state.domain;
      const url = domain + "/newDetail/executeMission13";
      // const token = this.$store.state.token;
      const params = {
        policy_no: this.insPolicyNumber,
      };
      const headers = {
        "Content-Type": "application/x-www-form-urlencoded",
        //Authorization: "bearer " + token,
      };
      const { res } = callApi();
      const { data, status } = await res(url, params, headers);
      this.slot10Tabs2TableData = data.data;
    },
    async secondTab2Api() {
      //弱體代碼
      this.slot2Tabs2TableData = [];
      const domain = this.$store.state.domain;
      const url = domain + "/newDetail/executeMission05";
      // const token = this.$store.state.token;
      const params = {
        policy_no: this.insPolicyNumber,
      };
      const headers = {
        "Content-Type": "application/x-www-form-urlencoded",
        //Authorization: "bearer " + token,
      };
      const { res } = callApi();
      const { data, status } = await res(url, params, headers);
      this.slot2Tabs2TableData = data.data;
    },
    async thirdTab2Api() {
      this.slot3Tabs2TableData=[];
      const domain = this.$store.state.domain;
      const url = domain + "/newDetail/executeMission06";
      // const token = this.$store.state.token;
      const params = {
        policy_no: this.insPolicyNumber,
      };
      const headers = {
        "Content-Type": "application/x-www-form-urlencoded",
        //Authorization: "bearer " + token,
      };
      const { res } = callApi();
      const { data, status } = await res(url, params, headers);
      this.slot3Tabs2TableData=data.data;
    },
    async forthTab2Api(){//優體保單
      this.slot4Tabs2TableData=[];
      const domain = this.$store.state.domain;
      const url = domain + "/newDetail/executeMission07";
      // const token = this.$store.state.token;
      const params = {
        policy_no: this.insPolicyNumber,
      };
      const headers = {
        "Content-Type": "application/x-www-form-urlencoded",
        //Authorization: "bearer " + token,
      };
      const { res } = callApi();
      const { data, status } = await res(url, params, headers);
      this.slot4Tabs2TableData=data.data;
    },
    handleTabulatorData(rowValue){//優體保單tabulator
    for(let i=0;i<this.tags.length;i++){
        if(this.tags[i].title === "身高")this.tags[i].detail=rowValue.height;
        else if(this.tags[i].title === "體重")this.tags[i].detail=rowValue.weight;
        else if(this.tags[i].title === "BMI")this.tags[i].detail=rowValue.bmi;
        else if(this.tags[i].title === "CHO/HDL ratio")this.tags[i].detail=rowValue.cho_hdl_ratio;
        else if(this.tags[i].title === "優體壽險等級")this.tags[i].detail=rowValue.preferred_Exam_Ind;
      }
    },
     basicDataApi(){//基本資料
      this.policyDataApi();//要保人資料
      this.assuredDataApi();//被保人資料 
      this.garanteedDataApi();//保障內容
    },
    async policyDataApi(){
      const domain = this.$store.state.domain;
      const url = domain + "/newDetail/executeMission01";
      // const token = this.$store.state.token;
      const params = {
        policy_no: this.insPolicyNumber,
      };
      const headers = {
        "Content-Type": "application/x-www-form-urlencoded",
        //Authorization: "bearer " + token,
      };
      const { res } = callApi();
      const { data, status } = await res(url, params, headers);
      this.acc1_table = populateTable(data.data[0], this.acc1_table);
      this.acc1_table[4].value=data.data[0].o1_name +"/"+ data.data[0].o1_sign_ptn_card;
      this.acc1_table[12].value=data.data[0].home_addr_ind +"/"+ data.data[0].home_addr;
      this.acc1_table[16].value=data.data[0].mail_addr_ind +"/"+ data.data[0].mail_addr;
    },
    async assuredDataApi(){//被保人資料
    this.slot1Table1Data=[];
      const domain = this.$store.state.domain;
      const url = domain + "/newDetail/executeMission02";
      // const token = this.$store.state.token;
      const params = {
        policy_no: this.insPolicyNumber,
      };
      const headers = {
        "Content-Type": "application/x-www-form-urlencoded",
        //Authorization: "bearer " + token,
      };
      const { res } = callApi();
      const { data, status } = await res(url, params, headers);
      this.slot1Table1Data=data.data;
    },
     async garanteedDataApi(){//保障內容
      this.slot1Table2Data=[];
      const domain = this.$store.state.domain;
      const url = domain + "/newDetail/executeMission03";
      // const token = this.$store.state.token;
      const params = {
        policy_no: this.insPolicyNumber,
      };
      const headers = {
        "Content-Type": "application/x-www-form-urlencoded",
        //Authorization: "bearer " + token,
      };
      const { res } = callApi();
      const { data, status } = await res(url, params, headers);
      console.log(data.data)
      this.slot1Table2Data=data.data;
    },
    async tabFifthApi(){//公會索引
      this.slot5Tabs2TableData=[];
      const domain = this.$store.state.domain;
      const url = domain + "/newDetail/executeMission08";
      // const token = this.$store.state.token;
      const params = {
        policy_no: this.insPolicyNumber,
      };
      const headers = {
        "Content-Type": "application/x-www-form-urlencoded",
        //Authorization: "bearer " + token,
      };
      const { res } = callApi();
      const { data, status } = await res(url, params, headers);
      this.slot5Tabs2TableData=data.data;
    },

  },
  data() {
    return {
      currentTopName:"基本資料",
      currentName: "批註",
      tags: [
        { title: "身高", detail: "" },
        { title: "體重", detail: "" },
        { title: "BMI", detail: "" },
        { title: "CHO/HDL ratio", detail: "" },
        { title: "優體壽險等級", detail: "" },
      ],
      sectiontitle: "新契約查詢",
      tabLen: 6,
      titles: [
        "基本資料",
        "照會項目查詢",
        "體檢照會查詢",
        "簽收單查詢",
        "未承保原因",
        "契約撤銷查詢",
      ],
      titles2: [
        "批註",
        "弱體代碼",
        "體檢資料",
        "優體保單",
        "公會索引",
        "新公會索引",
        "理賠紀錄",
        "契便受理",
        "告知事項",
        "核保訊息",
        "列管地址",
      ],
      acc1_table: [
        { key: "ID", keyId: "o1_id", value: "" },
        { key: "保單號碼", keyId: "policy_no", value: "" },
        { key: "要保日", keyId: "app_apply_date", value: "" },
        { key: "住所電話", keyId: "home_tel", value: "" },
        { key: "姓名/簽樣卡", keyId: 5, value: "" },
        { key: "狀態", keyId: "po_sts_code", value: "" },
        { key: "生效日", keyId: "po_issue_date", value: "" },
        { key: "收費電話", keyId: "mail_tel", value: "" },
        { key: "出生日期", keyId:"o1_birth", value: "" },
        { key: "繳法/每期保費", keyId: "modx", value: "" },
        { key: "核定日", keyId: "uw_write_date", value: "" },
        { key: "行動電話", keyId: "mobile_phone", value: "" },
        { key: "序號/住所", keyId: "", value: "" },
        { key: "收費方式", keyId: "method", value: "" },
        { key: "承保日", keyId: "in_force_date", value: "" },
        { key: "e-mail", keyId: "e_mail", value: "" },
        { key: "序號/收費", keyId: 17, value: "" },
        { key: "定期繳費約定", keyId: "fy_billing_ind", value: "" },
        { key: "製單日", keyId: "image_prn_date", value: "" },
        { key: "職業代碼/職級", keyId: "o1_occu", value: "" },
      ],
      slot2_table: [
        { key: "要保日期", keyId: 1, value: "保單號碼_設計文字" },
        { key: "核保人員", keyId: 2, value: "應繳日期_設計文字" },
        { key: "照會對象", keyId: 3, value: "帳單日(週期)_設計文字" },
        { key: "照會應回覆日期", keyId: 4, value: "要保人_設計文字" },
        { key: "", keyId: 5, value: "" },
        { key: "列印取消通知書日期", keyId: 6, value: "信用卡有效日_設計文字" },
      ],
      slot1Table1Id: "homeSlot1Table1",
      slot1Table1Columns: [
        { title: "關係", field: "client_ident" },
        { title: "ID", field: "i1_id" },
        { title: "姓名", field: "i1_name" },
        { title: "出生日期", field: "i1_birth" },
        { title: "職業代碼/職級", field: "i1_occu" },
        { title: "身高", field: "height" },
        { title: "體重", field: "weight" },
        { title: "簽樣卡", field: "sign_ptn_card" },
      ],
      slot1Table1Data: [],
      slot1Table2Id: "homeSlot1Table2",
      slot1Table2Columns: [
        { title: "關係", field: "client_ident" },
        { title: "險種", field: "plan_code" },
        { title: "版數", field: "rate_scale" },
        { title: "社保", field: "rate_insu" },
        { title: "保額", field: "unit_value" },
        { title: "狀態", field: "co_sts_desc" },
        { title: "職級", field: "rate_occu" },
        { title: "保險年齡", field: "rate_age" },
        { title: "性別", field: "rate_sex" },
        { title: "年度", field: "dur" },
        { title: "生效日期", field: "co_issue_date" },
        { title: "每期保費", field: "co_mode_prem" },
        { title: "變更生效日", field: "co_chg_date" },
        { title: "體位", field: "rate_medi" },
        { title: "定額加費", field: "flat_rating_amt" },
        { title: "比例加費", field: "multi_rating_1" },
        { title: "加費年期", field: "flat_rating_year" },
      ],
      slot1Table2Data: [],
      slot1Tabs2TableId: "homeSlot1Tabs2Table",
      slot1Tabs2TableColumns: [
        { title: "關係", field: "r_client_ident" },
        { title: "批註日期", field: "r_commentsb" },
        { title: "取消日期", field: "r_cancel_date" },
        { title: "類別", field: "r_cmnt_class" },
        { title: "批註內容", field: "r_comments" },
        { title: "批註年限", field: "r_cmnt_year" },
      ],
      slot1Tabs2TableData: [],
      slot2Tabs2TableId: "homeSlot2Tabs2Table",
      slot2Tabs2TableColumns: [
        { title: "被保人", field: "m_client_id" },
        { title: "受理日期", field: "m_receive_date" },
        { title: "受理號碼", field: "m_receive_no" },
        { title: "弱體", field: "m_statement" },
        { title: "	保單號碼", field: "m_policy_no" },
      ],
      slot2Tabs2TableData: [],
      slot3Tabs2TableId: "homeSlot3Tabs2Table",
      slot3Tabs2TableColumns: [
        { title: "被保人ID", field: "insured_id" },
        { title: "體檢項目", field: "",
           formatter: function(cell) {
            let data = cell.getRow().getData();
            let dataFormmater = data.exam_item_code + data.exam_item_desc;
            return dataFormmater;
          },
         },
        { title: "體檢日期", field: "exam_date" },
        {
          title: "體檢結果",
          field: "",
          formatter: function(cell) {
            let data = cell.getRow().getData();
            let dataFormmater = data.exam_result + data.exam_result_ind;
            return dataFormmater;
          },
        },
        { title: "體檢醫院", field: "hospital_name" },
        { title: "保單號碼", field: "policy_no" },
      ],
      slot3Tabs2TableData: [],
      slot4Tabs2TableId: "homeSlot4Tabs2Table",
      slot4Tabs2TableColumns: [
        { title: "體檢項目", field: "exam_item_code_desc" },
        { title: "檢驗值", field: "exam_value" },
        { title: "正常(Y/N)", field: "exam_value_rank" },
        { title: "N/P", field: "exam_respond_value" },
      ],
      slot4Tabs2TableData: [],

      slot5Tabs2TableId: "homeSlot5Tabs2Table",
      slot5Tabs2TableColumns: [
        { title: "類別", field: "nbui_industry_desc" },
        { title: "被保人ID", field: "client_id" },
        { title: "姓名", field: "nbui_name" },
        { title: "保額", field: "face_amt" },
        { title: "通報表別", field: "nbui_type_desc" },
        { title: "公司", field: "nbui_company_name" },
        { title: "生效日期", field: "effect_date" },
        { title: "保單號碼", field: "nbui_pno" },
        { title: "異動日期", field: "process_date" },
        { title: "滿期日期", field: "expired_date" },
        //欄位不確定
        { title: "被...", field: "r_clnt_type_desc" },
        { title: "要保日期", field: "app_apply_date" },
      ],
      slot5Tabs2TableData: [],

      slot6Tabs2TableId: "homeSlot6Tabs2Table",
      slot6Tabs2TableColumns: [
        { title: "被保人ID", field: "a" },
        { title: "業別", field: "b" },
        { title: "分類", field: "c" },
        { title: "險種類別", field: "d" },
        { title: "險種", field: "e" },
        { title: "給付項目", field: "f" },
        { title: "保額", field: "g" },
        { title: "公司", field: "h" },
      ],
      slot6Tabs2TableData: [],

      slot7Tabs2TableId: "homeSlot7Tabs2Table",
      slot7Tabs2TableColumns: [
        { title: "事故人姓名", field: "a" },
        { title: "序號", field: "b" },
        { title: "年度", field: "c" },
        { title: "理賠型態", field: "d" },
        { title: "事故型態", field: "e" },
        { title: "事故原因", field: "f" },
        { title: "結案日期", field: "g" },
        { title: "結案型態", field: "h" },
      ],
      slot7Tabs2TableData: [],

      slot8Tabs2TableId: "homeSlot8Tabs2Table",
      slot8Tabs2TableColumns: [
        { title: "保單號碼", field: "a" },
        { title: "受理號碼", field: "b" },
        { title: "受理日期", field: "c" },
        { title: "受理狀況", field: "d" },
      ],
      slot8Tabs2TableData: [],
      slot9Tabs2TableId: "homeSlot9Tabs2Table",
      slot9Tabs2TableColumns: [
        { title: "被保人", field: "a" },
        { title: "受理日期", field: "b" },
        { title: "保單號碼", field: "c" },
        { title: "告知", field: "d" },
      ],
      slot9Tabs2TableData: [],
      slot10Tabs2TableId: "homeSlot10Tabs2Table",
      slot10Tabs2TableColumns: [
        { title: "	訊息代碼", field: "nb_err_code" },
        { title: "核保訊息", field: "nb_err_desc" },
      ],
      slot10Tabs2TableData: [],

      slot11Tabs2TableId: "homeSlot11Tabs2Table",
      slot11Tabs2TableColumns: [
        { title: "地址種類", field: "a" },
        { title: "檢核分類代碼", field: "b" },
        { title: "地址", field: "c" },
      ],
      slot11Tabs2TableData: [],
      slot11Tabs2Table2Id: "homeSlot11Tabs2Table2",
      slot11Tabs2Table2Columns: [
        { title: "分類代碼", field: "a" },
        { title: "識別碼", field: "b" },
        { title: "地址指示", field: "c" },
        { title: "姓名", field: "d" },
        { title: "保單號碼", field: "e" },
      ],
      slot11Tabs2Table2Data: [],
      slot11Tabs2Table3Id: "homeSlot11Tabs2Table3",
      slot11Tabs2Table3Columns: [
        { title: "關係人", field: "a" },
        { title: "業務員代碼", field: "b" },
        { title: "姓名", field: "c" },
        { title: "通訊處", field: "d" },
        { title: "職級", field: "e" },
      ],
      slot11Tabs2Table3Data: [],

      slot2Table1Id: "homeSlot2Table",
      slot2Table1Columns: [
        { title: "照會日期", field: "a" },
        { title: "照會碼", field: "b" },
        { title: "照會內容", field: "c" },
        { title: "回覆日期", field: "d" },
      ],
      slot2Table1Data: [],
      slot3Table1Id: "homeSlot3Table",
      slot3Table1Columns: [
        { title: "關係", field: "a" },
        { title: "體檢項目", field: "b" },
        { title: "類別", field: "c" },
      ],
      slot3Table1Data: [],
      slot4_table: [
        { key: "保單狀態", keyId: 1, value: "保單號碼_設計文字" },
        { key: "簽收日期", keyId: 2, value: "應繳日期_設計文字" },
        { key: "承保日期", keyId: 3, value: "帳單日(週期)_設計文字" },
        { key: "簽收輸入日期", keyId: 4, value: "要保人_設計文字" },
        { key: "製單日期", keyId: 5, value: "通知單到期日_設計文字" },
        { key: "簽收輸入人員", keyId: 6, value: "信用卡有效日_設計文字" },
        { key: "郵寄日期", keyId: 7, value: "被保險人_設計文字" },
        { key: "回執日期", keyId: 8, value: "停效日期_設計文字" },
        { key: "催繳日期", keyId: 9, value: "授權人電話_設計文字" },
        { key: "回執輸入日期", keyId: 10, value: "保單狀態_設計文字" },
        { key: "扣款紀錄", keyId: 11, value: "帳號狀態_設計文字" },
        { key: "回執輸入人員", keyId: 12, value: "授權人地址_設計文字" },
        { key: "扣款日期", keyId: 13, value: "保費繳法_設計文字" },
        { key: "保單重置日期", keyId: 14, value: "授權書狀態_設計文字" },
        { key: "", keyId: 15, value: "" },
        { key: "系統抽查日期", keyId: 16, value: "收費方式_設計文字" },
      ],
      slot5_table: [
        { key: "未承保原因", keyId: 1, value: "保單號碼_設計文字" },
        { key: "取消說明", keyId: 2, value: "應繳日期_設計文字" },
      ],
      slot6_table: [
        { key: "保單號碼", keyId: 1, value: "保單號碼_設計文字" },
        { key: "承保日期", keyId: 2, value: "應繳日期_設計文字" },
        { key: "結案日期", keyId: 3, value: "帳單日(週期)_設計文字" },
        { key: "要保人", keyId: 4, value: "要保人_設計文字" },
        { key: "製單日期", keyId: 5, value: "通知單到期日_設計文字" },
        { key: "契撤狀態", keyId: 6, value: "信用卡有效日_設計文字" },
        { key: "被保人", keyId: 7, value: "被保險人_設計文字" },
        { key: "契撤日期", keyId: 8, value: "停效日期_設計文字" },
        { key: "退件原因", keyId: 9, value: "授權人電話_設計文字" },
        { key: "保單狀態", keyId: 10, value: "保單狀態_設計文字" },
        { key: "受理日期", keyId: 11, value: "帳號狀態_設計文字" },
        { key: "保費轉入之保單號碼", keyId: 12, value: "授權人地址_設計文字" },
      ],
      slot6Table1Id: "homeSlot6Table1",
      slot6Table1Columns: [{ title: "契撤相關索引資料", field: "a" }],
      slot6Table1Data: [],
      slot6Table2Id: "homeSlot6Table2",
      slot6Table2Columns: [
        { title: "照會日期", field: "a" },
        { title: "照會應回覆日期", field: "b" },
        { title: "	營業處", field: "c" },
        { title: "業務員", field: "d" },
      ],
      slot6Table2Data: [],

      slot6Table3Id: "homeSlot6Table3",
      slot6Table3Columns: [
        { title: "回覆", field: "a" },
        { title: "回覆日期", field: "b" },
        { title: "照會碼", field: "c" },
        { title: "照會內容", field: "d" },
      ],
      slot6Table3Data: [],
    };
  },
};
</script>
