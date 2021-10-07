<template>
  <b-tabs class="detail-board-tab">
    <b-tab
      v-for="(title, i) in titles"
      :key="i"
      :title="title"
      @click="getTabName(i)"
    >
      <slot :name="i + 1"></slot>
    </b-tab>
  </b-tabs>
</template>

<script>
export default {
  data() {
    return {};
  },
  computed: {},
  props: {
    titles: Array,
  },
  methods: {
    getTabName(i) {
      this.$emit("get-tab-name", this.titles[i]);
    },
  },
};
</script>

<style>
.detail-board-tab ul li.nav-item a {
  display: block;
  padding: 2px 8px 2px 2px;
  line-height: 1;
  color: rgba(1, 84, 120, 0.8);
  text-decoration: none;
}
</style>
