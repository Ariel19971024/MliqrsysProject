<template>
  <!-- 09 -->
  <div>
    <SectionTitle :title="sectionTitle" />
    <div class="content-card">
      <div class="card-inner">
        <div class="card-detail">
          <Accordion id="remote-acc1" title="體檢原因資料">
            <div id="remotetable"></div>
            <button @click="remotePaginationCall">Call API</button>
          </Accordion>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { v4 as uuid } from "uuid";
import axios from "axios";
import qs from "qs";
import { createRemoteTable } from "../helperFunctions/remotePaginationTable.js";

export default {
  name: "TestPageForRemoteTabulator",
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
    const vm = this;
    this.vueTable = createRemoteTable("#remotetable", this.remoteCols, [], vm);
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
      console.log(`newVal: ${newVal} \n oldVal: ${oldVal}`);
    },
  },
  methods: {
    async watchApiCall() {
      console.log("callApi");
    },
    async remotePaginationCall() {
      let url = "http://localhost:10202/commonController/tabulatorDatas";
      const params = {
        pageNo: "1",
        size: "1000",
      };
      const headers = {
        "Content-Type": "application/x-www-form-urlencoded",
      };
      try {
        //const res = await axios.post(url, qs.stringify(params), { headers })
        const res = await fetch(url, {
          method: "POST",
          mode: "cors",
          body: qs.stringify(params),
          headers: {
            //"Content-Type": "application/json",
            'Content-Type': 'application/x-www-form-urlencoded',
          },
        });
        console.log(res)
        const response = await res.json();
        console.log(response);
        let data = response.data;
        this.vueTable.setData(data);
        //let data = res.data.data.dataList;
        //this.vueTable.setData(data);
      } catch (e) {
        console.log(e);
      }
    },
  },
  data() {
    return {
      vueTable: null,
      sectionTitle: "體檢批註告知",
      remoteCols: [
        { field: "id", title: "ID" },
        { field: "first", title: "FIRST NAME" },
        { field: "last", title: "LAST NAME" },
        { field: "age", title: "AGE" },
      ],
    };
  },
};
</script>
