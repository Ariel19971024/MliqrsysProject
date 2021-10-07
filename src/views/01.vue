<template>
  <div>
    <SectionTitle :title="sectionTitle" />
    <Tabs :titles="titles" :tabLen="tabLen">
      <template v-slot:1>
        <Accordion id="acc1" title="問題保單">
          <Message title="問題描述" :content="msgContent" />
          <TabulatorTable
            :tableId="table1Id"
            :columns="table1columns"
            :tableData="table1data"
            checkId1="01-1-check1"
            checkId2="01-1-check2"
          />
        </Accordion>

        <Accordion id="acc2" title="保戶訊息">
          <TabulatorTable
            :tableId="table2Id"
            :columns="table2columns"
            :tableData="table2data"
            checkId1="01-2-check1"
            checkId2="01-2-check2"
          />
        </Accordion>
      </template>
      <template v-slot:2>
        <DatePickerTW :id="date1ID"/>
        ~
        <DatePickerTW :id="date2ID"/>
      </template>
    </Tabs>
  </div>
</template>

<script>
//import * as $ from "jquery";
import { v4 as uuid } from "uuid";
import "jquery-ui/ui/widgets/datepicker";
import DatePickerTW from "../components/DatePickerTW";

export default {
  components: {
    DatePickerTW
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
      date1ID: "date1",
      date2ID: "date2",
      sectionTitle: "提示訊息",
      ham: "",
      tabLen: 2,
      titles: ["訊息", "要保人資料"],
      msgContent: "fake message",
      table1Id: "table1",
      table1columns: [
        { title: "id", field: "id" },
        { title: "保單號碼", field: "a" },
        { title: "要保日", field: "b" },
        { title: "生效日", field: "c" },
      ],
      table1data: [
        {
          id: 1,
          a: "678100768069",
          b: "104/11/09",
          c: "104/11/09",
        },
        {
          id: 2,
          a: "678100768069",
          b: "104/11/09",
          c: "104/11/09",
        },
      ],
      table2Id: "table2",
      table2columns: [
        { title: "id", field: "id" },
        { title: "保單號碼", field: "a" },
        { title: "要保日", field: "b" },
        { title: "生效日", field: "c" },
      ],
      table2data: [
        {
          id: 1,
          a: "678100768069",
          b: "104/11/09",
          c: "104/11/09",
        },
        {
          id: 2,
          a: "678100768069",
          b: "104/11/09",
          c: "104/11/09",
        },
      ],
    };
  },
};
</script>

