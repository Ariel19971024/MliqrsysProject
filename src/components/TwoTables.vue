<template>
<div class="row sbs-row">
    <div class="col-12 col-lg-6 sbs-board">
        <div class="sbs-board-inner">
            <!-- card-detail >> table -->
            <slot name="left"></slot>
        </div>
    </div>
    <div class="col-12 col-lg-6 sbs-board">
        <div class="sbs-board-inner">
            <!-- card-detail >> table -->
            <slot name="right"></slot>
        </div>
    </div>
</div>
</template>

<script>
export default {
    data() {
        return {

        }
    },
}
</script>