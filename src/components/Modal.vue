<template>
  <div>
    <b-modal id="modal-1" ref="modal-1">
      <div class="lity-hide content-component content-popup" id="popup">
        <div class="popup-header">
          <div class="pupup-header-inner">
            <div class="popup-title">訊息</div>
            <div class="popup-close">
              <button
                @click="hideModal"
                class="lity-close"
                type="button"
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
          <Button type="primary" :handleClick="hideModal" content="確 定" />
        </div>
      </div>
    </b-modal>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  props: {
    title: String,
  },
  methods: {
    hideModal() {
        console.log("close")
      this.$bvModal.hide("modal-1");
      //this.$refs["modal-1"].hide();
    },
  },
};
</script>

<style>
.modal-dialog {
  max-width: 320px !important;
}

.modal-content {
  border: none !important;
  border-radius: 10px !important;
}

.modal-header {
  display: none !important;
}

.modal-body {
  padding: 0px !important;
}

.modal-footer {
  display: none !important;
}

.modal-backdrop {
  opacity: 0.9 !important;
}
</style>
