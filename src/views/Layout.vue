<template>
  <div>
    <Breadcrumb />
    <Search />
    <Highlight />
    <SectionTitle :title="sectionTitle" />

    <Tabs :titles="titles" :tabLen="tabLen">
      <!-- the first tab -->
      <template v-slot:1>
        <Accordion id="acc1" title="基本資料">
          <Message :title="msgTitle" :content="msgContent" />
          <Table :colNum="3" :table="table1" />
        </Accordion>

        <Accordion id="acc2" title="Tabs within tabs">
          <Tabs2 :titles="titles2">
            <template v-slot:1>
              <Table :colNum="3" :table="table1" />
            </template>
            <template v-slot:2>
              <Table :colNum="3" :table="table1" />
            </template>
            <template v-slot:3>
              <Table :colNum="3" :table="table1" />
            </template>
          </Tabs2>
        </Accordion>

        <Accordion id="acc3" title="彈跳視窗">
          <Dialog :title="dialogTitle" />
        </Accordion>

        <Accordion id="acc4" title="文字備註">
          <Note />
        </Accordion>
      </template>

      <!-- the second tab -->
      <template v-slot:2>
        <Accordion id="acc5" title="一排一行式table">
          <Tags :tags="tags" />
          <Table :colNum="1" :table="table1" />
        </Accordion>

        <Accordion id="acc6" title="一排兩行式table">
          <Table :colNum="2" :table="table1" />
        </Accordion>

        <Accordion id="acc7" title="一排三行式table">
          <Table :colNum="3" :table="table1" />
        </Accordion>

        <Accordion id="acc8" title="一排四行式table">
          <Table :colNum="4" :table="table1" />
        </Accordion>

        <Accordion id="acc9" title="tabulator table">
          <!-- {{ testData }} -->
        </Accordion>

        <Accordion id="acc10" title="上標題下資料式table">
          <HorizontalTable :table="table3" />
        </Accordion>

        <Accordion id="acc11" title="左右分割區塊排版">
          <TwoTables>
            <template v-slot:left
              ><Table :colNum="4" :table="table4"
            /></template>
            <template v-slot:right
              ><Table :colNum="3" :table="table5"
            /></template>
          </TwoTables>
        </Accordion>
      </template>

      <!-- the third tab -->
      <template v-slot:3>
        <Accordion id="acc12" title="Tags (一組為單位)">
          <Tags :tags="tags" />
        </Accordion>

        <Accordion id="ac13" title="按鈕">
          <Button type="primary" content="確定" />
          <Button type="primary-lined" content="確定" />
          <Button type="secondary" content="確定" />
          <Button type="secondary-lined" content="確定" />
          <Button type="disabled" content="無效" />
          <Button type="warning" content="警告" />
        </Accordion>

        <Accordion id="acc14" title="board 搜尋">
          <Searchform>
            <Searchfield
              v-for="(field, i) in bar1"
              :key="i"
              :formfield="field"
            />
          </Searchform>
          <Searchform>
            <Searchfield
              v-for="(field, i) in bar2"
              :key="i"
              :formfield="field"
            />
          </Searchform>
          <Searchform>
            <Searchfield
              v-for="(field, i) in bar3"
              :key="i"
              :formfield="field"
            />
          </Searchform>
        </Accordion>
      </template>
    </Tabs>
  </div>
</template>

<script>
import { v4 as uuid } from "uuid";

var test = [
  {
    id: 1,
    保單號碼: "678100768069",
    要保日: "104/11/09",
    生效日: "104/11/09",
    主約險種: "20NSSI",
    狀態: "42繳費中",
    參考用每: "18500",
    要保人: "郭O竹奈",
    被保人: "郭O竹奈",
    收費地區: "高雄市",
    應繳費日: "109/11/09",
    送金到期日: "109/11/09",
    繳法: "年繳",
    收費方式: "9信用卡代墊",
    服務業務員: "郭O竹奈",
    收費指示: "0",
    住所指示: "5",
    核定日期: "104/11/17",
    應付未付指示: "N",
  },
];

