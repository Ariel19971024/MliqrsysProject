<template>
<div>
    <!-- <b-button v-b-modal="'modal-1'">彈跳視窗</b-button> -->

    <div class="detail-board" v-b-modal="'modal-1'">
        <a href="#popup" data-lity class="popup-dialog">彈跳視窗</a>
    </div>

    <b-modal id="modal-1" ref="modal-1">
        <div class="lity-hide content-component content-popup" id="popup">
            <div class="popup-header">
                <div class="pupup-header-inner">
                    <div class="popup-title">適用門檻法則</div>
                    <div class="popup-close" >
                        <button 
                            @click="hideModal" 
                            class="lity-close" 
                            type="button" 
                            aria-label="Close (Press escape to close)" 
                            data-lity-close="">×
                        </button>
                    </div>
                </div>
            </div>
            <div class="popup-detail">
                <p>身故給付/帳戶帳值 >= 比例
                    <ul>
                        <li>40歲以下&nbsp;&nbsp;130%</li>
                        <li>41-70歲&nbsp;&nbsp;15%</li>
                        <li>71歲以上&nbsp;&nbsp;101%</li>
                    </ul>
                </p>
            </div>
            <div class="popup-btn">
                <!-- btn -->
                <Button type="primary" content="確 定" />
            </div>
        </div>
    </b-modal>

    </div>
</template>

<script>
export default {
    data() {
       return {

       } 
    },
    props: {
        title: String
    },
    methods:{
      hideModal() {
        this.$refs['modal-1'].hide()
      },
    }
}
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