<template> <!-- 04, 05, 06, 07, 08 保單明細-->
  <div>
    <SectionTitle :title="sectionTitle" />
    <Tabs :titles="titles" :tabLen="tabLen">
      <template v-slot:1>
        <Accordion id="acc1" title="保單基本資料">
          <Table :colNum="3" :table="table1Data" />
        </Accordion>
      </template>
      <template v-slot:2>
        <Accordion id="acc2_1" title="投資型商品詳細資料">待確認資料型態</Accordion>
        <Accordion id="acc2_2" title="投資標的內容分配">待確認資料型態</Accordion>
      </template>
      <template v-slot:3>
        <Accordion id="acc3" title="目標堆疊">待確認資料型態</Accordion>
      </template>
      <template v-slot:4>
        <Tags :tags="slot4Tags" />
        <TabulatorTable
          :tableId="tableSlot4Id"
          :columns="tableSlot4Columns"
          :tableData="tableSlot4Data"
          checkId1="insPolicyDetails-slot4-check1"
          checkId2="insPolicyDetails-slot4-check2"
        />
      </template>
      <template v-slot:5>
        <Accordion id="acc5" title="投資型附約保單">待確認資料型態</Accordion>
      </template>
    </Tabs>
  </div>
</template>

<script>
export default {
  name: "InsPolicyDetails",
  mounted(){
    console.log(this.insPolicyNumber)
    //TODO call api
    let newVal = this.insPolicyNumber;
    if (newVal){
      this.tableSlot4Data = [
        {id: newVal, a: "newVal", b: "newVal", c: "newVal", d: "newVal", e: "newVal", f: "newVal"},
        {id: newVal, a: "newVal", b: "newVal", c: "newVal", d: "newVal", e: "newVal", f: "newVal"},
        {id: newVal, a: "newVal", b: "newVal", c: "newVal", d: "newVal", e: "newVal", f: "newVal"},
        {id: newVal, a: "newVal", b: "newVal", c: "newVal", d: "newVal", e: "newVal", f: "newVal"},
        {id: newVal, a: "newVal", b: "newVal", c: "newVal", d: "newVal", e: "newVal", f: "newVal"}
      ]
    }
    
  },
  computed:{
    insPolicyNumber(){
      return this.$store.state.insPolicyNumber
    },
    //TODO DELETE
    table1Data(){
      let data = this.$store.state.singleInsPolicyData;
      //get call api 
      let id = data ? data.id : "no id";
      let originalTable1Data = this.table1;
      if (data){
        for (let i = 0; i < originalTable1Data.length; i++){
          originalTable1Data[i]["value"] = `${id}_newData`;
        }
      }
      return originalTable1Data;
    }
  },
  watch:{
    insPolicyNumber(newVal, oldVal){
      //call api to set table1Data
      this.watchApiCall(newVal);
      console.log(`newVal: ${newVal} \n oldVal: ${oldVal}`)
    }
  },
  methods: {
    async watchApiCall(newVal){
      console.log("callApi")
      this.tableSlot4Data = [
        {id: newVal, a: "newVal", b: "newVal", c: "newVal", d: "newVal", e: "newVal", f: "newVal"},
        {id: newVal, a: "newVal", b: "newVal", c: "newVal", d: "newVal", e: "newVal", f: "newVal"},
        {id: newVal, a: "newVal", b: "newVal", c: "newVal", d: "newVal", e: "newVal", f: "newVal"},
        {id: newVal, a: "newVal", b: "newVal", c: "newVal", d: "newVal", e: "newVal", f: "newVal"},
        {id: newVal, a: "newVal", b: "newVal", c: "newVal", d: "newVal", e: "newVal", f: "newVal"}
      ]
      // const domain = this.$store.state.domain;
      // const url = domain + "/RIAF001Api/RIAF001Query";
      //const url = "http://localhost:10201/querySystemControllerApi/cc183i"
      // const token = this.$store.state.token;
      // const params = {
      //   i_policy_no: "12345",
      // }
      //  const headers = {
      //    "Content-Type": "application/x-www-form-urlencoded",
      //   //Authorization: "bearer " + token,
      //  };
      //  try {
      //    const res = await axios.post(url, qs.stringify(params), {
      //      headers,
      //    });
      //    console.log(res);
      //  } catch (e) {
      //    console.log(e);
      // //   alert("無法查詢資料，請洽系統管理人員。");
      //  }
    }
  },
  data() {
    return {
      sectionTitle: "保單明細",
      tabLen: 5,
      titles: [
        "保單基本資料",
        "金額明細及分配比例",
        "目標堆疊查詢",
        "投資收益分配方式",
        "附約保單",
      ],
      tableSlot4Id: "tableSlot4Id",
      tableSlot4Columns: [
        { title: "序號", field: "id" },
        { title: "類型", field: "a" },
        { title: "標的代碼", field: "b" },
        { title: "投資標的", field: "c" },
        { title: "標的收益方式", field: "d" },
        { title: "標的代碼", field: "e" },
        { title: "收益指定標的", field: "f" },
      ],
      tableSlot4Data: [],
      table1: [
        { key: "保單號碼", keyId: 0, value: "" },
        { key: "序號/住所", keyId: 1, value: "" },
        { key: "要保人ID/生日", keyId: 2, value: "" },
        { key: "狀態", keyId: 3, value: "" },
        { key: "住所電話", keyId: 4, value: "" },
        { key: "要保人/性別/簽樣", keyId: 5, value: "" },
        { key: "繳別", keyId: 6, value: "" },
        { key: "序號/收費", keyId: 7, value: "" },
        { key: "被保險人ID/生日", keyId: 8, value: "" },
        { key: "收費方式", keyId: 9, value: "" },
        { key: "收費電話", keyId: 10, value: "" },
        { key: "被保險人/性別/簽樣", keyId: 11, value: "" },
        { key: "要保日", keyId: 12, value: "" },
        { key: "列管/手機", keyId: 13, value: "" },
        { key: "收費地址狀態/列管", keyId: 14, value: "" },
        { key: "生效日", keyId: 15, value: "" },
        { key: "列管/MAIL", keyId: 16, value: "" },
        { key: "電子表單/驗證/首次", keyId: 17, value: "" },
        { key: "發單日", keyId: 18, value: "" },
        { key: "製單日", keyId: 19, value: "" },
        { key: "最新職業類別/職級", keyId: 20, value: "" },
        { key: "要保人年收入", keyId: 21, value: "" },
        { key: "被保人年收入", keyId: 22, value: "" },
        { key: "家庭年收入", keyId: 23, value: "" },
      ],
      slot4Tags: [
        {title: '紅利選擇權', detail: '紅利選擇權內容_設計文字'},
      ]
    };
  },
};
</script>
