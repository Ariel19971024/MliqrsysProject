<template>
    <div class="detail-board-msg">
        <span class="board-msg-title">{{ title }}</span>
        <span class="board-msg-text">{{ content }}</span>
    </div>
</template>

<script>
export default {
    data() {
        return {
        }
    },
    props: {
        title: String,
        content: String
    },
}
</script>
