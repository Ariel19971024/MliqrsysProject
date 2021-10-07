<template>
  <div class="content-component content-table">
    <div class="table-func">
      <div class="table-filter">
        <div class="table-filter-title">篩選</div>
        <div class="table-filter-field">
          <input type="text" :id="tableFilterId" />
        </div>
      </div>

      <div class="table-switch">
        <!-- checked: {{ checked2 }} -->
        <div id="searchList" :class="visibility">
          <span class="anchor" @click="showAnchor">自定義欄位</span>
          <ul class="items">
            <Checkbox
              :options="colOptions"
              :checked="checkedCols"
              :id1="checkId1"
              :id2="checkId2"
              @clicked="clickCheckbox"
            />
          </ul>
        </div>
      </div>
    </div>
    <div :id="tableId"></div>
  </div>
</template>
<script>
import { createTable, showCols } from "../helperFunctions/createTable.js";
import Checkbox from "./Checkbox.vue";

export default {
  props: {
    tableId: String,
    columns: Array,
    tableData: Array,
    checkId1: String,
    checkId2: String,
  },
  data() {
    return {
      checked: this.checkedCols,
      anchor: false,
      table: null,
    };
  },
  // watch: {
  //   tabledata() {
  //     this.table.setData(this.tabledata);
  //   },
  // },
  components: {
    Checkbox,
  },

  watch: {
    tableData: {
      handler(newData) {
        this.table.setData(newData);
      },

      deep: true,
    },
  },

  mounted() {
    //console.log("mounted in testTabulator");
    // console.log(this.urltest);
    const vm = this;

    this.table = createTable(this.tableId, this.columns, this.tabledata, vm);
  },

  methods: {
    searchToggle() {
      this.expanded = !this.expanded;
    },
    showAnchor() {
      this.anchor = !this.anchor;
    },
    clickCheckbox(value) {
      this.checked = value;
      showCols(this.checked, this.colOptions, this.table);
    },
  },
  computed: {
    tabledata() {
      return this.tableData;
    },
    tableFilterId() {
      return `${this.tableId}-tableFilter`;
    },
    visibility() {
      let style = "table-switch-list";
      if (this.anchor) {
        style = style.concat(" visible");
      }
      return style;
    },
    colOptions() {
      let colOptions = this.columns.map((col) => ({
        text: col.title,
        value: col.field,
      }));
      return colOptions;
    },
    checkedCols() {
      let checkedCols = this.columns.map((col) => col.field);
      return checkedCols;
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
