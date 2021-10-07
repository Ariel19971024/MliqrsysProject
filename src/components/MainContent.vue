//router-view放這裡的目的是為了從search傳值到views
<template>
  <div>
    <Breadcrumb />
    <Search @query-form-submit="handleQueryFormSubmit">
      <Highlight />

      <router-view :searchData="searchData" />
    </Search>
  </div>
</template>

<script>
export default {
  data() {
    return {
      searchData: [],
    };
  },
  methods: {
    handleQueryFormSubmit(data) {
      this.searchData = data;
    },
  },
};
</script>
