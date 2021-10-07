<template>
  <li>
    <span class="tag-link"
      ><router-link :to="path">{{ name }}</router-link></span
    >
    <span class="tag-cancel" @click="handleCancelIconClick"
      ><span class="material-icons">cancel</span></span
    >
  </li>
</template>
<script>
export default {
  name: "HistoryTag",
  data() {
    return {};
  },
  props: {
    id: String,
    path: String,
    name: String,
  },
  methods: {
    handleCancelIconClick() {
      //* ACTION
      // actions can be async and have business logic while mutations only care about state and setting state
      this.$store.dispatch("deleteHistory", this.id);
    },
  },
};
</script>
<style>
.tag-cancel:hover{
  cursor: pointer;
}

.tag-cancel .material-icons {
  font-size: 1rem;
}

.tag-cancel .material-icons:hover{
  font-size: 1.1rem;
}

</style>
