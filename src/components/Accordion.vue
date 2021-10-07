<template>
    <div class="card-detail">
        <div class="detail-title" v-b-toggle="id">
            <span class="detail-icon"></span>{{ title }}
        </div>

        <b-collapse visible :id="id" class="mt-2">
            <div class="detail-board">
                <slot />
            </div>
        </b-collapse>
    </div>
</template>

<script>
export default {
    data() {
        return {

        }
    },
    props: {
        id: String,
        title: String
    },
}
</script>