export default {
  components: {},
  mounted() {
    this.testData = test;
  },
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
  data() {
    return {
      tabLen: 3,
      name: "Layout",
      testData: null,
      acc: "collapse-a",
      msgTitle: "要保人姓名/ID",
      msgContent: "郭O竹奈/N224764523",
      headerTitle: "主機交易查詢系統",
      dialogTitle: "適用門檻法則",
      sectionTitle: "This is a section title",
      ham: "",
      cols: [
        { title: "id", field: "id" },
        { title: "保單號碼", field: "保單號碼" },
        { title: "要保日", field: "要保日" },
        { title: "生效日", field: "生效日" },
        { title: "主約險種", field: "主約險種" },
        { title: "狀態", field: "狀態" },
        { title: "參考用每", field: "參考用每" },
        { title: "要保人", field: "要保人" },
        { title: "被保人", field: "被保人" },
        { title: "收費地區", field: "收費地區" },
        { title: "應繳費日", field: "應繳費日" },
        { title: "送金到期日", field: "送金到期日" },
        { title: "繳法", field: "繳法" },
        { title: "收費方式", field: "收費方式" },
        { title: "服務業務員", field: "服務業務員" },
        { title: "收費指示", field: "收費指示" },
        { title: "住所指示", field: "住所指示" },
        { title: "核定日期", field: "核定日期" },
        { title: "應付未付指示", field: "應付未付指示" },
      ],
      titles: [
        "保單基本資料 + Nested Tabs + Dialog + Note",
        "All types of Tables",
        "Tags + Buttons + Searchbars",
        "Empty Tab",
        "Empty Tab",
      ],
      titles2: ["保費明細", "目標堆疊", "立投費用"],
      tags: [
        { title: "tag名稱1", detail: "detail1" },
        { title: "tag名稱2", detail: "detail2" },
        { title: "tag名稱3", detail: "detail3" },
        { title: "tag名稱4", detail: "detail4" },
      ],
      table1: [
        { key: "保單號碼", keyId: 0, value: "678100768069/1 電子保單" },
        { key: "序號/住所", keyId: 0, value: "0 / 70953 台南市安南區安oooo" },
        { key: "要保人ID/生日", keyId: 0, value: "Dxxxxxxxxx/ 077/xx/xx" },
        { key: "狀態", keyId: 0, value: "42繳費中" },
        { key: "住所電話", keyId: 0, value: "xxxxxxxxxx / xxxxxxxxxx" },
        { key: "要保人/性別/簽樣", keyId: 0, value: "王oo / 男 / 0" },
        { key: "繳別", keyId: 0, value: "年繳" },
        { key: "序號/收費", keyId: 0, value: "0 / 70953 台南市安南區安oooo" },
        { key: "被保險人ID/生日", keyId: 9, value: "Dxxxxxxxxx/ 077/xx/xx<" },
      ],
      table2: [
        { key: "保單號碼", keyId: 0, value: "678100768069/1 電子保單" },
        { key: "序號/住所", keyId: 0, value: "0 / 70953 台南市安南區安oooo" },
        { key: "要保人ID/生日", keyId: 0, value: "Dxxxxxxxxx/ 077/xx/xx" },
        { key: "狀態", keyId: 0, value: "42繳費中" },
        { key: "住所電話", keyId: 0, value: "xxxxxxxxxx / xxxxxxxxxx" },
        { key: "要保人/性別/簽樣", keyId: 0, value: "王oo / 男 / 0" },
        { key: "繳別", keyId: 0, value: "年繳" },
        { key: "序號/收費", keyId: 0, value: "0 / 70953 台南市安南區安oooo" },
        { key: "被保險人ID/生日", keyId: 9, value: "Dxxxxxxxxx/ 077/xx/xx<" },
      ],
      table3: [
        { key: "保單號碼", keyId: 0, value: "" },
        { key: "作業日期", keyId: 0, value: "" },
        { key: "作業前累積本金", keyId: 0, value: "" },
        { key: "作業前未承認AV", keyId: 0, value: "" },
        { key: "作業前應計利息", keyId: 0, value: "" },
        { key: "作業後累積本金", keyId: 0, value: "" },
        { key: "作業後未承認AV", keyId: 0, value: "" },
        { key: "作業後應計利息", keyId: 0, value: "" },
      ],
      table4: [
        { key: "欄位標題", keyId: 0, value: "欄位內容-1" },
        { key: "欄位標題", keyId: 0, value: "欄位內容-2" },
        { key: "欄位標題", keyId: 0, value: "欄位內容-3" },
        { key: "欄位標題", keyId: 0, value: "欄位內容-4" },
        { key: "欄位標題", keyId: 0, value: "欄位內容-5" },
        { key: "欄位標題", keyId: 0, value: "欄位內容-6" },
        { key: "欄位標題", keyId: 0, value: "欄位內容-7" },
        {
          key: "欄位標題",
          keyId: 0,
          value:
            "欄位內容-8欄位內容-8欄位內容-8欄位內容-8欄位內容-8欄位內容-8欄位內容-8",
        },
      ],
      table5: [
        { key: "欄位標題", keyId: 0, value: "欄位內容-1" },
        { key: "欄位標題", keyId: 0, value: "欄位內容-2" },
        { key: "欄位標題", keyId: 0, value: "欄位內容-3" },
        { key: "欄位標題", keyId: 0, value: "欄位內容-4" },
        { key: "欄位標題", keyId: 0, value: "欄位內容-5" },
      ],
      bar1: [
        {
          inputType: "duration",
          inputName: "查詢區間",
          id: [""],
          fieldNum: 2,
          index: 0,
          from: "",
          to: "",
        },
        {
          inputType: "textfield",
          inputName: "新件保單號碼",
          id: [""],
          inputVal: "",
        },
        {
          inputType: "textfield",
          inputName: "舊件保單號碼",
          id: [""],
          inputVal: "",
        },
        {
          inputType: "textfield",
          inputName: "還本週年日",
          id: [""],
          inputVal: "",
        },
      ],
      bar2: [
        {
          inputType: "radio",
          inputName: "radio 條件",
          id: [""],
          fieldNum: 2,
          options: ["條件1", "條件2", "條件3", "條件4"],
          value: ["1", "2", "3", "4"],
          inputVal: "",
        },
      ],
      bar3: [
        {
          inputType: "dropdown",
          inputName: "select 條件",
          id: [""],
          options: ["條件1", "條件2", "條件3", "條件4", "條件5"],
          inputVal: "",
        },
      ],
      bar4: [
        {
          inputType: "radio+dropdown",
          inputName: "radio+select 條件",
          id: [""],
          fieldNum: 2,
          options: ["適格", "未適格"],
          value: ["1", "0"],
          inputVal: "",
        },
      ],
    };
  },
};
</script>
