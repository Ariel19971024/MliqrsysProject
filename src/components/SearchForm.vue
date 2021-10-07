<template>
  <div class="detail-board-search">
    <form @submit.prevent="handleFormSubmit">
      <!-- <Searchfield
              v-for="(field, i) in bar"
              :key="i"
              :formfield="field"
            /> -->
      <div
        class="board-search-item"
        v-for="(formfield, i) in formData"
        :key="i"
      >
        <div class="search-item-title">{{ formfield.inputName }}</div>
        <div class="search-item-field">
          <b-form-group label="" v-if="formfield.inputType === 'radio'">
            <b-form-radio-group
              v-model="formfield.value"
              :options="formfield.options"
              :name="formfield.inputName"
              class="radios"
            ></b-form-radio-group>
          </b-form-group>

          <input
            v-if="formfield.inputType === 'textfield'"
            type="text"
            v-model="formfield.value"
            :placeholder="formfield.placeholder"
          />

          <b-form-select
            v-if="formfield.inputType === 'dropdown'"
            v-model="formfield.value"
            :options="formfield.options"
          ></b-form-select>

          <DatePickerTW
            v-if="formfield.inputType === 'datepicker'"
            :id="formfield.id"
            :date.sync="formfield.value"
          >
          </DatePickerTW>
        </div>
      </div>

      <div class="board-search-item search-item-btn">
        <button><span class="material-icons">search</span></button>
      </div>
    </form>
  </div>

</template>

<script>
import DatePickerTW from "./DatePickerTW.vue";

export default {
  components: {
    DatePickerTW,
  },
  data() {
    return {
      formData: this.bar,
      collectedFormData: {},
    };
  },
  methods: {
    handleFormSubmit() {
      let allEmpty = true;
      for (let value of Object.values(this.formData)) {
        this.collectedFormData[value["id"]] = value["value"];
        if (value["value"]) allEmpty = false;
      }
      this.$emit("search-form-submit", {
        formData: this.collectedFormData,
        allEmpty,
      });
    },
  },
  props: {
    bar: Array,
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

