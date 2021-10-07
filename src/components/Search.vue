<template>
  <!-- search -->
  <div class="content-component content-search">
    <div class="search-inner">
      <div class="search-field">
        <div class="search-field-input">
          <div class="field-inner">
            <form @submit.prevent="queryFormSubmit">
              <div class="field-item field-select">
                <select v-model="searchCat">
                  <option v-for="(opt, i) in options" :key="i" :value="opt">{{
                    opt.text
                  }}</option>
                </select>
              </div>
              <div class="field-item field-input">
                <input
                  type="text"
                  placeholder="請輸入搜尋條件"
                  v-model="searchInput"
                  value="searchInput"
                />
              </div>
              <div class="field-item field-Btn">
                <button >搜 尋</button>
              </div>
            </form>
          </div>
        </div>
        <div class="search-field-result">
          <div class="field-result-inner">
            <div>搜尋條件</div>
            <div>{{ displaySearchCatText }}</div>
            <div>{{ displaySearchInput }}</div>
            <div>
              共<span>{{ searchQuantity }}</span
              >筆
            </div>
            <div v-if="searchQuantity === 0">
              <span class="noDataText">，查無資料!</span>
            </div>
            <!-- <div class="resultToggleBtn"><a href="javascript:;" class="resultToggle-up"></a></div> -->
            <div v-b-toggle.collapse-3 class="resultToggleBtn">
              <a
                class="resultToggleIcon"
                :class="toggle"
                @click="searchToggle"
              ></a>
            </div>
          </div>
        </div>
      </div>
      <!-- table -->
      <b-collapse visible id="collapse-3">
        <div class="content-component content-table">
          <div class="table-func">
            <div class="table-filter">
              <div class="table-filter-title">篩選</div>
              <div class="table-filter-field">
                <input type="text" id="search-table-tableFilter" />
              </div>
            </div>

            <div class="table-switch">
              <div id="searchList" :class="visibility">
                <span class="anchor" @click="showAnchor">自定義欄位</span>
                <ul class="items" id="checkbox-items">
                  <Checkbox
                    :options="colOptions"
                    :checked="checkedCols"
                    @clicked="clickCheckbox"
                    id1="search-check1"
                    id2="search-check2"
                  />
                </ul>
              </div>
            </div>
          </div>
          <div style="position:relative">
          <div id="search-table"></div>
          <Loading :active.sync="isLoading" :is-full-page="false">
          </Loading>
          </div>
        </div>
      </b-collapse>
    </div>
    <slot :queryData="queryData"></slot>
  </div>
</template>



<script>
// import * as $ from "jquery";
import { createTable, showCols } from "../helperFunctions/createTable.js";
import { testData } from "../helperFunctions/testData.js";
import Checkbox from "./Checkbox.vue";
import Loading from "vue-loading-overlay";
import "vue-loading-overlay/dist/vue-loading.css";
const tableColumns = [
  { title: "id", field: "", formatter:"rownum"},
  { title: "保單號碼", field: "policy_no" },
  { title: "要保日", field: "app_apply_date" },
  { title: "生效日", field: "issue_date" },
  { title: "主約險種", field: "plan_code" },
  { title: "狀態", field: "sts_code" },
  { title: "參考用每期保費", field: "mode_prem" },
  { title: "要保人", field: "o1_name" },
  { title: "被保人", field: "i1_name" },
  { title: "收費地區", field: "mail_addr" },
  { title: "應繳費日", field: "paid_to_date" },
  { title: "送金到期日", field: "bill_to_date" },
  { title: "繳法", field: "modx" },
  { title: "收費方式", field: "method" },
  { title: "服務業務員", field: "s_ag_name" },
  { title: "收費指示", field: "mail_addr_ind" },
  { title: "住所指示", field: "home_addr_ind" },
  { title: "核定日期", field: "uw_write_date" },
  { title: "應付未付指示", field: "pshp_ind" },
];

const colOptions = tableColumns.map((tableColumn) => ({
  text: tableColumn.title,
  value: tableColumn.field,
}));

const checkedCols = tableColumns.map((tableColumn) => {
  return tableColumn.field;
  
});
import callApi from "../helperFunctions/callApi";
export default {
  data() {
    return {
      isLoading: false,
      queryData: null,
      tabledata: [],
      tableColumns: tableColumns,
      colOptions: colOptions,
      checkedCols: checkedCols, //array -> default should be all checked
      anchor: false,
      table: null,
      expanded: true,
      searchInput: "",
      searchCat: {text: "保單號碼/ID", value: "0"},
      displaySearchInput: "",
      displaySearchCatText: "保單號碼/ID",
      options: [
        {text: "保單號碼/ID", value: "0"},
        {text: "要保人ID", value: "1"},
        {text: "被保人ID", value: "2"},
        {text: "要/被保人姓名", value: "3"},
        {text: "要保人姓名", value: "4"},
        {text: "被保人姓名", value: "5"},
        {text: "生存/滿期受益人ID", value: "6"},
        {text: "生存/滿期受益人姓名", value: "7"}
      ],
      
    };
  },
  components: {
    Checkbox,
    Loading,
  },
  mounted() {
    const vm = this;
    this.table = createTable(
      "search-table",
      this.tableColumns,
      this.tabledata,
      vm
    );
  },
  methods: {
    //搜尋
    async queryFormSubmit() {
      this.tabledata = [];
      // console.log(this.searchCat.value, this.searchInput);
       const vm = this;
      vm.isLoading = true;
      const domain = this.$store.state.domain;
      const url = domain + "/queryPolicy/doSearch";
      
      const params = {
        custData: this.searchInput,
        type:this.searchCat.value
      };
      const headers = {
        "Content-Type": "application/x-www-form-urlencoded",
        //Authorization: "bearer " + token,
      };
      const { res } = callApi();
      const { data,status } = await res(url, params, headers);
      vm.isLoading = false;
      console.log(status)
      this.tabledata = data.data;
      // this.tabledata = testData();
      //this.tabledata = [];
     
      this.queryData = { data: testData() };
      this.$store.commit("setQueryData", this.queryData);
      this.loadData();
      this.displaySearchInput = this.searchInput;
      this.displaySearchCatText = this.searchCat.text;
      this.$emit('query-form-submit', this.tabledata);
    },
    loadData() {
      //將資料放入table中
      if (this.tabledata.length === 0) {
        //查無資料
      }
      this.table.setData(this.tabledata);
    },
    searchToggle() {
      this.expanded = !this.expanded;
    },
    showAnchor() {
      this.anchor = !this.anchor;
    },
    clickCheckbox(value) {
      this.checkedCols = value;
      showCols(this.checkedCols, this.colOptions, this.table);
    },
  },
  computed: {
    searchQuantity() {
      return this.tabledata.length;
    },
    toggle() {
      return {
        "resultToggle-up": this.expanded,
        "resultToggle-up resultToggle-down": !this.expanded,
      };
    },
    visibility() {
      let style = "table-switch-list";
      if (this.anchor) {
        style = style.concat(" visible");
      }
      return style;
    },
  },
};
</script>

<style lang="scss">
@import "~vue-tabulator/dist/scss/bootstrap/tabulator_bootstrap4";

.page-length {
  display: inline-block;
  padding: 0px 5px;
}

.page-length p {
  margin-bottom: 0px;
}

.page-num {
  display: inline-block;
  padding: 0px 5px;
}

.page-num p {
  margin-bottom: 0px;
}

.tabulator-footer {
  background-color: white;
}
</style>
