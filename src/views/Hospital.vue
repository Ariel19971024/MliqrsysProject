//84,85--體檢醫院
<template>
  <div>
    <SectionTitle :title="sectiontitle" />
    <div class="content-component content-card">
      <div class="card-inner">
        <div class="card-detail"></div>
        <SearchFormCombine :bar="bar1" @btn-click-event="clickHandler" />
        <Accordion id="acc1" title="體檢醫院資料-體檢醫療院所">
          <div style="position:relative">
            <TabulatorTable
              :tableId="Table1Id"
              :columns="Table1Columns"
              :tableData="Table1Data"
              checkId1="hospital-acc1table1-check1"
            checkId2="hospital-acc1table1-check2"
              @transmit-tabulator-data="handleTabulatorData"
            >
            </TabulatorTable>
            <Loading :active.sync="isLoading" :is-full-page="false">
              <div class="loadingio-spinner-ripple-wu44vrvts1">
                <div class="ldio-2gn8nvj94zp">
                  <div></div>
                  <div></div>
                </div>
              </div>
            </Loading>
          </div>
        </Accordion>

        <Accordion id="acc2" title="體檢醫院資料-體檢項目">
          <div style="position:relative">
            <TabulatorTable
              :tableId="Table2Id"
              :columns="Table2Columns"
              :tableData="Table2Data"
              checkId1="hospital-slot1table1-check1"
              checkId2="hospital-slot1table1-check2"
            />
            <Loading :active.sync="isLoading2" :is-full-page="false">
              <div class="loadingio-spinner-ripple-wu44vrvts1">
                <div class="ldio-2gn8nvj94zp">
                  <div></div>
                  <div></div>
                </div>
              </div>
            </Loading>
          </div>
        </Accordion>
      </div>
    </div>
  </div>
</template>
<script>
import Loading from "vue-loading-overlay";
import "vue-loading-overlay/dist/vue-loading.css";
import callApi from "../helperFunctions/callApi";
export default {
  name: "Hospital",
  components: {
    Loading,
  },
  methods: {
    clickHandler({ formData, allEmpty }) {
      this.dataBox = formData;
      if (allEmpty) {
        //modal popup
        this.$bvModal.show("bv-modal-example");
      } else {
        this.hospitalDetailsApi(); //體檢醫院資料-體檢醫療院所
      }
    },
    async hospitalDetailsApi() {
      const vm = this;
      vm.isLoading = true;
      const domain = this.$store.state.domain;
      const url = domain + "/newHospital/executeMission01";

      const params = {
        area_code: this.dataBox.City,
        txt_search: this.dataBox.hospitalName,
      };

      const headers = {
        "Content-Type": "application/x-www-form-urlencoded",
        //Authorization: "bearer " + token,
      };
      const { res } = callApi();
      const { data, status } = await res(url, params, headers);
      vm.isLoading = false;
      this.Table1Data = data.data;
    },
    async handleTabulatorData(rowValue) {
      this.isLoading2 = true;
      const domain = this.$store.state.domain;
      const url = domain + "/newHospital/executeMission02";

      const params = {
        Hospital_id: rowValue.r_hospital_id,
      };

      const headers = {
        "Content-Type": "application/x-www-form-urlencoded",
        //Authorization: "bearer " + token,
      };
      const { res } = callApi();
      const { data, status } = await res(url, params, headers);
      // const responseData =  axios.get(url, {params: params}, {headers});
      this.isLoading2 = false;

      this.Table2Data = data.data;
    },
  },
  data() {
    return {
      isLoading2: false,
      isLoading: false,
      dataBox: null,
      Table1Id: "hospitalTable1",
      Table1Columns: [
        { title: "代碼", field: "m_hospital_id" },
        { title: "醫院名稱", field: "m_hospital_name" },
        { title: "健檢", field: "m_hospital_hc" },
        { title: "指定醫院", field: "m_assign" },
        { title: "地址", field: "m_address" },
        { title: "電話", field: "m_tel" },
        { title: "所屬地區", field: "m_area_name" },
      ],
      Table1Data: [],
      sectiontitle: "體檢醫院",
      bar1: [
        {
          inputType: "dropdown",
          inputName: "地區選擇",
          selected: "所有區域",
          options: [
            { text: "所有區域", value: "0" },
            { text: "台北", value: "1" },
            { text: "中壢", value: "2" },
            { text: "台中", value: "3" },
            { text: "嘉義", value: "4" },
            { text: "台南", value: "5" },
            { text: "高雄", value: "6" },
            { text: "彰化", value: "7" },
          ],
          id: "City",
          inputVal: "0",
        },
        {
          inputType: "textfield",
          inputName: "醫院名稱",
          placeholder: "醫院名稱",
          id: "hospitalName",
          inputVal: "",
        },
      ],
      Table2Id: "hospitalTable2",
      Table2Columns: [
        { title: "體檢項目", field: "m_exam_item_code" },
        { title: "體檢費", field: "m_exam_fee" },
        { title: "體檢項目說明", field: "m_exam_item_desc" },
      ],
      Table2Data: [],
    };
  },
};
</script>
<style scoped>
@keyframes ldio-2gn8nvj94zp {
  0% {
    top: 96px;
    left: 96px;
    width: 0;
    height: 0;
    opacity: 1;
  }
  100% {
    top: 18px;
    left: 18px;
    width: 156px;
    height: 156px;
    opacity: 0;
  }
}

.ldio-2gn8nvj94zp div {
  position: absolute;
  border-width: 4px;
  border-style: solid;
  opacity: 1;
  border-radius: 50%;
  animation: ldio-2gn8nvj94zp 1s cubic-bezier(0, 0.2, 0.8, 1) infinite;
}

.ldio-2gn8nvj94zp div:nth-child(1) {
  border-color: #1d3f72;
}

.ldio-2gn8nvj94zp div:nth-child(2) {
  border-color: #5699d2;
  animation-delay: -0.5s;
}

.loadingio-spinner-ripple-wu44vrvts1 {
  width: 200px;
  height: 200px;
  display: inline-block;
  overflow: hidden;
  /*  background 設定 none  */
  background: none;
}
.ldio-2gn8nvj94zp {
  width: 100%;
  height: 100%;
  position: relative;
  transform: translateZ(0) scale(1);
  backface-visibility: hidden;
  transform-origin: 0 0; /* see note above */
}
.ldio-2gn8nvj94zp div {
  box-sizing: content-box;
}
</style>
