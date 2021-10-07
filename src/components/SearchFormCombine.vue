<template>
  <div class="detail-board-search">
    <form action="" @submit.prevent="submitHandler">
      <div
        class="board-search-item"
        v-for="(formfield, i) in formfields"
        :key="i"
      >
        <div class="search-item-title">{{ formfield.inputName }}</div>
        <div class="search-item-field">
          <b-form-group label="" v-if="formfield.inputType === 'radio'">
            <b-form-radio-group
              v-model="formfield.inputVal"
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
          />

          <b-form-select
            v-if="formfield.inputType === 'dropdown'"
            v-model="formfield.inputVal"
            :options="formfield.options"
            
          ></b-form-select>
          <!-- <div>{{ formfield.inputVal }}</div> -->
          <DatePickerTW2
            v-if="formfield.inputType === 'datepicker'"
            :id="formfield.id"
            :dateChange.sync="formfield.inputVal"
          >
          </DatePickerTW2>
        </div>
      </div>

      <div class="board-search-item search-item-btn">
        <button><span class="material-icons">search</span></button>
      </div>
    </form>
    <div>
      <b-modal id="bv-modal-example" hide-footer>
        <div
          class="lity-hide content-component content-popup"
          id="page-18-popup"
        >
          <div class="popup-header">
            <div class="pupup-header-inner">
              <div class="popup-title">訊息</div>
              <div class="popup-close">
                <button
                  @click="$bvModal.hide('bv-modal-example')"
                  class="lity-close"
                  aria-label="Close (Press escape to close)"
                  data-lity-close=""
                >
                  ×
                </button>
              </div>
            </div>
          </div>
          <div class="popup-detail">
            <p>請輸入查詢條件</p>
          </div>
          <div class="popup-btn">
            <!-- btn -->
            <div class="content-component content-btn">
              <ul>
                <li>
                  <button
                    @click="$bvModal.hide('bv-modal-example')"
                    class="content-btn-primary"
                  >
                    確 定
                  </button>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </b-modal>
    </div>
  </div>
</template>

<script>
import DatePickerTW2 from "./DatePickerTW2.vue";
// import DatePickerPractice from "./DatePickerPractice.vue";

export default {
  props: {
    bar: Array,
    date: String,
  },
  data() {
    return {
      
      formfields: this.bar,
      inputObject: {},
    };
  },
  components: {
    DatePickerTW2,
    // DatePickerPractice,
  },
  methods: {
    submitHandler() {
      // 直接把object寫在裡面
      let formfield;
      let dateinput;
      let allEmpty = true;
      for (formfield in this.formfields) {
        this.inputObject[this.formfields[formfield].id] = this.formfields[
          formfield
        ].inputVal;
        if(this.formfields[formfield].inputVal)allEmpty = false
      }
      // console.log(Object.values(this.inputObject));
      
      // if(allEmpty) this.$bvModal.show("bv-modal-example");

      this.$emit("btn-click-event", {
        formData: this.inputObject,
        allEmpty,
      });
    },
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
