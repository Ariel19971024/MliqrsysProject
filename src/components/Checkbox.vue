<template>
  <div >
    <b-form-group>
      <template #label>
        <b-form-checkbox
          v-model="allSelected"
          :indeterminate="indeterminate"
          :aria-describedby="options"
          :aria-controls="options"
          @change="toggleAll"
          :id="id1"
        >
          {{ allSelected ? '全部取消' : '全選' }}
        </b-form-checkbox>
      </template>

      <template v-slot="{ ariaDescribedby }">
        <b-form-checkbox-group
          :id="id2"
          v-model="selected"
          :options="options"
          :aria-describedby="ariaDescribedby"
          name="options"
          @input="onInput($event)"
          stacked
        ></b-form-checkbox-group>
        </template>
    </b-form-group>

  </div>
</template>

<script>

import { addCheckboxClass } from '../helperFunctions/styleCheckbox.js';

export default {
  props: {
      options: Array,
      checked: Array,
      id1: String,
      id2: String
  },
  mounted() {
    addCheckboxClass();
  },
  data() {
    return {
      selected: this.checked,
      allSelected: true,
      indeterminate: false,
      checkedNames: []
    }
  },
  methods: {
    toggleAll(checked) {
      if (checked){
        //顯示全部選 所有欄位都勾起來
        let colOptions = this.options;
        this.selected = colOptions.map( option => (
          option.value
        ))
      }else{
        //顯示全選 沒有欄位
        this.selected = [];
      }
    },
    onInput($event) {
      this.$emit('clicked', $event);
    }
  },
  watch: {
    selected(newValue) {
      // Handle changes in individual flavour checkboxes
      if (newValue.length === 0) {
        this.indeterminate = false
        this.allSelected = false
      } else if (newValue.length === this.options.length) {
        this.indeterminate = false
        this.allSelected = true
      } else {
        this.indeterminate = true
        this.allSelected = false
      }
    }
  }
}
</script>

<style>

.ml-4 {
    margin-left: 0px !important;
}

.table-switch-list .items-col {
  padding-left: 1.5rem !important;
  padding-top: 5px !important;
  padding-bottom: 5px !important;
}

.col-form-label {
  padding-bottom: 0px !important;
}

</style>