<template>
    <!-- note -->
    <div class="content-component content-note">
        <p>說明:
            <br>1. 本系統之累計壽險主附約保額查詢不含連結投資險。體檢保額之「目前尚可投保額度」若為負值，則屬體檢件；其他欄位若為負值，則表示已無可投保額度。
            <br>2. 「目前尚可投保額度」若為空白，請參照特殊身份各別限制表、保險年齡級年收入與保險金額限制表或洽詢契約科。
        </p>
    </div>
</template>

<script>
export default {
    date() {
        return {
            notes: ''
        }  
    },
}
</script>