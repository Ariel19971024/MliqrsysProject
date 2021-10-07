<template>
    <div class="content-component content-btn" @click="handleClick">
        <ul>
            <li><button :class="btnClass">{{ content }}</button></li>
        </ul>
    </div>
</template>

<script>
export default {
    data() {
        return {

        }
    },
    props: {
        type: String,
        content: String,
        handleClick: Function
    },
    computed: {
        btnClass() {
            if (this.type == 'primary') {
                return 'content-btn-primary';
            } else if (this.type == 'primary-lined') {
                return 'content-btn-primary-line';
            } else if (this.type == 'secondary') {
                return 'content-btn-second';
            } else if (this.type == 'secondary-lined') {
                return 'content-btn-second-line';
            } else if (this.type == 'disabled') {
                return 'content-btn-disable';
            } else {
                return 'content-btn-warning';
            }
        }
    }
}
</script>

<style scoped>

.card-tab li {
    border-bottom: none;
    height: 100%;
}

</style>