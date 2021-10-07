//:formfield不需要
<template :formfield="formfield">
  <div class="board-search-item">
    <div class="search-item-title">{{ formfield.inputName }}</div>
    <div class="search-item-field">
      <b-form-group label="" v-if="formfield.inputType === 'radio'">
        <b-form-radio-group
          v-model="value"
          :options="formfield.options"
          :name="formfield.inputName"
          class="radios"
        ></b-form-radio-group>
      </b-form-group>

      <input
        v-if="formfield.inputType === 'textfield'"
        type="text"
        :placeholder="formfield.placeholder"
        v-model="formfield.inputVal"
        :id="formfield.id"
        @change="printVal()"
      />

      <b-form-select
        v-if="formfield.inputType === 'dropdown'"
        v-model="value"
        :options="formfield.options"
      ></b-form-select>

      <!-- <div>{{ formfield.inputVal }}</div> -->
      <DatePickerTW
        v-if="formfield.inputType === 'datepicker'"
        :id="formfield.id"
        v-model="formfield.inputVal"
        @change="printVal()"
      >
      </DatePickerTW>
    </div>
  </div>
</template>

<script>
import DatePickerTW from "./DatePickerTW.vue";
import Searchform from "./SearchForm.vue";

export default {
  methods: {
    printVal() {
      //  console.log(this.formfield.inputVal)
      let inputObject = {
        id: this.formfield.id,
        inputVal: this.formfield.inputVal,
      };
      this.$emit("myevent", inputObject);
    },
  },

  props: {
    formfield: Object,
  },
  components: {
    DatePickerTW,
  },

  data() {
    return {
      value: this.formfield.value,
    };
  },
  mounted() {
    console.log(this.formfield.value);
  },
};
</script>

<style>
.form-group {
  margin-bottom: 0px !important;
}

.search-item-field select {
  height: 25px !important;
  border: #aaa solid 1px !important;
  border-radius: 0px !important;
  padding: 2px 4px !important;
}

.radios .custom-control-label {
  color: #fff !important;
}

.custom-control-label span {
  font-size: 0.875rem !important;
}
</style>
