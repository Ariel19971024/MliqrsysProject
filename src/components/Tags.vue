<template>
    <div class="detail-board-tag">
        <div v-for="(tag, i) in tags" :key="i" class="board-tag-item">
            <div class="tag-item-inner">
                <div class="tag-item-title">{{ tag.title }}</div>
                <div class="tag-item-detail">{{ tag.detail }}</div>
            </div>
        </div>
        <!-- <div class="board-tag-item">
            <div class="tag-item-inner">
                <div class="tag-item-title">tag名稱2</div>
                <div class="tag-item-detail">detail2</div>
            </div>
        </div> -->
    </div>
</template>



<script>
export default {
    data() {
        return {

        }
    },
    props: {
        tags: Array
    }
}
</script>